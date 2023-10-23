import {Trip} from '../types/Trip';
import {loadJsonFile, overwriteJsonFile} from './jsonFiles';
import {newId} from './newId';
import {dateToTimestamp} from './time';

const TRIPS_FILE = 'ajokilsat.json';

let savedTrips: Trip[] | null = null;

export async function loadTrips(reload: boolean = false): Promise<Trip[]> {
    if (savedTrips === null || reload) {
        const trips = await loadJsonFile(TRIPS_FILE);
        if (trips && !isLoadedTripsOk(trips)) {
            throw Error('Matkatiedosto ei ole oikeassa muodossa');
        }
        savedTrips = trips;
    }

    return savedTrips ?? exampleTrips;
}

export async function saveTripsToFile(trips: Trip[]) {
    // Tallenna myös muuttujaan, jotta loadTrips varmasti palauttaa
    // tallennetut muutokset vaikka sitä kutsuttaisiin reload=false:lla.
    // HUOM: Käyttää [...trips] decontruktointia, jotta savedTrips:n
    // sisältö muuttuu jolloin React varmasti huomaa muutokset
    savedTrips = [...trips];
    await overwriteJsonFile(TRIPS_FILE, savedTrips);
}

function isLoadedTripsOk(trips: unknown): boolean {
    if (!Array.isArray(trips)) return false;
    for (const trip of trips) {
        if (!isTripOk(trip)) return false;
    }
    return true;
}

function isTripOk(trip: unknown): boolean {
    if (typeof trip != 'object') return false;

    if (!('id' in trip) || typeof trip.id != 'string') return false;
    if (!('vehicleId' in trip) || typeof trip.vehicleId != 'string')
        return false;
    if (!('description' in trip) || typeof trip.description != 'string')
        return false;
    if (
        'timestampAtBegin' in trip &&
        typeof trip.timestampAtBegin != 'number' &&
        trip.timestampAtBegin != null
    )
        return false;
    if (
        'timestampAtEnd' in trip &&
        typeof trip.timestampAtEnd != 'number' &&
        trip.timestampAtEnd != null
    )
        return false;
    if (
        'odometerAtBegin' in trip &&
        typeof trip.odometerAtBegin != 'number' &&
        trip.odometerAtBegin != null
    )
        return false;
    if (
        'odometerAtEnd' in trip &&
        typeof trip.odometerAtEnd != 'number' &&
        trip.odometerAtEnd != null
    )
        return false;
    if ('routeDescription' in trip && typeof trip.routeDescription != 'string')
        return false;

    return true;
}

const exampleTrips: Trip[] = [
    {
        id: newId(),
        vehicleId: 'car1',
        description: 'Työmatka',
        timestampAtBegin: dateToTimestamp(new Date(2023, 8, 18, 8, 15)),
        timestampAtEnd: dateToTimestamp(new Date(2023, 8, 18, 9, 15)),
        routeDescription: 'Salo - Helsinki',
        odometerAtBegin: 125052,
        odometerAtEnd: 125118,
    },
    {
        id: newId(),
        vehicleId: 'car2',
        description: 'Visiitti Ahvenanmaalle',
        timestampAtBegin: dateToTimestamp(new Date(2023, 8, 15, 10, 45)),
        timestampAtEnd: dateToTimestamp(new Date(2023, 8, 15, 22, 35)),
        routeDescription: 'Tampere - Turku - Laiva - Ahvenanmaa',
        odometerAtBegin: 125130,
        odometerAtEnd: 125445,
    },
];

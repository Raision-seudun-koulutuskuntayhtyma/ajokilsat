import {Trip} from '../types/Trip';
import {loadJsonFile, overwriteJsonFile} from './jsonFiles';
import {newId} from './newId';
import {dateToTimestamp} from './time';

const TRIPS_FILE = 'ajokilsat.json';

let savedTrips: Trip[] | null = null;

export async function loadTrips(reload: boolean = false): Promise<Trip[]> {
    if (savedTrips === null || reload) {
        savedTrips = await loadJsonFile(TRIPS_FILE);
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

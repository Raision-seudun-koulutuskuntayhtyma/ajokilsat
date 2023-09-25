import {Trip} from '../types/Trip';
import {loadJsonFile, overwriteJsonFile} from './jsonFiles';
import {newId} from './newId';

const TRIPS_FILE = 'ajokilsat.json';

let savedTrips: Trip[] | null = null;

export async function loadTrips(reload: boolean = false): Promise<Trip[]> {
    if (savedTrips === null || reload) {
        savedTrips = await loadJsonFile(TRIPS_FILE);
    }

    return savedTrips ?? exampleTrips;
}

export async function saveTrip(trip: Trip): Promise<void> {
    const trips = await loadTrips();

    const index = trips.findIndex((x) => x.id === trip.id);
    if (index < 0) {
        // Ei löytynyt id:llä => Uusi matka
        trips.unshift(trip); // Lisätään annettu trip listan trips alkuun
    } else {
        trips[index] = trip; // Päivitetään ko. indexissä olevaa trippiä
    }

    // Järjestä tripit aloitusajan tai id:n mukaan
    trips.sort((tripA: Trip, tripB: Trip) => {
        const a = tripA.timestampAtBegin ?? null;
        const b = tripB.timestampAtBegin ?? null;
        if (a == b) {
            // Vertaile id:n perusteella, jos timestampit ovat samat
            // tai puuttuvat molemmista
            const aId = tripA.id;
            const bId = tripB.id;
            return aId > bId ? -1 : aId == bId ? 0 : 1;
        }
        return a > b ? -1 : 1;
    });
    await saveTripsToFile(trips);
}

export async function deleteTrip({id}: {id: string}): Promise<void> {
    const trips = await loadTrips();
    const index = trips.findIndex((x) => x.id === id);
    if (index < 0) {
        throw new Error(`Matkaa id:llä ${id} ei löydy`);
    }
    trips.splice(index, 1); // Poista 1 alkio kohdasta index
    await saveTripsToFile(trips);
}

async function saveTripsToFile(trips: Trip[]) {
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
        timestampAtBegin: new Date(2023, 8, 18, 8, 15),
        timestampAtEnd: new Date(2023, 8, 18, 9, 15),
        routeDescription: 'Salo - Helsinki',
        odometerAtBegin: 125052,
        odometerAtEnd: 125118,
    },
    {
        id: newId(),
        vehicleId: 'car2',
        description: 'Visiitti Ahvenanmaalle',
        timestampAtBegin: new Date(2023, 8, 15, 10, 45),
        timestampAtEnd: new Date(2023, 8, 15, 22, 35),
        routeDescription: 'Tampere - Turku - Laiva - Ahvenanmaa',
        odometerAtBegin: 125130,
        odometerAtEnd: 125445,
    },
];

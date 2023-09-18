import {Trip} from '../types/Trip';
import {newId} from './newId';

export function loadTrips(): Trip[] {
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

    // Pakota trips muuttuja vaihtumaan niin, että React huomaa sen
    // muuttuneen.
    trips = [...trips];

    return trips;
}

export function saveTrip(trip: Trip): void {
    const index = trips.findIndex((x) => x.id === trip.id);
    if (index < 0) {
        // Ei löytynyt id:llä => Uusi matka
        trips.unshift(trip); // Lisätään annettu trip listan trips alkuun
    } else {
        trips[index] = trip; // Päivitetään ko. indexissä olevaa trippiä
    }
}

export function deleteTrip({id}: {id: string}): void {
    const index = trips.findIndex((x) => x.id === id);
    if (index < 0) {
        throw new Error(`Matkaa id:llä ${id} ei löydy`);
    }
    trips.splice(index, 1); // Poista 1 alkio kohdasta index
}

let trips: Trip[] = [
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
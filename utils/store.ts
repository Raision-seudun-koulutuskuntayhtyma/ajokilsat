import {Trip} from '../types/Trip';
import {newId} from './newId';

export function loadTrips(): Trip[] {
    trips.sort((a: Trip, b: Trip) => {
        return a.id > b.id ? -1 : a.id == b.id ? 0 : 1;
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
        trips.push(trip); // Lisätään annettu trip listan trips loppuun
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
        description: 'Käynti Devin Testisen luona',
    },
    {
        id: newId(),
        vehicleId: 'car1',
        description: 'Käynti Dan Testisen luona',
    },
];

let extraTrips = [
    {
        id: newId(),
        vehicleId: 'car1',
        description: 'Käynti Dominic Testisen luona',
    },
    {
        id: newId(),
        vehicleId: 'car1',
        description: 'Käynti Jackson Testisen luona',
    },
    {
        id: newId(),
        vehicleId: 'car1',
        description: 'Käynti James Testisen luona',
    },
    {
        id: newId(),
        vehicleId: 'car1',
        description: 'Käynti Joel Testisen luona',
    },
    {
        id: newId(),
        vehicleId: 'car1',
        description: 'Käynti John Testisen luona',
    },
    {
        id: newId(),
        vehicleId: 'car1',
        description: 'Käynti Jillian Testisen luona',
    },
    {
        id: newId(),
        vehicleId: 'car1',
        description: 'Käynti Jimmy Testisen luona',
    },
    {
        id: newId(),
        vehicleId: 'car1',
        description: 'Käynti Julie Testisen luona',
    },
    {
        id: newId(),
        vehicleId: 'car1',
        description: 'Käynti Kalle Testisen luona',
    },
    {
        id: newId(),
        vehicleId: 'car1',
        description: 'Käynti Laura Testisen luona',
    },
    {
        id: newId(),
        vehicleId: 'car1',
        description: 'Käynti Matti Testisen luona',
    },
    {
        id: newId(),
        vehicleId: 'car1',
        description: 'Käynti Noora Testisen luona',
    },
    {
        id: newId(),
        vehicleId: 'car1',
        description: 'Käynti Olli Testisen luona',
    },
    {
        id: newId(),
        vehicleId: 'car1',
        description: 'Käynti Petra Testisen luona',
    },
    {
        id: newId(),
        vehicleId: 'car1',
        description: 'Käynti Devin Kokeilijan luona',
    },
    {
        id: newId(),
        vehicleId: 'car1',
        description: 'Käynti Dan Kokeilijan luona',
    },
    {
        id: newId(),
        vehicleId: 'car1',
        description: 'Käynti Dominic Kokeilijan luona',
    },
    {
        id: newId(),
        vehicleId: 'car1',
        description: 'Käynti Jackson Kokeilijan luona',
    },
    {
        id: newId(),
        vehicleId: 'car1',
        description: 'Käynti James Kokeilijan luona',
    },
    {
        id: newId(),
        vehicleId: 'car1',
        description: 'Käynti Joel Kokeilijan luona',
    },
    {
        id: newId(),
        vehicleId: 'car1',
        description: 'Käynti John Kokeilijan luona',
    },
    {
        id: newId(),
        vehicleId: 'car1',
        description: 'Käynti Jillian Kokeilijan luona',
    },
    {
        id: newId(),
        vehicleId: 'car1',
        description: 'Käynti Jimmy Kokeilijan luona',
    },
    {
        id: newId(),
        vehicleId: 'car1',
        description: 'Käynti Julie Kokeilijan luona',
    },
    {
        id: newId(),
        vehicleId: 'car1',
        description: 'Käynti Kalle Kokeilijan luona',
    },
    {
        id: newId(),
        vehicleId: 'car1',
        description: 'Käynti Laura Kokeilijan luona',
    },
    {
        id: newId(),
        vehicleId: 'car1',
        description: 'Käynti Matti Kokeilijan luona',
    },
    {
        id: newId(),
        vehicleId: 'car1',
        description: 'Käynti Noora Kokeilijan luona',
    },
    {
        id: newId(),
        vehicleId: 'car1',
        description: 'Käynti Olli Kokeilijan luona',
    },
    {
        id: newId(),
        vehicleId: 'car1',
        description: 'Käynti Petra Kokeilijan luona',
    },
];

import {useState} from 'react';
import {Trip} from '../types/Trip';
import {saveTrip} from '../utils/store';
import NewTripForm from './NewTripForm';
import { ScrollView } from 'react-native';

type Props = {
    onStarted?: (trip: Trip) => void;
};

export default function NewTripCreator({onStarted}: Props) {
    const [latestTripId, setLatestTripId] = useState<string | null>(null);

    return (
        <ScrollView>
            <NewTripForm
                key={latestTripId ?? ''}  // Vaihda Form aina kun tallennetaan
                onSubmit={(trip: Trip) => {
                    saveTrip(trip);
                    setLatestTripId(trip.id);
                    onStarted?.(trip);
                }}
            />
        </ScrollView>
    );
}

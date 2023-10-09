import {useState} from 'react';
import {ScrollView} from 'react-native';

import {useDispatch} from '../hooks';
import {addOrUpdateTrip} from '../store/slices/trips';
import {Trip} from '../types/Trip';
import NewTripForm from './NewTripForm';

type Props = {
    onSubmit?: (trip: Trip) => void;
};

export default function NewTripCreator({onSubmit}: Props) {
    const [latestTripId, setLatestTripId] = useState<string | null>(null);
    const dispatch = useDispatch();

    return (
        <ScrollView>
            <NewTripForm
                key={latestTripId ?? ''} // Vaihda Form aina kun tallennetaan
                onSubmit={async (trip: Trip) => {
                    dispatch(addOrUpdateTrip(trip));
                    setLatestTripId(trip.id);
                    onSubmit?.(trip);
                }}
            />
        </ScrollView>
    );
}

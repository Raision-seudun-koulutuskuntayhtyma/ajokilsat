import {ScrollView} from 'react-native';
import {Text} from 'react-native-paper';
import {getTrip, loadTrips} from '../utils/store';
import {useEffect, useState} from 'react';
import {Trip} from '../types/Trip';

type Props = {
    route?: {params?: {tripId?: string}};
};

export default function OnTrip({route}: Props) {
    const [trip, setTrip] = useState<Trip | null>(null);
    const tripId = route?.params?.tripId;

    useEffect(() => {
        if (tripId) {
            getTrip(tripId).then((x) => setTrip(x));
        } else {
            setTrip(null);
        }
    }, [tripId]);

    return (
        <ScrollView>
            <Text>Matkalla {JSON.stringify(trip)}</Text>
        </ScrollView>
    );
}

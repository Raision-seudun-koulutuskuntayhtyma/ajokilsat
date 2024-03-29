import Ionicons from '@expo/vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {useState} from 'react';
import {ActivityIndicator, Button, Text} from 'react-native-paper';

import {useDispatch, useSelector} from '../hooks';
import {
    TripsState,
    addOrUpdateTrip,
    loadTrips,
    removeTrip,
} from '../store/slices/trips';
import {Trip} from '../types/Trip';
import NewTripCreator from './NewTripCreator';
import TripList from './TripList';
import {View} from 'react-native';

const Nav = createBottomTabNavigator();

const tabIcons = {
    trips: ['ios-list-circle', 'ios-list-circle-outline'],
    newTrip: ['ios-car', 'ios-car-outline'],
};

const getScreenOptions = ({route}) => ({
    tabBarIcon: ({focused, color, size}) => (
        <Ionicons
            name={tabIcons[route.name][focused ? 0 : 1]}
            size={size}
            color={color}
        />
    ),
    tabBarActiveTintColor: 'tomato',
    tabBarInactiveTintColor: 'gray',
    headerShown: true,
});

export default function Main() {
    const {
        list: trips,
        status: tripsStatus,
        error: tripsError,
    } = useSelector((state) => state.trips);
    const dispatch = useDispatch();

    const [shownTripId, setShownTripId] = useState<string | null>(null);

    async function reloadTrips() {
        dispatch(loadTrips());
    }

    React.useEffect(() => {
        reloadTrips();
    }, []);

    function TripListScreen() {
        if (tripsStatus == 'loading') return <ActivityIndicator />;
        if (tripsStatus == 'failed')
            return (
                <View>
                    <Text>{`Virhe ladattaessa matkoja: ${tripsError?.message}`}</Text>
                    <Button onPress={reloadTrips}>Yritä uudelleen</Button>
                </View>
            );
        return (
            <TripList
                shownTripId={shownTripId}
                trips={trips}
                onTripClick={(trip: Trip) => setShownTripId(trip.id)}
                onDismiss={() => setShownTripId(null)}
                onSave={async (trip: Trip) => {
                    setShownTripId(null);
                    dispatch(addOrUpdateTrip(trip));
                }}
                onDelete={async (trip: Trip) => {
                    setShownTripId(null);
                    dispatch(removeTrip(trip));
                }}
            />
        );
    }

    function NewTripScreen({navigation}) {
        return (
            <NewTripCreator
                onSubmit={async (trip: Trip) => {
                    setShownTripId(trip.id);
                    navigation.navigate('trips');
                }}
            />
        );
    }

    return (
        <NavigationContainer>
            <Nav.Navigator screenOptions={getScreenOptions}>
                <Nav.Screen
                    name="trips"
                    component={TripListScreen}
                    options={{title: 'Matkat'}}
                />
                <Nav.Screen
                    name="newTrip"
                    component={NewTripScreen}
                    options={{title: 'Uusi matka'}}
                />
            </Nav.Navigator>
        </NavigationContainer>
    );
}

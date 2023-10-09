import Ionicons from '@expo/vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {useState} from 'react';

import {Trip} from '../types/Trip';
import {deleteTrip, loadTrips, saveTrip} from '../utils/store';
import NewTripCreator from './NewTripCreator';
import OnTrip from './OnTrip';
import TripList from './TripList';

const Nav = createBottomTabNavigator();

const tabIcons = {
    trips: ['ios-list-circle', 'ios-list-circle-outline'],
    newTrip: ['ios-car', 'ios-car-outline'],
    onTrip: ['ios-car', 'ios-car-outline'],
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
    const [trips, setTrips] = useState<Trip[]>([]);
    const [shownTripId, setShownTripId] = useState<string | null>(null);

    async function reloadTrips() {
        const newTrips = await loadTrips();
        setTrips(newTrips);
    }

    React.useEffect(() => {
        reloadTrips();
    }, []);

    function TripListScreen() {
        return (
            <TripList
                shownTripId={shownTripId}
                trips={trips}
                onTripClick={(trip: Trip) => setShownTripId(trip.id)}
                onDismiss={() => setShownTripId(null)}
                onSave={async (trip: Trip) => {
                    setShownTripId(null);
                    await saveTrip(trip);
                    await reloadTrips();
                }}
                onDelete={async (trip: Trip) => {
                    setShownTripId(null);
                    await deleteTrip(trip);
                    await reloadTrips();
                }}
            />
        );
    }

    function NewTripScreen({navigation}) {
        return (
            <NewTripCreator
                onSubmit={async (trip: Trip) => {
                    await reloadTrips();
                    setShownTripId(trip.id);
                    navigation.navigate('trips');
                }}
            />
        );
    }

    function OnTripScreen({navigation, route}) {
        return (
            <OnTrip
                route={route}
                onSave={async (trip: Trip) => {
                    reloadTrips();
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
                <Nav.Screen
                    name="onTrip"
                    component={OnTripScreen}
                    options={{title: 'Matkalla...'}}
                />
            </Nav.Navigator>
        </NavigationContainer>
    );
}

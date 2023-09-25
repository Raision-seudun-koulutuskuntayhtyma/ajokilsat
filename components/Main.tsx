import Ionicons from '@expo/vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';

import {Trip} from '../types/Trip';
import {deleteTrip, loadTrips, saveTrip} from '../utils/store';
import NewTripCreator from './NewTripCreator';
import TripList from './TripList';

const Nav = createBottomTabNavigator();

const tabIcons = {
    home: ['ios-home', 'ios-home-outline'],
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

export function Main() {
    const [trips, setTrips] = React.useState<Trip[]>([]);

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
                trips={trips}
                saveTrip={async (trip: Trip) => {
                    await saveTrip(trip);
                    await reloadTrips();
                }}
                deleteTrip={async (trip: Trip) => {
                    await deleteTrip(trip);
                    await reloadTrips();
                }}
            />
        );
    }

    function NewTripScreen({navigation}) {
        return (
            <NewTripCreator
                onSubmit={async () => {
                    await reloadTrips();
                    navigation.navigate('home');
                }}
            />
        );
    }

    return (
        <NavigationContainer>
            <Nav.Navigator screenOptions={getScreenOptions}>
                <Nav.Screen
                    name="home"
                    component={TripListScreen}
                    options={{title: 'Aloitusruutu'}}
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

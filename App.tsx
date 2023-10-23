import moment from 'moment';
import 'moment/locale/fi';
import * as React from 'react';
import {
    ActivityIndicator,
    MD3LightTheme as DefaultTheme,
    PaperProvider,
} from 'react-native-paper';
import * as ReactRedux from 'react-redux';

import Main from './components/Main';
import SettingsScreen from './components/SettingsScreen';
import store from './store';
import {hasSaveDirPermission} from './utils/jsonFiles';

// Muotoile päivämäärät ja kellonajat Momentilla suomalaisessa muodossa
moment.locale('fi');

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#f080a0',
        secondary: '#f5f850',
    },
};

export default function App() {
    const [settingsOk, setSettingsOk] = React.useState<boolean | null>(null);

    async function updateSettingsOk() {
        const hasPermission = await hasSaveDirPermission();
        setSettingsOk(hasPermission);
    }

    React.useEffect(() => {
        updateSettingsOk();
    }, []);

    return (
        <ReactRedux.Provider store={store}>
            <PaperProvider theme={theme}>
                {settingsOk == null ? (
                    <ActivityIndicator />
                ) : !settingsOk ? (
                    <SettingsScreen onChange={updateSettingsOk} />
                ) : (
                    <Main />
                )}
            </PaperProvider>
        </ReactRedux.Provider>
    );
}

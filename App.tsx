import * as React from 'react';
import {
    ActivityIndicator,
    MD3LightTheme as DefaultTheme,
    PaperProvider,
} from 'react-native-paper';

import Main from './components/Main';
import SettingsScreen from './components/SettingsScreen';
import {hasSaveDirPermission} from './utils/jsonFiles';

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
        <PaperProvider theme={theme}>
            {settingsOk == null ? (
                <ActivityIndicator />
            ) : !settingsOk ? (
                <SettingsScreen onChange={updateSettingsOk} />
            ) : (
                <Main />
            )}
        </PaperProvider>
    );
}

import * as React from 'react';
import {
    MD3LightTheme as DefaultTheme,
    PaperProvider,
} from 'react-native-paper';

import {Main} from './components/Main';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#f080a0',
        secondary: '#f5f850',
    },
};

export default function App() {
    return (
        <PaperProvider theme={theme}>
            <Main />
        </PaperProvider>
    );
}

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { COLORS } from '@/theme';
import { AppStoreProvider } from '../providers/app-provider';
import { NetworkProvider } from '../providers/network-provider';
import { PopupsProvider } from '../providers/popups-provider';
import { navigationRef } from './Navigator';
import RootStack from './RootStack';

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: COLORS.GRAY_3
    }
};

const App = () => {
    return (
        <AppStoreProvider>
            <NetworkProvider>
                <PopupsProvider>
                    <NavigationContainer ref={navigationRef}
                        theme={MyTheme}>
                        <RootStack />
                    </NavigationContainer>
                </PopupsProvider>
            </NetworkProvider>
        </AppStoreProvider>
    );
};

export default App;

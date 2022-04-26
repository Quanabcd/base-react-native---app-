import { observer } from 'mobx-react';
import React, { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { HeaderBar } from '@/components';
import ImgLogo from '@/assets/images/img_logo.svg';
import { SCREEN_WIDTH } from '@/utils/DimensionUtils';
import Navigator from '@/routers/Navigator';
import ScreenNames from '@/commons/ScreenNames';
import SessionManager from '@/managers/SessionManager';
import { COLORS } from '@/theme';

const Splash = observer(() => {

    useEffect(() => {
        nextScreen();
    }, []);

    const nextScreen = useCallback(async () => {
        setTimeout(async () => {
            if (SessionManager.isSkipOnboarding) {
                Navigator.replaceScreen(ScreenNames.tabs);
            } else {
                Navigator.replaceScreen(ScreenNames.onboarding);
            }
        }, 2e3);
    }, []);

    return (
        <View style={styles.container}>
            <HeaderBar
                noHeader
                barStyle />

            <ImgLogo
                style={styles.imgLogo}
            />
        </View>
    );
});

export default Splash;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: COLORS.WHITE
    },
    imgLogo: {
        width: SCREEN_WIDTH - 100,
        alignSelf: 'center',
        marginBottom: 100
    }
});

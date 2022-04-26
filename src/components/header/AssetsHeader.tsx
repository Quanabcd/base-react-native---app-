import React, { useCallback, useMemo } from 'react';
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';

import IcBack from '@/assets/images/ic_back.svg';
import ImgHeader from '@/assets/images/img_header.svg';
import { Configs, PADDING_TOP, STATUSBAR_HEIGHT } from '@/commons/Configs';
import Navigator from '@/routers/Navigator';
import { COLORS, Styles } from '@/theme';
import { SCREEN_WIDTH } from '@/utils/DimensionUtils';
import { Touchable } from '../elements/touchable';
import { HeaderProps } from './types';
import Languages from '@/commons/Languages';

const IMG_HEADER_HEIGHT = SCREEN_WIDTH / 414 * 84;

export const AssetsHeader = ({
    onBackPressed,
    onGoBack,
    title,
    price,
    hasBack,
    noHeader,
    noStatusBar,
    opacity = 1,
    exitApp }: HeaderProps) => {

    const _onBackPressed = useCallback(() => {
        if (!exitApp) {
            if (hasBack && onBackPressed) {
                onBackPressed();
            }
            else if (onGoBack) {
                onGoBack();
            } else {
                Navigator.goBack();
            }
            return true;
        }
        return false;
    }, [exitApp, hasBack, onBackPressed, onGoBack]);

    const renderBack = useMemo(() => (
        <Touchable style={styles.goBack} onPress={_onBackPressed}
            size={40}>
            <IcBack
                width={24}
                height={16} />
        </Touchable>
    ), [_onBackPressed]);

    const renderTitle = useMemo(() => (
        <View style={styles.titleContainer}>
            <Text
                numberOfLines={1}
                style={styles.titleCenter}>
                {title?.toLocaleUpperCase()}
            </Text>
        </View>
    ), [title]);

    const renderPrice = useMemo(() => (
        <View style={styles.priceContainer}>
            <Text
                style={styles.price}>
                {price}
            </Text>

            <Text style={styles.unit}>
                {Languages.common.currency}
            </Text>
        </View>
    ), [price]);

    const headerStyle = useMemo(() => (
        { height: noHeader ? 0 : IMG_HEADER_HEIGHT, zIndex: 100 }
    ), [noHeader]);

    const styleTitle = useMemo(() => {
        return {
            opacity: new Animated.Value(1 - (opacity || 0))
        };
    }, [opacity]);

    const stylePrice = useMemo(() => {
        return {
            opacity: new Animated.Value(opacity)
        };
    }, [opacity]);

    return (
        <View style={headerStyle}>
            {!noHeader && <ImgHeader
                style={styles.imageBg}
                width={SCREEN_WIDTH}
                height={IMG_HEADER_HEIGHT} />}

            {(noStatusBar && Platform.OS === 'ios') ? null
                : <StatusBar
                    translucent
                    backgroundColor={'transparent'}
                    barStyle={'light-content'} />}
            {!noHeader && <View style={styles.headerContainer}>
                <Animated.View style={styleTitle}>
                    {renderTitle}
                </Animated.View>
                <Animated.View style={stylePrice}>
                    {renderPrice}
                </Animated.View>
                <View style={styles.btnContainer}>
                    {(!exitApp || hasBack) && renderBack}
                </View>
            </View>}
        </View >
    );
};

export default AssetsHeader;

const styles = StyleSheet.create({
    imageBg: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        backgroundColor: COLORS.RED_2
    },
    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: STATUSBAR_HEIGHT + PADDING_TOP
    },
    goBack: {
        justifyContent: 'center'
    },
    btnContainer: {
        flex: 1,
        position: 'absolute',
        right: 0,
        left: 0
    },
    titleContainer: {
        position: 'absolute',
        left: 0,
        width: SCREEN_WIDTH,
        bottom: -10
    },
    titleCenter: {
        ...Styles.typography.medium,
        fontSize: Configs.FontSize.size17,
        textAlign: 'center',
        color: COLORS.WHITE
    },
    priceContainer: {
        position: 'absolute',
        left: 0,
        width: SCREEN_WIDTH,
        bottom: -10,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'flex-end'
    },
    price: {
        ...Styles.typography.bold,
        fontSize: Configs.FontSize.size18,
        color: COLORS.WHITE
    },
    unit: {
        ...Styles.typography.medium,
        fontSize: Configs.FontSize.size12,
        margin: 2,
        paddingTop: 1,
        color: COLORS.WHITE
    }
});

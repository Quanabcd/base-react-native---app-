import React, { useCallback, useEffect, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Dash from 'react-native-dash';

import IcConvert from '@/assets/images/ic_convert.svg';
import IcFlow from '@/assets/images/ic_flow.svg';
import IcWithdraw from '@/assets/images/ic_money.svg';
import IcPlus from '@/assets/images/ic_plus.svg';
import { Configs } from '@/commons/Configs';
import Languages from '@/commons/Languages';
import ScreenNames from '@/commons/ScreenNames';
import { Touchable } from '@/components';
import Navigator from '@/routers/Navigator';
import { COLORS, Styles } from '@/theme';
import { SCREEN_WIDTH } from '@/utils/DimensionUtils';

const Card = ({ hasButtons, title, money, content: renderContent }:
     { hasButtons?: boolean, title: string, money: string, content: any }) => {

    useEffect(() => {

    }, []);

    const gotoScreen = useCallback((screen: string) => {
        Navigator.pushScreen(screen);
    }, []);

    const renderCard = useMemo(() => {
        return <View style={styles.cardContainer}>
            <View style={styles.circleContainer}>
                <View style={styles.circle1} />
                <View style={styles.circle2} />
            </View>
            <Text style={styles.header}>
                {title}
            </Text>
            <Text style={styles.money}>
                {money}
            </Text>

            {renderContent}

        </View>;
    }, [money, renderContent, title]);

    const renderButton = useCallback((label: string, icon: any, screen: any) => {

        const _onPress = () => {
            gotoScreen(screen);
        };

        return <Touchable style={styles.button}
            onPress={_onPress}>
            {icon}
            <Text style={Styles.typography.regular}>
                {label}
            </Text>
        </Touchable>;
    }, [gotoScreen]);

    const renderButtons = useMemo(() => {
        return <View style={styles.btnContainer}>
            {renderButton(Languages.assets.topUpMore, <IcPlus />, ScreenNames.topUp)}
            {renderButton(Languages.assets.convert, <IcConvert />, ScreenNames.convertScreen)}
            {renderButton(Languages.assets.withdraw, <IcWithdraw />, ScreenNames.topUp)}
            {renderButton(Languages.assets.flow, <IcFlow />, ScreenNames.cashFlow)}
        </View>;
    }, [renderButton]);

    return <>
        {renderCard}

        {hasButtons && <>
            {renderButtons}

            <Dash
                style={styles.dash}
                dashThickness={1}
                dashLength={18}
                dashGap={5}
                dashColor={COLORS.GRAY_1} />
        </>}
    </>;
};

export default Card;

const RADIUS_CIRCLE = SCREEN_WIDTH / 5 * 4;

const styles = StyleSheet.create({
    cardContainer: {
        ...Styles.shadow,
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginHorizontal: 15,
        marginTop: 25,
        borderRadius: 10
    },
    circleContainer: {
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        borderRadius: 10
    },
    circle1: {
        position: 'absolute',
        right: -RADIUS_CIRCLE / 2,
        top: -20,
        width: RADIUS_CIRCLE,
        height: RADIUS_CIRCLE,
        borderRadius: RADIUS_CIRCLE / 2,
        backgroundColor: COLORS.PINK
    },
    circle2: {
        position: 'absolute',
        bottom: -RADIUS_CIRCLE / 1.5,
        left: 5,
        width: RADIUS_CIRCLE,
        height: RADIUS_CIRCLE,
        borderRadius: RADIUS_CIRCLE / 2,
        backgroundColor: COLORS.PINK
    },
    header: {
        ...Styles.typography.bold,
        fontSize: Configs.FontSize.size18,
        textAlign: 'center'
    },
    money: {
        ...Styles.typography.bold,
        fontSize: Configs.FontSize.size28,
        color: COLORS.RED_3,
        textAlign: 'center',
        marginBottom: 10
    },
    btnContainer: {
        flexDirection: 'row',
        marginVertical: 10,
        marginHorizontal: 10
    },
    button: {
        flex: 1,
        borderWidth: 1,
        borderColor: COLORS.GRAY_1,
        backgroundColor: COLORS.GRAY_10,
        alignItems: 'center',
        marginHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 5
    },
    dash: {
        marginTop: 15,
        marginBottom: 5,
        marginHorizontal: 15
    }
});

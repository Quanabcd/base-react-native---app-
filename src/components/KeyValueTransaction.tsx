import React from 'react';
import {
    StyleSheet, Text, View
} from 'react-native';
import Dash from 'react-native-dash';

import { Configs } from '@/commons/Configs';
import { COLORS, Styles } from '@/theme';
import Languages from '@/commons/Languages';
import { Touchable } from '.';

const KeyValueTransaction = ({ label, value, status, onPress }:
    { label: string, value: string, status?: number, onPress?: () => any }) => {

    const color = status === 1 ? COLORS.GREEN : status === -1 ? COLORS.RED : COLORS.BLACK;

    return (
        <Touchable onPress={onPress}>
            <View style={styles.row}>
                <Text style={styles.key}>
                    {label}
                </Text>
                <View style={styles.rowEnd}>
                    <Text style={[styles.smallMoney, { color }]}>
                        {`${status === -1 ? '-' : ''}${value}`}
                    </Text>
                    <Text style={styles.unit}>
                        {Languages.common.currency}
                    </Text>
                </View>
            </View>
            <Dash
                style={styles.dash}
                dashThickness={1}
                dashLength={10}
                dashGap={5}
                dashColor={COLORS.GRAY_1} />

        </Touchable>
    );
};

export default KeyValueTransaction;

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        marginTop: 12
    },
    rowEnd: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingBottom: 5
    },
    key: {
        ...Styles.typography.regular,
        color: COLORS.GRAY_6
    },
    smallMoney: {
        ...Styles.typography.bold,
        fontSize: Configs.FontSize.size16
    },
    unit: {
        ...Styles.typography.regular,
        fontSize: Configs.FontSize.size12,
        marginTop: 3,
        marginLeft: 2
    },
    dash: {
        marginRight: 8
    }
});

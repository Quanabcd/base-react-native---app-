import React from 'react';
import {
    StyleSheet, Text, View
} from 'react-native';
import Dash from 'react-native-dash';

import { Configs } from '@/commons/Configs';
import { COLORS, Styles } from '@/theme';
import Languages from '@/commons/Languages';

const KeyValueRating = ({ label, value, color, hasUnit }:
    { label: string, value: string, color: string, hasUnit?: boolean }) => {

    return (
        <View>
            <View style={styles.row}>
                <Text style={styles.key}>
                    {label}
                </Text>
                <View style={styles.rowEnd}>
                    <Text style={[styles.smallMoney, { color }]}>
                        {value}
                    </Text>
                    {hasUnit && <Text style={styles.unit}>
                        {Languages.common.currency}
                    </Text>}
                </View>
            </View>
            <Dash
                style={styles.dash}
                dashThickness={1}
                dashLength={10}
                dashGap={5}
                dashColor={COLORS.GRAY_1} />
        </View>
    );
};

export default KeyValueRating;

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
        margin: 2
    },
    dash: {
        marginRight: 8
    }
});

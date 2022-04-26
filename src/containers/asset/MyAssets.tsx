import { observer } from 'mobx-react';
import React, { useCallback, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import IcUnlimited from '@/assets/images/ic_unlimited.svg';
import IcPeriod from '@/assets/images/ic_period.svg';
import { Configs } from '@/commons/Configs';
import Languages from '@/commons/Languages';
import ScreenNames from '@/commons/ScreenNames';
import { Touchable } from '@/components';
import KeyValueAsset from '@/components/KeyValueAsset';
import { AccumulationModel } from '@/models/accumulation';
import Navigator from '@/routers/Navigator';
import { COLORS, Styles } from '@/theme';
import { ACCUMULATIONS } from '../mocks/data';

const MyAssets = observer(() => {
    useEffect(() => {

    }, []);

    const renderDetailSection = useCallback((label: string, value: string, color: string) => {
        return <KeyValueAsset
            style={styles.detailContent}
            {...{ label, value, color }} />;
    }, []);

    const renderSection = useCallback((label: string, value: string, color: string, unit?: string) => {
        return <View style={styles.detailSection}>
            <View>
                <Text style={styles.sectionTxt}>
                    {label}
                </Text>
                <Text style={styles.sectionSmallTxt}>
                    {'Lãi suất 15% / năm'}
                </Text>
            </View>
            <View style={styles.rowEnd}>
                <Text style={[styles.smallMoney, { color }]}>
                    {value}
                </Text>
                {unit && <Text style={styles.unit}>
                    {unit}
                </Text>}
            </View>
        </View>;
    }, []);

    const renderAccumulatedAssets = useCallback((item: AccumulationModel) => {

        const onPress = () => {
            Navigator.pushScreen(ScreenNames.packageDetail, item);
        };

        return <Touchable style={styles.sectionContainer}
            onPress={onPress}>
            <View style={styles.row}>
                {item.period === 0 ? <IcUnlimited width={35} height={35} /> :
                    <View style={styles.txtIconContainer}>
                        <IcPeriod width={35} height={35} style={styles.icPeriod} />
                        <Text style={styles.txtIcon}>
                            {item.period}
                        </Text>
                    </View>}
                <View style={styles.cardContent}>
                    {renderSection(item.title, '100.000.000', COLORS.GREEN, Languages.common.currency)}
                    {renderDetailSection(Languages.assets.receivedInterest, '100.000.000', COLORS.GREEN)}
                    {renderDetailSection(Languages.assets.receivedTemp, '100.000.000', COLORS.GRAY_6)}
                </View>
            </View>
        </Touchable>;
    }, [renderDetailSection, renderSection]);

    return (
        <View style={styles.container}>
            {ACCUMULATIONS.map(item => {
                return renderAccumulatedAssets(item);
            })}
        </View>
    );
});

export default MyAssets;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    sectionContainer: {
        ...Styles.shadow,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginHorizontal: 10,
        marginTop: 10,
        borderRadius: 10
    },
    detailSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5
    },
    detailContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 3
    },
    sectionTxt: {
        ...Styles.typography.bold,
        fontSize: Configs.FontSize.size16
    },
    sectionSmallTxt: {
        ...Styles.typography.regular,
        fontSize: Configs.FontSize.size12
    },
    smallMoney: {
        ...Styles.typography.bold,
        fontSize: Configs.FontSize.size20
    },
    unit: {
        ...Styles.typography.medium,
        fontSize: Configs.FontSize.size12,
        margin: 3
    },
    row: {
        flexDirection: 'row'
    },
    rowEnd: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    cardContent: {
        flex: 1,
        marginLeft: 10
    },
    icPeriod: {
        position:'absolute',
        top:0,
        left:0
    },
    txtIconContainer: {
        width: 35,
        height: 35,
        justifyContent: 'center'
    },
    txtIcon: {
        ...Styles.typography.medium,
        fontSize: Configs.FontSize.size18,
        color: COLORS.RED,
        marginTop: 2,
        textAlign: 'center'
    }
});

import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

import IcHistory from '@/assets/images/ic_history.svg';
import IcTransaction from '@/assets/images/ic_recent_transaction.svg';
import { Configs } from '@/commons/Configs';
import Languages from '@/commons/Languages';
import { Button, HeaderBar } from '@/components';
import KeyValueRating from '@/components/KeyValueRating';
import { COLORS, Styles } from '@/theme';
import { HISTORIES } from '../mocks/data';
import KeyToggleValue from '@/components/KeyToggleValue';


const BookDetail = observer(() => {
    const [isEnabled, setIsEnabled] = useState<boolean>(false);

    const onToggleSwitch = useCallback(() => setIsEnabled(previousState => !previousState), []);

    useEffect(() => {

    }, []);

    const onWithdraw = useCallback(() => {
    }, []);

    const renderDetailSection = useCallback((label: string, value: string) => {
        return <KeyValueRating
            color={COLORS.BLACK}
            {...{ label, value }} />;
    }, []);

    const renderSection = useCallback((label: string) => {
        return <View style={styles.detailSection}>
            <Text style={styles.sectionTxt}>
                {label}
            </Text>
        </View>;
    }, []);

    const renderDetail = useMemo(() => {
        return <View style={styles.sectionContainer}>
            <View style={styles.row}>
                <IcTransaction />
                {renderSection(Languages.assets.bookInfo)}
            </View>

            <View style={styles.cardContent}>
                {renderDetailSection(Languages.assets.bookInfo, '100.000.000')}
                {renderDetailSection(Languages.assets.withdrawAccumulation, '100.000.000')}
                {renderDetailSection(Languages.assets.withdrawAccumulationToAccount, '100.000.000')}
            </View>

            <KeyToggleValue
                label={Languages.assets.autoExpiration}
                onToggleSwitch={onToggleSwitch}
                isEnabled={isEnabled}
            />

            <Button
                label={Languages.assets.withdrawBeforeDate}
                onPress={onWithdraw}
                buttonStyle={'GRAY'}
                fontSize={Configs.FontSize.size14}
                style={styles.withdrawStyle}
            />
        </View>;
    }, [isEnabled, onToggleSwitch, onWithdraw, renderDetailSection, renderSection]);

    const renderHistory = useMemo(() => {
        return <View style={styles.sectionContainer}>
            <View style={styles.row}>
                <IcHistory />
                {renderSection(Languages.assets.history)}
            </View>

            <View style={styles.cardContent}>
                {HISTORIES.map(item => {
                    return renderDetailSection(item.title, item.date);
                })}
            </View>
        </View>;
    }, [renderDetailSection, renderSection]);

    return (
        <>
            <HeaderBar
                title={'STL2017605161'} />

            <ScrollView>
                {renderDetail}
                {renderHistory}
            </ScrollView>
        </>
    );
});

export default BookDetail;

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
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 10
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
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowEnd: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    cardContent: {
        marginLeft: 10
    },
    txtIconContainer: {
        borderRadius: 16,
        width: 32,
        height: 32,
        borderWidth: 1,
        borderColor: COLORS.RED,
        justifyContent: 'center'
    },
    txtIcon: {
        ...Styles.typography.medium,
        fontSize: Configs.FontSize.size20,
        color: COLORS.RED,
        textAlign: 'center'
    },
    withdrawStyle: {
        marginTop: 10,
        height: Configs.FontSize.size35,
        backgroundColor: COLORS.GRAY_1,
        marginHorizontal: 5
    }
});

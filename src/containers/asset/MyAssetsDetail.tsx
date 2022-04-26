import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import IcTransaction from '@/assets/images/ic_recent_transaction.svg';
import IcWithdraw from '@/assets/images/ic_withdraw.svg';
import IcAccumulated from '@/assets/images/ic_accumulated.svg';
import IcRight from '@/assets/images/ic_right.svg';
import { Configs } from '@/commons/Configs';
import Languages from '@/commons/Languages';
import { Touchable } from '@/components';
import KeyValueTransaction from '@/components/KeyValueTransaction';
import { AccumulationModel } from '@/models/accumulation';
import { COLORS, Styles } from '@/theme';
import Navigator from '@/routers/Navigator';
import ScreenNames from '@/commons/ScreenNames';

const MyAssetsDetail = observer(({ packageDetail }: { packageDetail: AccumulationModel }) => {
    useEffect(() => {

    }, []);

    const onBookDetail = useCallback(() => {
        Navigator.pushScreen(ScreenNames.bookDetail);
    }, []);

    const renderDetailSection = useCallback((label: string, value: string, status: number) => {
        return <KeyValueTransaction
            onPress={onBookDetail}
            {...{ label, value, status }} />;
    }, [onBookDetail]);

    const renderSection = useCallback((label: string, hasMore?: boolean) => {
        return <View style={styles.detailSection}>
            <Text style={styles.sectionTxt}>
                {label}
            </Text>
            {hasMore && <IcRight width={10} height={10} />}
        </View>;
    }, []);

    const renderBalance = useMemo(() => {
        return <View style={styles.sectionContainer}>
            <View style={styles.row}>
                <IcAccumulated />
                {renderSection(Languages.assets.balance)}
            </View>

            <View style={styles.cardContent}>
                {renderDetailSection('STL2017605161', '100.000.000', 1)}
                {renderDetailSection('STL2017605161', '100.000.000', 1)}
                {renderDetailSection('STL2017605161', '100.000.000', 1)}
            </View>
        </View>;
    }, [renderDetailSection, renderSection]);

    const renderWithdrawn = useMemo(() => {
        return <View style={styles.sectionContainer}>
            <View style={styles.row}>
                <IcWithdraw />
                {renderSection(Languages.assets.withdrawn)}
            </View>

            <View style={styles.cardContent}>
                {renderDetailSection('STL2017605161', '100.000.000', 0)}
                {renderDetailSection('STL2017605161', '100.000.000', 0)}
                {renderDetailSection('STL2017605161', '100.000.000', 0)}
            </View>
        </View>;
    }, [renderDetailSection, renderSection]);

    const renderRecentTransaction = useMemo(() => {
        const onPress = () => {
            Navigator.pushScreen(ScreenNames.transactions);
        };

        return <Touchable style={styles.sectionContainer}
            onPress={onPress}>
            <View style={styles.row}>
                <IcTransaction />
                {renderSection(Languages.assets.recentTransaction, true)}
            </View>

            <View style={styles.cardContent}>
                {renderDetailSection(Languages.assets.topUpAccumulation, '100.000.000', -1)}
                {renderDetailSection(Languages.assets.withdrawAccumulation, '100.000.000', -1)}
                {renderDetailSection(Languages.assets.withdrawAccumulationToAccount, '100.000.000', -1)}
            </View>
        </Touchable>;
    }, [renderDetailSection, renderSection]);

    return (
        <View style={styles.container}>
            {packageDetail.period > 0 && <>
                {renderBalance}
                {renderWithdrawn}
            </>}
            {renderRecentTransaction}
        </View>
    );
});

export default MyAssetsDetail;

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
        flex: 1,
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
    }
});

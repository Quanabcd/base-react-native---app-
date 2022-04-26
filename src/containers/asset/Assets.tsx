import { observer } from 'mobx-react';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';

import { Button, HeaderBar, Touchable } from '@/components';
import Languages from '@/commons/Languages';
import Navigator from '@/routers/Navigator';
import ScreenNames from '@/commons/ScreenNames';
import { COLORS, Styles } from '@/theme';
import { Configs } from '@/commons/Configs';
import { Periods } from '@/commons/constants';
import { KeyValueModel } from '@/models/key-value';
import KeyValue from '@/components/KeyValue';
import IcPackage from '@/assets/images/ic_package.svg';
import FilterTemplate from '@/components/FilterTemplate';
import Card from './Card';

const Assets = observer(() => {
    const [selectedFilter, setSelectedFilter] = useState<number>(0);

    useEffect(() => {

    }, []);

    const onTopUp = useCallback(() => {
        Navigator.pushScreen(ScreenNames.topUp);
    }, []);

    const gotoAccumulatedAssets = useCallback(() => {
        Navigator.pushScreen(ScreenNames.accumulatedAssets);
    }, []);

    const renderCardSection = useCallback((label: string, value: string, color: string, unit?: string) => {
        return <KeyValue
            style={styles.cardSection}
            {...{ label, value, color, unit }} />;
    }, []);

    const renderDetailSection = useCallback((label: string, value: string, color: string, unit?: string) => {
        return <KeyValue
            style={styles.detailSection}
            {...{ label, value, color, unit }} />;
    }, []);

    const renderSection = useCallback((label: string, value: string, color: string, unit?: string) => {
        return <View style={styles.detailSection}>
            <Text style={styles.sectionTxt}>
                {label}
            </Text>
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

    const renderCardContent = useMemo(() => {
        return <>
            {renderCardSection(Languages.assets.growUpByPeriod, '100.000.000', COLORS.GREEN, Languages.common.currency)}
            {renderCardSection(Languages.assets.percentByPeriod, '100.000.000', COLORS.GREEN, Languages.common.percent)}
            {renderCardSection(Languages.assets.unlimited, '100.000.000', COLORS.YELLOW)}

            <Button
                label={Languages.assets.topUp}
                onPress={onTopUp}
                buttonStyle={'RED'}
                textColor={COLORS.RED}
                fontSize={Configs.FontSize.size14}
                style={styles.topUpStyle}
            />
        </>;
    }, [onTopUp, renderCardSection]);

    const renderCard = useMemo(() => {
        return <Card
            title={Languages.assets.totalAssets}
            money='100.000.000 VND'
            content={renderCardContent} />;
    }, [renderCardContent]);

    const renderFilterTemplate = useCallback(({ item }: { item: KeyValueModel }) => {
        let selected = false;
        if (item.value === selectedFilter) {
            selected = true;
        }

        const _onPress = () => {
            setSelectedFilter(item.value);
        };

        return <FilterTemplate
            item={item}
            onPress={_onPress}
            selected={selected}
        />;
    }, [selectedFilter]);

    const keyExtractor = useCallback((item: KeyValueModel) => {
        return `${item.value}`;
    }, []);

    const renderFilter = useMemo(() => {
        return <FlatList
            style={styles.filter}
            data={Periods}
            renderItem={renderFilterTemplate}
            horizontal
            showsHorizontalScrollIndicator={false}
            {...{ keyExtractor }}
        />;
    }, [keyExtractor, renderFilterTemplate]);

    const renderAccumulatedAssets = useMemo(() => {
        return <Touchable style={styles.sectionContainer}
            onPress={gotoAccumulatedAssets}>
            <View style={styles.row}>
                <IcPackage />
                <View style={styles.cardContent}>
                    {renderSection(Languages.assets.accumulatedAssets, '100.000.000', COLORS.GREEN, Languages.common.currency)}
                    {renderDetailSection(Languages.assets.receivedInterest, '100.000.000', COLORS.GREEN, Languages.common.currency)}
                    {renderDetailSection(Languages.assets.receivedTemp, '100.000.000', COLORS.GRAY_6, Languages.common.currency)}
                </View>
            </View>
        </Touchable>;
    }, [gotoAccumulatedAssets, renderDetailSection, renderSection]);

    const renderBond = useMemo(() => {
        return <Touchable style={styles.sectionContainer}>
            <View style={styles.row}>
                <IcPackage />
                <View style={styles.cardContent}>
                    {renderSection(Languages.assets.receivedInterest, '100.000.000', COLORS.GREEN, Languages.common.currency)}
                </View>
            </View>
        </Touchable>;
    }, [renderSection]);

    return (
        <>
            <HeaderBar
                title={Languages.tabs.assets} />

            <ScrollView>
                {renderCard}
                {renderFilter}
                {renderAccumulatedAssets}
                {/* {renderBond} */}
            </ScrollView>
        </>
    );
});

export default Assets;

const styles = StyleSheet.create({
    container: {
    },
    cardSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8
    },
    detailSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 4,
        alignItems: 'center'
    },
    topUpStyle: {
        marginTop: 10,
        height: Configs.FontSize.size35,
        backgroundColor: COLORS.WHITE,
        borderWidth: 1,
        borderColor: COLORS.RED
    },
    filter: {
        marginTop: 20,
        marginBottom: 10
    },
    sectionContainer: {
        ...Styles.shadow,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginHorizontal: 15,
        marginVertical: 10,
        borderRadius: 10
    },
    sectionTxt: {
        ...Styles.typography.bold,
        fontSize: Configs.FontSize.size16
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
    }
});

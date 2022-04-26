import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { ICONS } from '@/assets/icons/constant';
import IcWithdraw from '@/assets/images/ic_withdraw.svg';
import { Configs } from '@/commons/Configs';
import { TransactionTypes } from '@/commons/constants';
import Languages from '@/commons/Languages';
import { MyTextInput } from '@/components/elements/textfield';
import FilterTemplate from '@/components/FilterTemplate';
import KeyValueRating from '@/components/KeyValueRating';
import { KeyValueModel } from '@/models/key-value';
import { COLORS, Styles } from '@/theme';
import { TRANSACTIONS } from '../mocks/data';

const TransactionTabItem = observer(() => {
    const [selectedFilter, setSelectedFilter] = useState<number>(0);
    useEffect(() => {

    }, []);

    const renderFilterTemplate = useCallback((item: KeyValueModel) => {
        let selected = false;
        if (item.value === selectedFilter) {
            selected = true;
        }

        const _onPress = () => {
            setSelectedFilter(item.value);
        };

        return <FilterTemplate
            style={styles.filterItem}
            item={item}
            onPress={_onPress}
            selected={selected}
        />;
    }, [selectedFilter]);

    const renderFilter = useMemo(() => {
        return <View style={styles.filter}>
            {TransactionTypes.map(renderFilterTemplate)}
        </View>;
    }, [renderFilterTemplate]);

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

    const keyTransactionExtractor = useCallback((item) => {
        return `${item.id}`;
    }, []);

    const renderTransactionItem = useCallback(({ item }) => {
        return <View style={styles.sectionContainer}>
            <View style={styles.row}>
                <IcWithdraw />
                {renderSection(item.title)}
            </View>

            <View style={styles.cardContent}>
                {Object.keys(item.data).map(_item => {
                    return renderDetailSection(_item, item.data[_item]);
                })}
            </View>
        </View>;
    }, [renderDetailSection, renderSection]);

    const renderTransactions = useMemo(() => {
        return <FlatList
            data={TRANSACTIONS}
            renderItem={renderTransactionItem}
            keyExtractor={keyTransactionExtractor}
        />;
    }, [keyTransactionExtractor, renderTransactionItem]);

    const onChangeText = useCallback((text) => {
    }, []);

    const renderSearchBar = useMemo(() => {
        return <MyTextInput
            placeHolder={Languages.transaction.filter}
            containerInput={styles.containerStyle}
            inputStyle={styles.inputStyle}
            onChangeText={onChangeText}
            rightIcon={ICONS.SEARCH} />;
    }, [onChangeText]);

    return (
        <>
            <View style={styles.container}>
                {renderSearchBar}
                {renderFilter}
                {renderTransactions}
            </View>
        </>
    );
});

export default TransactionTabItem;

const styles = StyleSheet.create({
    container: {
        paddingBottom: 10
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
    sectionTxt: {
        ...Styles.typography.bold,
        fontSize: Configs.FontSize.size16
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cardContent: {
        marginLeft: 10
    },
    filter: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 15
    },
    filterItem: {
        paddingHorizontal: 5
    },
    containerStyle: {
        height: Configs.FontSize.size45,
        marginTop: 10,
        marginHorizontal: 10
    },
    inputStyle: {
        fontSize: Configs.FontSize.size14
    }
});

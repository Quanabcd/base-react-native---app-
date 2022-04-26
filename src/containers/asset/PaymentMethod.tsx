import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import IcBank from '@/assets/images/ic_bank_circle.svg';
import IcNganLuong from '@/assets/images/ic_nganluong.svg';
import IcVimo from '@/assets/images/ic_vimo_circle.svg';
import { Configs } from '@/commons/Configs';
import Languages from '@/commons/Languages';
import { HeaderBar, Touchable } from '@/components';
import { Styles } from '@/theme';
import Navigator from '@/routers/Navigator';
import ScreenNames from '@/commons/ScreenNames';

const PaymentMethod = observer(({ route }: { route: any }) => {
    const [formName, setFormName]=useState<any>('');
    const money = route.params;

    const gotoScreen = useCallback((screen: any,data?: any) => {
        Navigator.pushScreen(screen,data);
    }, []);

    const renderSection = useCallback((label: string) => {
        return <View style={styles.detailSection}>
            <Text style={styles.sectionTxt}>
                {label}
            </Text>
        </View>;
    }, []);

    const renderBank = useCallback((screen:any, data?:any) => {

        const _onPress = ()=>{
            setFormName(data);
            gotoScreen(screen,{form:data, moneys:money});
        };

        return <Touchable style={styles.sectionContainer} onPress={_onPress}>
            <View style={styles.row} >
                <IcBank />
                {renderSection(Languages.paymentMethod.bank)}
            </View>

            <View style={styles.cardContent}>
                <Text style={styles.desTxt}>
                    {'Lorem Ipsum is simply dummy text of the printing and \nLorem Ipsum is simply dummy text of the printing and \nLorem Ipsum is simply dummy text of the printing and'}
                </Text>
            </View>
        </Touchable>;
    }, [gotoScreen, money, renderSection]);

    const renderVimo = useCallback((screen:any, data?:any) => {
        const _onPress = ()=>{
            setFormName(data);
            gotoScreen(screen,{form:data, moneys:money});
        };
        return <Touchable style={styles.sectionContainer} onPress={_onPress}>
            <View style={styles.row}>
                <IcVimo />
                {renderSection(Languages.paymentMethod.vimo)}
            </View>

            <View style={styles.cardContent}>
                <Text style={styles.desTxt}>
                    {'Lorem Ipsum is simply dummy text of the printing and \nLorem Ipsum is simply dummy text of the printing and \nLorem Ipsum is simply dummy text of the printing and'}
                </Text>
            </View>
        </Touchable>;
    }, [gotoScreen, money, renderSection]);

    const renderNganLuong = useCallback((screen:any, data?:any)=>{
        const _onPress = ()=>{
            setFormName(data);
            gotoScreen(screen,{form:data, moneys:money});
        };
        return <Touchable style={styles.sectionContainer} onPress={_onPress}>
            <View style={styles.row}>
                <IcNganLuong/>
                {renderSection(Languages.paymentMethod.nganLuong)}
            </View>

            <View style={styles.cardContent}>
                <Text style={styles.desTxt}>
                    {'Lorem Ipsum is simply dummy text of the printing and \nLorem Ipsum is simply dummy text of the printing and \nLorem Ipsum is simply dummy text of the printing and'}
                </Text>
            </View>
        </Touchable>;
    }, [gotoScreen, money, renderSection]);

    return (
        <>
            <HeaderBar
                title={Languages.paymentMethod.title} />

            <ScrollView>
                {renderBank(ScreenNames.withDrawFromAccount,Languages.paymentMethod.bankForm)}
                {renderVimo(ScreenNames.withDrawFromAccount,Languages.paymentMethod.vimoForm)}
                {renderNganLuong(ScreenNames.withDrawFromAccount,Languages.paymentMethod.nganLuongForm)}
            </ScrollView>
        </>
    );
});

export default PaymentMethod;

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
    sectionTxt: {
        ...Styles.typography.bold,
        fontSize: Configs.FontSize.size16
    },
    desTxt: {
        ...Styles.typography.regular,
        marginTop: 5
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cardContent: {
        marginLeft: 10
    }
});

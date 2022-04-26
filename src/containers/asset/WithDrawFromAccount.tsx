import { observer } from 'mobx-react';
import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button, HeaderBar } from '@/components';
import Languages from '@/commons/Languages';
import { Styles } from '@/theme';
import { Configs } from '@/commons/Configs';
import KeyValueWithDraw from '@/components/KeyValueWithDraw';
import { BUTTON_STYLES } from '@/components/elements/button/constants';
import Utils from '@/utils/Utils';
import DateUtils from '@/utils/DateUtils';
import SessionManager from '@/managers/SessionManager';

const WithDrawFromAccount = observer(({ route }: { route: any }) => {
    const [userName] = useState<any>(SessionManager.getUserInfo()?.full_name);
    const formData  = useState<any>(route.params);
    const form  = formData[0].form;
    const moneys = formData[0].moneys.money;

    const renderTransaction = useMemo(()=>{

        return(
            <View style={styles.key}>
                <KeyValueWithDraw 
                    label = {Languages.withDrawFromAccount.formOfReceivingMoney}
                    value={form}
                    hasUnit = {false}
                />
                <KeyValueWithDraw 
                    label = {Languages.withDrawFromAccount.beneficiaryName}
                    value={'--'}
                    hasUnit = {false}
                />
                <KeyValueWithDraw 
                    label = {Languages.withDrawFromAccount.receiver}
                    value={ userName || '--'}
                    hasUnit = {false}
                />
                <KeyValueWithDraw 
                    label = {Languages.withDrawFromAccount.account}
                    value={'--'}
                    hasUnit = {false}
                />
                <KeyValueWithDraw 
                    label = {Languages.withDrawFromAccount.moneyWithDraw}
                    value={Utils.formatMoney(moneys)}
                    hasUnit = {true}
                />
                <KeyValueWithDraw 
                    label = {Languages.withDrawFromAccount.date}
                    value={DateUtils.getCurrentDay()}
                    hasUnit = {false}
                />
            </View>
        );
    },[form, moneys, userName]);

    const onPress = useCallback(()=>{
        
    },[]);

    const renderConfirm = useMemo(()=>{
        return(
            <Button label={Languages.withDrawFromAccount.confirm} 
                onPress={onPress}
                buttonStyle={BUTTON_STYLES.RED}
                style={styles.button}
            />
        );
    },[onPress]);

    return(
        <View style={styles.container}>
            <HeaderBar title={Languages.withDrawFromAccount.titleScreen}/>
            <Text style={styles.titleText}>{Languages.withDrawFromAccount.detailTransaction}</Text>
            {renderTransaction}
            {renderConfirm}
        </View>
    );
});

export default WithDrawFromAccount;

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    titleText:{
        ...Styles.typography.medium,
        fontSize: Configs.FontSize.size16,
        textAlign:'center',
        marginTop:20
    },
    key:{
        marginHorizontal:23,
        marginTop:8
    },
    button:{
        marginHorizontal:23,
        marginTop:20
    }
});

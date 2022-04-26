import { observer } from 'mobx-react';
import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { HeaderBar } from '@/components';
import Languages from '@/commons/Languages';
import NganLuongIcon from '@/assets/images/img_ngan_luong.svg';
import ViMoIcon from '@/assets/images/img_vimo.svg';
import BankIcon from '@/assets/images/img_bank.svg';
import DoneIcon from '@/assets/images/ic_done.svg';
import LinkIcon from '@/assets/images/ic_link.svg';
import { COLORS, Styles } from '@/theme';

const LinkAccount = observer(() => {
    const renderItem = useCallback((icon:any,active:boolean,title:string)=>{
        const renderActive = ()=>{
            if(active)
            {
                return(
                    <View style={styles.info}>
                        <Text style={styles.txt}>Đinh Trường Giang</Text>
                        <Text style={styles.txt}>0353989788</Text>
                    </View>
                );
            }
            return(
                <View style={styles.info}>
                    <Text style={styles.linkNow}>{Languages.linkAccount.linkNow}</Text>
                </View>
            );
        };
        const renderIcon = ()=>{
            if(active)
            {
                return <DoneIcon/>;
            }
            return <LinkIcon/>;
        };
        return(
            <View style={styles.item}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.row}>
                    {icon}
                    {renderActive()}
                    <View style={styles.check}>
                        {renderIcon()}
                    </View>
                </View>
            </View>
        );
    },[]);

    return (
        <View>
            <HeaderBar
                title={Languages.linkAccount.header} />
            <View style={styles.content}>
                {renderItem(<NganLuongIcon width={100} height={40}/>,true,Languages.linkAccount.accountNganLuong)}
                {renderItem(<ViMoIcon width={100} height={40}/>,false,Languages.linkAccount.accountViMo)}
                {renderItem(<BankIcon width={100} height={40}/>,false,Languages.linkAccount.accountBank)}
            </View>
        </View>
    );
});

export default LinkAccount;
const styles=StyleSheet.create({
    content:{
        paddingTop:30,
        paddingHorizontal:16
    },
    title:{
        ...Styles.typography.bold,
        color:COLORS.BLACK_PRIMARY,
        marginBottom:8

    },
    row:{
        flexDirection:'row'
    },
    info:{
        marginLeft:20,
        flex:1,
        justifyContent:'center'
    },
    txt:{
        ...Styles.typography.medium,
        color:COLORS.BLACK_PRIMARY
    },
    check:{
        width:32,
        height:32,
        borderRadius:5,
        borderColor:COLORS.RED,
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center'
    },
    item:{
        borderBottomWidth:1,
        borderBottomColor:COLORS.GRAY_1,
        marginBottom:20,
        paddingBottom:5
    },
    linkNow:{
        ...Styles.typography.medium,
        color:COLORS.RED
    }
});


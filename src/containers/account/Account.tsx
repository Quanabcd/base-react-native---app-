import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';

import ContractIcon from '@/assets/images/ic_electricContract.svg';
import AccountDrawIcon from '@/assets/images/ic_account_draw.svg';
import RightIcon from '@/assets/images/ic_right.svg';
import TakePicIcon from '@/assets/images/ic_takePic.svg';
import SettingIcon from '@/assets/images/ic_setting_account.svg';
import ShareIcon from '@/assets/images/ic_share.svg';
import JoinIcon from '@/assets/images/ic_join_group.svg';
import LoginIcon from '@/assets/images/ic_login.svg';
import { Configs } from '@/commons/Configs';
import Languages from '@/commons/Languages';
import { HeaderBar, Touchable } from '@/components';
import { COLORS, Styles } from '@/theme';
import Navigator from '@/routers/Navigator';
import ScreenNames from '@/commons/ScreenNames';
import SessionManager from '@/managers/SessionManager';
import { useAppStore } from '@/hooks';
import ImageUtils from '@/utils/ImageUtils';

const Account = observer(() => {
    const { userManager,fastAuthInfo } = useAppStore();

    const [dataImage, setDataImage] = useState<string>('');
    
    const renderItem = useCallback((icon: any, title: string) => {
        const onNavigate = () => {
            switch (title) {
                case Languages.account.setting:
                    Navigator.navigateScreen(ScreenNames.informationAccount);
                    break;
                case Languages.account.invite:
                    Navigator.navigateScreen(ScreenNames.inviteFriends);
                    break;
                case Languages.account.passwordAndLogin:
                    Navigator.navigateScreen(ScreenNames.quickAuthentication);
                    break;
                case Languages.account.accountDraw:
                    Navigator.navigateScreen(ScreenNames.linkAccount);
                    break;
                default:
                // console.log('gian');
            }
        };
        return (
            <Touchable onPress={onNavigate} style={styles.item}>
                <View style={styles.rowItem}>
                    <View style={styles.circleIcon}>{icon}</View>
                    <Text style={styles.txtSupport}>{title}</Text>
                </View>
                <RightIcon />
            </Touchable>
        );
    }, []);

    const onLogout = useCallback(() => {
        SessionManager.logout();
        userManager.updateUserInfo(null);
        fastAuthInfo.setEnableFastAuthentication(false);
        SessionManager.setEnableFastAuthentication(false);
        Navigator.goBack();
    }, [fastAuthInfo, userManager]);

    const onProgressKyc = useCallback(() => {
        Navigator.navigateScreen(ScreenNames.informationAccount);
    }, []);

    const openLibrary = useCallback(() => {
        ImageUtils.openLibrary((data: any)=>{
            console.log(data.images[0].path);
            setDataImage(data.images[0].path);
        }, 1);
    },[]);

    return (
        <View style={styles.container}>
            <HeaderBar title={Languages.account.title} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <>
                    <Touchable style={styles.wrapAvatar} onPress={openLibrary}>
                        <Image style={styles.image} source={{ uri: dataImage || 'https://tienngay.vn/assets/frontend/images/favicon.png' }} />
                        <TakePicIcon style={styles.circle} />
                    </Touchable>
                    <View style={styles.row}>
                        <Text style={styles.txtHello}>{Languages.account.hello}</Text>
                        <Text style={styles.txtName}>{userManager.userInfo?.full_name}</Text>
                    </View>
                    <Text style={styles.txtPhone}>{userManager.userInfo?.phone}</Text>
                    <View style={styles.boxKYC}>
                        {/* <Touchable onPress={onProgressKyc} style={styles.confirmKYC}>
                            <Text style={styles.textConfirmKYC}>{Languages.account.confirmKYC}</Text>
                        </Touchable> */}
                        <Touchable onPress={onProgressKyc} style={styles.errKYC}>
                            <Text style={styles.textErrKYC}>{Languages.account.errKYC}</Text>
                        </Touchable>
                    </View>
                    <View style={styles.wrapSupport}>
                        {renderItem(<ContractIcon />, Languages.account.electricContract)}
                        {renderItem(<SettingIcon />, Languages.account.setting)}
                        {renderItem(<LoginIcon />, Languages.account.passwordAndLogin)}
                        {renderItem(<AccountDrawIcon />, Languages.account.accountDraw)}
                    </View>
                    <View style={styles.wrapSupport}>
                        {renderItem(<ShareIcon />, Languages.account.invite)}
                        {renderItem(<JoinIcon />, Languages.account.join)}
                    </View>
                </>
                <View style={styles.footer}>
                    <Touchable style={styles.button}
                        onPress={onLogout}>
                        <Text style={styles.txtButton}>{Languages.account.logout}</Text>
                    </Touchable>
                </View>
            </ScrollView>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        height: 120,
        width: 120,
        borderRadius: 60,
        alignSelf: 'center',
        borderWidth: 3,
        borderColor: COLORS.RED,
        backgroundColor: COLORS.WHITE
    },
    wrapAvatar: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 30
    },
    txtName: {
        fontSize: Configs.FontSize.size20,
        fontFamily: Configs.FontFamily.bold,
        color: COLORS.RED_4,
        marginLeft: 4
    },
    txtHello: {
        fontSize: Configs.FontSize.size14,
        fontFamily: Configs.FontFamily.bold,
        color: COLORS.GRAY_11,
        marginBottom: 2
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        alignSelf: 'center',
        marginTop: 25
    },
    txtPhone: {
        color: COLORS.BLACK_PRIMARY,
        textAlign: 'center',
        marginTop: 5,
        fontSize: Configs.FontSize.size16,
        fontFamily: Configs.FontFamily.medium
    },
    wrapContract: {
        ...Styles.shadow,
        paddingTop: 10,
        paddingBottom: 15,
        backgroundColor: COLORS.WHITE,
        marginHorizontal: 16,
        borderRadius: 16,
        paddingHorizontal: 16,
        marginTop: 30
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8
    },
    txtHeader: {
        fontSize: Configs.FontSize.size16,
        color: COLORS.BLACK_PRIMARY,
        fontFamily: Configs.FontFamily.medium,
        marginLeft: 8
    },
    txtContract: {
        ...Styles.typography,
        color: COLORS.BLACK_PRIMARY,
        marginLeft: 8
    },
    circle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.WHITE,
        position: 'absolute',
        bottom: 0,
        right: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrapSupport: {
        ...Styles.shadow,
        paddingTop: 10,
        paddingHorizontal: 16,
        paddingBottom: 15,
        backgroundColor: COLORS.WHITE,
        borderRadius: 16,
        marginHorizontal: 16,
        marginTop: 16
    },
    txtSupport: {
        fontSize: Configs.FontSize.size14,
        color: COLORS.BLACK,
        fontFamily: Configs.FontFamily.regular,
        marginLeft: 10
    },
    button: {
        marginHorizontal: 16,
        backgroundColor: COLORS.GRAY_1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 8,
        marginTop: 25
    },
    txtButton: {
        fontSize: Configs.FontSize.size16,
        fontFamily: Configs.FontFamily.medium,
        color: COLORS.GRAY_6
    },
    rowItem: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    item: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderColor: COLORS.GRAY_2,
        paddingRight: 15
    },
    circleIcon: {
        width: 32,
        height: 32,
        borderColor: COLORS.RED_2,
        borderWidth: 1,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    boxKYC: {
        alignItems: 'center'
    },
    confirmKYC: {
        ...Styles.shadow,
        borderColor: COLORS.RED,
        borderWidth: 0.5,
        borderRadius: 5,
        width: 180,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginVertical: 20
    },
    textConfirmKYC: {
        ...Styles.typography.regular,
        color: COLORS.RED
    },
    errKYC: {
        ...Styles.shadow,
        borderRadius: 5,
        backgroundColor: COLORS.PINK,
        width: 180,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginVertical: 10
    },
    textErrKYC: {
        ...Styles.typography.regular,
        color: COLORS.RED
    },
    footer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 40
    }
});

export default Account;

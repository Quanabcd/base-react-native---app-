/* eslint-disable global-require */
import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import Dash from 'react-native-dash';
import ImagePicker from 'react-native-image-crop-picker';
import QRCode from 'react-native-qrcode-svg';

import { Configs } from '@/commons/Configs';
import { HeaderBar, Touchable } from '@/components';
import Languages from '@/commons/Languages';
import { COLORS, Styles } from '@/theme';
import EditIcon from '@/assets/images/ic_edit.svg';
import Navigator from '@/routers/Navigator';
import ScreenNames from '@/commons/ScreenNames';
import { useAppStore } from '@/hooks';
import SessionManager from '@/managers/SessionManager';

const SettingAccount = ({ route }: any) => {

    const { userManager } = useAppStore();
    
    const [dataBehindCmt, setDataBehindCmt] = useState<string>('');
    const [dataAfterCmt, setDataAfterCmt] = useState<string>('');
    const renderItem = useCallback((label: string, value: any) => {
        return (
            <View>
                <View style={styles.item}>
                    <View style={styles.wrapLabel}>
                        <Text style={styles.label}>{label}</Text>
                    </View>
                    <View style={styles.wrapValue}>
                        <Text style={styles.value}>{value}</Text>
                    </View>

                </View>
                <Dash
                    dashThickness={1}
                    dashLength={5}
                    dashGap={2}
                    dashColor={COLORS.GRAY_7}
                />
            </View>
        );
    }, []);

    const openCamera = useCallback(() => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image);
        });
    }, []);

    const renderImg = useCallback((label: string, onPress?: any, image?: string) => {
        console.log(`image:${ image}`);
        return (
            <View style={styles.item2}>
                <Touchable onPress={onPress}>
                    <Text style={styles.value}>{label}</Text>
                    <Image style={styles.image} source={image === '' ? require('@/assets/images/cmt.png') : { uri: image }} />
                </Touchable>
            </View>
        );
    }, []);

    const goToEditProfile = useCallback(() => {
        Navigator.navigateScreen(ScreenNames.editProfile);
    }, []);

    return (
        <View style={styles.mainContainer}>
            <HeaderBar hasBack title={Languages.information.title} />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
                <View style={styles.wrapInfo}>
                    <View style={styles.header}>
                        <Text style={styles.txtName}>{userManager.userInfo?.full_name}</Text>
                        <Dash
                            dashThickness={1}
                            dashLength={5}
                            dashGap={2}
                            dashColor={COLORS.GRAY_7}
                        />
                        <Touchable onPress={goToEditProfile} style={styles.editIcon}>
                            <EditIcon />
                        </Touchable>
                        {renderItem(Languages.information.sex, userManager.userInfo?.sex)}
                        {renderItem(Languages.information.birthday, userManager.userInfo?.birthday)}
                        {renderItem(Languages.information.phone, userManager.userInfo?.phone)}
                        {renderItem(Languages.information.address, `${userManager.userInfo?.ward}, ${userManager.userInfo?.district}, ${userManager.userInfo?.city}`)}
                        {renderItem(Languages.information.job, userManager.userInfo?.job)}
                        {renderItem(Languages.information.taxId, userManager.userInfo?.tax_code)}
                        {renderItem(Languages.information.email, userManager.userInfo?.email)}
                    </View>

                </View>
                <View style={[styles.wrapBottom, styles.shadowColor]}>
                    <View style={styles.header}>
                        <Text style={styles.txtName}>{Languages.information.confirmAccount}</Text>
                        <Dash
                            dashThickness={1}
                            dashLength={5}
                            dashGap={2}
                            dashColor={COLORS.GRAY_7}
                        />
                        <Touchable style={styles.editIcon}>
                            <EditIcon />
                        </Touchable>
                        {renderImg(Languages.information.up, openCamera, dataBehindCmt)}
                        <Dash
                            dashThickness={1}
                            dashLength={5}
                            dashGap={2}
                            dashColor={COLORS.GRAY_7}
                        />
                        {renderImg(Languages.information.under, openCamera, dataAfterCmt)}
                    </View>

                </View>
            </ScrollView>
        </View>
    );
};

export default SettingAccount;

const styles = StyleSheet.create({
    scroll: {
        paddingBottom: 30
    },
    image: {
        height: 200,
        width: '100%',
        borderRadius: 10,
        alignSelf: 'center',
        borderWidth: 0.1,
        backgroundColor: COLORS.WHITE,
        marginTop: 7
    },
    mainContainer: {
        flex: 1
    },
    wrapInfo: {
        ...Styles.shadow,
        paddingTop: 10,
        paddingBottom: 8,
        backgroundColor: COLORS.WHITE,
        borderRadius: 16,
        marginHorizontal: 16,
        marginTop: 16,
        paddingHorizontal: 16
    },
    wrapBottom: {
        ...Styles.shadow,
        paddingTop: 10,
        paddingBottom: 8,
        backgroundColor: COLORS.WHITE,
        borderRadius: 16,
        marginHorizontal: 16,
        marginTop: 16,
        paddingHorizontal: 16,
        marginBottom: 50
    },
    shadowColor:{
        shadowColor: COLORS.RED
    },
    header: {
        width: '100%'
    },
    txtName: {
        textAlign: 'center',
        marginTop: 5,
        fontSize: Configs.FontSize.size16,
        fontFamily: Configs.FontFamily.medium,
        color: COLORS.RED_4,
        marginBottom: 10
    },
    editIcon: {
        position: 'absolute',
        right: 0
    },

    item: {
        flexDirection: 'row',
        width: '100%',
        marginVertical: 8
    },
    wrapLabel: {
        flex: 1.5
    },
    wrapValue: {
        flex: 3.5,
        alignItems: 'flex-end'
    },
    label: {
        color: COLORS.GRAY_6
    },
    value: {
        ...Styles.typography.medium
    },
    item2: {
        marginTop: 10,
        paddingBottom: 10
    }
});

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, View, ViewStyle, Platform, Image } from 'react-native';

import BgAuth from '@/assets/images/bg_auth.png';
import BgAuthDot from '@/assets/images/bg_auth_dot.svg';
import IcUp from '@/assets/images/ic_arrow_up.svg';
import IcDown from '@/assets/images/ic_arrow_down.svg';
import IcGoogle from '@/assets/images/ic_google.svg';
import IcFacebook from '@/assets/images/ic_facebook.svg';
import IcApple from '@/assets/images/ic_apple.svg';
import IcVimo from '@/assets/images/ic_vimo.svg';
import IcClose from '@/assets/images/ic_close.svg';
import { COLORS } from '@/theme';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/utils/DimensionUtils';
import { HeaderBar, Touchable, Button } from '@/components';
import { Configs } from '@/commons/Configs';
import IcLogoWoText from '@/assets/images/ic_logo_wo_text.svg';
import Languages from '@/commons/Languages';
import { MyTextInput } from '@/components/elements/textfield';
import ScrollViewWithKeyboard, { ScrollActions } from '@/components/ScrollViewWithKeyboard';
import { loginWithFacebook, loginWithGoogle } from '@/utils/SocialAuth';
import Navigator from '@/routers/Navigator';
import ScreenNames from '@/commons/ScreenNames';
import { useAppStore } from '@/hooks';
import { TextFieldActions } from '@/components/elements/textfield/types';
import FormValidate from '@/utils/FormValidate';
import { BUTTON_STYLES } from '@/components/elements/button/constants';


const BaseAuthComponent = ({ topComponent }: any) => {

    const { apiServices } = useAppStore();

    const [username, setUsername] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [pass, setPass] = useState<string>('');
    const [conFirmPass, setConFirmPass] = useState<string>('');
    const [keyRefer, setKeyRerFe] = useState<string>('');
    const [disable, setDisable] = useState<boolean>(false);

    const userNameRef = useRef<TextFieldActions>(null);
    const phoneRef = useRef<TextFieldActions>(null);
    const emailRef = useRef<TextFieldActions>(null);
    const pwdRef = useRef<TextFieldActions>(null);
    const pwdCfRef = useRef<TextFieldActions>(null);
    const keyReferRef = useRef<TextFieldActions>(null);

    const scrollViewRef = useRef<ScrollActions>(null);
    const [isUp, setUp] = useState<boolean>(true);

    useEffect (() => {
        setUsername('abcabcabc');
        setEmail(`gmail${Math.random() }@gmail.com`);
        setPass('12345678');
        setConFirmPass('12345678');
        setPhone('');
    },[]);
    
    const onStatusButtonSignUp = useCallback(() => {
        if(username !== '' && phone !== '' && email !== '' && pass !== '' && conFirmPass !== '')
        {
            setDisable(true);
        }
        else{
            setDisable(false);
        }
    }, [conFirmPass, email, pass, phone, username]);

    const onValidation = useCallback(() => {
        const errMsgUsername = FormValidate.userNameValidate(username);
        const errMsgPhone = FormValidate.passConFirmPhone(phone);
        const errMsgEmail = FormValidate.emailValidate(email);
        const errMsgPwd = FormValidate.passValidate(pass);
        const errMsgConFirmPwd = FormValidate.passConFirmValidate(pass, conFirmPass);

        userNameRef.current?.setErrorMsg(errMsgUsername);
        phoneRef.current?.setErrorMsg(errMsgPhone);
        emailRef.current?.setErrorMsg(errMsgEmail);
        pwdRef.current?.setErrorMsg(errMsgPwd);
        pwdCfRef.current?.setErrorMsg(errMsgConFirmPwd);

        if (`${errMsgUsername}${errMsgEmail}${errMsgPwd}${errMsgConFirmPwd}${errMsgPhone}`.length === 0) {
            return true;
        }
        return false;
    }, [conFirmPass, email, pass, phone, username]);

    const onChangeText = useCallback((value: string, tag?: string) => {
        switch (tag) {
            case Languages.auth.name:
                setUsername(value);
                onStatusButtonSignUp();
                break;
            case Languages.auth.phone:
                setPhone(value);
                onStatusButtonSignUp();
                break;
            case Languages.auth.email:
                setEmail(value);
                onStatusButtonSignUp();
                break;
            case Languages.auth.pwd:
                setPass(value);
                onStatusButtonSignUp();
                break;
            case Languages.auth.repeatPwd:
                setConFirmPass(value);
                onStatusButtonSignUp();
                break;
            case Languages.auth.referral:
                setKeyRerFe(value);
                break;
            default:
                break;
        }
    }, [onStatusButtonSignUp]);

    const onToggleView = useCallback(() => {
        setUp(last => !last);
        if (isUp) {
            scrollViewRef.current?.scrollToEnd();
        } else {
            scrollViewRef.current?.scrollToTop();
        }
    }, [isUp]);

    const onRegister = useCallback( async () => {
        if (onValidation()) {
            setDisable(disable);
            const res = await apiServices.auth.registerAuth(phone, email, username, pass);
            if (res.success) {
                Navigator.pushScreen(ScreenNames.confirmOtp,{
                    phone,
                    id: res.data
                });
                console.log('tkg=',res);
            }
        }
    }, [apiServices.auth, disable, email, onValidation, pass, phone, username]);

    const onLoginGoogle = useCallback(() => {
        loginWithGoogle();
    }, []);

    const onLoginFacebook = useCallback(() => {
        loginWithFacebook();
    }, []);

    const onLoginApple = useCallback(() => {
    }, []);

    const onLoginVimo = useCallback(() => {
    }, []);

    const renderTop = useMemo(() => {
        return <View style={styles.top}>
            {topComponent}
        </View>;
    }, [topComponent]);

    const renderBottom = useMemo(() => {
        return <View style={styles.bottom}>
            <IcLogoWoText style={styles.logoBottom} />

            <MyTextInput
                ref={phoneRef}
                value={phone}
                containerInput={styles.containerInputStyle}
                placeHolder={Languages.auth.phone}
                keyboardType='NUMBER'
                maxLength={15}
                onChangeText={onChangeText} />

            <MyTextInput
                ref={userNameRef}
                value={username}
                containerInput={styles.containerInputStyle}
                placeHolder={Languages.auth.name}
                maxLength={50}
                onChangeText={onChangeText} />

            <MyTextInput
                ref={pwdRef}
                value={pass}
                containerInput={styles.containerInputStyle}
                placeHolder={Languages.auth.pwd}
                isPassword
                maxLength={50}
                onChangeText={onChangeText} />

            <MyTextInput
                ref={pwdCfRef}
                value={conFirmPass}
                containerInput={styles.containerInputStyle}
                placeHolder={Languages.auth.repeatPwd}
                isPassword
                maxLength={50}
                onChangeText={onChangeText} />

            <MyTextInput
                ref={emailRef}
                value={email}
                containerInput={styles.containerInputStyle}
                placeHolder={Languages.auth.email}
                keyboardType='EMAIL'
                maxLength={50}
                onChangeText={onChangeText} />

            <MyTextInput
                ref={keyReferRef}
                value={keyRefer}
                containerInput={styles.containerInputStyle}
                placeHolder={Languages.auth.referral}
                maxLength={15}
                onChangeText={onChangeText} />

            <Button
                style={styles.registerContainer}
                label={Languages.auth.register}
                onPress={onRegister}
                disabled={!disable}
                buttonStyle={!disable ? BUTTON_STYLES.WHITE : BUTTON_STYLES.RED}
            />
        </View>;
    }, [conFirmPass, disable, email, keyRefer, onChangeText, onRegister, pass, phone, username]);

    const renderAction = useCallback((icon: any, onPress: any) => {
        return <Touchable style={styles.roundedBtn}
            onPress={onPress}>
            {icon}
        </Touchable>;
    }, []);

    const renderBtn = useCallback((icon: any, position: number, onPress: any) => {
        const containerStyle = {
            position: 'absolute',

            left: ACTION_PADDING + 1.20 * position * ACTION_SIZE,
            top: CENTER_HEIGHT / 5 + 0.7 * position * ACTION_SIZE + ACTION_SIZE / 4
        } as ViewStyle;

        return <View style={containerStyle} >
            <Touchable style={styles.roundedBtnWhite}
                onPress={onPress}>
                {icon}
            </Touchable>
        </View>;
    }, []);

    const renderActions = useMemo(() => {
        return <View style={styles.centerContainer} >
            <View style={styles.controlLeft} >
                {renderAction(isUp ? <IcUp /> : <IcDown />, onToggleView)}
            </View>
            <View style={styles.controlRight} >
                {renderAction(isUp ? <IcUp /> : <IcDown />, onToggleView)}
            </View>
            {renderBtn(<IcGoogle />, 1, onLoginGoogle)}
            {renderBtn(<IcFacebook />, 2, onLoginFacebook)}
            {renderBtn(<IcApple />, 3, onLoginApple)}
            {/* {renderBtn(<IcVimo />, 4, onLoginVimo)} */}
        </View>;
    }, [renderAction, isUp, onToggleView, renderBtn, onLoginGoogle, onLoginFacebook, onLoginApple]);

    const onClose = useCallback(() => {
        Navigator.goBack();
    }, []);

    const renderClose = useMemo(() => {
        return <Touchable style={styles.closeContainer}
            onPress={onClose}>
            <IcClose />
        </Touchable>;
    }, [onClose]);

    return (
        <View style={styles.container}>
            <HeaderBar noHeader />
            {renderClose}

            <ScrollViewWithKeyboard
                ref={scrollViewRef}
                scrollEnabled={false}>

                <View style={styles.contentContainer}>

                    <BgAuthDot style={styles.bgDot} />

                    {renderTop}
                    <Image style={styles.centerImg} source={BgAuth} />
                    {renderBottom}

                    {renderActions}
                </View>

            </ScrollViewWithKeyboard>
        </View >
    );
};

const HORIZONTAL_PADDING = 16;
const CONTENT_HEIGHT = Math.min(320, SCREEN_HEIGHT / 2.2);
const CONTENT_WIDTH = SCREEN_WIDTH - 2 * HORIZONTAL_PADDING;
const CENTER_HEIGHT = 432;
const CENTER_IMG_HEIGHT = CONTENT_WIDTH / 381 * CENTER_HEIGHT;
const PADDING_VERTICAL = 80;
const ACTION_PADDING = 20;
const ACTION_SIZE = Configs.FontSize.size48;
const MARGIN_TOP_2 = CENTER_HEIGHT / 2 - (Platform.OS === 'ios' ? 1.5 : 2) * ACTION_SIZE;

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.RED_2
    },
    contentContainer: {
        paddingTop: PADDING_VERTICAL,
        paddingBottom: PADDING_VERTICAL / 2,
        paddingHorizontal: HORIZONTAL_PADDING
    },
    top: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
        height: CONTENT_HEIGHT,
        paddingHorizontal: HORIZONTAL_PADDING,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        justifyContent: 'space-between',
        zIndex: 9999
    },
    bottom: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
        paddingHorizontal: HORIZONTAL_PADDING,
        width: SCREEN_WIDTH - 2 * HORIZONTAL_PADDING,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    centerContainer: {
        position: 'absolute',
        top: PADDING_VERTICAL + CONTENT_HEIGHT,
        left: HORIZONTAL_PADDING,
        right: HORIZONTAL_PADDING,
        height: CENTER_HEIGHT
    },
    bgDot: {
        position: 'absolute',
        top: 0,
        left: 0
    },
    controlLeft: {
        position: 'absolute',
        bottom: CENTER_HEIGHT / 2 - 1 * ACTION_SIZE,
        left: ACTION_PADDING
    },
    controlRight: {
        position: 'absolute',
        top: MARGIN_TOP_2,
        right: ACTION_PADDING
    },
    roundedBtn: {
        width: ACTION_SIZE,
        height: ACTION_SIZE,
        borderRadius: ACTION_SIZE / 2,
        backgroundColor: COLORS.RED,
        justifyContent: 'center',
        alignItems: 'center'
    },
    roundedBtnWhite: {
        width: ACTION_SIZE,
        height: ACTION_SIZE,
        borderRadius: ACTION_SIZE / 2,
        backgroundColor: COLORS.WHITE,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoBottom: {
        alignItems: 'center',
        marginTop: -50,
        marginBottom: 20
    },
    containerInputStyle: {
        marginBottom: 10
    },
    registerContainer: {
        marginVertical: 30
    },
    closeContainer: {
        position: 'absolute',
        top: 40,
        left: 15,
        borderRadius: 16,
        overflow: 'hidden',
        zIndex: 100
    },
    centerImg: {
        width: CONTENT_WIDTH,
        height: CENTER_IMG_HEIGHT
    }
});

export default BaseAuthComponent;

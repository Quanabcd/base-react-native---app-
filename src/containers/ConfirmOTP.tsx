import OTPInputView from '@twotalltotems/react-native-otp-input';
import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import LockIcon from '@/assets/images/ic_lock.svg';
import { Configs } from '@/commons/Configs';
import Languages from '@/commons/Languages';
import { Button, HeaderBar, Touchable } from '@/components';
import HideKeyboard from '@/components/HideKeyboard';
import { COLORS, Styles } from '@/theme';
import { SCREEN_WIDTH } from '@/utils/DimensionUtils';
import { PopupActions } from '@/components/PopupUpdatePasscode';
import PopupStatus from '@/components/popupStatus/PopupStatus';
import { useAppStore } from '@/hooks';
import { BUTTON_STYLES } from '@/components/elements/button/constants';

const second = 60;

const ConfirmOTP = observer(({ route }: { route: any }) => {

    const { phone, id, data } = route.params;

    const { apiServices, userManager } = useAppStore();

    const [timer, setTimer] = useState<number>(second);

    const [disableButton, setDisableButton] = useState<boolean>(true);
    const [disableResend, setDisableResend] = useState<boolean>(true);
    const intervalRef = useRef<any>();
    const popupResendCode = useRef<PopupActions>();
    const [Otp, setOtp] = useState<any>('');

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setTimer((t) => t - 1);
        }, 1000);
        return () => clearInterval(intervalRef.current);
    }, [timer]);
    
    useEffect(() => {
        if (timer <= 0) {
            clearInterval(intervalRef.current);
        }
        if(timer === 0){
            popupResendCode.current?.show();
            setTimeout(() => {
                popupResendCode.current?.hide();
            }, 1500);
            setDisableResend(false);
        }
    }, [timer]);
    
    const confirmSend = useCallback( async() =>{
        const res = await apiServices.auth.otpActive(id ,Otp);
        if (res.success) {
            setTimeout(async() => {
                const resInfoUser = await apiServices.auth.getInformationAuth();
                if (resInfoUser.success) {
                    userManager.updateUserInfo(resInfoUser.data);
                    console.log('userInfo:', userManager.userInfo);
                }
                userManager.updateUserInfo(data);
                console.log(userManager.userInfo);
            }, 1500);
        }
    },[Otp, apiServices.auth, data, id, userManager]);

    const onCodeChanged = useCallback((code)=>{
        if(code.length === 6){
            setDisableButton(false);
            setOtp(code);
        }
        else{
            setDisableButton(true);
        }
    },[]);

    const encode = (str: string) => {
        return str.replace(/[0-9]{7}/g, () => {
            return ('0**').slice();
        });
    };
    
    const renderPopup = useCallback((ref: any, description: string) => {
        return <PopupStatus
            ref={ref}
            title={Languages.confirmOtp.popupOtpErrorTitle}
            description={description} />;
    }, []);

    const resentCode = useCallback(async () => {
        // const res = await apiServices.auth.resendOtp(phone);
        // if(res.success)
        // {
        //     setTimer(60);
        //     setDisableResend(last => !last);
        // }
        console.log('resentCode');
            
    }, []);

    return (
        <HideKeyboard style={styles.container}>
            <View style={styles.container}>
                <HeaderBar title={Languages.confirmOtp.title} />
                <View style={styles.wrapAll}>
                    <View style={styles.wrapContent}>
                        <View style={styles.wrapContentHeader}>
                            <Text style={styles.txtEnterOTP}>
                                {Languages.confirmOtp.enterOTP}
                            </Text>
                            <Text style={styles.txtMessage}>
                                {Languages.confirmOtp.message}
                                {encode(phone)}
                                {Languages.confirmOtp.resendMess}
                                {timer}s
                            </Text>
                            <LockIcon />
                        </View>

                        <OTPInputView
                            style={styles.wrapOTP}
                            pinCount={6}
                            autoFocusOnLoad
                            onCodeChanged = {onCodeChanged}
                            editable={true}
                            codeInputFieldStyle={styles.underlineStyleBase}                            
                        />
                        <Button 
                            buttonStyle={disableButton ? BUTTON_STYLES.GRAY : BUTTON_STYLES.RED}
                            onPress={confirmSend} 
                            style={styles.button}
                            label={Languages.confirmOtp.confirm} 
                        />
                        <View style={styles.triangle}>
                            <Touchable onPress={disableResend ? undefined :resentCode} style={styles.wrapText}>
                                <Text style={styles.txtSendAgain}>
                                    {Languages.confirmOtp.sendAgain}
                                </Text>
                            </Touchable>
                            <View style={styles.triangleLeft} />
                            <View style={styles.triangleRight} />
                        </View>
                    </View>
                </View>
                {renderPopup(popupResendCode, Languages.confirmOtp.popupOtpResendCode)}
            </View>
        </HideKeyboard>
    );
});
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    wrapAll: {
        flex: 1,
        backgroundColor: COLORS.RED
    },
    wrapContent: {
        backgroundColor: COLORS.WHITE
    },
    wrapContentHeader: {
        alignItems: 'center'
    },
    txtEnterOTP: {
        textAlign: 'center',
        color: COLORS.BLACK_PRIMARY,
        fontSize: Configs.FontSize.size20,
        marginTop: 20,
        fontFamily: Configs.FontFamily.medium
    },
    txtMessage: {
        color: COLORS.GRAY_6,
        width: '80%',
        textAlign: 'center',
        marginTop: 15,
        marginBottom: 25
    },
    borderStyleBase: {
        width: 30,
        height: 45
    },
    wrapOTP: {
        width: SCREEN_WIDTH - 32,
        paddingVertical: 20,
        alignSelf: 'center',
        height: 100
    },
    borderStyleHighLighted: {
        borderColor: COLORS.RED
    },

    underlineStyleBase: {
        width: 45,
        height: 35,
        borderWidth: 0,
        borderBottomWidth: 2,
        borderBottomColor: COLORS.GRAY_4,
        color: COLORS.BLACK,
        fontSize: Configs.FontSize.size20
    },
    button:{
        paddingVertical:10,
        marginHorizontal:16
    },
    txtButton:{
        fontFamily:Configs.FontFamily.medium,
        fontSize:Configs.FontSize.size16,
        textAlign:'center',
        color:COLORS.GRAY_6
    },
    triangle:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    triangleLeft: {
        width: 0,
        height: 0,
        backgroundColor: COLORS.TRANSPARENT,
        borderRightWidth: SCREEN_WIDTH / 2,
        borderBottomWidth: 120,
        borderRightColor: COLORS.TRANSPARENT,
        borderBottomColor: COLORS.RED,
        borderLeftColor: COLORS.TRANSPARENT
    },
    triangleRight: {
        width: 0,
        height: 0,
        backgroundColor: COLORS.TRANSPARENT,
        borderLeftWidth: SCREEN_WIDTH / 2,
        borderBottomWidth: 120,
        borderRightColor: COLORS.TRANSPARENT,
        borderBottomColor: COLORS.RED,
        borderLeftColor: COLORS.TRANSPARENT
    },
    txtSendAgain: {
        ...Styles.typography,
        textAlign: 'center',
        fontFamily: Configs.FontFamily.medium,
        color: COLORS.RED
    },
    wrapText: {
        position: 'absolute',
        left: SCREEN_WIDTH * 0.4,
        right: SCREEN_WIDTH * 0.4,
        top: 60,
        zIndex: 1
    }
});

export default ConfirmOTP;

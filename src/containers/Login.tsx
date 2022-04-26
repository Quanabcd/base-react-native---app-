import {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetModal,
    BottomSheetModalProvider,
    useBottomSheetTimingConfigs
} from '@gorhom/bottom-sheet';
import { observer } from 'mobx-react';
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';
import { Alert, Platform, StyleSheet, Text, View } from 'react-native';
import TouchID from 'react-native-touch-id';
import PasscodeAuth from '@el173/react-native-passcode-auth';

import CheckIcon from '@/assets/images/ic_check.svg';
import IcFingerprint from '@/assets/images/ic_fingerprint_active.svg';
import IcLogoWoText from '@/assets/images/ic_logo_wo_text.svg';
import TakePicIcon from '@/assets/images/ic_takePic.svg';
import UnCheckIcon from '@/assets/images/ic_uncheck.svg';
import { Configs } from '@/commons/Configs';
import {
    ENUM_BIOMETRIC_TYPE,
    ERROR_BIOMETRIC,
    StorageKeys
} from '@/commons/constants';
import Languages from '@/commons/Languages';
import ScreenNames from '@/commons/ScreenNames';
import { Button, HeaderBar, Touchable } from '@/components';
import { MyTextInput } from '@/components/elements/textfield';
import { PinCode, PinCodeT } from '@/components/pinCode';
import { useAppStore } from '@/hooks';
import SessionManager from '@/managers/SessionManager';
import Navigator from '@/routers/Navigator';
import { COLORS, Styles } from '@/theme';
import StorageUtils from '@/utils/StorageUtils';
import BaseAuthComponent from './BaseAuthComponent';
import FaceIdActive from '@/assets/images/ic_faceId_active.svg';
import { TextFieldActions } from '@/components/elements/textfield/types';
import FormValidate from '@/utils/FormValidate';
import { BUTTON_STYLES } from '@/components/elements/button/constants';

const customTexts = {
    set: Languages.setPassCode
};

const Login = observer(({ route }: any) => {

    const nextScreenName = route?.params?.routeName;
    const { apiServices, userManager, fastAuthInfo } = useAppStore();
    const [checkedQuickAuth, setCheckQuickAuth] = useState<boolean>(true);
    const [checked, setCheck] = useState<boolean>(true);
    const [disable, setDisable] = useState<boolean>(false);
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const [phone, setPhone] = useState<string>('');
    const [pass, setPass] = useState<string>('');

    const refPhone = useRef<TextFieldActions>(null);
    const refPass = useRef<TextFieldActions>(null);
    
    const onChangeCheckedLogin = useCallback(() => {
        setCheck(!checked);
    }, [checked]);

    useEffect(() => {
        setPhone('0879142550');
        setPass('12345678');
        if (
            fastAuthInfo.supportedBiometry === ENUM_BIOMETRIC_TYPE.FACE_ID &&
      fastAuthInfo.isEnableFastAuth &&
      Platform.OS === 'ios'
        ) {
            auth();
        }
    }, [fastAuthInfo.isEnableFastAuth, fastAuthInfo.supportedBiometry]);

    const onStatusButtonSignUp = useCallback(() => {
        if(phone !== '' && pass !== '')
        {
            setDisable(true);
        }
        else{
            setDisable(false);
        }
    }, [pass, phone]);

    const onChangeText = useCallback((value: string, tag?: string) => {
        switch (tag) {
            case Languages.auth.phone:
                setPhone(value);
                onStatusButtonSignUp();
                break;
            case Languages.auth.pwd:
                setPass(value);
                onStatusButtonSignUp();
                break;
            default:
                break;
        }
    }, [onStatusButtonSignUp]);

    const checkboxLogin = useMemo(() => {
        if (checked) {
            return <CheckIcon width={20} height={20} />;
        }
        return <UnCheckIcon width={20} height={20} />;
    }, [checked]);

    const onLogin = useCallback(async() => {
        const errMsgPhone = FormValidate.passConFirmPhone(phone);
        const errMsgPwd = FormValidate.passValidate(pass);

        refPhone.current?.setErrorMsg(errMsgPhone);
        refPass.current?.setErrorMsg(errMsgPwd);

        if (`${errMsgPwd}${errMsgPhone}`.length === 0) {
            const res = await apiServices.auth.loginPhone(phone, pass);
            if (res.success) {
                const resInfoUser = await apiServices.auth.getInformationAuth();
                if (resInfoUser.success) {
                    userManager.updateUserInfo(resInfoUser.data);
                    console.log('userInfo:', userManager.userInfo);
                }
                setTimeout(() => {
                    Navigator.navigateToDeepScreen([ScreenNames.tabs], nextScreenName);
                }, 100);
                
            }
        }
            
    }, [apiServices.auth, nextScreenName, pass, phone, userManager]);

    const onChangeCheckedAuth = useCallback(() => {
        setCheckQuickAuth(!checkedQuickAuth);
    }, [checkedQuickAuth]);

    const checkboxQuickAuth = useMemo(() => {
        if (checkedQuickAuth) {
            return <CheckIcon width={20} height={20} />;
        }
        return <UnCheckIcon width={20} height={20} />;
    }, [checkedQuickAuth]);

    const animationConfigs = useBottomSheetTimingConfigs({
        duration: 800
    });

    const onLoginWithBiometry = useCallback(() => {
        fastAuthInfo.setEnableFastAuthentication(false);
        if (nextScreenName === ScreenNames.account) {
            Navigator.replaceScreen(ScreenNames.account);
        } else if (!nextScreenName) {
            Navigator.goBack();
        } else {
            Navigator.navigateToDeepScreen([ScreenNames.tabs], nextScreenName);
        }
    }, [fastAuthInfo, nextScreenName]);

    const auth = useCallback(() => {
        if (Platform.OS === 'android') {
            TouchID.authenticate(Languages.quickAuThen.description, {
                title: Languages.biometry.useFingerprint,
                imageColor: COLORS.RED,
                imageErrorColor: COLORS.RED,
                sensorDescription: Languages.biometry.useFingerPrintError,
                sensorErrorDescription: Languages.biometry.useFingerPrintManyTimesError,
                cancelText: Languages.common.close,
                cancelTextManyTime: Languages.common.agree,
                passcodeFallback: true
            })
                .then((data: any) => {
                    onLoginWithBiometry();
                })
                .catch((error: any) => {
                    if (
                        error.code === ERROR_BIOMETRIC.FINGERPRINT_ERROR_LOCKOUT ||
            error.code === ERROR_BIOMETRIC.FINGERPRINT_ERROR_LOCKOUT_PERMANENT
                    ) {
                        bottomSheetModalRef.current?.present?.();
                        console.log(error);
                    }
                });
        } else {
            PasscodeAuth.authenticate(Languages.quickAuThen.description)
                .then(() => {
                    onLoginWithBiometry();
                })
                .catch(() => {});
        }
    }, [onLoginWithBiometry]);

    const CustomBackdrop = (props: BottomSheetBackdropProps) => {
        return <BottomSheetBackdrop {...props} pressBehavior="close" />;
    };

    const checkPin = useCallback(async (value) => {
        const pin = await StorageUtils.getDataByKey(StorageKeys.KEY_PIN);
        if (pin === value) {
            return true;
        }
        return false;
    }, []);

    const onSetPINSuccess = useCallback(() => {
        bottomSheetModalRef.current?.close?.();
        fastAuthInfo.setEnableFastAuthentication(false);
        if (nextScreenName === ScreenNames.account) {
            Navigator.replaceScreen(ScreenNames.account);
        } else if (!nextScreenName) {
            Navigator.goBack();
        } else {
            Navigator.navigateToDeepScreen([ScreenNames.tabs], nextScreenName);
        }
    }, [fastAuthInfo, nextScreenName]);

    const renderPinCode = useMemo(() => {
        return (
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={['20%', '82%']}
                keyboardBehavior={'interactive'}
                enablePanDownToClose={true}
                backdropComponent={CustomBackdrop}
                animationConfigs={animationConfigs}
            >
                <View style={styles.wrapPin}>
                    <PinCode
                        mode={PinCodeT.Modes.Enter}
                        visible={true}
                        options={{
                            pinLength: 4,
                            maxAttempt: 4,
                            lockDuration: 10000,
                            disableLock: false
                        }}
                        mainStyle={customStyles.main}
                        textOptions={customTexts}
                        titleStyle={customStyles.title}
                        buttonsStyle={customStyles.buttons}
                        subTitleStyle={customStyles.subTitle}
                        buttonTextStyle={customStyles.buttonText}
                        pinContainerStyle={customStyles.pinContainer}
                        checkPin={checkPin}
                        onEnterSuccess={onSetPINSuccess}
                    />
                </View>
            </BottomSheetModal>
        );
    }, [animationConfigs, checkPin, onSetPINSuccess]);

    const renderTop = useMemo(() => {
        if (SessionManager.isEnableFastAuthentication) {
            return (
                <>
                    <View style={styles.wrapAvatar}>
                        <Touchable style={styles.circle}>
                            <TakePicIcon width={20} height={20} />
                        </Touchable>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.txtHello}>{Languages.account.hello}</Text>
                        <Text style={styles.txtName}>ĐINH TRƯỜNG GIANG</Text>
                    </View>
                    <MyTextInput
                        placeHolder={Languages.auth.pwd}
                        isPassword
                        maxLength={50}
                    />

                    <View style={styles.checkboxContainer}>
                        <Touchable style={styles.checkbox} onPress={onChangeCheckedAuth}>
                            {checkboxQuickAuth}
                        </Touchable>
                        <Text style={styles.txtSave}>{Languages.auth.saveInfo}</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Touchable
                            onPress={() => bottomSheetModalRef.current?.present()}
                            style={styles.button}
                        >
                            <Text style={styles.txtBt}>{Languages.auth.login}</Text>
                        </Touchable>
                        <Touchable onPress={auth} style={styles.wrapIcon}>
                            {fastAuthInfo?.supportedBiometry ===
                ENUM_BIOMETRIC_TYPE.TOUCH_ID && (
                                <IcFingerprint width={20} height={20} />
                            )}
                            {fastAuthInfo?.supportedBiometry ===
                ENUM_BIOMETRIC_TYPE.FACE_ID && (
                                <FaceIdActive width={20} height={20} />
                            )}
                        </Touchable>
                    </View>
                </>
            );
        }

        return (
            <>
                <IcLogoWoText style={styles.logo} />

                <MyTextInput
                    ref={refPhone}
                    value={phone}
                    containerInput={styles.containerInputStyle}
                    placeHolder={Languages.auth.phone}
                    keyboardType="NUMBER"
                    maxLength={15}
                    onChangeText={onChangeText}
                />

                <MyTextInput
                    ref={refPass}
                    value={pass}
                    placeHolder={Languages.auth.pwd}
                    isPassword
                    maxLength={50}
                    onChangeText={onChangeText}
                />

                <View style={styles.checkboxContainer}>
                    <Touchable style={styles.checkbox} onPress={onChangeCheckedLogin}>
                        {checkboxLogin}
                    </Touchable>
                    <Text style={styles.txtSave}>{Languages.auth.saveInfo}</Text>
                </View>

                <Button 
                    label={Languages.auth.login} onPress={onLogin}
                    buttonStyle={!disable ? BUTTON_STYLES.WHITE : BUTTON_STYLES.RED}
                />
            </>
        );
    }, [auth, checkboxLogin, checkboxQuickAuth, disable, fastAuthInfo?.supportedBiometry, onChangeCheckedAuth, onChangeCheckedLogin, onChangeText, onLogin, pass, phone]);

    return (
        <BottomSheetModalProvider>
            <View style={styles.container}>
                <HeaderBar noHeader />

                <BaseAuthComponent topComponent={renderTop} />
                {renderPinCode}
            </View>
        </BottomSheetModalProvider>
    );
});

const PADDING_VERTICAL = 80;

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.RED_2
    },
    logo: {
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: PADDING_VERTICAL / 2
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginVertical: 15
    },
    checkbox: {},
    txtSave: {
        fontFamily: Configs.FontFamily.regular,
        color: COLORS.GRAY_6,
        fontSize: Configs.FontSize.size14,
        marginLeft: 5
    },
    containerInputStyle: {
        marginBottom: 5
    },

    wrapAvatar: {
        width: 80,
        height: 80,
        borderRadius: 45,
        borderWidth: 3,
        borderColor: COLORS.RED,
        alignSelf: 'center',
        marginTop: 20
    },
    txtName: {
        fontSize: Configs.FontSize.size16,
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
        marginTop: 10
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 20,
        backgroundColor: COLORS.WHITE,
        position: 'absolute',
        bottom: 0,
        right: -8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: '85%',
        backgroundColor: COLORS.RED,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    txtBt: {
        ...Styles.typography.medium,
        color: COLORS.WHITE
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    wrapIcon: {
        width: 36,
        borderWidth: 1,
        borderColor: COLORS.RED,
        height: 36,
        borderRadius: 18,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrapPin: {
        flex: 1
    }
});
const customStyles = StyleSheet.create({
    main: {
        marginTop: 20,
        paddingHorizontal: 20
    // justifyContent: 'center'
    },

    title: {
        fontSize: Configs.FontSize.size16,
        fontFamily: Configs.FontFamily.medium,
        color: COLORS.RED_3
    },
    subTitle: {
        color: COLORS.BLACK
    },
    buttonText: {
        color: COLORS.RED_3,
        fontSize: Configs.FontSize.size32,
        fontFamily: Configs.FontFamily.medium
    },
    buttons: {
        backgroundColor: COLORS.WHITE,
        borderWidth: 1.5,
        marginHorizontal: 15,
        borderColor: COLORS.RED_3,
        width: 65,
        height: 65,
        borderRadius: 35
    },
    pinContainer: {
        height: 30,
        justifyContent: 'center',
        marginBottom: 10
    }
});
export default Login;

import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { Configs } from '@/commons/Configs';
import Languages from '@/commons/Languages';
import ScreenNames from '@/commons/ScreenNames';
import { HeaderBar } from '@/components';
import { BUTTON_STYLES } from '@/components/elements/button/constants';
import { Button } from '@/components/elements/button/index';
import { MyTextInput } from '@/components/elements/textfield/index';
import { TextFieldActions } from '@/components/elements/textfield/types';
import Navigator from '@/routers/Navigator';
import { COLORS, Styles } from '@/theme';
import FormValidate from '@/utils/FormValidate';

const ChangePassword = observer(() => {
    const [oldPwd, setOldPwd] = useState<string>('');
    const [newPwd, setNewPwd] = useState<string>('');
    const [currentNewPwd, setCurrentNewPwd] = useState<string>('');
    const inputRef = useRef<TextFieldActions>(null);

    const oldRef = useRef<TextFieldActions>(null);
    const newRef = useRef<TextFieldActions>(null);
    const currentRef = useRef<TextFieldActions>(null);

    const renderInput = useCallback((_title?: any, _placeHolder?: any, _text?: string, _ref?: any) => {
        const onChange=(text:string)=>{
            onChangeText(text,_title);
        };
        return <View style={styles.groupInput}>
            <Text style={styles.title}>{_title}</Text>
            <MyTextInput
                ref={_ref}
                placeHolder={_placeHolder}
                containerInput={styles.containerStyle}
                inputStyle={styles.inputStyle}
                isPassword
                inputStylePwDIcon={styles.pwd}
                maxLength={15}
                value={_text}
                onChangeText={onChange}
                hasUnderline={false} />
        </View>;
    
    }, []);

    const onChangeValidation = useCallback(
        () => {

            const oldPwdValidation = FormValidate.checkOldPwd(oldPwd);
            const newPwdValidation = FormValidate.checkNewPwd(newPwd);
            const currentPwdValidation = FormValidate.checkCurrentPwd(newPwd, currentNewPwd);

            oldRef.current?.setErrorMsg(oldPwdValidation);
            newRef.current?.setErrorMsg(newPwdValidation);
            currentRef.current?.setErrorMsg(currentPwdValidation);

            if (`${oldPwdValidation}${currentPwdValidation}${newPwdValidation}`.length === 0) {
                return true;
            }
            return false;
        },
        [oldPwd, newPwd, currentNewPwd]
    );

    const onChangeText = useCallback((value?: any, tag?: any) => {
        switch (tag) {
            case Languages.changePwd.oldPass:
                setOldPwd(value);
                break;
            case Languages.changePwd.newPass:
                setNewPwd(value);
                break;
            case Languages.changePwd.currentNewPass:
                setCurrentNewPwd(value);
                break;

            default:
                break;
        }

    }, []);

    const onPressChange = useCallback(() => {
        if (onChangeValidation()) {
            Alert.alert('Changed');
            Navigator.pushScreen(ScreenNames.changePwd);
        }
        else {
            console.log('errs');
        }
    }, [onChangeValidation]);

    return (
        <View style={styles.container}>
            <HeaderBar
                title={Languages.changePwd.title} />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView>
                    <View style={styles.group}>
                        {renderInput(Languages.changePwd.oldPass, Languages.changePwd.placeOldPass, oldPwd, oldRef)}
                        {renderInput(Languages.changePwd.newPass, Languages.changePwd.placeNewPass, newPwd, newRef)}
                        {renderInput(Languages.changePwd.currentNewPass, Languages.changePwd.currentNewPass, currentNewPwd, currentRef)}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <View style={styles.button}>
                <Button radius={10} label={Languages.changePwd.button} buttonStyle={ BUTTON_STYLES.RED }
                    onPress={onPressChange}
                />
            </View>
        </View>
    );
});

export default ChangePassword;
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    group: {
        paddingTop: 20,
        paddingRight: 15,
        paddingLeft: 15
    },
    groupInput: {
        marginBottom: 20
    },
    title: {
        ...Styles.typography.regular,
        marginBottom: 5
    },
    containerStyle: {
        height: 40,
        backgroundColor: COLORS.WHITE
    },
    inputStyle: {
        ...Styles.typography.regular,
        height: 40,
        fontSize: Configs.FontSize.size16
    },
    button: {
        paddingHorizontal: 15
    },
    pwd: {
        top: 0
    }

});


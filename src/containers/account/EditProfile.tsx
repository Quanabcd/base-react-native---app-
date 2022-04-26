import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {  StyleSheet, Text, View } from 'react-native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import { HeaderBar, Touchable } from '@/components';
import Languages from '@/commons/Languages';
import ScrollViewWithKeyboard from '@/components/ScrollViewWithKeyboard';
import { MyTextInput } from '@/components/elements/textfield';
import { Configs } from '@/commons/Configs';
import { COLORS, Styles } from '@/theme';
import { TextFieldActions } from '@/components/elements/textfield/types';
import FormValidate from '@/utils/FormValidate';
import { PopupActions } from '@/components/popup/types';
import { useAppStore } from '@/hooks';
import PickerValuationAddress from '@/components/PickerValuationAddress';
import ToastUtils from '@/utils/ToastUtils';
import { InForUser } from '@/models/user-model';
import { CityModal, DistrictModal, WardModal } from '@/models/address';
import SessionManager from '@/managers/SessionManager';

const inFor: InForUser[] = [
    {
        full_name: '',
        birthday: '',
        phone: '',
        job: '',
        tax_code: '',
        email: '',
        city: '',
        district: '',
        ward: ''
    }
];
const EditProfile = observer(() => {
    const { apiServices , userManager} = useAppStore();

    const [values, setValue] = useState<InForUser[]>(inFor || '');
    const [disableDistrict, setDisableDistrict]=useState<boolean>(true);
    const [disableWard, setDisableWard]=useState<boolean>(true);
    
    const [dataProvince, setDataProvince] = useState<CityModal[]>([]);
    const [dataDistrict, setDataDistrict] = useState<DistrictModal[]>([]);
    const [dataWards, setDataWards] = useState<WardModal[]>([]);

    const [city,setCity]=useState<string>(userManager.userInfo?.city);
    const [district,setDistrict]=useState<string>(userManager.userInfo?.district);
    const [ward,setWard]=useState<string>(userManager.userInfo?.ward);

    const userNameRef = useRef<TextFieldActions>(null);
    const birthdayRef = useRef<TextFieldActions>(null);
    const phoneRef = useRef<TextFieldActions>(null);
    const jobRef = useRef<TextFieldActions>(null);
    const taxIdRef = useRef<TextFieldActions>(null);
    const emailRef = useRef<TextFieldActions>(null);

    const provinceRef = useRef<PopupActions>(null);
    const districtRef = useRef<PopupActions>(null);
    const wardsRef = useRef<PopupActions>(null);                 

    const fetchCity = useCallback( async()=>{
        const resCity = await apiServices.common.getCity();
        if(resCity.success){
            setDataProvince(resCity.data);
        }
    },[apiServices.common]);

    const fetchDistrict = useCallback( async(id:number)=>{
        const resDistrict = await apiServices.common.getDistrict(id);
        if(resDistrict.success){
            setDataDistrict(resDistrict.data);
        }
    },[apiServices.common]);

    const fetchWard = useCallback( async(id:number)=>{
        const resWard = await apiServices.common.getWard(id);
        if(resWard.success){
            setDataWards(resWard.data);
        }
    },[apiServices.common]);

    const onChangeCity = useCallback(async(item:CityModal) => {  
        setCity(item.name);
        setDistrict('');
        setWard('');
        if(city !== null){
            fetchDistrict(item?.code);
            setDisableDistrict(false);
            setDisableWard(true);
        };
    },[city, fetchDistrict]);

    const onChangeDistrict = useCallback(async(item:DistrictModal) => {  
        setDistrict(item.name);
        setWard('');
        if(district !== null){
            fetchWard(item?.code);
            setDisableDistrict(false);
            setDisableWard(false);
        };
    },[district, fetchWard]);

    const onChangeWard = useCallback(async(item:WardModal) => {  
        setWard(item?.name);
    },[]);

    useEffect(()=>{
        fetchCity();
        values[0].city = city;
        values[0].district = district;
        values[0].ward = ward;
    },[city, district, fetchCity, fetchDistrict, fetchWard, values, ward]);

    const renderCity = useCallback(( _label?:string,_provinceRef?:any, _address?:any , _dataAddress?:any, _onChangeAddress?:any,_placeholder?:any,_disable?:boolean ) => {
        return (
            <PickerValuationAddress
                ref={_provinceRef}
                label={_label}
                containerStyle={styles.picker}
                value={ _address}
                data={_dataAddress}
                onPressItem={(_onChangeAddress)}
                placeholder={_placeholder}
                styleText={styles.inputStyle}
                disable={_disable}
            />
        );
    },[]);

    const onValidation = useCallback(() => {

        const errMsgUsername = FormValidate.userNameValidate(values[0].full_name);
        const errMsgPhone = FormValidate.passConFirmPhone(values[0].phone);
        const errMsgEmail = FormValidate.emailValidate(values[0].email);
        const errMsgJob = FormValidate.inputValidate(values[0].job, Languages.errorMsg.jobEmpty);
        const errMsgTaxId = FormValidate.inputValidate(values[0].tax_code, Languages.errorMsg.taxIdEmpty, Languages.errorMsg.taxIdSyntax);
        const errMsgBirthday = FormValidate.birthdayValidator(values[0].birthday);
        const errMsgProvince = FormValidate.inputValidate(city, Languages.errorMsg.errProvince);
        const errMsgDistrict = FormValidate.inputValidate(district, Languages.errorMsg.errDistrict);
        const errMsgWards = FormValidate.inputValidate(ward, Languages.errorMsg.errWars);

        userNameRef.current?.setErrorMsg(errMsgUsername);
        phoneRef.current?.setErrorMsg(errMsgPhone);
        emailRef.current?.setErrorMsg(errMsgEmail);
        jobRef.current?.setErrorMsg(errMsgJob);
        taxIdRef.current?.setErrorMsg(errMsgTaxId);
        birthdayRef.current?.setErrorMsg(errMsgBirthday);
        provinceRef.current?.setErrorMsg(errMsgProvince);
        districtRef.current?.setErrorMsg(errMsgDistrict);
        wardsRef.current?.setErrorMsg(errMsgWards);

        if (`${errMsgUsername}${errMsgPhone}${errMsgEmail}${errMsgJob}${errMsgTaxId}${errMsgBirthday}${errMsgProvince}${errMsgDistrict}${errMsgWards}`.length === 0) {
            return true;
        }
        return false;
    }, [city, district, values, ward]);


    const onChangeText = useCallback((value: string, tag?: string) => {
        switch (tag) {
            case Languages.information.fullName:
                values[0].full_name = value;
                break;
            case Languages.information.birthday:
                values[0].birthday = value;
                break;
            case Languages.information.phone:
                values[0].phone = value;
                break;
            case Languages.information.job:
                values[0].job = value;
                break;
            case Languages.information.taxId:
                values[0].tax_code = value;
                break;
            case Languages.information.email:
                values[0].email = value;
                break;
            default:
                break;
        }
    }, [values]);

    const onPressChange = useCallback(() => {
        if (onValidation()) {
            userManager.updateUserInfo(values[0]);
            // Chua co API update user
            ToastUtils.showSuccessToast('Success');
        }
        else {
            ToastUtils.showSuccessToast('False');
        }
    }, [onValidation, userManager, values]);


    const renderItem = useCallback((_label: string, _ref: any, _value: any, _type?: any) => {
        return (
            <View>
                <Text style={styles.label}>{_label}</Text>
                <MyTextInput
                    ref={_ref}
                    value={_value}
                    containerInput={styles.containerStyle}
                    inputStyle={styles.inputStyle}
                    maxLength={30}
                    hasUnderline={false}
                    placeHolder={_label}
                    onChangeText={onChangeText}
                    keyboardType={_type}
                />
            </View>
        );
    }, [onChangeText]);

    return (
        <BottomSheetModalProvider>
            <View style={styles.container}>
                <HeaderBar
                    title={Languages.editProfile.title} />
                <ScrollViewWithKeyboard showsVerticalScrollIndicator={false} style={styles.wrapContent}>
                    {renderItem(Languages.information.fullName, userNameRef, SessionManager.userInfo?.full_name)}
                    {renderItem(Languages.information.birthday, birthdayRef, SessionManager.userInfo?.birthday)}
                    {renderItem(Languages.information.phone, phoneRef, SessionManager.userInfo?.phone, 'NUMBER')}
                    {renderItem(Languages.information.job, jobRef, SessionManager.userInfo?.job)}
                    {renderItem(Languages.information.taxId, taxIdRef, SessionManager.userInfo?.tax_code)}
                    {renderItem(Languages.information.email, emailRef, SessionManager.userInfo?.email, 'EMAIL')}
                    <View style={styles.row}>
                        <Text style={styles.label}>{Languages.information.address}</Text>
                        <View style={styles.border}></View>
                    </View>
                    {renderCity(Languages.information.city,provinceRef,city,dataProvince,onChangeCity,Languages.information.city)}
                    {renderCity(Languages.information.district,districtRef,district,dataDistrict,onChangeDistrict,Languages.information.district,disableDistrict)}
                    {renderCity(Languages.information.village,wardsRef,ward,dataWards,onChangeWard,Languages.information.village,disableWard)}
                    <Touchable onPress={onPressChange} style={styles.btn}>
                        <Text style={styles.txtBt}>{Languages.editProfile.updateInfo}</Text>
                    </Touchable>
                </ScrollViewWithKeyboard>
            </View>
        </BottomSheetModalProvider>
    );
});

export default EditProfile;
const styles = StyleSheet.create({
    container: {
        paddingBottom: Configs.IconSize.size80
    },
    input: {
        borderWidth: 1,
        marginVertical: 10
    },
    containerStyle: {
        height: Configs.FontSize.size45,
        marginTop: 10,
        borderWidth: 1,
        borderColor: COLORS.GRAY_7
    },
    inputStyle: {
        color: COLORS.BLACK_PRIMARY,
        fontSize: Configs.FontSize.size14
    },
    wrapContent: {
        marginHorizontal: 16,
        marginTop: 20
    },
    label: {
        color: COLORS.BLACK_PRIMARY
    },
    border: {
        height: 1,
        width: '100%',
        backgroundColor: COLORS.GRAY_7,
        marginLeft: 10
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10
    },
    picker: {
        marginVertical: 10,
        borderColor: COLORS.GRAY_10
    },
    btn: {
        backgroundColor: COLORS.RED,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 50,
        marginTop: 20,
        marginHorizontal: 20
    },
    txtBt: {
        ...Styles.typography.medium,
        color: COLORS.WHITE
    }
});


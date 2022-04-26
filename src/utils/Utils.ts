import { Linking, Platform, Share } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { openSettings } from 'react-native-permissions';
import AndroidOpenSettings from 'react-native-android-open-settings';

import Validate from './Validate';

function formatFloatNumber(num: string, decimal?: number) {
    return Number(num || 0)
        .toFixed(decimal || 0)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

function formatTextToNumber(textNumber: string | number) {
    const num = `${textNumber}`.replace(/[^0-9]/g, '');
    return num;
}

function callNumber(phone: string) {
    const phoneNumber = `tel:${phone}`;
    Linking.canOpenURL(phoneNumber)
        .then((supported) => {
            if (supported) {
                Linking.openURL(phoneNumber);
            } else {
                console.log('Don\'t know how to go');
            }
        })
        .catch((err) => console.error('An error occurred', err));
}

function openSetting() {
    const app = 'app-settings:';
    if (Platform.OS === 'ios') {
        Linking.canOpenURL(app)
            .then((supported) => {
                if (supported && Platform.OS === 'ios') {
                    Linking.openURL(app);
                }
            })
            .catch((err) => console.error('An error occurred', err));
    } else {
        AndroidOpenSettings.generalSettings();
    }
}

function share(text: string) {
    if (Validate.isStringEmpty(text)) {
        return;
    }
    try {
        Share.share({
            message: text
        });
    } catch (error) {
        console.log(error);
    }
}

function openURL(url: string) {
    Linking.canOpenURL(url)
        .then((supported) => {
            if (!supported) {
                console.error(`Unsupported url: ${url}`);
            } else {
                Linking.openURL(url);
            }
        })
        .catch((err) => {
            console.error('An error occurred', err);
        });
}

function capitalizeFirstLetter(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}
function formatMoney(number: string | number) {
    number = `${number}`.replace(/[^0-9]/g, '');

    if (!number || Number.isNaN(number)) {
        return '0';
    }
    return `${Math.ceil(Number(number))
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
}
function getFileNameByPath(file: any) {
    if (file.name !== undefined) {
        return file.name;
    } if (file.filename !== undefined && file.filename !== null) {
        return file.filename;
    } 
    return (
        `${Math.floor(Math.random() * Math.floor(999999999)) 
        }.${ 
            file.mime.split('/')[1]}`
    );
}

export default {
    callNumber,
    share,
    openURL,
    formatFloatNumber,
    formatTextToNumber,
    capitalizeFirstLetter,
    formatMoney,
    openSetting,
    getFileNameByPath
};

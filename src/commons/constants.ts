import { KeyValueModel } from '@/models/key-value';
import Languages from './Languages';

export const PHONE_PREFIX = '+84';

export const PHONE_REGEX = /^0+[3,5,7,8,9]{1}[0-9]{1}[1-9]{1}[0-9]{6}$/;
export const NUMBER_REGEX = /^[0-9]*$/;
export const EMAIL_REGEX = /^[\w+][\w\.\-]+@[\w\-]+(\.\w{2,10})+$/;
export const PASSWORD_REGEX = /^\w{6,20}$/;

export const SECONDS_IN_DAY = 864e5;
export const DELAY_CLICK = 3e2;

export enum StorageKeys {
  KEY_ACCESS_TOKEN = 'KEY_ACCESS_TOKEN',
  KEY_DEVICE_TOKEN = 'KEY_DEVICE_TOKEN',
  KEY_DEVICE_TOKEN_FIREBASE = 'KEY_DEVICE_TOKEN_FIREBASE',
  KEY_USER_INFO = 'KEY_USER_INFO',
  KEY_SKIP_ONBOARDING = 'KEY_SKIP_ONBOARDING',
  KEY_LAST_POSITION = 'KEY_LAST_POSITION',
  KEY_LAST_LOGIN_INFO = 'KEY_LAST_LOGIN_INFO',
  KEY_LATEST_NOTIFY_ID = 'KEY_LATEST_NOTIFY_ID',
  KEY_SAVED_API_VERSION = 'KEY_SAVED_API_VERSION',
  KEY_BIOMETRY_TYPE = 'KEY_BIOMETRY_TYPE',
  KEY_ENABLE_FAST_AUTHENTICATION = 'KEY_FAST_AUTHENTICATION',
  KEY_PIN = 'KEY_PIN',
}

export enum Events {
  TOAST = 'TOAST',
  LOGOUT = 'LOGOUT',
  SWITCH_KEYBOARD = 'SWITCH_KEYBOARD',
}

export enum ToastTypes {
  ERR = 0, //  red background
  MSG = 1, // dark blue background
  SUCCESS = 2, // green background
}

export enum PopupTypes {
  OTP = 1,
  POST_NEWS = 2,
}

export enum ErrorCodes {
  SUCCESS = 0,
  IMAGE_LIMIT_SIZE = 1,
}

export enum HistoryCodes {
  SUCCESS = 1,
  FAILS = 2,
}
export enum Convert {
  SUCCESS = 1,
  FAILS = 2,
}
export const configGoogleSignIn = {
    webClientId:
    '137269588651-mmdqh1ji2u4a708f3qm5aitgfdi232mb.apps.googleusercontent.com'
};
export enum MaxText {
  max = 40,
}

export const TopUpTemplate = [1e5, 2e5, 5e5, 1e6, 2e6, 5e6];

export const Periods = [
    { label: Languages.assets.filter[0], value: 0 },
    { label: Languages.assets.filter[1], value: 7 },
    { label: Languages.assets.filter[2], value: 30 },
    { label: Languages.assets.filter[4], value: 180 },
    { label: Languages.assets.filter[5], value: 270 },
    { label: Languages.assets.filter[6], value: 360 }
] as KeyValueModel[];

export const TransactionTypes = [
    { label: Languages.transaction.types[0], value: 0 },
    { label: Languages.transaction.types[1], value: 1 },
    { label: Languages.transaction.types[2], value: 2 },
    { label: Languages.transaction.types[3], value: 3 }
] as KeyValueModel[];
export enum UseFastAuth {
  TRUE = '1',
  FALSE = '0',
}
export enum ENUM_BIOMETRIC_TYPE {
  TOUCH_ID = 'TouchID',
  FACE_ID = 'FaceID',
  KEY_PIN = 'KEY_PIN',
}
export enum ERROR_BIOMETRIC {
  // ios
  RCTTouchIDNotSupported = 'RCTTouchIDNotSupported',
  RCTTouchIDUnknownError = 'RCTTouchIDUnknownError',
  LAErrorTouchIDNotEnrolled = 'LAErrorTouchIDNotEnrolled',
  LAErrorTouchIDNotAvailable = 'LAErrorTouchIDNotAvailable',
  LAErrorTouchIDLockout='LAErrorTouchIDLockout',
  LAErrorAuthenticationFailed='LAErrorAuthenticationFailed',
  // android
  NOT_SUPPORTED = 'NOT_SUPPORTED',
  NOT_AVAILABLE = 'NOT_AVAILABLE',
  NOT_ENROLLED = 'NOT_ENROLLED',
  FINGERPRINT_ERROR_LOCKOUT_PERMANENT = 'FINGERPRINT_ERROR_LOCKOUT_PERMANENT',
  ErrorFaceId = 'ErrorFaceId',
  FINGERPRINT_ERROR_LOCKOUT='FINGERPRINT_ERROR_LOCKOUT'
}
export function messageError(value: string) {
    switch (value) {
        case ERROR_BIOMETRIC.RCTTouchIDNotSupported:
            return Languages.errorBiometryType.RCTTouchIDNotSupported;
        case ERROR_BIOMETRIC.RCTTouchIDUnknownError:
            return Languages.errorBiometryType.RCTTouchIDUnknownError;
        case ERROR_BIOMETRIC.LAErrorTouchIDNotEnrolled:
            return Languages.errorBiometryType.LAErrorTouchIDNotEnrolled;
        case ERROR_BIOMETRIC.LAErrorTouchIDNotAvailable:
            return Languages.errorBiometryType.LAErrorTouchIDNotAvailable;
        case ERROR_BIOMETRIC.NOT_ENROLLED:
            return Languages.errorBiometryType.NOT_ENROLLED;
        case ERROR_BIOMETRIC.ErrorFaceId:
            return Languages.errorBiometryType.ErrorFaceId;
        default:
            return Languages.errorBiometryType.NOT_DEFINE;
    }
}

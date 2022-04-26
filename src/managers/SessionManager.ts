import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';

import { UserInfoModel } from '@/models/user-model';
import StorageUtils from '@/utils/StorageUtils';
import { StorageKeys } from '@/commons/constants';

export const DeviceInfos = {
    DeviceName: '',
    DeviceId: DeviceInfo.getDeviceId(),
    UniqueID: DeviceInfo.getUniqueId(),
    VersionName: DeviceInfo.getVersion(),
    VersionID: DeviceInfo.getBuildNumber(),
    HasNotch: DeviceInfo.hasNotch()
};

class SessionManager {
    userInfo: UserInfoModel | undefined;

    accessToken: string | null | undefined;

    refreshToken: string | null | undefined;

    // biometryType: string | null | undefined;

    isSkipOnboarding: boolean | null | undefined;

    isEnableFastAuthentication: boolean | null | undefined;

    lastTabIndexBeforeOpenAuthTab: number | undefined;

    async initData(callback: any) {
        DeviceInfos.DeviceName = await DeviceInfo.getDeviceName();

        this.lastTabIndexBeforeOpenAuthTab = 0;

        const keys = [
            StorageKeys.KEY_ACCESS_TOKEN,
            StorageKeys.KEY_USER_INFO,
            StorageKeys.KEY_SKIP_ONBOARDING,
            StorageKeys.KEY_ENABLE_FAST_AUTHENTICATION
        ];
        AsyncStorage.multiGet(keys, (err, stores = []) => {
            for (let i = 0; i < stores.length; i++) {
                const store = stores[i];

                if (store[0] === StorageKeys.KEY_ACCESS_TOKEN) {
                    this.accessToken = store[1];
                } else if (store[0] === StorageKeys.KEY_SKIP_ONBOARDING) {
                    try {
                        this.isSkipOnboarding = store[1] ? JSON.parse(store[1]) : undefined;
                    } catch (e) { }
                } else if (store[0] === StorageKeys.KEY_ENABLE_FAST_AUTHENTICATION) {
                    try {
                        this.isEnableFastAuthentication = store[1] ? JSON.parse(store[1]) : undefined;
                    } catch (e) { }
                    
                }
                // else if (store[0] === StorageKeys.KEY_BIOMETRY_TYPE) {
                //     try {
                //         this.biometryType = store[1] ? JSON.parse(store[1]) : undefined;
                //     } catch (e) { }
                    
                // } 
                else if (store[0] === StorageKeys.KEY_USER_INFO) {
                    try {
                        this.userInfo = store[1] ? JSON.parse(store[1]) : undefined;
                    } catch (e) { }
                }
            }
            callback();
        });
    }

    async setAccessToken(token?: string, pwd?: string) {
        this.accessToken = token;
        if (token) {
            StorageUtils.saveDataToKey(StorageKeys.KEY_ACCESS_TOKEN, token);
        } else {
            StorageUtils.clearDataOfKey(StorageKeys.KEY_ACCESS_TOKEN);
        }
    }

    setUserInfo(userInfo?: UserInfoModel) {
        this.userInfo = userInfo;
        if (userInfo) {
            StorageUtils.saveDataToKey( StorageKeys.KEY_USER_INFO, JSON.stringify(this.userInfo));
        } else {
            StorageUtils.clearDataOfKey(StorageKeys.KEY_USER_INFO);
        }
    }

    setSkipOnboarding() {
        this.isSkipOnboarding = true;
        StorageUtils.saveDataToKey(StorageKeys.KEY_SKIP_ONBOARDING, JSON.stringify(true));
    }

    setEnableFastAuthentication(enable?:boolean) {
        this.isEnableFastAuthentication = enable;
        if(enable) StorageUtils.saveDataToKey(StorageKeys.KEY_ENABLE_FAST_AUTHENTICATION, JSON.stringify(true));
        else StorageUtils.clearDataOfKey(StorageKeys.KEY_ENABLE_FAST_AUTHENTICATION);
    }

    getUserInfo() {
        return this.userInfo;
    }

    logout() {
        this.setUserInfo();
        this.setAccessToken();
        this.lastTabIndexBeforeOpenAuthTab = 0;
    }
}

export default new SessionManager();

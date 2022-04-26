import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useMemo } from 'react';
import { Platform } from 'react-native';
import TouchID from 'react-native-touch-id';

import {
    ENUM_BIOMETRIC_TYPE,
    ERROR_BIOMETRIC
} from '@/commons/constants';
import Languages from '@/commons/Languages';
import ScreenNames from '@/commons/ScreenNames';
import Account from '@/containers/account/Account';
import ChangePassword from '@/containers/account/ChangePwd';
import EditProfile from '@/containers/account/EditProfile';
import InformationAccount from '@/containers/account/InformationAccount';
import InviteFriends from '@/containers/account/InviteFriends';
import QuickAuThen from '@/containers/account/QuickAuthencation';
import AccumulatedAssets from '@/containers/asset/AccumulatedAssets';
import Assets from '@/containers/asset/Assets';
import BookDetail from '@/containers/asset/BookDetail';
import CashFlow from '@/containers/asset/CashFlow';
import ConvertScreen from '@/containers/asset/ConvertScreen';
import PackageDetail from '@/containers/asset/PackageDetail';
import PaymentMethod from '@/containers/asset/PaymentMethod';
import WithDrawFromAccount from '@/containers/asset/WithDrawFromAccount';
import ConfirmOTP from '@/containers/ConfirmOTP';
import LinkAccount from '@/containers/LinkAccount';
import Login from '@/containers/Login';
import MyWebview from '@/containers/MyWebview';
import Notification from '@/containers/Notification';
import Onboarding from '@/containers/Onboarding';
import Product from '@/containers/Product';
import Splash from '@/containers/Splash';
import Help from '@/containers/support/Help';
import Manual from '@/containers/support/Manual';
import Question from '@/containers/support/Questions';
import TopUp from '@/containers/TopUp';
import Transactions from '@/containers/transaction/Transactions';
import { useAppStore } from '@/hooks';
import SessionManager, { DeviceInfos } from '@/managers/SessionManager';
import { MyTabBar } from './MyTabBar';
import IntroProduct from '@/containers/IntroProduct';

const screenOptions = { headerShown: false };

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const RootStack = observer(() => {
    const { fastAuthInfo } = useAppStore();

    useEffect(() => {
        initState();
    }, []);

    const initState = useCallback(() => {
        if (SessionManager.isEnableFastAuthentication) {
            fastAuthInfo.setEnableFastAuthentication(true);
        }
        if (Platform.OS === 'ios' && DeviceInfos.HasNotch) {
            fastAuthInfo.setSupportedBiometry(ENUM_BIOMETRIC_TYPE.FACE_ID);
        }
        if (Platform.OS === 'ios' && !DeviceInfos.HasNotch) {
            fastAuthInfo.setSupportedBiometry(ENUM_BIOMETRIC_TYPE.TOUCH_ID);
        }
        if (Platform.OS === 'android') {
            TouchID.isSupported()
                .then((biometricType) => {
                    if (biometricType) {
                        fastAuthInfo.setSupportedBiometry(ENUM_BIOMETRIC_TYPE.TOUCH_ID);
                    }
                })
                .catch((error) => {
                    if (error?.code === ERROR_BIOMETRIC.NOT_SUPPORTED) {
                        fastAuthInfo.setSupportedBiometry('');
                    } else {
                        fastAuthInfo.setSupportedBiometry(ENUM_BIOMETRIC_TYPE.TOUCH_ID);
                    }
                });
        }
    }, [fastAuthInfo]);

    const getTabBarVisibility = useCallback((route: any) => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (
            routeName === undefined ||
      routeName === ScreenNames.product ||
      routeName === ScreenNames.assets ||
      routeName === ScreenNames.transactions ||
      routeName === ScreenNames.help
        ) {
            return true;
        }
        return false;
    }, []);

    const getOption = useCallback(
        ({ route }: any) => {
            return {
                tabBarVisible: getTabBarVisibility(route)
            } as any;
        },
        [getTabBarVisibility]
    );

    const renderTabBar = useCallback((props) => <MyTabBar {...props} />, []);

    const AuthStack = useCallback(() => {
        return (
            <Stack.Navigator screenOptions={screenOptions}>
                <Stack.Screen name={ScreenNames.login} component={Login} />
                <Stack.Screen name={ScreenNames.confirmOtp} component={ConfirmOTP} />
            </Stack.Navigator>
        );
    }, []);

    const AssetsStack = useCallback(() => {
        return (
            <Stack.Navigator screenOptions={screenOptions}>
                <Stack.Screen name={ScreenNames.assets} component={Assets} />
                <Stack.Screen name={ScreenNames.topUp} component={TopUp} />
                <Stack.Screen
                    name={ScreenNames.convertScreen}
                    component={ConvertScreen}
                />
                <Stack.Screen
                    name={ScreenNames.accumulatedAssets}
                    component={AccumulatedAssets}
                />
                <Stack.Screen
                    name={ScreenNames.packageDetail}
                    component={PackageDetail}
                />
                <Stack.Screen name={ScreenNames.bookDetail} component={BookDetail} />
                <Stack.Screen
                    name={ScreenNames.paymentMethod}
                    component={PaymentMethod}
                />
                <Stack.Screen
                    name={ScreenNames.withDrawFromAccount}
                    component={WithDrawFromAccount}
                />
                <Stack.Screen
                    name={ScreenNames.transactions}
                    component={Transactions}
                />
                
                <Stack.Screen name={ScreenNames.cashFlow} component={CashFlow} />
            </Stack.Navigator>
        );
    }, []);

    const ProductStack = useCallback(() => {
        return (
            <Stack.Navigator
                screenOptions={screenOptions}
                initialRouteName={Languages.tabs.product}
            >
                <Stack.Screen name={ScreenNames.product} component={Product} />
                <Stack.Screen name={ScreenNames.introProduct} component={IntroProduct} />
                <Stack.Screen name={ScreenNames.login} component={Login} />
                <Stack.Screen name={ScreenNames.account} component={Account} />
                <Stack.Screen
                    name={ScreenNames.informationAccount}
                    component={InformationAccount}
                />
                <Stack.Screen name={ScreenNames.editProfile} component={EditProfile} />
                <Stack.Screen
                    name={ScreenNames.inviteFriends}
                    component={InviteFriends}
                />
                <Stack.Screen
                    name={ScreenNames.quickAuthentication}
                    component={QuickAuThen}
                />
                <Stack.Screen name={ScreenNames.changePwd} component={ChangePassword} />
                <Stack.Screen name={ScreenNames.linkAccount} component={LinkAccount} />
                <Stack.Screen
                    name={ScreenNames.notifiCation}
                    component={Notification}
                />
            </Stack.Navigator>
        );
    }, []);

    const HelpStack = useCallback(() => {
        return (
            <Stack.Navigator screenOptions={screenOptions}>
                <Stack.Screen name={ScreenNames.help} component={Help} />
                <Stack.Screen name={ScreenNames.questions} component={Question} />
                <Stack.Screen name={ScreenNames.manual} component={Manual} />
            </Stack.Navigator>
        );
    }, []);

    const Tabs = useCallback(
        () => (
            <Tab.Navigator screenOptions={screenOptions} tabBar={renderTabBar}>
                <Tab.Screen
                    name={Languages.tabs.product}
                    component={ProductStack}
                    options={getOption}
                />
                <Tab.Screen
                    name={Languages.tabs.assets}
                    component={AssetsStack}
                    options={getOption}
                />
                <Tab.Screen
                    name={Languages.tabs.transactions}
                    component={Transactions}
                    options={getOption}
                />
                <Tab.Screen
                    name={Languages.tabs.help}
                    component={HelpStack}
                    options={getOption}
                />
            </Tab.Navigator>
        ),
        [AssetsStack, HelpStack, ProductStack, getOption, renderTabBar]
    );

    const AppStack = useCallback(() => {
        return (
            <Stack.Navigator screenOptions={screenOptions}>
                <Stack.Screen name={ScreenNames.splash} component={Splash} />
                <Stack.Screen name={ScreenNames.onboarding} component={Onboarding} />
                <Stack.Screen name={ScreenNames.tabs} component={Tabs} />
                <Stack.Screen name={ScreenNames.auth} component={AuthStack} />
                <Stack.Screen name={ScreenNames.myWebview} component={MyWebview} />
            </Stack.Navigator>
        );
    }, [AuthStack, Tabs]);

    const renderRootStack = useMemo(() => {
        return <AppStack />;
    }, [AppStack]);

    return renderRootStack;
});

export default RootStack;

import appleAuth from '@invertase/react-native-apple-authentication';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Platform } from 'react-native';
import { AccessToken, AuthenticationToken, LoginManager } from 'react-native-fbsdk-next';

import { configGoogleSignIn } from '@/commons/constants';

GoogleSignin.configure(configGoogleSignIn);

export const loginWithApple = async () => {
    try {
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME]
        });

        console.log('appleAuthRequestResponse', appleAuthRequestResponse);

        const { identityToken } = appleAuthRequestResponse;

        if (identityToken) {
            console.log(identityToken);
            return identityToken;
        } 
        console.log('error');
        return null;
        
       
    } catch (error: any) {
        if (error?.code === appleAuth.Error.CANCELED) {
            console.warn('User canceled Apple Sign in.');
        } else {
            console.error(error);
        }
        return null;
    }
};
export const loginWithGoogle =async () => {
    try {
        const { idToken } = await GoogleSignin.signIn();
        const { accessToken } = await GoogleSignin.getTokens();
        console.log(accessToken);
        if (idToken || accessToken) {
            GoogleSignin.signOut();
            return accessToken;
        }
        return accessToken;
    } catch (err) {
        console.log('getAccessTokenGoogle error', err);
        return null;
    }
};

export const loginWithFacebook = async () => {
    try {
        await LoginManager.logInWithPermissions(
            ['public_profile', 'email'],
            'limited',
            'my_nonce'
        );
        if (Platform.OS === 'ios') {
            const data = await AuthenticationToken.getAuthenticationTokenIOS();
            console.log(data?.authenticationToken);
            if (data?.authenticationToken) {
                LoginManager.logOut();
            }
        } else {
            const data = await AccessToken.getCurrentAccessToken();
            if (data?.accessToken) {
                LoginManager.logOut();
            }
            console.log(data?.accessToken);
        }
    } catch (error) {
        console.log(error);
    }
};

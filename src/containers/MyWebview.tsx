import React, { useCallback, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import WebView from 'react-native-webview';

import MyWebViewProgress from '@/components/MyWebViewProgress';
import { HeaderBar } from '@/components';
import { PADDING_BOTTOM } from '@/commons/Configs';

const MyWebview = ({ route }: any) => {
    const webProgressRef = useRef(null);
    const webViewRef = useRef<WebView>(null);

    const onLoadProgress = useCallback((e) => {
        webProgressRef.current?.setProgress(e?.nativeEvent?.progress);
    }, []);

    return (
        <View style={styles.mainContainer}>
            <HeaderBar
                hasBack
                title={route?.params?.title_vi}
            />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <MyWebViewProgress
                    ref={webProgressRef}
                />

                <WebView
                    ref={webViewRef}
                    source={{ html: route?.params?.content_vi }}
                    javaScriptEnabled={true}
                    onLoadProgress={onLoadProgress}
                />
            </ScrollView>
        </View>
    );
};

export default MyWebview;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingBottom: PADDING_BOTTOM
    },
    scrollContent: {
        flex: 1
    }
});

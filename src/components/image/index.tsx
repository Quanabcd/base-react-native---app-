import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

import { COLORS } from '../../theme';
import NoImage from '../NoImage';
import { MyImageViewProps } from './type';

export const MyImageView = React.memo(({ imageUrl, style, resizeMode }: MyImageViewProps) => {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [avatarUrl, setAvatarUrl] = useState<string>(imageUrl);

    useEffect(() => {
        setAvatarUrl(imageUrl);
    }, [imageUrl]);

    const _onLoadFailed = useCallback(() => {
        setLoading(false);
        // onLoadFailed?.();
        setAvatarUrl('');
    }, []);

    const onLoadEnd = useCallback(() => {
        setLoading(false);
    }, []);

    const _onLoadStart = useCallback(() => {
        setLoading(true);
    }, []);

    const indicatorSize = useMemo(() => {
        if (style?.height > 100) {
            return 'large';
        }
        return 'small';
    }, [style?.height]);

    const renderImage = useMemo(() => {
        return (
            avatarUrl ?
                <>
                    <FastImage
                        style={[styles.img, style]}
                        resizeMode={resizeMode || 'cover'}
                        source={{ uri: avatarUrl }}
                        onLoadStart={_onLoadStart}
                        onError={_onLoadFailed}
                        onLoadEnd={onLoadEnd}
                    />
                    <View style={styles.activityIndicatorContainer}>
                        <ActivityIndicator
                            style={styles.activityIndicator}
                            size={indicatorSize}
                            animating={isLoading}
                            color={COLORS.BLUE}
                        />
                    </View>
                </> :
                <NoImage style={{ ...styles.img, ...style }} />
        );
    }, [avatarUrl, style, resizeMode, _onLoadStart, _onLoadFailed, onLoadEnd, indicatorSize, isLoading]);

    return renderImage;
});

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    img: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    activityIndicatorContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    activityIndicator: {
        alignSelf: 'center'
    }
});

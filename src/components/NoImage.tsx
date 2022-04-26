import React, { useRef } from 'react';
import { View, StyleSheet, Image } from 'react-native';

import { COLORS } from '@/theme';
import { SCREEN_WIDTH } from '@/utils/DimensionUtils';

const RATIO = 3.81;
interface Size {
    width: number,
    height: number,
}
const NoImage = ({ style }: any) => {
    const size = useRef<Size>({
        width: style.width ? style.width : SCREEN_WIDTH / 1.6,
        height: style ? style.height : SCREEN_WIDTH / 1.6 / RATIO
    });

    return <View
        style={styles.container}>
    </View>;
};

export default NoImage;

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.GRAY_4,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

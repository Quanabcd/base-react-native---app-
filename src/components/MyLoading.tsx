import React from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet
} from 'react-native';

import { COLORS } from '../theme';

const MyLoading = ({ isOverview }: { isOverview?: boolean }) =>
    isOverview ?
        <ActivityIndicator
            size="small"
            color={COLORS.GREEN}
            style={styles.overlay} /> :
        <View style={styles.inline} >
            <ActivityIndicator size="small" color={COLORS.GREEN} />
        </View >;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 10000,
        opacity: 0.6,
        width: '100%',
        height: '100%'
    },
    inline: {
        marginVertical: 10,
        alignItems:'center'
    },
    activityIndicator: {
        width: 60,
        height: 60,
        borderRadius: 5
    }
});

export default MyLoading;

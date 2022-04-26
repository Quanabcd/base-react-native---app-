import { observer } from 'mobx-react';
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Touchable } from '@/components';

import { COLORS } from '@/theme';
import { Configs } from '@/commons/Configs';
const News = (({title}:{ title: string}) => {
    return (
        <Touchable style={styles.item}>
            <View style={styles.rowItem}>
                <Text style={styles.txtSupport}>{title}</Text>
            </View>
        </Touchable>
    );
});
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    boxItem: {
        paddingHorizontal: 15,
        marginTop: 10
    },
    item: {
        borderBottomWidth: 1,
        borderColor: COLORS.GRAY_1,
        marginTop: 16
    },
    rowItem: {
        flexDirection: 'row'
    },
    txtSupport: {
        fontSize: Configs.FontSize.size16,
        color: COLORS.BLACK_PRIMARY,
        fontFamily: Configs.FontFamily.medium,
        paddingBottom: 10
    },
})
export default News;

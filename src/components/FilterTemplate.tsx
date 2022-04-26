import React from 'react';
import {
    StyleSheet, Text, TextStyle
} from 'react-native';

import { Touchable } from '@/components';
import { KeyValueModel } from '@/models/key-value';
import { COLORS, Styles } from '@/theme';

const FilterTemplate = ({ item, selected, onPress, style }:
    { item: KeyValueModel , selected: boolean, onPress: any, style?: TextStyle }) => {

    return <Touchable style={selected ? styles.filterSelected : styles.filterUnSelected}
        onPress={onPress}>
        <Text style={[selected ? styles.filterTxtSelected : styles.filterTxtUnSelected, style]}>
            {item.label}
        </Text>
    </Touchable>;
};

export default FilterTemplate;

const styles = StyleSheet.create({
    filterUnSelected: {
        flex: 1,
        borderRadius: 5,
        backgroundColor: COLORS.GRAY_1,
        marginHorizontal: 5
    },
    filterSelected: {
        flex: 1,
        borderRadius: 5,
        backgroundColor: COLORS.RED,
        marginHorizontal: 5
    },
    filterTxtSelected: {
        ...Styles.typography.regular,
        color: COLORS.WHITE,
        paddingVertical: 8,
        paddingHorizontal: 20,
        alignSelf: 'center'
    },
    filterTxtUnSelected: {
        ...Styles.typography.regular,
        color: COLORS.GRAY_6,
        paddingVertical: 8,
        paddingHorizontal: 20,
        alignSelf: 'center'
    }
});

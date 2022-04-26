import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import IcHelp from '@/assets/images/ic_help.svg';
import IcProduct from '@/assets/images/ic_product_2.svg';
import { Touchable } from '@/components';
import { COLORS, Styles } from '@/theme';
import { Configs } from '@/commons/Configs';
import Languages from '@/commons/Languages';
import { PRODUCT_DATA } from '../mocks/data';
import { ProductModel } from '@/models/product';
import KeyValueRating from '@/components/KeyValueRating';

const Introduce = observer(() => {
    useEffect(() => {

    }, []);

    const renderIntro = useMemo(() => {
        return <Touchable style={styles.sectionContainer}>
            <View style={styles.row}>
                <IcHelp />
                <Text style={styles.sectionTxt}>
                    {Languages.accumulate.intro}
                </Text>
            </View>
            <Text style={styles.desTxt}>
                {'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book'}
            </Text>
        </Touchable>;
    }, []);

    const renderProduct = useCallback((item: any) => {
        return <KeyValueRating
            color={COLORS.RED}
            label={item.title}
            value={`${item.percent}${Languages.accumulate.rate}`}
        />;
    }, []);

    const renderProducts = useMemo(() => {
        return <Touchable style={styles.sectionContainer}>
            <View style={styles.row}>
                <IcProduct />
                <Text style={styles.sectionTxt}>
                    {Languages.accumulate.products}
                </Text>
            </View>
            {PRODUCT_DATA.map((item) => renderProduct(item))}
        </Touchable>;
    }, [renderProduct]);

    return (
        <View style={styles.container}>
            {renderIntro}
            {renderProducts}
        </View>
    );
});

export default Introduce;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    sectionContainer: {
        ...Styles.shadow,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 10
    },
    sectionTxt: {
        ...Styles.typography.bold,
        fontSize: Configs.FontSize.size16,
        marginHorizontal: 10
    },
    desTxt: {
        ...Styles.typography.regular,
        marginTop: 10,
        color: COLORS.GRAY_6
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});

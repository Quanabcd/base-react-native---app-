import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { Button, HeaderBar } from '@/components';
import { Configs, PADDING_BOTTOM } from '@/commons/Configs';
import Languages from '@/commons/Languages';
import { COLORS, Styles } from '@/theme';
import { ProductModel } from '@/models/product';
import { useAppStore } from '@/hooks';

const IntroProduct = ({ route }: any) => {
    const {apiServices} = useAppStore();
    const [product] = useState<ProductModel>(route?.params);
    const idProductDetails = product.id;
    const [productDetailsData,setProductDetailsData] = useState<any>({});

    const fetchProductDetails = useCallback(async(id: number)=>{
        const res = await apiServices.common.getProductDetails(id);
        if(res.success){
            const dataProduct = res?.data as ProductModel;
            setProductDetailsData(dataProduct);
        }
    },[apiServices.common]);

    useEffect(()=>{
        fetchProductDetails(idProductDetails);
    },[fetchProductDetails, idProductDetails]);

    const onInvest = useCallback(() => {
    }, []);

    return (
        <View style={styles.mainContainer}>
            <HeaderBar
                hasBack
                title={Languages.product.intro}
            />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.txtTitle}>{`${Languages.product.package} ${product.title.toLowerCase()}`}</Text>
                <View style={styles.row}>
                    <Text style={styles.contentTitle}>{Languages.product.interest}</Text>
                    <Text style={styles.contentText}>{Languages.product.dot}{productDetailsData.interest}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.contentTitle}>{Languages.product.form}</Text>
                    <View style={styles.form}>
                        <Text style={styles.contentText}>{Languages.product.dot}{`${productDetailsData.form}`}</Text>
                        <Text style={styles.contentText}>{Languages.product.dot}{`${productDetailsData.description}`}</Text>
                    </View>
                </View>
                <Button
                    style={styles.btn}
                    label={Languages.product.investNow}
                    onPress={onInvest}
                    buttonStyle={'RED'}
                />
            </ScrollView>
        </View>
    );
};

export default IntroProduct;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingBottom: PADDING_BOTTOM
    },
    scrollContent: {
        flex: 1,
        padding: 10
    },
    btn: {
        marginVertical: 20
    },
    txtTitle: {
        ...Styles.typography.medium,
        color: COLORS.BLACK,
        fontSize: Configs.FontSize.size16,
        marginBottom:12
    },
    contentText: {
        ...Styles.typography.regular,
        color: COLORS.GRAY_6,
        marginBottom:12
    },
    row:{
        flexDirection:'row'
    },
    form:{
        justifyContent:'space-between',
        marginRight:10
    },
    contentTitle:{
        ...Styles.typography.regular,
        color: COLORS.BLACK_PRIMARY,
        fontSize: Configs.FontSize.size16,
        marginBottom:12,
        marginHorizontal:10
    }
});

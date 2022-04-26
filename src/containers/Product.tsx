import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
    Animated,
    FlatList,
    Image,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    ViewProps
} from 'react-native';
import { ScalingDot } from 'react-native-animated-pagination-dots';
import LinearGradient from 'react-native-linear-gradient';

import BankIcon from '@/assets/images/ic_bank.svg';
import IconBell from '@/assets/images/ic_bell.svg';
import ContactIcon from '@/assets/images/ic_contract_inactive.svg';
import EmailIcon from '@/assets/images/ic_email.svg';
import PhoneIcon from '@/assets/images/ic_phone.svg';
import MarkIcon from '@/assets/images/ic_eKYC.svg';
import RightIcon from '@/assets/images/ic_right.svg';
import { Configs } from '@/commons/Configs';
import Languages from '@/commons/Languages';
import ScreenNames from '@/commons/ScreenNames';
import { Touchable } from '@/components';
import { useAppStore } from '@/hooks';
import Navigator from '@/routers/Navigator';
import { COLORS, Styles } from '@/theme';
import { SCREEN_WIDTH } from '@/utils/DimensionUtils';
import { INTRO_DATA, TRUST_DATA, UTILITIES } from './mocks/data';
// import { FastAuthInfo } from '@/managers/FastAuthenInfo';
import { ProductModel } from '@/models/product';
import IcUnlimited from '@/assets/images/ic_unlimited.svg';
import IcPeriod from '@/assets/images/ic_period.svg';
import DateUtils from '@/utils/DateUtils';

const Product = observer(() => {
    const { userManager,fastAuthInfo, apiServices } = useAppStore();
    const [productData,setProductData] = useState<ProductModel[]>([]);

    const scrollX = useRef(new Animated.Value(0)).current;

    const keyExtractor = useCallback((item) => item.key, []);

    const onGotoAccount = useCallback(() => {
        if (fastAuthInfo.isEnableFastAuth) Navigator.navigateScreen(ScreenNames.login, { routeName: ScreenNames.account });
        else if (!fastAuthInfo.isEnableFastAuth) Navigator.pushScreen(ScreenNames.account);
    }, [fastAuthInfo.isEnableFastAuth]);

    const onGotoNotifiCation = useCallback(() => {
        Navigator.pushScreen(ScreenNames.notifiCation);
    }, []);

    const fetchProduct = useCallback(async () => {
        const res = await apiServices.common.getProduces();
        const dataProducts = res.data as ProductModel[];
        if(res.success && dataProducts){
            setProductData(dataProducts);
        };
    }, [apiServices.common]);

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);

    const renderHeader = useMemo(() => {
        return userManager.userInfo ? (
            <View style={styles.headerContainer}>
                {Platform.OS === 'ios' ? null : (
                    <StatusBar
                        translucent
                        backgroundColor={'transparent'}
                        barStyle={'light-content'}
                    />
                )}
                <LinearGradient
                    end={{ x: 3, y: 1 }}
                    colors={[COLORS.RED, COLORS.WHITE]}
                    style={styles.circle}
                />
                <LinearGradient
                    end={{ x: -4, y: 1 }}
                    colors={[COLORS.RED, COLORS.WHITE]}
                    style={styles.circle2}
                />
                <Touchable style={styles.wrapInfo}
                    onPress={onGotoAccount}>
                    <View style={styles.wrapAvatar}></View>
                    <View style={styles.wrapInfoText}>
                        <Text style={styles.txtWelcome}>{Languages.product.welcome}</Text>
                        <Text style={styles.txtName}>{userManager.userInfo?.full_name}</Text>
                    </View>
                </Touchable>
                <Touchable onPress={onGotoNotifiCation}>
                    <IconBell style={styles.iconBell} width={20} height={20} />
                </Touchable>
            </View>
        ) : <StatusBar
            translucent
            backgroundColor={'transparent'}
            barStyle={'dark-content'}
        />;
    }, [onGotoAccount, onGotoNotifiCation, userManager.userInfo]);

    const renderCommunity = useMemo(() => {
        return (
            <View style={styles.wrapJoinCommunity}>
                <Text style={styles.today}>{Languages.product.today}{DateUtils.getCurrentDay()}</Text>
                <Text style={styles.txtJoinCommunity}>
                    {Languages.product.joinWithCommunity}
                </Text>
                <Text style={styles.txtPeople}>{Languages.product.peopleJoining}</Text>
                <Touchable style={styles.btJoin}>
                    <Text style={styles.txtBt}>{Languages.product.joinNow}</Text>
                </Touchable>
            </View>
        );
    }, []);

    const renderBanner = useCallback(({ item }) => {
        return (
            <View>
                <Image
                    style={styles.imgBanner}
                    source={item?.path}
                />
            </View>
        );
    }, []);
    const renderItemTrustUni = useCallback(({ item }) => {
        return (
            <View style={styles.itemBanner2}>
                <Image resizeMode={'cover'} source={item?.path} />
                <View style={styles.wrapTextBanner2}>
                    <Text style={styles.txtShouldUse}>{Languages.product.shouldUse}</Text>
                </View>
            </View>
        );
    }, []);

    const renderUtility = useCallback(({ item }) => {
        const onNavigate = () => {
            Navigator.navigateScreen(item?.screen);
        };
        return (
            <Touchable style={styles.itemUtility} onPress={onNavigate}>
                {item.icon}
                <Text style={styles.txtUtility}>{item.title}</Text>
            </Touchable>
        );
    }, []);

    const renderProduct = useCallback((item) => {

        const onPress = () => {
            Navigator.pushScreen(ScreenNames.introProduct, item);
        };

        return (
            <Touchable style={styles.itemProduct}
                onPress={onPress}
                key={item.id}>
                <View style={styles.row}>
                    {item?.period === 0? <IcUnlimited width={35} height={35} /> :
                        <View style={styles.txtIconContainer}>
                            <IcPeriod width={35} height={35} style={styles.icPeriod} />
                            <Text style={styles.txtIcon}>
                                {item?.period}
                            </Text>
                        </View>}
                    <View style={styles.wrapText}>
                        <Text style={styles.txtTitle}>{item.title}</Text>
                        <View style={styles.wrapRate}>
                            <Text style={styles.txtRate}>{Languages.product.dot}{Languages.product.interest}</Text>
                            <Text style={styles.txtPercent}>{item.interest}</Text>
                            <Text style={styles.txtYear}>{Languages.product.year}</Text> 
                        </View>
                        <Text style={styles.txtCenter}>{Languages.product.dot}{item.form}</Text>
                        <Text style={styles.txtCenter}>{Languages.product.dot}{item.description}</Text>
                    </View>
                </View>
                <RightIcon width={8} height={8} />
            </Touchable>
        );
    }, []);

    const renderScalingDot = useCallback((data: Array<any>) => {
        return (
            <View style={styles.dotContainer}>
                <ScalingDot
                    data={data}
                    scrollX={scrollX}
                    containerStyle={styles.containerDotStyle}
                    inActiveDotColor={COLORS.GRAY}
                    activeDotColor={COLORS.RED_2}
                    dotStyle={styles.dot}
                />
            </View>
        );
    }, [scrollX]);

    const NavigateKyc = useCallback(() => {
        Navigator.navigateScreen(ScreenNames.informationAccount);
    }, []);

    const renderInfoItem = useCallback(
        (icon: any, title: string, active: boolean, onPress?: any) => {
            const styleActive = {
                backgroundColor: active ? COLORS.WHITE : COLORS.GRAY_1,
                borderColor: active ? COLORS.RED : null,
                borderWidth: active ? 1 : 0
            } as ViewProps;

            const styleText = {
                color: active ? COLORS.RED : COLORS.GRAY_6
            } as ViewProps;

            return (
                <Touchable onPress={onPress} style={styles.itemInfo}>
                    <View style={[styles.circleIcon, styleActive]}>{icon}</View>
                    <Text style={[styles.txtItemInfo, styleText]}>{title}</Text>
                </Touchable>
            );
        },
        []
    );

    const renderUserInfo = useMemo(() => {
        return userManager.userInfo && <>
            <Text style={styles.txtHeader}>{Languages.product.information}</Text>
            <View style={styles.containerInfo}>
                <Text style={styles.txtSecurity}>
                    {Languages.product.securityWarning}
                </Text>
                <View style={styles.rowItem}>
                    {renderInfoItem(<EmailIcon />, Languages.product.email, true)}
                    {renderInfoItem(<PhoneIcon />, Languages.product.phone, true)}
                    {renderInfoItem(<MarkIcon />, Languages.product.any, false, NavigateKyc)}
                    {renderInfoItem(<ContactIcon />, Languages.product.contact, false)}
                    {renderInfoItem(<BankIcon />, Languages.product.account, false)}
                </View>
            </View>
        </>;
    }, [NavigateKyc, renderInfoItem, userManager.userInfo]);

    return (
        <View style={styles.container}>
            {renderHeader}
            <ScrollView
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                contentContainerStyle={!userManager.userInfo && styles.contentContainer}
            >
                <View>
                    <Text style={styles.txtHeader}>{Languages.product.hotNews}</Text>
                    <FlatList
                        data={INTRO_DATA}
                        keyExtractor={keyExtractor}
                        showsHorizontalScrollIndicator={false}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                            {
                                useNativeDriver: false
                            }
                        )}
                        pagingEnabled
                        horizontal
                        decelerationRate={'normal'}
                        renderItem={renderBanner}
                    />
                </View>
                {renderScalingDot(INTRO_DATA)}
                <Text style={styles.txtHeader}>
                    {Languages.product.productIsSelling}
                </Text>
                <View style={styles.wrapProduct}>
                    {productData.map((item?: any) => renderProduct(item))}
                </View>

                {renderUserInfo}

                <View>
                    <Text style={styles.txtHeader}>{Languages.product.trust}</Text>
                    <FlatList
                        data={TRUST_DATA}
                        keyExtractor={keyExtractor}
                        showsHorizontalScrollIndicator={false}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                            {
                                useNativeDriver: false
                            }
                        )}
                        pagingEnabled
                        horizontal
                        decelerationRate={'normal'}
                        renderItem={renderItemTrustUni}
                    />
                </View>
                {renderScalingDot(TRUST_DATA)}
                {renderCommunity}
                <View style={styles.wrapUtilities}>
                    <Text style={styles.txtHeader}>{Languages.product.utilities}</Text>
                    <FlatList
                        style={styles.flatList}
                        data={UTILITIES}
                        keyExtractor={keyExtractor}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        decelerationRate={'normal'}
                        renderItem={renderUtility}
                    />
                </View>
            </ScrollView>
        </View>
    );
});
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentContainer: {
        paddingTop: 20
    },
    headerContainer: {
        backgroundColor: COLORS.RED_5,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 10,
        paddingTop: 50
    },
    circle: {
        width: 190,
        height: 190,
        borderRadius: 125,
        backgroundColor: COLORS.RED,
        position: 'absolute',
        left: -30,
        top: -20
    },
    circle2: {
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: COLORS.RED,
        position: 'absolute',
        right: -60,
        top: -55
    },
    wrapInfo: {
        flexDirection: 'row'
    },
    wrapAvatar: {
        width: 40,
        height: 40,
        borderWidth: 2,
        borderRadius: 25,
        borderColor: COLORS.WHITE
    },
    txtWelcome: {
        color: COLORS.WHITE,
        fontSize: Configs.FontSize.size12,
        fontFamily: Configs.FontFamily.medium
    },
    txtName: {
        color: COLORS.WHITE,
        fontSize: Configs.FontSize.size20,
        fontFamily: Configs.FontFamily.medium
    },
    wrapInfoText: {
        marginLeft: 16
    },
    iconBell: {
        marginBottom: 5
    },
    imgBanner: {
        width: SCREEN_WIDTH
    },
    itemBanner2: {
        marginLeft: 10,
        borderRadius: 12,
        overflow: 'hidden'
    },
    dotContainer: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 20
    },
    txtHeader: {
        fontSize: Configs.FontSize.size20,
        marginLeft: 16,
        marginTop: 25,
        marginBottom: 10,
        color: COLORS.BLACK,
        fontFamily: Configs.FontFamily.bold
    },
    wrapProduct: {
        ...Styles.shadow,
        marginHorizontal: 16,
        backgroundColor: COLORS.WHITE,
        paddingBottom: 10,
        borderRadius: 16
    },
    circleIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderColor: COLORS.RED,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemProduct: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.GRAY_1,
        alignItems: 'center',
        paddingRight: 10
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    txtProduct: {
        marginLeft: 10,
        fontSize: Configs.FontSize.size14,
        fontFamily: Configs.FontFamily.medium,
        color: COLORS.BLACK_PRIMARY
    },
    containerInfo: {
        borderRadius: 16,
        paddingHorizontal: 10,
        backgroundColor: COLORS.GRAY_10,
        paddingVertical: 10,
        marginHorizontal: 16,
        borderColor: COLORS.GRAY_7,
        borderWidth: 1
    },
    txtIcon: {
        ...Styles.typography.medium,
        fontSize: Configs.FontSize.size18,
        color: COLORS.RED,
        marginTop: 2,
        textAlign: 'center'
    },
    txtSecurity: {
        fontSize: Configs.FontSize.size12,
        fontFamily: Configs.FontFamily.medium,
        marginLeft: 8,
        color: COLORS.BLACK_PRIMARY
    },
    rowItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10
    },
    itemInfo: {
        alignItems: 'center',
        justifyContent: 'space-between',
        width: (SCREEN_WIDTH - 32) / 5
    },
    txtItemInfo: {
        fontSize: Configs.FontSize.size12,
        marginTop: 5,
        fontFamily: Configs.FontFamily.bold
    },
    wrapTextBanner2: {
        width: '100%',
        paddingVertical: 2,
        backgroundColor: COLORS.RED,
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtShouldUse: {
        width: '50%',
        textAlign: 'center',
        color: COLORS.WHITE,
        fontSize: Configs.FontSize.size14,
        fontFamily: Configs.FontFamily.bold
    },
    wrapJoinCommunity: {
        padding: 16,
        marginHorizontal: 16,
        borderRadius: 12,
        marginTop: 20,
        backgroundColor: COLORS.GRAY_10,
        borderColor: COLORS.GRAY_7,
        borderWidth: 1
    },
    btJoin: {
        paddingVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: COLORS.RED
    },
    txtJoinCommunity: {
        fontSize: Configs.FontSize.size20,
        color: COLORS.BLACK,
        marginBottom: 5,
        fontFamily: Configs.FontFamily.bold
    },
    txtPeople: {
        fontSize: Configs.FontSize.size32,
        color: COLORS.RED_3,
        fontFamily: Configs.FontFamily.bold,
        marginBottom: 16
    },
    today: {
        fontSize: Configs.FontSize.size12,
        color: COLORS.GRAY_9,
        fontFamily: Configs.FontFamily.regular
    },
    txtBt: {
        color: COLORS.RED,
        fontFamily: Configs.FontFamily.bold
    },
    itemUtility: {
        ...Styles.shadow,
        width: 120,
        paddingVertical: 10,
        backgroundColor: COLORS.WHITE,
        marginLeft: 16,
        alignItems: 'center',
        borderRadius: 10

    },
    wrapUtilities: {
        marginBottom: 10
    },
    txtUtility: {
        ...Styles.typography.regular,
        color: COLORS.BLACK,
        marginTop: 10
    },
    containerDotStyle: {
        top: 10
    },
    dot: {
        width: 8,
        height: 8
    },
    rowTxtProduct: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    flatList: {
        paddingVertical: 5
    },
    txtTitle: {
        ...Styles.typography.medium,
        color: COLORS.BLACK_PRIMARY
    },
    txtCenter: {
        ...Styles.typography.medium,
        fontSize: Configs.FontSize.size13,
        color: COLORS.GRAY_6,
        marginLeft: 10,
        marginTop: 3

    },
    txtRate: {
        ...Styles.typography.medium,
        fontSize: Configs.FontSize.size13,
        color: COLORS.GRAY_6,
        marginLeft: 10,
        marginTop: 3
    },
    wrapText: {
        marginLeft: 5
    },
    txtPercent: {
        ...Styles.typography.medium,
        fontSize: Configs.FontSize.size15,
        color: COLORS.RED,
        marginHorizontal: 2
    },
    wrapRate: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    txtYear: {
        ...Styles.typography.medium,
        fontSize: Configs.FontSize.size13,
        color: COLORS.GRAY_6
    },
    icPeriod: {
        position:'absolute',
        top:0,
        left:0
    },
    txtIconContainer: {
        width: 35,
        height: 35,
        justifyContent: 'center'
    }
});
export default Product;

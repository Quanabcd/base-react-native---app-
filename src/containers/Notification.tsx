import { observer } from 'mobx-react';
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {  StyleSheet, Text, View,  FlatList, TouchableOpacity } from 'react-native';
import Dash from 'react-native-dash';

import { ListNotify } from '@/containers/mocks/data';
import { HeaderBar } from '@/components';
import { COLORS, Styles } from '../theme';
import Languages from '@/commons/Languages';
import { Configs, PAGE_SIZE } from '@/commons/Configs';
import { SCREEN_HEIGHT } from '@/utils/DimensionUtils';
import { useAppStore } from '@/hooks';
import { NotificationModel } from '@/models/notify';
import MyLoading from '@/components/MyLoading';
import MyRefreshControl from '@/components/MyRefreshControl';


const Notify = observer(() => {

    const [listNotify, setNotifications] = useState<NotificationModel[]>([]);

    const { apiServices } = useAppStore();
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const [canLoadMore, setLoadMore] = useState<boolean>(true);
    const [lastId, setLastId] = useState<number>(0);
    const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState<boolean>(true);
    const pageSize = PAGE_SIZE;
    
    const fetchData = useCallback(async (isLoadMore?: boolean) => {
        const res = await apiServices.common.getNotify(isLoadMore ? lastId : 0, pageSize);

        const newNotifications = res.data as NotificationModel[];

        if (newNotifications?.length > 0) {
            setLastId(last => last + newNotifications.length);

            if (isLoadMore) {
                setNotifications(last => [...last, ...newNotifications]);
            } else {
                setNotifications(newNotifications);
            }
        }
        setLoadMore(newNotifications?.length >= pageSize);
    }, [apiServices.common, lastId, pageSize]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const keyExtractor = useCallback((item: NotificationModel) => {
        return `${item._id.$oid}`;
    }, []);

    const onRefresh = useCallback(() => {
        setIsRefreshing(true);
        fetchData();
        setIsRefreshing(false);
    }, [fetchData]);

    const renderFooter = useMemo(() => {
        return <View>
            {canLoadMore && <MyLoading isOverview={false} />}
        </View>;
    }, [canLoadMore]);

    const renderRefreshControl = useMemo(() => {
        return <MyRefreshControl
            isRefreshing={isRefreshing}
            onRefresh={onRefresh}
        />;
    }, [isRefreshing, onRefresh]);

    const onMomentumScrollBegin = useCallback(() => {
        setOnEndReachedCalledDuringMomentum(false);
    }, []);

    const onEndReached = useCallback(() => {
        if (!onEndReachedCalledDuringMomentum && canLoadMore) {
            setOnEndReachedCalledDuringMomentum(true);
            fetchData(true);
        }
    }, [canLoadMore, fetchData, onEndReachedCalledDuringMomentum]);
    
    const renderListNotify = useCallback(({ item }) => {
        return (
            <View key={item.id} style={styles.itemNoTiFy}>
                <View style={styles.opacity1}>
                    <TouchableOpacity>
                        <View style={styles.topItem}>
                            <Text style={styles.textTitle}>{item.action}</Text>
                            <Text style={styles.textTime}>{item.created_at}</Text>
                        </View>
                        <Dash
                            dashThickness={1}
                            dashLength={5}
                            dashGap={2}
                            dashColor={COLORS.GRAY_7} />
                        <View style={styles.botTomItem}>
                            <Text style={styles.textHead}>{item.status}</Text>
                            <Text style={styles.desCrePTion}>{item.message}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View >
        );
    }, []);

    const renderEmptyData = () => {
        return (
            <Text style={styles.textEmpty}>{Languages.notification.noNotify}</Text>
        );
    };


    const renderList = useMemo(() => {

        return <FlatList
            data={listNotify}
            renderItem={renderListNotify}
            showsHorizontalScrollIndicator={false}
            ListFooterComponent={renderFooter}
            refreshControl={renderRefreshControl}
            onEndReached={onEndReached}
            onMomentumScrollBegin={onMomentumScrollBegin}
            onEndReachedThreshold={0.01}
            ListEmptyComponent={renderEmptyData}
            {... { keyExtractor }}
        />;
    }, [listNotify, renderListNotify, renderFooter, renderRefreshControl, onEndReached, onMomentumScrollBegin, keyExtractor]);

    return (
        <View style={styles.container}>
            <HeaderBar
                title={Languages.notification.title}/>
            <View style={styles.listNoTiFy}>
                {renderList}
            </View>
        </View>
    );
});

export default Notify;
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    // opacity:
    // {
    //     opacity: 0.7
    // },
    opacity1:
    {

    },
    listNoTiFy: {
        paddingTop: 15,
        marginBottom: SCREEN_HEIGHT/Configs.FontSize.size8
    },
    itemNoTiFy: {
        ...Styles.shadow,
        marginBottom: 10,
        padding: 12,
        borderRadius: 5,
        marginHorizontal: 15
    },
    topItem: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.GRAY_2,
        paddingBottom: 10,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    textTitle: {
        ...Styles.typography.bold,
        flex: 1,    
        color: COLORS.BLACK
    },
    textTime: {
        ...Styles.typography.regular,
        color: COLORS.GRAY_6,
        fontSize: Configs.FontSize.size11
    },
    botTomItem: {
    },
    textHead: {
        ...Styles.typography.medium,
        color: COLORS.DARK_GREEN,
        fontSize: Configs.FontSize.size14,
        textTransform: 'uppercase'
    },
    desCrePTion: {
        color: COLORS.GRAY_6
    },
    textEmpty: {
        textAlign: 'center',
        marginVertical: 15
    }
});

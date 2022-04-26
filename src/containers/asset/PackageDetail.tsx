import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';

import Languages from '@/commons/Languages';
import AssetsHeader from '@/components/header/AssetsHeader';
import { Tabs } from '@/libs/react-native-collapsible-tab-view/src';
import { AccumulationModel } from '@/models/accumulation';
import { COLORS } from '@/theme';
import Card from './Card';
import Introduce from './Introduce';
import MyAssetsDetail from './MyAssetsDetail';
import KeyValue from '@/components/KeyValue';

const PackageDetail = observer(({ route }) => {

    const packageDetail = route?.params as AccumulationModel;

    const [opacity, setOpacity] = useState<number>(1);

    useEffect(() => {

    }, []);

    const renderCardSection = useCallback((label: string, value: string, color: string, unit?: string) => {
        return <KeyValue
            style={styles.cardSection}
            {...{ label, value, color, unit }} />;
    }, []);

    const renderCardContent = useMemo(() => {
        return <>
            {renderCardSection(Languages.assets.receivedInterest, '100.000.000', COLORS.GREEN, Languages.common.currency)}
            {renderCardSection(Languages.assets.receivedTemp, '100.000.000', COLORS.YELLOW, Languages.common.currency)}
            {packageDetail.period === 0 && renderCardSection(Languages.assets.methodReceivedInterest, 'Tái tích luỹ', COLORS.GREEN)}
        </>;
    }, [packageDetail.period, renderCardSection]);

    const renderTabHeader = useCallback(() => {
        return <Card
            title={`${Languages.assets.accumulation} ${packageDetail.title}`}
            money='100.000.000 VND'
            content={renderCardContent}
            hasButtons />;
    }, [packageDetail.title, renderCardContent]);

    const onHeaderHeightChanged = useCallback((currentHeight: number, maxHeight: number) => {
        if (maxHeight > 0) {
            setOpacity(currentHeight / maxHeight);
        }
    }, []);

    const renderHeader = useMemo(() => {
        return <AssetsHeader
            title={Languages.assets.accumulationDetail}
            price={'100.000.000 VND'}
            opacity={opacity} />;
    }, [opacity]);

    return (
        <>
            {renderHeader}

            <Tabs.Container
                renderHeader={renderTabHeader}
                containerStyle={styles.contentStyle}
                onHeaderHeightChanged={onHeaderHeightChanged}
            >
                <Tabs.Tab name={Languages.assets.my}>
                    <Tabs.ScrollView>
                        <MyAssetsDetail
                            packageDetail={packageDetail} />
                    </Tabs.ScrollView>
                </Tabs.Tab>
                <Tabs.Tab name={Languages.assets.referral}>
                    <Tabs.ScrollView>
                        <Introduce />
                    </Tabs.ScrollView>
                </Tabs.Tab>
            </Tabs.Container>
        </>
    );
});

export default PackageDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentStyle: {
        backgroundColor: COLORS.GRAY_3
    },
    tabStyle: {
        width: 90
    },
    cardSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8
    },
});

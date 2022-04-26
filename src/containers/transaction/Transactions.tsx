import { observer } from 'mobx-react';
import React, { useEffect } from 'react';

import Languages from '@/commons/Languages';
import { HeaderBar } from '@/components';
import { Tabs } from '@/libs/react-native-collapsible-tab-view/src';
import TransactionTabItem from './TransactionTabItem';

const Transactions = observer(() => {
    useEffect(() => {

    }, []);

    return (
        <>
            <HeaderBar
                title={Languages.tabs.transactions} />

            <Tabs.Container>
                <Tabs.Tab name={Languages.transaction.all}>
                    <Tabs.ScrollView>
                        <TransactionTabItem />
                    </Tabs.ScrollView>
                </Tabs.Tab>
                <Tabs.Tab name={Languages.transaction.accumulation}>
                    <Tabs.ScrollView>
                        <TransactionTabItem />
                    </Tabs.ScrollView>
                </Tabs.Tab>
            </Tabs.Container>
        </>
    );
});

export default Transactions;

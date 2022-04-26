import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { HeaderBar } from '@/components';
import Languages from '@/commons/Languages';
import IcPig from '@/assets/images/ic_pig.svg';
import { COLORS } from '@/theme';
import TopUp from '@/components/TopUp';

const TopUpScreen = observer(() => {    
    
    return (
        <>
            <HeaderBar
                title={Languages.tabs.topUp} />

            <View style={styles.container}>
                <IcPig style={styles.img} />

                <TopUp
                    label={Languages.topUp.amount}
                    hasButton
                />

            </View>
        </>
    );
});

export default TopUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: COLORS.WHITE
    },
    img: {
        marginVertical: 20,
        alignSelf: 'center'
    }
});

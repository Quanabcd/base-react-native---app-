import { observer } from 'mobx-react';
import React, { useCallback } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { HeaderBar, Touchable } from '@/components';
import Languages from '@/commons/Languages';
import Navigator from '@/routers/Navigator';

import ScreenNames from '@/commons/ScreenNames';
import { COLORS, Styles } from '@/theme';
import { Configs } from '@/commons/Configs';
const Manual = observer(() => {
    
    return (
        <View style={styles.container}>
            <HeaderBar
                title={Languages.support.maNual} />
            
        
        </View>
    );
});
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
export default Manual;

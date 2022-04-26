import { observer } from 'mobx-react';
import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Configs } from '@/commons/Configs';
import Languages from '@/commons/Languages';
import { HeaderBar, Touchable } from '@/components';
import News from '@/components/news';
import { COLORS } from '@/theme';

const Question = observer(() => {

    // const [dataNews, setDataNews] = useState<>(NEWS);

    const renderItem = useCallback((title: string) => {
        return (
            <Touchable style={styles.item}>
                <View style={styles.rowItem}>
                    <Text style={styles.txtSupport}>{title}</Text>
                </View>
            </Touchable>
        );
    }, []);

    return (
        <View style={styles.container}>
            <HeaderBar
                title={Languages.support.questionScreen} />

            <View style={styles.boxItem}>

                <News title={''} />


            </View>

        </View>
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
    }
});
export default Question;

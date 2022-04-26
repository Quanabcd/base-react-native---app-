import { observer } from 'mobx-react';
import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import GopY from '@/assets/images/ic_comment.svg';
import Hotline from '@/assets/images/ic_phone_circle.svg';
import Question from '@/assets/images/ic_question_circle.svg';
import RightIcon from '@/assets/images/ic_right.svg';
import Feedback from '@/assets/images/ic_support_circle.svg';
import Manual from '@/assets/images/ic_warning.svg';
import { Configs } from '@/commons/Configs';
import Languages from '@/commons/Languages';
import ScreenNames from '@/commons/ScreenNames';
import { HeaderBar, Touchable } from '@/components';
import Navigator from '@/routers/Navigator';
import { COLORS, Styles } from '@/theme';
import Utils from '@/utils/Utils';

const Help = observer(() => {
    const renderItem = useCallback((icon: any, title: string, textRight?: string) => {
        const onNavigate = () => {
            switch (title) {
                case Languages.support.createRequest:
                    Navigator.navigateScreen(ScreenNames.informationAccount);
                    break;
                case Languages.support.maNual:
                    Navigator.navigateScreen(ScreenNames.manual);
                    break;
                case Languages.support.question:
                    Navigator.navigateScreen(ScreenNames.questions);
                    break;
                case Languages.support.feedBack:
                    Navigator.navigateScreen(ScreenNames.quickAuthentication);
                    break;
                default:
                    break;
            }
        };
        return (
            <Touchable onPress={onNavigate} style={styles.item}>
                <View style={styles.rowItem}>
                    <View style={styles.circleIcon}>{icon}</View>
                    <Text style={styles.txtSupport}>{title}</Text>
                    <Text style={styles.textRight}>{textRight}</Text>
                </View>
                <RightIcon />
            </Touchable>
        );
    }, []);

    const callPhone = useCallback(() => {
        Utils.callNumber(Languages.support.phone);
    }, []);
    return (
        <View style={styles.container}>
            <HeaderBar
                title={Languages.support.title} />
            <View style={styles.wrapSupport}>
                <Touchable onPress={callPhone} style={styles.item}>
                    <View style={styles.rowItem}>
                        <View style={styles.circleIcon}>{<Hotline />}</View>
                        <Text style={styles.txtSupport}>{Languages.support.hotline}</Text>
                        <Text style={styles.textRight}>{Languages.support.phone}</Text>
                    </View>
                    <RightIcon />
                </Touchable>
                {renderItem(<Feedback />, Languages.support.createRequest)}
            </View>
            <View style={styles.wrapSupport}>
                {renderItem(<Manual />, Languages.support.maNual)}
                {renderItem(<Question />, Languages.support.question)}
                {renderItem(<GopY />, Languages.support.feedBack)}
            </View>
        </View>
    );
});
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    wrapSupport: {
        ...Styles.shadow,
        paddingTop: 10,
        paddingHorizontal: 16,
        paddingBottom: 15,
        backgroundColor: COLORS.WHITE,
        borderRadius: 16,
        marginHorizontal: 16,
        marginTop: 20
    },
    rowItem: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    txtSupport: {
        fontSize: Configs.FontSize.size16,
        color: COLORS.BLACK_PRIMARY,
        fontFamily: Configs.FontFamily.medium,
        marginLeft: 20,
        flex: 1
    },
    textRight: {
        ...Styles.typography.medium,
        marginRight: 10
    },
    item: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderColor: COLORS.GRAY_2,
        paddingRight: 15
    },
    circleIcon: {
        width: 32,
        height: 32,
        borderColor: COLORS.RED_2,
        borderWidth: 1,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default Help;

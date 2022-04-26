import { observer } from 'mobx-react';
import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import QRCode from 'react-native-qrcode-svg';
import Clipboard from '@react-native-clipboard/clipboard';
import Lightbox from 'react-native-lightbox';

import { HeaderBar, Touchable } from '@/components';
import Languages from '@/commons/Languages';
import { COLORS, Styles } from '@/theme';
import { Configs } from '@/commons/Configs';
import ShareIconBtn from '@/assets/images/ic_share_red.svg';
import { useAppStore } from '@/hooks';

const id = '123454678';

const InviteFriends = observer(() => {

    const { userManager } = useAppStore();

    const referLink = `https://apps.apple.com/id/developer/c%C3%B4ng-ty-c%E1%BB%95-ph%E1%BA%A7n-c%C3%B4ng-ngh%E1%BB%87-t%C3%A0i-ch%C3%ADnh-vi%E1%BB%87t/id1536110955?ref=${userManager.userInfo?.phone}`;

    const copyToClipboard = useCallback(() => {
        Clipboard.setString(id);
    }, []);

    const renderContent = useCallback(() => {
        return <QRCode
            value={referLink}
            logoBackgroundColor="transparent"
            size={SCREEN_WIDTH}
        />;
    }, [referLink]);

    return (
        <View>
            <HeaderBar title={Languages.invite.header} />
            <View style={styles.wrapContent}>
                <Text style={styles.title}>{Languages.invite.title}</Text>
                <Text style={styles.txtQr}>{Languages.invite.qrCode}</Text>
                <View style={styles.wrapQr}>
                    <Lightbox
                        renderContent={renderContent}>
                        <QRCode
                            value={referLink}
                            logoBackgroundColor="transparent"
                            size={SCREEN_WIDTH - 100}
                        />
                    </Lightbox>
                </View>
                <Text style={styles.txtId}>{Languages.invite.inviteId}</Text>
                <View style={styles.input}>
                    <Text style={styles.txtIdInvite}>{id}</Text>
                    <Touchable onPress={copyToClipboard} style={styles.icon}>
                        <ShareIconBtn />
                    </Touchable>
                </View>
            </View>
        </View>
    );
});

export default InviteFriends;
const styles = StyleSheet.create({
    wrapContent: {
        paddingHorizontal: 16,
        paddingTop: 20
    },
    wrapQr: {
        ...Styles.shadow,
        width: SCREEN_WIDTH - 80,
        height: 320,
        backgroundColor: COLORS.WHITE,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtQr: {
        color: COLORS.RED,
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 15,
        fontFamily: Configs.FontFamily.bold,
        fontSize: Configs.FontSize.size16
    },
    txtId: {
        color: COLORS.RED,
        marginTop: 20,
        marginBottom: 15,
        fontFamily: Configs.FontFamily.bold,
        fontSize: Configs.FontSize.size16
    },
    input: {
        ...Styles.shadow,
        paddingVertical: 5,
        backgroundColor: COLORS.WHITE,
        paddingLeft: 15,
        borderRadius: 7,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 10
    },
    txtIdInvite: {
        ...Styles.typography.medium,
        color: COLORS.BLACK_PRIMARY
    },
    title: {
        ...Styles.typography.medium,
        color: COLORS.BLACK_PRIMARY
    },
    icon: {
        width: 32,
        height: 32,
        borderColor: COLORS.RED,
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

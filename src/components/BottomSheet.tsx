import {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetFlatList,
    BottomSheetModal,
    BottomSheetTextInput
} from '@gorhom/bottom-sheet';
import React, {
    forwardRef,
    useCallback,
    useImperativeHandle,
    useMemo,
    useRef
} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Dash from 'react-native-dash';

import { COLORS, Styles } from '@/theme';
import { Configs } from '@/commons/Configs';
import Languages from '@/commons/Languages';

export type ItemProps = {
    value?: string;
    text?: string;
    id?: string;
};

type BottomSheetProps = {
    data?: Array<ItemProps>;
    onPressItem?: (item: any) => void;
    hideInput?: boolean
};

export type BottomSheetAction = {
    show: (content?: string) => any;
    hide?: (content?: string) => any;
    setContent?: (message: string) => void;
    hideInput?: boolean
};

const CustomBackdrop = (props: BottomSheetBackdropProps) => {
    return <BottomSheetBackdrop {...props} pressBehavior="close" />;
};

const BottomSheet = forwardRef<BottomSheetAction, BottomSheetProps>(
    ({ data, onPressItem, hideInput }: BottomSheetProps, ref) => {
        const bottomSheetModalRef = useRef<BottomSheetModal>(null);
        const snapPoints = useMemo(() => {
            const num = data?.length as number;
            if (num < 5) {
                return ['25%', '27%'];
            }
            return ['25%', '50%'];
        }, [data]);
        const show = useCallback(() => {
            bottomSheetModalRef.current?.present();
        }, []);

        const hide = useCallback(() => {
            bottomSheetModalRef.current?.close();
        }, []);

        useImperativeHandle(ref, () => ({
            show,
            hide
        }));

        const handleSheetChanges = useCallback((index: number) => {
            console.log('handleSheetChanges', index);
        }, []);

        const renderItem = useCallback(
            ({ item }) => {
                const onPress = () => {
                    onPressItem?.(item);
                    hide();
                };
                return (
                    <TouchableOpacity onPress={onPress} >
                        <View style={styles.item}>
                            <Text style={styles.value}>{item.value}</Text>
                            {item.text && <View style={styles.textview}><Text style={styles.text} >{item.text}</Text><Text style={styles.currency}>{Languages.common.currency}</Text></View>}
                        </View>
                        <View style={styles.dotted}><Dash
                            dashThickness={1}
                            dashLength={5}
                            dashGap={2}
                            dashColor={COLORS.GRAY_7} /></View>
                    </TouchableOpacity>
                );
            },
            [hide, onPressItem]
        );

        const keyExtractor = useCallback((index) => {
            return `${index.id}`;
        }, []);

        return (
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                // onChange={handleSheetChanges}
                backdropComponent={CustomBackdrop}
                keyboardBehavior={'interactive'}
                enablePanDownToClose={true}

            >
                <View style={styles.contentContainer}>
                    {hideInput && <View style={styles.row}>
                        <BottomSheetTextInput style={styles.input} />
                        {/* <View style={styles.wrapIcon}>
                            <IconUnivest name={'search'} style={styles.icon} />
                        </View> */}
                    </View>
                    }
                    <BottomSheetFlatList
                        data={data}
                        renderItem={renderItem}
                        style={styles.flatList}
                        keyExtractor={keyExtractor}
                    />
                </View>
            </BottomSheetModal>
        );
    }
);

export default BottomSheet;

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1
    },
    flatList: {
        flex: 1,
        marginTop: 0,
        paddingHorizontal: 15
    },
    input: {
        justifyContent: 'center',
        paddingHorizontal: 5,
        paddingVertical: 0,
        height: Configs.FontSize.size40,
        width: '90%'
    },
    item: {
        paddingVertical: 10,
        flexDirection: 'row'
    },
    value: {
        flex: 1
    },
    textview: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    text: {
        ...Styles.typography.bold,
        color: COLORS.GREEN,
        fontSize: Configs.FontSize.size16
    },
    currency: {
        ...Styles.typography.regular,
        paddingLeft: 5
    },
    dotted: {
        height: 10
    },
    // icon: {
    //     fontSize: Configs.IconSize.size18,
    //     color: COLORS.GREEN,
    //     marginRight: 10
    // },
    row: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 5,
        marginHorizontal: 15,
        borderColor: COLORS.LIGHT_GRAY
    }
    // wrapIcon: {
    //     justifyContent: 'center'
    // }
});

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Logo = ({ size = 'medium', showText = true, style }) => {
    const getSize = () => {
        switch (size) {
            case 'small':
                return { container: 40, inner: 32, text: 16 };
            case 'large':
                return { container: 120, inner: 100, text: 32 };
            default: // medium
                return { container: 60, inner: 48, text: 20 };
        }
    };

    const sizes = getSize();

    return (
        <View style={[styles.container, { width: sizes.container, height: sizes.container }, style]}>
            <View style={[styles.logoBackground, { width: sizes.container, height: sizes.container, borderRadius: sizes.container / 2 }]}>
                <View style={[styles.logoInner, { width: sizes.inner, height: sizes.inner, borderRadius: sizes.inner / 2 }]}>
                    <Text style={[styles.logoText, { fontSize: sizes.text }]}>NG</Text>
                </View>
            </View>

            {/* QR Code Icon */}
            <View style={[styles.qrIcon, {
                width: sizes.container * 0.4,
                height: sizes.container * 0.4,
                borderRadius: sizes.container * 0.1,
                padding: sizes.container * 0.05
            }]}>
                <View style={[styles.qrGrid, {
                    width: sizes.container * 0.3,
                    height: sizes.container * 0.3
                }]}>
                    <View style={[styles.qrRow, { height: sizes.container * 0.075 }]}>
                        <View style={styles.qrCell} />
                        <View style={styles.qrCell} />
                        <View style={styles.qrCell} />
                        <View style={styles.qrCell} />
                    </View>
                    <View style={[styles.qrRow, { height: sizes.container * 0.075 }]}>
                        <View style={styles.qrCell} />
                        <View style={[styles.qrCell, styles.qrCellFilled]} />
                        <View style={[styles.qrCell, styles.qrCellFilled]} />
                        <View style={styles.qrCell} />
                    </View>
                    <View style={[styles.qrRow, { height: sizes.container * 0.075 }]}>
                        <View style={styles.qrCell} />
                        <View style={[styles.qrCell, styles.qrCellFilled]} />
                        <View style={styles.qrCell} />
                        <View style={[styles.qrCell, styles.qrCellFilled]} />
                    </View>
                    <View style={[styles.qrRow, { height: sizes.container * 0.075 }]}>
                        <View style={styles.qrCell} />
                        <View style={styles.qrCell} />
                        <View style={[styles.qrCell, styles.qrCellFilled]} />
                        <View style={styles.qrCell} />
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoBackground: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    logoInner: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    logoText: {
        fontWeight: 'bold',
        color: '#667eea',
        letterSpacing: 1,
    },
    qrIcon: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.15,
        shadowRadius: 2,
        elevation: 2,
    },
    qrGrid: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    qrRow: {
        flexDirection: 'row',
    },
    qrCell: {
        flex: 1,
        backgroundColor: '#ffffff',
        margin: 0.5,
    },
    qrCellFilled: {
        backgroundColor: '#667eea',
    },
});

export default Logo; 
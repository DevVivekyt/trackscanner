import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { LinearGradient } from 'react-native-linear-gradient';

// Example QR template components
const QRTemplate1 = ({ value, size }) => (
    <View style={[styles.template, styles.circle, { backgroundColor: '#1ccfc9' }]}>
        <QRCode value={value} size={size} backgroundColor="#fff" color="#222" />
        <Text style={styles.label}>SCAN ME</Text>
    </View>
);

const QRTemplate2 = ({ value, size }) => (
    <View style={[styles.template, styles.square, { borderColor: '#ffb300', borderWidth: 4 }]}>
        <QRCode value={value} size={size} backgroundColor="#fff" color="#ffb300" />
        <Text style={[styles.label, { backgroundColor: '#ffb300', color: '#fff' }]}>SCAN ME</Text>
    </View>
);

const QRTemplate3 = ({ value, size }) => (
    <View style={[styles.template, styles.rounded, { backgroundColor: '#fff', borderColor: '#2d3748', borderWidth: 2 }]}>
        <QRCode value={value} size={size} backgroundColor="#fff" color="#2d3748" />
        <Text style={[styles.label, { color: '#fff', backgroundColor: '#2d3748' }]}>PROMO CODE</Text>
    </View>
);

const QRTemplate4 = ({ value, size }) => (
    <View style={[styles.template, styles.square, { backgroundColor: '#f56565' }]}>
        <QRCode value={value} size={size} backgroundColor="gray" color="#fff" />
        <Text style={[styles.label, { backgroundColor: '#fff', color: '#f56565' }]}>ORDER HERE</Text>
    </View>
);

const QRTemplate5 = ({ value, size }) => (
    <View style={[styles.template, styles.circle, { backgroundColor: '#fff', borderColor: '#805ad5', borderWidth: 3 }]}>
        <QRCode value={value} size={size} backgroundColor="#fff" color="#805ad5" />
        <Text style={[styles.label, { color: '#805ad5' }]}>SCAN ME</Text>
    </View>
);

const DotPattern = ({ size, dotColor = '#cbd5e1', dotCount = 9 }) => {
    // dotCount: number of dots per row/column
    const dotSize = size / (dotCount * 2);
    const dots = [];
    for (let row = 0; row < dotCount; row++) {
        for (let col = 0; col < dotCount; col++) {
            // Skip center area for QR code and icon
            const distFromCenter = Math.sqrt(
                Math.pow(row - (dotCount - 1) / 2, 2) +
                Math.pow(col - (dotCount - 1) / 2, 2)
            );
            if (distFromCenter < 2) continue; // leave center clear
            dots.push(
                <View
                    key={`dot-${row}-${col}`}
                    style={{
                        position: 'absolute',
                        top: row * (size / dotCount) + dotSize / 2,
                        left: col * (size / dotCount) + dotSize / 2,
                        width: dotSize,
                        height: dotSize,
                        borderRadius: dotSize / 2,
                        backgroundColor: dotColor,
                        opacity: 0.5,
                    }}
                />
            );
        }
    }
    return <View style={{ position: 'absolute', width: size, height: size }}>{dots}</View>;
};

const QRTemplate6 = ({ value, size = 150 }) => (
    <View style={[styles.template, styles.circle, { backgroundColor: '#fff', borderColor: '#gray', }]}>
        <LinearGradient
            colors={['#4299e1', '#805ad5']}
            style={{
                width: size + 16,
                height: size + 16,
                borderRadius: (size + 16) / 2,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <View style={{
                width: size,
                height: size,
                borderRadius: size / 2,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
            }}>
                {/* Dot pattern background */}
                <DotPattern size={size} dotColor="#a3bffa" dotCount={9} />
                <QRCode
                    value={value}
                    size={size * 0.70}
                    backgroundColor="#fff"
                    color="#4f46e5"
                />
                <View style={{
                    position: 'absolute',
                    top: size * 0.425 - 4,
                    left: size * 0.425,
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    backgroundColor: '#e53e3e',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    {/* You can replace this with an icon if needed */}
                </View>
            </View>
        </LinearGradient>
        <Text style={{
            marginTop: 8,
            fontWeight: 'bold',
            fontSize: 13,
            color: '#e53e3e',
            letterSpacing: 1,
            textTransform: 'uppercase',
        }}>SCAN ME</Text>
    </View>
);

const QRTemplate7 = ({ value, size = 150 }) => (
    <View style={[styles.template, styles.square, { backgroundColor: '#fff', borderColor: '#gray', }]}>

        <View style={{
            backgroundColor: '#fff',
            padding: size * 0.07,
            borderTopLeftRadius: size * 0.07,
            borderTopRightRadius: size * 0.07,
            borderColor: '#f00',
            borderWidth: size * 0.02,
            width: size,
            alignItems: 'center',
        }}>
            <QRCode
                value={value}
                size={size * 0.8}
                backgroundColor="#ffffff"
                color="#f00"
            />
        </View>
        <View style={{
            backgroundColor: '#f00',
            paddingVertical: size * 0.08,
            width: size,
            alignItems: 'center',
            borderBottomLeftRadius: size * 0.07,
            borderBottomRightRadius: size * 0.07,
        }}>
            <Text style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: size * 0.13,
                textAlign: 'center',
            }}>SCAN ME</Text>
        </View>
    </View>
);

export const QRTemplates = [
    QRTemplate1,
    QRTemplate2,
    QRTemplate3,
    QRTemplate4,
    QRTemplate5,
    QRTemplate6,
    QRTemplate7,
    // ...add more here
];

const styles = StyleSheet.create({
    template: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        padding: 16,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
    },
    circle: {
        borderRadius: 100,
        width: 180,
        height: 180,
    },
    square: {
        borderRadius: 12,
        width: 180,
        height: 180,
    },
    rounded: {
        borderRadius: 30,
        width: 180,
        height: 180,
    },
    label: {
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 16,
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 8,
        backgroundColor: '#2d3748',
        color: '#fff',
        overflow: 'hidden',
    },

    qrBox: {
        backgroundColor: '#ffffff',
        padding: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderColor: '#f00',
        borderWidth: 3,
    },
    labelBox: {
        backgroundColor: '#f00',
        paddingVertical: 8,
        paddingHorizontal: 20,
        width: '100%',
        alignItems: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    labelText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
}); 
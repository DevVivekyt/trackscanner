import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const QRImgTemplate1 = ({ value, size = 100 }) => (
    <ImageBackground
        source={require('../assets/qr-templates/qr1.jpg')}
        style={[styles.container, { width: Math.min(size + 40, 240), height: Math.min(size + 60, 260) }]}
        imageStyle={styles.image}
        resizeMode="cover"
    >
        <View style={styles.overlay}>
            <View style={[styles.qrContainer, { marginTop: 6.5 }]}>
                <QRCode
                    value={value || 'preview'}
                    size={Math.min(size, 121)}
                    backgroundColor="transparent"
                    color="#000"
                />
            </View>

        </View>
    </ImageBackground >
);

const QRImgTemplate2 = ({ value, size = 100 }) => (
    <ImageBackground
        source={require('../assets/qr-templates/qr2.png')}
        style={[styles.container, { width: Math.min(size + 40, 240), height: Math.min(size + 60, 260) }]}
        imageStyle={styles.image}
        resizeMode="cover"
    >
        <View style={styles.overlay}>
            <View style={[styles.qrContainer, { marginTop: -50 }]}>
                <QRCode
                    value={value || 'preview'}
                    size={Math.min(size, 180)}
                    backgroundColor="transparent"
                    color="#FFA500"
                />
            </View>

        </View>
    </ImageBackground>
);

const QRImgTemplate3 = ({ value, size = 50 }) => (
    <ImageBackground
        source={require('../assets/qr-templates/qr3.png')}
        style={[styles.container, { width: size, height: size }]}
        imageStyle={styles.image}
        resizeMode="cover"
    >
        <View style={styles.overlay}>
            <View style={styles.qrContainer}>
                <QRCode
                    value={value || 'preview'}
                    size={Math.min(size, 130)}
                    backgroundColor="transparent"
                    color="#000"
                />
            </View>

        </View>
    </ImageBackground>
);

const QRImgTemplate4 = ({ value, size = 100 }) => (
    <ImageBackground
        source={require('../assets/qr-templates/qr4.png')}
        style={[styles.container, { width: Math.min(size + 40, 240), height: Math.min(size + 60, 260) }]}
        imageStyle={styles.image}
        resizeMode="cover"
    >
        <View style={styles.overlay}>
            <View style={[styles.qrContainer, { marginTop: -50 }]}>
                <QRCode
                    value={value || 'preview'}
                    size={Math.min(size, 157)}
                    backgroundColor="transparent"
                    color="#e6ac06"
                />
            </View>

        </View>
    </ImageBackground>
);

const QRImgTemplate5 = ({ value, size = 100 }) => (
    <ImageBackground
        source={require('../assets/qr-templates/qr5.png')}
        style={[styles.container, { width: Math.min(size + 40, 240), height: Math.min(size + 60, 260) }]}
        imageStyle={styles.image}
        resizeMode="cover"
    >
        <View style={styles.overlay}>
            <View style={[styles.qrContainer, { marginTop: -40 }]}>
                <QRCode
                    value={value || 'preview'}
                    size={Math.min(size, 173)}
                    backgroundColor="transparent"
                    color="#2769a8"
                />
            </View>

        </View>
    </ImageBackground>
);

const QRImgTemplate6 = ({ value, size = 100 }) => (
    <ImageBackground
        source={require('../assets/qr-templates/qr6.png')}
        style={[styles.container, { width: Math.min(size + 40, 240), height: Math.min(size + 60, 260) }]}
        imageStyle={styles.image}
        resizeMode="cover"
    >
        <View style={styles.overlay}>
            <View style={[styles.qrContainer, { marginTop: -50 }]}>
                <QRCode
                    value={value || 'preview'}
                    size={Math.min(size, 180)}
                    backgroundColor="transparent"
                    enableLinearGradient={true}
                    color="#000"
                    linearGradient={['#d946ef', '#06b6d4']}
                    gradientDirection={[0, 0, 1, 1]}
                />
            </View>

        </View>
    </ImageBackground>
);

const QRImgTemplate7 = ({ value, size = 100 }) => (
    <ImageBackground
        source={require('../assets/qr-templates/qr7.png')}
        style={[styles.container, { width: Math.min(size + 40, 240), height: Math.min(size + 60, 260) }]}
        imageStyle={styles.image}
        resizeMode="cover"
    >
        <View style={styles.overlay}>
            <View style={[styles.qrContainer, { marginTop: -40 }]}>
                <QRCode
                    value={value || 'preview'}
                    size={Math.min(size, 180)}
                    backgroundColor="transparent"
                    color="#D50000"
                />
            </View>

        </View>
    </ImageBackground>
);

const QRImgTemplate8 = ({ value, size = 100 }) => (
    <ImageBackground
        source={require('../assets/qr-templates/qr8.png')}
        style={[styles.container, { width: Math.min(size + 40, 240), height: Math.min(size + 60, 260) }]}
        imageStyle={styles.image}
        resizeMode="cover"
    >
        <View style={styles.overlay}>
            <View style={[styles.qrContainer, { marginTop: -40 }]}>
                <QRCode
                    value={value || 'preview'}
                    size={Math.min(size, 178)}
                    backgroundColor="transparent"
                    color="#F48FB1"
                />
            </View>

        </View>
    </ImageBackground>
);

const QRImgTemplate9 = ({ value, size = 100 }) => (
    <ImageBackground
        source={require('../assets/qr-templates/qr9.png')}
        style={[styles.container, { width: Math.min(size + 40, 240), height: Math.min(size + 60, 260) }]}
        imageStyle={styles.image}
        resizeMode="cover"
    >
        <View style={styles.overlay}>
            <View style={[styles.qrContainer, { marginTop: -40 }]}>
                <QRCode
                    value={value || 'preview'}
                    size={Math.min(size, 180)}
                    backgroundColor="transparent"
                    color="#8E24AA"
                />
            </View>

        </View>
    </ImageBackground>
);

const QRImgTemplate10 = ({ value, size = 100 }) => (
    <ImageBackground
        source={require('../assets/qr-templates/qr10.png')}
        style={[styles.container, { width: Math.min(size + 40, 240), height: Math.min(size + 60, 260) }]}
        imageStyle={styles.image}
        resizeMode="cover"
    >
        <View style={styles.overlay}>
            <View style={[styles.qrContainer, { marginTop: -40 }]}>
                <QRCode
                    value={value || 'preview'}
                    size={Math.min(size, 176)}
                    backgroundColor="transparent"
                    color="#00BFA5"
                />
            </View>

        </View>
    </ImageBackground>
);

const QRImgTemplate11 = ({ value, size = 100 }) => (
    <ImageBackground
        source={require('../assets/qr-templates/qr11.png')}
        style={[styles.container, { width: Math.min(size + 40, 240), height: Math.min(size + 60, 260) }]}
        imageStyle={styles.image}
        resizeMode="cover"
    >
        <View style={styles.overlay}>
            <View style={[styles.qrContainer, { marginTop: -40 }]}>
                <QRCode
                    value={value || 'preview'}
                    size={Math.min(size, 177)}
                    backgroundColor="transparent"
                    color="#A8431D"
                />
            </View>

        </View>
    </ImageBackground>
);

const QRImgTemplate12 = ({ value, size = 100 }) => (
    <ImageBackground
        source={require('../assets/qr-templates/qr12.png')}
        style={[styles.container, { width: Math.min(size + 40, 240), height: Math.min(size + 60, 260) }]}
        imageStyle={styles.image}
        resizeMode="cover"
    >
        <View style={styles.overlay}>
            <View style={[styles.qrContainer, { marginTop: -50 }]}>
                <QRCode
                    value={value || 'preview'}
                    size={Math.min(size, 180)}
                    backgroundColor="transparent"
                    color="#000"
                />
            </View>

        </View>
    </ImageBackground>
);

const QRImgTemplate13 = ({ value, size = 100 }) => (
    <ImageBackground
        source={require('../assets/qr-templates/qr13.png')}
        style={[styles.container, { width: Math.min(size + 40, 240), height: Math.min(size + 60, 260) }]}
        imageStyle={styles.image}
        resizeMode="cover"
    >
        <View style={styles.overlay}>
            <View style={[styles.qrContainer, { marginTop: -40 }]}>
                <QRCode
                    value={value || 'preview'}
                    size={Math.min(size, 180)}
                    backgroundColor="transparent"
                    color="#1B5E20"
                />
            </View>

        </View>
    </ImageBackground>
);

const QRImgTemplate14 = ({ value, size = 100 }) => (
    <ImageBackground
        source={require('../assets/qr-templates/qr14.png')}
        style={[styles.container, { width: Math.min(size + -50, 240), height: Math.min(size + 20, 260) }]}
        imageStyle={styles.image}
        resizeMode="cover"
    >
        <View style={styles.overlay}>
            <View style={[styles.qrContainer, { marginTop: -60 }]}>
                <QRCode
                    value={value || 'preview'}
                    size={Math.min(size, 153)}
                    backgroundColor="transparent"
                    color="#009688"
                />
            </View>

        </View>
    </ImageBackground>
);

const QRImgTemplate15 = ({ value, size = 100 }) => (
    <ImageBackground
        source={require('../assets/qr-templates/qr15.png')}
        style={[styles.container, { width: size, height: size }]}
        imageStyle={styles.image}
        resizeMode="cover"
    >
        <View style={styles.overlay}>
            <View style={styles.qrContainer}>
                <QRCode
                    value={value || 'preview'}
                    size={Math.min(size, 130)}
                    backgroundColor="transparent"
                    color="#1C6BC1"
                />
            </View>

        </View>
    </ImageBackground>
);

const QRImgTemplate16 = ({ value, size = 100 }) => (
    <ImageBackground
        source={require('../assets/qr-templates/qr16.png')}
        style={[styles.container, { width: Math.min(size + 40, 240), height: Math.min(size + 60, 260) }]}
        imageStyle={styles.image}
        resizeMode="cover"
    >
        <View style={styles.overlay}>
            <View style={[styles.qrContainer, { marginTop: -40 }]}>
                <QRCode
                    value={value || 'preview'}
                    size={Math.min(size, 180)}
                    enableLinearGradient={true}
                    backgroundColor="transparent"
                    color="#000"
                    linearGradient={['#4169E1', '#6A1B9A']}
                />
            </View>

        </View>
    </ImageBackground>
);

const QRImgTemplate17 = ({ value, size = 100 }) => (
    <ImageBackground
        source={require('../assets/qr-templates/qr17.png')}
        style={[styles.container, { width: Math.min(size + 40, 240), height: Math.min(size + 60, 260) }]}
        imageStyle={styles.image}
        resizeMode="cover"
    >
        <View style={styles.overlay}>
            <View style={styles.qrContainer}>
                <QRCode
                    value={value || 'preview'}
                    size={Math.min(size, 130)}
                    backgroundColor="transparent"
                    color="#990000"
                />
            </View>

        </View>
    </ImageBackground>
);

const QRImgTemplate18 = ({ value, size = 100 }) => (
    <ImageBackground
        source={require('../assets/qr-templates/qr18.png')}
        style={[styles.container, { width: Math.min(size + 40, 240), height: Math.min(size + 60, 260) }]}
        imageStyle={styles.image}
        resizeMode="cover"
    >
        <View style={styles.overlay}>
            <View style={[styles.qrContainer, { marginTop: 30 }]}>
                <QRCode
                    value={value || 'preview'}
                    size={Math.min(size, 120)}
                    backgroundColor="transparent"
                    color="#D0011C"
                />
            </View>

        </View>
    </ImageBackground>
);

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        overflow: 'hidden',
    },
    image: {
        borderRadius: 12,
    },
    overlay: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    qrContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        padding: 6,
        borderRadius: 5,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        marginBottom: 6,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 12,
        color: '#000',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        textAlign: 'center',
    },
});

// Export array of all QR image templates
export const QRTemplates = [
    QRImgTemplate1,
    QRImgTemplate2,
    QRImgTemplate3,
    QRImgTemplate4,
    QRImgTemplate5,
    QRImgTemplate6,
    QRImgTemplate7,
    QRImgTemplate8,
    QRImgTemplate9,
    QRImgTemplate10,
    QRImgTemplate11,
    QRImgTemplate12,
    QRImgTemplate13,
    QRImgTemplate14,
    QRImgTemplate15,
    QRImgTemplate16,
    QRImgTemplate17,
    QRImgTemplate18,
];

export default QRTemplates;

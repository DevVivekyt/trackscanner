import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ onFinish }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;
    const logoRotate = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Start animations
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 50,
                friction: 7,
                useNativeDriver: true,
            }),
            Animated.loop(
                Animated.timing(logoRotate, {
                    toValue: 1,
                    duration: 3000,
                    useNativeDriver: true,
                })
            ),
        ]).start();

        // Auto navigate after 3 seconds
        const timer = setTimeout(() => {
            onFinish();
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const spin = logoRotate.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <LinearGradient
            colors={['#667eea', '#764ba2', '#f093fb']}
            style={styles.container}
        >
            <Animated.View
                style={[
                    styles.content,
                    {
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }],
                    },
                ]}
            >
                {/* Logo Container */}
                <View style={styles.logoContainer}>
                    <Animated.View
                        style={[
                            styles.logoBackground,
                            {
                                transform: [{ rotate: spin }],
                            },
                        ]}
                    >
                        <View style={styles.logoInner}>
                            <Text style={styles.logoText}>NG</Text>
                        </View>
                    </Animated.View>

                    {/* QR Code Icon */}
                    <View style={styles.qrIcon}>
                        <View style={styles.qrGrid}>
                            <View style={styles.qrRow}>
                                <View style={styles.qrCell} />
                                <View style={styles.qrCell} />
                                <View style={styles.qrCell} />
                                <View style={styles.qrCell} />
                            </View>
                            <View style={styles.qrRow}>
                                <View style={styles.qrCell} />
                                <View style={[styles.qrCell, styles.qrCellFilled]} />
                                <View style={[styles.qrCell, styles.qrCellFilled]} />
                                <View style={styles.qrCell} />
                            </View>
                            <View style={styles.qrRow}>
                                <View style={styles.qrCell} />
                                <View style={[styles.qrCell, styles.qrCellFilled]} />
                                <View style={styles.qrCell} />
                                <View style={[styles.qrCell, styles.qrCellFilled]} />
                            </View>
                            <View style={styles.qrRow}>
                                <View style={styles.qrCell} />
                                <View style={styles.qrCell} />
                                <View style={[styles.qrCell, styles.qrCellFilled]} />
                                <View style={styles.qrCell} />
                            </View>
                        </View>
                    </View>
                </View>

                {/* App Title */}
                <Text style={styles.appTitle}>NG QR Generator</Text>
                <Text style={styles.appSubtitle}>Scan • Generate • Share</Text>

                {/* Loading Dots */}
                <View style={styles.loadingContainer}>
                    <View style={styles.loadingDot} />
                    <View style={styles.loadingDot} />
                    <View style={styles.loadingDot} />
                </View>
            </Animated.View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        position: 'relative',
        marginBottom: 30,
    },
    logoBackground: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    logoInner: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    logoText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#667eea',
        letterSpacing: 2,
    },
    qrIcon: {
        position: 'absolute',
        top: -10,
        right: -10,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    qrGrid: {
        width: 32,
        height: 32,
    },
    qrRow: {
        flexDirection: 'row',
        height: 8,
    },
    qrCell: {
        flex: 1,
        backgroundColor: '#ffffff',
        margin: 1,
    },
    qrCellFilled: {
        backgroundColor: '#667eea',
    },
    appTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 8,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
        letterSpacing: 1,
    },
    appSubtitle: {
        fontSize: 16,
        color: '#ffffff',
        opacity: 0.9,
        textAlign: 'center',
        letterSpacing: 0.5,
        marginBottom: 40,
    },
    loadingContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    loadingDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
    },
});

export default SplashScreen; 
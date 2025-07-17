import { View, Text, TouchableOpacity, StyleSheet, Dimensions, StatusBar } from 'react-native'
import React from 'react'
import { LinearGradient } from 'react-native-linear-gradient'
import Logo from '../components/Logo'

const { height } = Dimensions.get('window')

const Home = ({ navigation }) => {
    return (
        <View style={styles.container}>

            {/* Header Section */}
            <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={styles.headerGradient}
            >
                <View style={styles.headerContent}>
                    <Logo size="large" style={styles.headerLogo} />
                    <Text style={styles.appTitle}>NG QR Generator</Text>
                    <Text style={styles.appSubtitle}>QR Code Scanner & Generator</Text>
                </View>
            </LinearGradient>

            {/* Main Content */}
            <View style={styles.content}>
                <View style={styles.cardContainer}>
                    {/* Scan QR Card */}
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate('Scanner')}
                        activeOpacity={0.8}
                    >
                        <LinearGradient
                            colors={['#ff9a9e', '#fecfef']}
                            style={styles.cardGradient}
                        >
                            <View style={styles.cardContent}>
                                <View style={styles.iconContainer}>
                                    <Text style={styles.icon}>📱</Text>
                                </View>
                                <Text style={styles.cardTitle}>Scan QR Code</Text>
                                <Text style={styles.cardDescription}>
                                    Scan QR codes with your camera
                                </Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>

                    {/* Generate QR Card */}
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate('Generator')}
                        activeOpacity={0.8}
                    >
                        <LinearGradient
                            colors={['#a8edea', '#fed6e3']}
                            style={styles.cardGradient}
                        >
                            <View style={styles.cardContent}>
                                <View style={styles.iconContainer}>
                                    <Text style={styles.icon}>🎯</Text>
                                </View>
                                <Text style={styles.cardTitle}>Generate QR Code</Text>
                                <Text style={styles.cardDescription}>
                                    Create custom QR codes
                                </Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                {/* Footer Info */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Fast • Secure • Reliable
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    headerGradient: {
        height: height * 0.35,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    headerContent: {
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    headerLogo: {
        marginBottom: 20,
    },
    appTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 8,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    appSubtitle: {
        fontSize: 16,
        color: '#ffffff',
        opacity: 0.9,
        textAlign: 'center',
        lineHeight: 22,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    cardContainer: {
        flex: 1,
        gap: 20,
    },
    card: {
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
    },
    cardGradient: {
        borderRadius: 20,
        padding: 25,
    },
    cardContent: {
        alignItems: 'center',
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    icon: {
        fontSize: 28,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2d3748',
        marginBottom: 8,
        textAlign: 'center',
    },
    cardDescription: {
        fontSize: 14,
        color: '#4a5568',
        textAlign: 'center',
        lineHeight: 20,
    },
    footer: {
        paddingVertical: 20,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 14,
        color: '#718096',
        fontWeight: '500',
        letterSpacing: 0.5,
    },
})

export default Home
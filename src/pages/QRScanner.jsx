import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Linking, AppState } from 'react-native';
import { Camera, useCameraDevices, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';

const QRScanner = () => {
    const { hasPermission, requestPermission } = useCameraPermission();
    const [cameraStatus, setCameraStatus] = useState(0);
    const devices = useCameraDevices();
    const device = devices.back || devices.front || devices[cameraStatus];
    const [permissionStatus, setPermissionStatus] = useState('checking');
    const [scannedCode, setScannedCode] = useState(null);
    const [appState, setAppState] = useState(AppState.currentState);
    const [isActive, setIsActive] = useState(true);

    const blinkAnim = useRef(new Animated.Value(0)).current;




    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: (codes) => {
            if (codes.length > 0) {
                const value = codes[0].value;
                console.log('Scanned code:', value);
                setScannedCode(value);
            }
        }
    });

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            setAppState(nextAppState);
            if (nextAppState === 'active') {
                setIsActive(true);  // Resume camera
                setScannedCode(null)
            } else {
                setIsActive(false); // Pause camera
                setScannedCode(null)
            }
        });

        return () => {
            subscription.remove();
        };
    }, []);



    useEffect(() => {
        const checkPermissions = async () => {
            try {
                if (!hasPermission) {
                    console.log('Requesting permission...');
                    const result = await requestPermission();
                    setPermissionStatus(result ? 'granted' : 'denied');
                } else {
                    setPermissionStatus('granted');
                }
            } catch (error) {
                console.error('Permission error:', error);
                setPermissionStatus('denied');
            }
        };

        checkPermissions();
    }, [hasPermission, requestPermission]);

    useEffect(() => {
        // Blinking animation loop
        Animated.loop(
            Animated.sequence([
                Animated.timing(blinkAnim, {
                    toValue: 1,
                    duration: 700,
                    useNativeDriver: true,
                }),
                Animated.timing(blinkAnim, {
                    toValue: 0,
                    duration: 700,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);


    if (permissionStatus === 'checking') {
        return <LoadingView text="Checking permissions..." />;
    }

    if (permissionStatus === 'denied') {
        return <ErrorView text="Camera permission denied. Please enable in settings." />;
    }

    if (!device) {
        return <ErrorView text="No camera device found. Are you using an emulator?" />;
    }

    const toggleCamera = () => {
        setCameraStatus((prev) => (prev === 0 ? 1 : 0));
    };




    return (
        <View style={styles.container}>
            <Camera
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
                codeScanner={codeScanner}
            />

            {/* Blinking Scan Frame */}
            <View style={styles.scanFrame}>
                {['tl', 'tr', 'bl', 'br'].map((corner) => (
                    <Animated.View
                        key={corner}
                        style={[
                            styles.corner,
                            styles[corner],
                            { opacity: blinkAnim.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1] }) },
                        ]}
                    />
                ))}
            </View>

            {scannedCode && (
                <View style={styles.codeDisplay}>
                    <TouchableOpacity onPress={() => Linking.openURL(`https://www.google.com/search?q=${encodeURIComponent(scannedCode)}`)}>
                        <Text style={[styles.codeText, { color: '#fff' }]}>
                            {scannedCode}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}




            <TouchableOpacity
                style={styles.switchButton}
                onPress={toggleCamera}
            >
                <Text style={styles.switchButtonText}>
                    Switch to {cameraStatus === 1 ? 'Front' : 'Back'} Camera
                </Text>
            </TouchableOpacity>
        </View>

    );
};

// Helper components
const LoadingView = ({ text }) => (
    <View style={styles.container}>
        <Text style={styles.text}>{text}</Text>
    </View>
);

const ErrorView = ({ text }) => (
    <View style={[styles.container, { backgroundColor: 'black' }]}>
        <Text style={[styles.text, { color: 'red' }]}>{text}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        padding: 20,
    },
    switchButton: {
        position: 'absolute',
        bottom: 40,
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 15,
        borderRadius: 20,
    },
    switchButtonText: {
        color: 'white',
        fontSize: 16,
    },
    codeDisplay: {
        position: 'absolute',
        top: "40%",
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 10,
        borderRadius: 10,
    },
    codeText: {
        color: 'white',
        fontSize: 16,

    },
    scanFrame: {
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '80%',
        height: 400,
        justifyContent: 'center',
        alignItems: 'center',
    },

    corner: {
        width: 50,
        height: 50,
        borderColor: '#fff',
        position: 'absolute',
    },

    tl: {
        top: 0,
        left: 0,
        borderTopWidth: 4,
        borderLeftWidth: 4,
        borderTopLeftRadius: 10,
    },

    tr: {
        top: 0,
        right: 0,
        borderTopWidth: 4,
        borderRightWidth: 4,
        borderTopRightRadius: 10,
    },

    bl: {
        bottom: 0,
        left: 0,
        borderBottomWidth: 4,
        borderLeftWidth: 4,
        borderBottomLeftRadius: 10,
    },

    br: {
        bottom: 0,
        right: 0,
        borderBottomWidth: 4,
        borderRightWidth: 4,
        borderBottomRightRadius: 10,
    },

});

export default QRScanner;
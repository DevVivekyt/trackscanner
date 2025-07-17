import React, { useState, useRef } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
    Alert,
    Platform,
    ToastAndroid,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView,
    Modal,
    PermissionsAndroid
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import { LinearGradient } from 'react-native-linear-gradient';
import Share from 'react-native-share';
import { QRTemplates } from '../components/QRTemplates';

const { width, height } = Dimensions.get('window');

const QRGenerator = () => {
    const [inputText, setInputText] = useState('');
    const [qrValue, setQrValue] = useState('');
    const [hasPermission, setHasPermission] = useState(null);
    const [showCustomization, setShowCustomization] = useState(false);
    const [qrColor, setQrColor] = useState('#2d3748');
    const [qrBackgroundColor, setQrBackgroundColor] = useState('#ffffff');
    const [qrSize, setQrSize] = useState(250);
    const [qrStyle, setQrStyle] = useState('square');
    const [frameStyle, setFrameStyle] = useState('none');
    const viewShotRef = useRef();
    const [selectedTemplate, setSelectedTemplate] = useState(0); // 0 = first template

    const requestStoragePermission = async () => {
        if (Platform.OS === 'android') {
            try {
                // For Android 11+ (API 30+), we don't need WRITE_EXTERNAL_STORAGE permission
                // for saving to app-specific directories
                const androidVersion = Platform.Version;

                if (androidVersion >= 30) {
                    // Android 11+ - no permission needed for app-specific storage
                    return true;
                } else {
                    // Android 10 and below - request storage permission
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                        {
                            title: 'Storage Permission',
                            message: 'This app needs access to storage to save QR codes to your gallery.',
                            buttonNeutral: 'Ask Me Later',
                            buttonNegative: 'Cancel',
                            buttonPositive: 'OK',
                        }
                    );
                    return granted === PermissionsAndroid.RESULTS.GRANTED;
                }
            } catch (err) {
                console.warn('Permission request error:', err);
                return false;
            }
        }
        return true;
    };

    const saveToDownloads = async (filePath, fileName) => {
        try {
            // Try multiple locations for Downloads folder
            const possiblePaths = [
                `${RNFS.DownloadDirectoryPath}/${fileName}`,
                `${RNFS.ExternalDirectoryPath}/Download/${fileName}`,
                `${RNFS.ExternalDirectoryPath}/${fileName}`,
            ];

            let success = false;
            let savedPath = '';

            for (const path of possiblePaths) {
                try {
                    // Ensure directory exists
                    const dirPath = path.substring(0, path.lastIndexOf('/'));
                    await RNFS.mkdir(dirPath);

                    // Copy file
                    await RNFS.copyFile(filePath, path);

                    // Verify file was saved
                    const exists = await RNFS.exists(path);
                    if (exists) {
                        success = true;
                        savedPath = path;
                        console.log('File saved successfully to:', path);
                        break;
                    }
                } catch (error) {
                    console.log(`Failed to save to ${path}:`, error.message);
                    continue;
                }
            }

            if (success) {
                ToastAndroid.show('QR Code saved to Downloads!', ToastAndroid.LONG);
                Alert.alert('Success', `QR Code saved to Downloads folder.\nPath: ${savedPath}`);
            } else {
                throw new Error('Could not save to any Downloads location');
            }
        } catch (error) {
            console.error('Save to Downloads failed:', error);
            throw error;
        }
    };

    const shareQRCode = async (filePath) => {
        try {
            const shareOptions = {
                title: 'Save QR Code',
                url: 'file://' + filePath,
                type: 'image/png',
                saveToFiles: true,
            };

            await Share.open(shareOptions);
        } catch (error) {
            if (error.message !== 'User did not share') {
                console.error('Share error:', error);
                Alert.alert('Error', 'Failed to share QR code');
            }
        }
    };

    const colorOptions = [
        { name: 'Black', value: '#2d3748' },
        { name: 'Blue', value: '#4299e1' },
        { name: 'Green', value: '#48bb78' },
        { name: 'Purple', value: '#805ad5' },
        { name: 'Red', value: '#f56565' },
        { name: 'Orange', value: '#ed8936' },
        { name: 'Pink', value: '#ed64a6' },
        { name: 'Teal', value: '#38b2ac' },
    ];

    const sizeOptions = [
        { name: 'Small', value: 200 },
        { name: 'Medium', value: 250 },
        { name: 'Large', value: 300 },
        { name: 'Extra Large', value: 350 },
    ];

    const styleOptions = [
        { name: 'Square', value: 'square' },
        { name: 'Rounded', value: 'rounded' },
        { name: 'Dots', value: 'dots' },
    ];

    const frameOptions = [
        { name: 'None', value: 'none' },
        { name: 'Simple', value: 'simple' },
        { name: 'Rounded', value: 'rounded' },
        { name: 'Gradient', value: 'gradient' },
        { name: 'Shadow', value: 'shadow' },
    ];

    const generateQRCode = () => {
        if (inputText.trim()) {
            setQrValue(inputText);
        } else {
            Alert.alert('Error', 'Please enter text or URL');
        }
    };

    const downloadQRCode = async () => {
        if (!qrValue) {
            Alert.alert('Error', 'Generate a QR code first');
            return;
        }

        const permissionGranted = await requestStoragePermission();
        if (!permissionGranted) {
            Alert.alert('Permission Denied', 'Storage permission is required to save the QR code.');
            return;
        }

        try {
            const uri = await viewShotRef.current.capture();
            console.log('Captured URI:', uri);

            const fileExists = await RNFS.exists(uri);
            if (!fileExists) {
                throw new Error('QR image not captured properly.');
            }

            const fileName = `NG_QR_${Date.now()}.png`;
            const filePath = `${RNFS.CachesDirectoryPath}/${fileName}`;
            await RNFS.copyFile(uri, filePath);

            // Directly show share option
            await shareQRCode(filePath);

        } catch (error) {
            console.error('Error saving QR code:', error);
            Alert.alert('Error', `Failed to save QR code: ${error.message}`);
        }
    };


    const getFrameStyle = () => {
        switch (frameStyle) {
            case 'simple':
                return styles.frameSimple;
            case 'rounded':
                return styles.frameRounded;
            case 'gradient':
                return styles.frameGradient;
            case 'shadow':
                return styles.frameShadow;
            default:
                return {};
        }
    };

    const renderColorPicker = () => (
        <View style={styles.customizationSection}>
            <Text style={styles.sectionTitle}>QR Code Color</Text>
            <View style={styles.colorGrid}>
                {colorOptions.map((color) => (
                    <TouchableOpacity
                        key={color.value}
                        style={[
                            styles.colorOption,
                            { backgroundColor: color.value },
                            qrColor === color.value && styles.colorOptionSelected
                        ]}
                        onPress={() => setQrColor(color.value)}
                    >
                        {qrColor === color.value && (
                            <Text style={styles.colorCheckmark}>✓</Text>
                        )}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );

    const renderSizePicker = () => (
        <View style={styles.customizationSection}>
            <Text style={styles.sectionTitle}>QR Code Size</Text>
            <View style={styles.optionGrid}>
                {sizeOptions.map((size) => (
                    <TouchableOpacity
                        key={size.value}
                        style={[
                            styles.optionButton,
                            qrSize === size.value && styles.optionButtonSelected
                        ]}
                        onPress={() => setQrSize(size.value)}
                    >
                        <Text style={[
                            styles.optionButtonText,
                            qrSize === size.value && styles.optionButtonTextSelected
                        ]}>
                            {size.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );

    const renderStylePicker = () => (
        <View style={styles.customizationSection}>
            <Text style={styles.sectionTitle}>QR Code Style</Text>
            <View style={styles.optionGrid}>
                {styleOptions.map((style) => (
                    <TouchableOpacity
                        key={style.value}
                        style={[
                            styles.optionButton,
                            qrStyle === style.value && styles.optionButtonSelected
                        ]}
                        onPress={() => setQrStyle(style.value)}
                    >
                        <Text style={[
                            styles.optionButtonText,
                            qrStyle === style.value && styles.optionButtonTextSelected
                        ]}>
                            {style.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );

    const renderFramePicker = () => (
        <View style={styles.customizationSection}>
            <Text style={styles.sectionTitle}>Frame Style</Text>
            <View style={styles.optionGrid}>
                {frameOptions.map((frame) => (
                    <TouchableOpacity
                        key={frame.value}
                        style={[
                            styles.optionButton,
                            frameStyle === frame.value && styles.optionButtonSelected
                        ]}
                        onPress={() => setFrameStyle(frame.value)}
                    >
                        <Text style={[
                            styles.optionButtonText,
                            frameStyle === frame.value && styles.optionButtonTextSelected
                        ]}>
                            {frame.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <LinearGradient
                    colors={['#667eea', '#764ba2']}
                    style={styles.header}
                >
                    <Text style={styles.headerTitle}>QR Code Generator</Text>
                    <Text style={styles.headerSubtitle}>Create custom QR codes instantly</Text>
                </LinearGradient>

                {/* Input Section */}
                <View style={styles.inputSection}>
                    <Text style={styles.sectionTitle}>Enter Content</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter text, URL, or any content..."
                            placeholderTextColor="#a0aec0"
                            value={inputText}
                            onChangeText={setInputText}
                            multiline
                            numberOfLines={3}
                        />
                    </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.buttonSection}>
                    <TouchableOpacity
                        style={styles.generateButton}
                        onPress={generateQRCode}
                        activeOpacity={0.8}
                    >
                        <LinearGradient
                            colors={['#48bb78', '#38a169']}
                            style={styles.buttonGradient}
                        >
                            <Text style={styles.buttonText}>Generate QR Code</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    {qrValue && (
                        <>
                            {/* <TouchableOpacity
                                style={styles.customizeButton}
                                onPress={() => setShowCustomization(true)}
                                activeOpacity={0.8}
                            >
                                <LinearGradient
                                    colors={['#ed8936', '#dd6b20']}
                                    style={styles.buttonGradient}
                                >
                                    <Text style={styles.buttonText}>Customize QR Code</Text>
                                </LinearGradient>
                            </TouchableOpacity> */}

                            <TouchableOpacity
                                style={styles.downloadButton}
                                onPress={downloadQRCode}
                                activeOpacity={0.8}
                            >
                                <LinearGradient
                                    colors={['#4299e1', '#3182ce']}
                                    style={styles.buttonGradient}
                                >
                                    <Text style={styles.buttonText}>Download QR Code</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </>
                    )}
                </View>

                <View style={{ padding: 20 }}>
                    {qrValue && (<>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 10 }}>
                            {QRTemplates.map((Template, idx) => (
                                <TouchableOpacity key={idx} onPress={() => setSelectedTemplate(idx)} style={{ marginHorizontal: 8 }}>
                                    <Template value={qrValue || 'preview'} size={80} />
                                    {selectedTemplate === idx && <Text style={{ textAlign: 'center', color: '#667eea' }}>Selected</Text>}
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </>)}
                </View>

                {/* QR Code Display */}
                {qrValue ? (
                    <View style={styles.qrSection}>
                        <Text style={styles.sectionTitle}>Generated QR Code</Text>
                        <View style={[styles.qrContainer, getFrameStyle()]}>
                            {frameStyle === 'gradient' && (
                                <LinearGradient
                                    colors={['#667eea', '#764ba2']}
                                    style={styles.gradientFrame}
                                />
                            )}
                            <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 1 }}>
                                <View style={styles.qrWrapper}>
                                    {React.createElement(QRTemplates[selectedTemplate], {
                                        value: qrValue,
                                    })}
                                </View>
                            </ViewShot>
                        </View>
                        <Text style={styles.qrInfo}>Scan this QR code with any QR scanner app</Text>
                    </View>
                ) : (
                    <View style={styles.placeholderSection}>
                        <View style={styles.placeholderContainer}>
                            <Text style={styles.placeholderIcon}>🎯</Text>
                            <Text style={styles.placeholderText}>Your QR code will appear here</Text>
                            <Text style={styles.placeholderSubtext}>Enter content above and tap generate</Text>
                        </View>
                    </View>
                )}
            </ScrollView>

            {/* Customization Modal */}
            <Modal
                visible={showCustomization}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowCustomization(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Customize QR Code</Text>
                            <TouchableOpacity
                                onPress={() => setShowCustomization(false)}
                                style={styles.closeButton}
                            >
                                <Text style={styles.closeButtonText}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
                            {renderColorPicker()}
                            {renderSizePicker()}
                            {renderStylePicker()}
                            {renderFramePicker()}
                            <View style={styles.customizationSection}>
                                <Text style={styles.sectionTitle}>Select Template</Text>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 10 }}>
                                    {QRTemplates.map((Template, idx) => (
                                        <TouchableOpacity key={idx} onPress={() => setSelectedTemplate(idx)} style={{ marginHorizontal: 8 }}>
                                            <Template value={qrValue || 'preview'} size={80} />
                                            {selectedTemplate === idx && <Text style={{ textAlign: 'center', color: '#667eea' }}>Selected</Text>}
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        </ScrollView>

                        <View style={styles.modalFooter}>
                            <TouchableOpacity
                                style={styles.applyButton}
                                onPress={() => setShowCustomization(false)}
                                activeOpacity={0.8}
                            >
                                <LinearGradient
                                    colors={['#48bb78', '#38a169']}
                                    style={styles.buttonGradient}
                                >
                                    <Text style={styles.buttonText}>Apply Changes</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    scrollContent: {
        flexGrow: 1,
    },
    header: {
        paddingTop: 60,
        paddingBottom: 30,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 8,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#ffffff',
        opacity: 0.9,
        textAlign: 'center',
    },
    inputSection: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2d3748',
        marginBottom: 15,
        textAlign: 'center',
    },
    inputContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    input: {
        padding: 15,
        fontSize: 16,
        color: '#2d3748',
        textAlignVertical: 'top',
        minHeight: 80,
    },
    buttonSection: {
        paddingHorizontal: 20,
        gap: 15,
    },
    generateButton: {
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    customizeButton: {
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    downloadButton: {
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonGradient: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 12,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    qrSection: {
        padding: 20,
        alignItems: 'center',
    },
    qrContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
        marginBottom: 15,
        position: 'relative',
    },
    qrWrapper: {
        padding: 10,
        backgroundColor: '#ffffff',
        borderRadius: 10,
    },
    qrInfo: {
        fontSize: 14,
        color: '#718096',
        textAlign: 'center',
        fontStyle: 'italic',
    },
    placeholderSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    placeholderContainer: {
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 40,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    placeholderIcon: {
        fontSize: 48,
        marginBottom: 15,
    },
    placeholderText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2d3748',
        marginBottom: 8,
        textAlign: 'center',
    },
    placeholderSubtext: {
        fontSize: 14,
        color: '#718096',
        textAlign: 'center',
        lineHeight: 20,
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        width: width * 0.9,
        maxHeight: height * 0.9,
        minHeight: height * 0.7,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2d3748',
    },
    closeButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#f7fafc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        fontSize: 16,
        color: '#718096',
        fontWeight: 'bold',
    },
    modalBody: {
        flex: 1,
        padding: 20,
    },
    modalFooter: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
    },
    applyButton: {
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    // Customization Styles
    customizationSection: {
        marginBottom: 25,
    },
    colorGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 10,
    },
    colorOption: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#e2e8f0',
    },
    colorOptionSelected: {
        borderColor: '#667eea',
        borderWidth: 3,
    },
    colorCheckmark: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    optionGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 10,
    },
    optionButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#f7fafc',
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    optionButtonSelected: {
        backgroundColor: '#667eea',
        borderColor: '#667eea',
    },
    optionButtonText: {
        fontSize: 14,
        color: '#4a5568',
        fontWeight: '500',
    },
    optionButtonTextSelected: {
        color: '#ffffff',
    },
    // Frame Styles
    frameSimple: {
        borderWidth: 3,
        borderColor: '#667eea',
    },
    frameRounded: {
        borderRadius: 30,
    },
    frameGradient: {
        position: 'relative',
    },
    frameShadow: {
        shadowColor: '#667eea',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 12,
    },
    gradientFrame: {
        position: 'absolute',
        top: -10,
        left: -10,
        right: -10,
        bottom: -10,
        borderRadius: 30,
        zIndex: -1,
    },
});

export default QRGenerator;
import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QRGenerator from './src/pages/QRGenerator';
import QRScanner from './src/pages/QRScanner';
import HomeScreen from './src/pages/Home';
import SplashScreen from './src/components/SplashScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleSplashFinish = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#ffffff" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#667eea',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'NG QR Generator',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Scanner"
            component={QRScanner}
            options={{
              title: 'QR Scanner',
            }}
          />
          <Stack.Screen
            name="Generator"
            component={QRGenerator}
            options={{
              title: 'QR Generator',
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;

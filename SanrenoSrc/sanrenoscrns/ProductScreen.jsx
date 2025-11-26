import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Alert,
  Linking,
  Image,
  Text,
  ActivityIndicator,
} from 'react-native';
//import { SafeAreaView } from 'react-native-safe-area-context';
//import { WebView } from 'react-native-webview';
//import DeviceInfo from 'react-native-device-info';
//import AsyncStorage from '@react-native-async-storage/async-storage';


const ProductScreen = ({ route, navigation }) => { 
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Product Screen</Text>
        </View>
    );
};

export default ProductScreen;
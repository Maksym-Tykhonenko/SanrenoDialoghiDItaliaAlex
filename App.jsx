import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect, useRef } from 'react';
import { Animated, Easing, Dimensions, View, Image } from 'react-native';
import Sanrenohnscr from './SanrenoSrc/sanrenoscrns/Sanrenohnscr';
import Sarenostrdetscr from './SanrenoSrc/sanrenoscrns/Sarenostrdetscr';
import { SanrenoStoreProvider } from './SanrenoSrc/sanrenostr/sanrenocntxt';
import Sanrenostrscr from './SanrenoSrc/sanrenoscrns/Sanrenostrscr';
import Sanrenosvdscr from './SanrenoSrc/sanrenoscrns/Sanrenosvdscr';
import Sanrenosttscr from './SanrenoSrc/sanrenoscrns/Sanrenosttscr';
import Sanrenoqzscr from './SanrenoSrc/sanrenoscrns/Sanrenoqzscr';
import Sanrenoonbscr from './SanrenoSrc/sanrenoscrns/Sanrenoonbscr';
import Sanrenoldr from './SanrenoSrc/sanrenocmpnts/Sanrenoldr';
import ProductScreen from './SanrenoSrc/sanrenoscrns/ProductScreen';

const Stack = createStackNavigator();

const App = () => {
  const [route, setRoute] = useState(false);
  //console.log('route===>', route);

  ///////// Route
  const Route = ({ isFatch }) => {
    //if (!completeLink) {
    //  // Показуємо тільки лоудери, поки acceptTransparency і completeLink не true
    //  return null;
    //}

    if (isFatch) {
      return (
        <Stack.Navigator>
          <Stack.Screen
            initialParams={{
              //responseToPushPermition,
              //product: finalLink,
              //timeStampUserId: timeStampUserId,
            }}
            name="ProductScreen"
            component={ProductScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      );
    }
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Sanrenoonbscr" component={Sanrenoonbscr} />
            <Stack.Screen name="Sanrenohnscr" component={Sanrenohnscr} />
            <Stack.Screen name="Sanrenostrscr" component={Sanrenostrscr} />
            <Stack.Screen name="Sarenostrdetscr" component={Sarenostrdetscr} />
            <Stack.Screen name="Sanrenosvdscr" component={Sanrenosvdscr} />
            <Stack.Screen name="Sanrenosttscr" component={Sanrenosttscr} />
            <Stack.Screen name="Sanrenoqzscr" component={Sanrenoqzscr} />
          </Stack.Navigator>
    );
  };

  ///////// Loader
  const [startSanrenoLoader, setStartSanrenoLoader] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setStartSanrenoLoader(true);
    }, 2500);
  }, []);

  // Animation state
  const screenWidth = Dimensions.get('window').width;
  const slideAnim = useRef(new Animated.Value(0)).current; // 0 .. -screenWidth

  useEffect(() => {
    // запускаємо анімацію тільки коли компонент лоудера показаний
    if (!startSanrenoLoader) {
      // Слайд від 0 до -screenWidth за 6 секунд
      Animated.timing(slideAnim, {
        toValue: -screenWidth,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => {
        // по завершенні анімації показуємо основний контент
        //setstartSanrenoLoader(true);
      });
    }
  }, [slideAnim, screenWidth, startSanrenoLoader]);

  return (
    <NavigationContainer>
      <SanrenoStoreProvider>
        {!startSanrenoLoader ? (
          <View style={{ flex: 1, overflow: 'hidden' }}>
          {/* Контейнер шириною у 2 * screenWidth: два зображення поруч */}
          <Animated.View
            style={{
              flexDirection: 'row',
              width: screenWidth * 2,
              height: '100%',
              transform: [{ translateX: slideAnim }],
            }}
          >
            <Image
              style={{ width: screenWidth, height: '100%' }}
              source={require('./assets/images/1.png')}
              resizeMode="cover"
            />
            <Image
              style={{ width: screenWidth, height: '100%' }}
              source={require('./assets/images/2.png')}
              resizeMode="cover"
            />
          </Animated.View>
        </View>
        ) : (
          <Route isFatch={route} />
        )}
      </SanrenoStoreProvider>
    </NavigationContainer>
  );
};

export default App;

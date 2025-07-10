import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const DRAWER_WIDTH = 200;

export default function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const position = useRef(new Animated.ValueXY({ x: 0, y: -200 })).current;

  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.inOut(Easing.linear), // continuous sine-like easing
        useNativeDriver: true,
      }),
    );

    loop.start();

    return () => loop.stop();
  }, [animatedValue]);

  // Interpolate Y movement as a sine wave motion between -200 to 200
  const translateY = animatedValue.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [0, -200, 0, 200, 0], // like bouncing back and forth
  });
  const toggleDrawer = () => {
    Animated.timing(translateX, {
      toValue: isDrawerOpen ? -DRAWER_WIDTH : 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsDrawerOpen(!isDrawerOpen));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Main Screen</Text>
      <Animated.View
        style={[
          styles.box,
          {
            transform: [
              { translateY }, // 👈 hourglass effect!
            ],
          },
        ]}
      >
        <Text style={styles.text}>I'm sliding in!</Text>
      </Animated.View>
      {/* Open Drawer Button */}
      {!isDrawerOpen && (
        <TouchableOpacity style={styles.openBtn} onPress={toggleDrawer}>
          <Text style={styles.btnText}>☰</Text>
        </TouchableOpacity>
      )}

      {/* Drawer */}
      <Animated.View
        style={[
          styles.drawer,
          {
            transform: [{ translateX }],
            // scaleX,
          },
        ]}
      >
        {/* Close Button */}
        <TouchableOpacity style={styles.closeBtn} onPress={toggleDrawer}>
          <Text style={styles.btnText}>✕</Text>
        </TouchableOpacity>

        {/* Drawer Content */}
        <Animated.Text style={styles.drawerText}>I'm a drawer!</Animated.Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
  },
  box: {
    width: 200,
    height: 100,
    backgroundColor: '#4ade80',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 100,
  },
  drawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: DRAWER_WIDTH,
    height: Dimensions.get('screen').height,
    backgroundColor: 'white',
    elevation: 5,
    padding: 16,
  },
  drawerText: {
    color: 'black',
    fontSize: 20,
    marginTop: 60,
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  openBtn: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  btnText: {
    fontSize: 30,
    color: 'black',
  },
});

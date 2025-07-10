import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const DRAWER_WIDTH = 200;

export default function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;

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
          },
        ]}
      >
        {/* Close Button */}
        <TouchableOpacity style={styles.closeBtn} onPress={toggleDrawer}>
          <Text style={styles.btnText}>✕</Text>
        </TouchableOpacity>

        {/* Drawer Content */}
        <Text style={styles.drawerText}>I'm a drawer!</Text>
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

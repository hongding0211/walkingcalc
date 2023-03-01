import React from 'react'
import { Image, StyleSheet, View, Dimensions } from 'react-native'

const Splash: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/splash.png')}
        resizeMode="contain"
        style={styles.img}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: Dimensions.get('window').width,
  },
})

export default Splash

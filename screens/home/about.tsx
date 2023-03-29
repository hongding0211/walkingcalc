import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

import appSetting from '../../app.json'
import ThemedText from '../../components/General/Themed/Text'

const About: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/icon.png')}
        style={styles.img}
      />
      <View>
        <ThemedText style={{ fontWeight: '700', marginBottom: 6 }}>Walking Calculator</ThemedText>
        <ThemedText style={{ fontSize: 14, fontWeight: '500', marginBottom: 6 }}>Build with React Native</ThemedText>
        <ThemedText style={{ fontSize: 12, marginBottom: 16 }}>Version: {appSetting.expo.version}</ThemedText>
        <ThemedText
          type="SECOND"
          style={{ fontSize: 12, marginBottom: 6 }}
        >
          © {new Date(Date.now()).getFullYear()} Hong
        </ThemedText>
      </View>
    </View>
  )
}

export default About

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  img: {
    width: 70,
    height: 70,
    marginRight: 40,
  },
})

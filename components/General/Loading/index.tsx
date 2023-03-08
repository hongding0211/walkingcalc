import Lottie from 'lottie-react-native'
import React, { useContext } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'

import { useAppSelector } from '../../../app/store'
import { Color, ColorDark } from '../../../constants/Colors'
import { ThemeContext } from '../../../feature/theme/themeContext'

const Loading: React.FC = () => {
  const theme = useContext(ThemeContext)
  const loading = useAppSelector(state => state.general.loading)

  if (!loading) {
    return null
  }

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: theme.scheme === 'LIGHT' ? Color.BackgroundSecond : ColorDark.Third,
          },
        ]}
      >
        <Lottie
          style={styles.icon}
          source={require('./assets/137044-loading.json')}
          autoPlay
          loop
        />
      </View>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    borderRadius: 8,
  },
  icon: {
    height: 72,
    width: 72,
  },
})

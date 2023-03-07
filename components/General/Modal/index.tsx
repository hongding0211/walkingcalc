import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { BlurView } from 'expo-blur'
import React, { useCallback, useContext, useEffect, useRef } from 'react'
import { Animated, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, View } from 'react-native'

import styles from './style'
import { Color, ColorDark } from '../../../constants/Colors'
import { ThemeContext } from '../../../feature/theme/themeContext'
import ThemedText from '../Themed/Text'
import ThemedView from '../Themed/View'
import ThemedPressable from '../ThemedPressable'

interface IModal {
  title?: string
  hideTitle?: boolean
  onClose?: () => void
  children?: React.ReactNode
}

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

const Modal: React.FC<IModal> = props => {
  const { title = '', hideTitle = false, onClose, children } = props

  const blurAnim = useRef(new Animated.Value(0))
  const theme = useContext(ThemeContext)

  useEffect(() => {
    Animated.spring(blurAnim.current, {
      toValue: 50,
      useNativeDriver: false,
    }).start()
  }, [])

  const handlePressClose = useCallback(() => {
    onClose && onClose()
  }, [])

  const handleCloseKeyboard = useCallback(() => {
    Keyboard.dismiss()
  }, [])

  return (
    <>
      <AnimatedBlurView
        style={[styles.mask]}
        intensity={blurAnim.current}
      />

      <TouchableWithoutFeedback onPress={handlePressClose}>
        <View style={styles.container}>
          <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={-60}
          >
            <TouchableWithoutFeedback onPress={handleCloseKeyboard}>
              <ThemedView style={styles.card}>
                {!hideTitle && (
                  <View style={styles.title}>
                    <ThemedText style={styles.titleText}>{title}</ThemedText>
                    <ThemedPressable
                      highLight
                      onPress={handlePressClose}
                    >
                      <FontAwesomeIcon
                        icon={faXmark}
                        style={{ color: theme.scheme === 'LIGHT' ? Color.Second : ColorDark.Second }}
                      />
                    </ThemedPressable>
                  </View>
                )}
                <View style={styles.content}>{children}</View>
              </ThemedView>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </>
  )
}

export default Modal

import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { BlurView } from 'expo-blur'
import React, { useCallback, useContext } from 'react'
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, View } from 'react-native'

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

const Modal: React.FC<IModal> = props => {
  const { title = '', hideTitle = false, onClose, children } = props

  const theme = useContext(ThemeContext)

  const handlePressClose = useCallback(() => {
    onClose && onClose()
  }, [])

  const handleCloseKeyboard = useCallback(() => {
    Keyboard.dismiss()
  }, [])

  return (
    <>
      <BlurView
        style={[styles.mask]}
        intensity={50}
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

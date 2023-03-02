import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { BlurView } from 'expo-blur'
import React, { useCallback, useContext, useRef } from 'react'
import { Pressable, ScrollView, View } from 'react-native'

import styles from './style'
import { Color, ColorDark } from '../../../constants/Colors'
import { ThemeContext } from '../../../feature/theme/themeContext'
import ThemedText from '../Text'
import ThemedView from '../View'

interface IModal {
  title?: string
  hideTitle?: boolean
  onClose?: () => void
  children?: React.ReactNode
}

const Modal: React.FC<IModal> = props => {
  const { title = '', hideTitle = false, onClose, children } = props

  const touchContentRef = useRef(false)

  const theme = useContext(ThemeContext)

  const handleEndTouchMask = useCallback(() => {
    if (touchContentRef.current) {
      touchContentRef.current = false
      return
    }
    onClose && onClose()
  }, [])

  const handleStartTouchContent = useCallback(() => {
    touchContentRef.current = true
  }, [])

  const handlePressClose = useCallback(() => {
    onClose && onClose()
  }, [])

  return (
    <>
      <BlurView
        style={styles.mask}
        tint={theme.scheme === 'LIGHT' ? 'light' : 'dark'}
      />
      <Pressable
        onTouchEnd={handleEndTouchMask}
        style={styles.container}
      >
        <ThemedView
          style={styles.card}
          onTouchStart={handleStartTouchContent}
        >
          {!hideTitle && (
            <View style={styles.title}>
              <ThemedText style={styles.titleText}>{title}</ThemedText>
              <Pressable onPress={handlePressClose}>
                <FontAwesomeIcon
                  icon={faXmark}
                  style={{ color: theme.scheme === 'LIGHT' ? Color.Second : ColorDark.Second }}
                />
              </Pressable>
            </View>
          )}
          <ScrollView style={styles.content}>{children}</ScrollView>
        </ThemedView>
      </Pressable>
    </>
  )
}

export default Modal

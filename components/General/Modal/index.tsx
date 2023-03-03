import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { BlurView } from 'expo-blur'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Keyboard, Pressable, TouchableWithoutFeedback, View } from 'react-native'

import styles from './style'
import { Color, ColorDark } from '../../../constants/Colors'
import { ThemeContext } from '../../../feature/theme/themeContext'
import ThemedText from '../Themed/Text'
import ThemedView from '../Themed/View'

interface IModal {
  title?: string
  hideTitle?: boolean
  onClose?: () => void
  children?: React.ReactNode
}

const Modal: React.FC<IModal> = props => {
  const { title = '', hideTitle = false, onClose, children } = props

  const layoutRef = useRef<any>(undefined)

  const [bottomOffset, setBottomOffset] = useState(0)
  const [maxHeight, setMaxHeight] = useState<number | undefined>(undefined)

  const theme = useContext(ThemeContext)

  const handlePressClose = useCallback(() => {
    onClose && onClose()
  }, [])

  const handleCloseKeyboard = useCallback(() => {
    Keyboard.dismiss()
  }, [])

  const handleLayout = useCallback((e: any) => {
    layoutRef.current = e.nativeEvent.layout
  }, [])

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      const keyboardY = Keyboard.metrics()?.screenY
      if (keyboardY === undefined) {
        return
      }
      const { y, height } = layoutRef.current
      const overlap = y + height - keyboardY
      if (overlap > 50) {
        setBottomOffset(overlap + 100)
      }
    })
    Keyboard.addListener('keyboardWillHide', () => {
      setBottomOffset(0)
      setMaxHeight(undefined)
    })
  }, [])

  return (
    <TouchableWithoutFeedback onPress={handlePressClose}>
      <BlurView
        style={[
          styles.mask,
          {
            bottom: bottomOffset,
            maxHeight,
          },
        ]}
      >
        <TouchableWithoutFeedback onPress={handleCloseKeyboard}>
          <ThemedView
            style={styles.card}
            onLayout={handleLayout}
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
            <View style={styles.content}>{children}</View>
          </ThemedView>
        </TouchableWithoutFeedback>
      </BlurView>
    </TouchableWithoutFeedback>
  )
}

export default Modal

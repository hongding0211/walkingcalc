import React, { useContext, useEffect, useRef, useState } from 'react'
import { Animated, StyleSheet, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'

import { useAppSelector } from '../../app/store'
import { Typography, TypographyDark } from '../../constants/Colors'
import { setToast } from '../../feature/general/generalSlice'
import { ThemeContext } from '../../feature/theme/themeContext'

const bottomOffset = 20

const Toast: React.FC = () => {
  const [show, setShow] = useState(false)
  const [msg, setMsg] = useState('')

  const theme = useContext(ThemeContext)
  const safeArea = useSafeAreaInsets()
  const toastMsg = useAppSelector(state => state.general.toast)
  const dispatch = useDispatch()

  const timer = useRef<NodeJS.Timeout | undefined>(undefined)
  const opacityAnim = useRef(new Animated.Value(0))
  const bottomAnim = useRef(new Animated.Value(bottomOffset))

  useEffect(() => {
    if (toastMsg) {
      setMsg(toastMsg)
      setShow(true)
      dispatch(setToast({ msg: '' }))
      if (timer.current) {
        clearTimeout(timer.current)
      }
      timer.current = setTimeout(() => {
        setShow(false)
      }, 2000)
    }
  }, [toastMsg])

  useEffect(() => {
    if (show) {
      Animated.parallel([
        Animated.spring(opacityAnim.current, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.spring(bottomAnim.current, {
          toValue: 0,
          useNativeDriver: true,
        }),
      ]).start()
    } else {
      Animated.parallel([
        Animated.spring(opacityAnim.current, {
          toValue: 0,
          useNativeDriver: true,
        }),
        Animated.spring(bottomAnim.current, {
          toValue: bottomOffset,
          useNativeDriver: true,
        }),
      ]).start()
    }
  }, [show])

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        theme.scheme === 'LIGHT' ? styles.bg : styles.bgDark,
        {
          bottom: safeArea.bottom + 30,
          opacity: opacityAnim.current,
          transform: [
            {
              translateY: bottomAnim.current,
            },
          ],
        },
      ]}
    >
      <Text
        style={{
          color:
            theme.scheme === 'LIGHT'
              ? TypographyDark.Primary
              : Typography.Primary,
          fontWeight: '500',
        }}
      >
        {msg}
      </Text>
    </Animated.View>
  )
}

export default Toast

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
  },
  bg: {
    backgroundColor: 'rgba(35,35,35,0.8)',
  },
  bgDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  text: {
    fontWeight: '600',
  },
})

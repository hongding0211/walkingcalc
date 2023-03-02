import React, { useCallback, useState } from 'react'
import { Dimensions, Pressable, StyleSheet, View } from 'react-native'

interface IPopover {
  children?: React.ReactNode
  content?: React.ReactNode
  align?: 'flex-start' | 'flex-end'
}

const Popover: React.FC<IPopover> = props => {
  const { children, align = 'flex-start', content } = props

  const [childrenElemSize, setChildrenElemSize] = useState({
    width: -1,
    height: -1,
  })
  const [showContent, setShowContent] = useState(false)

  const handleChildrenLayout = useCallback((e: any) => {
    const { width, height } = e.nativeEvent.layout
    setChildrenElemSize({
      width,
      height,
    })
  }, [])

  const handleToggleContent = useCallback(() => {
    setShowContent(!showContent)
  }, [showContent])

  const handleEndTouch = useCallback(() => {
    setShowContent(false)
  }, [])

  return (
    <>
      {showContent && (
        <View
          onTouchEnd={handleEndTouch}
          style={styles.mask}
        />
      )}

      <View
        style={[
          styles.container,
          {
            alignItems: align,
          },
        ]}
      >
        <Pressable
          onLayout={handleChildrenLayout}
          onPress={handleToggleContent}
        >
          {children}
        </Pressable>

        {childrenElemSize.width !== -1 && content && showContent && (
          <View
            style={[
              styles.content,
              {
                top: childrenElemSize.height,
              },
            ]}
          >
            {content}
          </View>
        )}
      </View>
    </>
  )
}

export default Popover

const styles = StyleSheet.create({
  mask: {
    position: 'absolute',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  container: {
    position: 'relative',
  },
  content: {
    position: 'absolute',
    margin: 8,
  },
})

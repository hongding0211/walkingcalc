import React, { useCallback, useState } from 'react'
import { StyleSheet, View } from 'react-native'

interface IPopover {
  children?: React.ReactNode
  content?: React.ReactNode
  align?: 'flex-start' | 'flex-end'
  show?: boolean
}

const Popover: React.FC<IPopover> = props => {
  const { children, align = 'flex-start', content, show } = props

  const [childrenElemSize, setChildrenElemSize] = useState({
    width: -1,
    height: -1,
  })

  const handleChildrenLayout = useCallback((e: any) => {
    const { width, height } = e.nativeEvent.layout
    setChildrenElemSize({
      width,
      height,
    })
  }, [])

  return (
    <>
      <View style={[styles.container]}>
        <View onLayout={handleChildrenLayout}>{children}</View>
      </View>

      {childrenElemSize.width !== -1 && content && show && (
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
    </>
  )
}

export default Popover

const styles = StyleSheet.create({
  mask: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  container: {
    position: 'relative',
  },
  content: {
    position: 'absolute',
    margin: 8,
    zIndex: 100,
  },
})

import { faBan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useNavigation } from '@react-navigation/native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import * as Haptics from 'expo-haptics'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'

import { Color, ColorDark } from '../../constants/Colors'
import {
  setScanCodeResult,
  setScanSuccess,
} from '../../feature/general/generalSlice'
import { ThemeContext } from '../../feature/theme/themeContext'
import { CodeScanProps } from '../../navigation/types'
import ThemedText from '../General/Themed/Text'

const NoAccess = () => {
  const { t } = useTranslation('common')
  const theme = useContext(ThemeContext)

  return (
    <View
      style={{
        rowGap: 16,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}
    >
      <FontAwesomeIcon
        style={{
          color: theme.scheme === 'LIGHT' ? Color.Second : ColorDark.Second,
        }}
        icon={faBan}
        size={32}
      />
      <ThemedText type="SECOND" style={{ fontSize: 16, fontWeight: '500' }}>
        {t('noCameraAccess')}
      </ThemedText>
    </View>
  )
}

const QRCodeScanner: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | undefined>(
    undefined
  )
  const navigation = useNavigation<CodeScanProps['navigation']>()
  const dispatch = useDispatch()

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    }

    getBarCodeScannerPermissions().then()

    dispatch(
      setScanCodeResult({
        data: undefined,
      })
    )
    dispatch(
      setScanSuccess({
        success: false,
      })
    )
  }, [])

  const handleScan = useCallback(({ data }: { data: any }) => {
    Haptics.selectionAsync().then()
    dispatch(
      setScanCodeResult({
        data,
      })
    )
    dispatch(
      setScanSuccess({
        success: true,
      })
    )
    navigation.goBack()
  }, [])

  if (!hasPermission) {
    return <NoAccess />
  }

  return (
    <BarCodeScanner onBarCodeScanned={handleScan} style={styles.container} />
  )
}

export default QRCodeScanner

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

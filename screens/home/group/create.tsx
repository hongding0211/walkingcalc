import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'

import FormItem from '../../../components/FormItem'
import Button from '../../../components/General/Button'
import Input from '../../../components/General/Input'
import { Color } from '../../../constants/Colors'

const CreateGroup: React.FC = () => {
  const { t } = useTranslation('home')

  return (
    <View style={styles.container}>
      <FormItem title={t('groupName') + ''}>
        <Input />
      </FormItem>
      <FormItem title={t('groupMembers') + ''}>
        <FontAwesomeIcon
          icon={faCirclePlus}
          style={styles.icon}
        />
      </FormItem>
      <View style={styles.btn}>
        <Button title={t('confirm') + ''} />
      </View>
    </View>
  )
}

export default CreateGroup

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 16,
  },
  icon: {
    color: Color.Primary,
  },
  btn: {
    marginTop: 20,
  },
})

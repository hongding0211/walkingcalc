import { debounce } from 'lodash'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { useUserSearch } from '../../services/user'
import Input from '../General/Input'

const UserSearch: React.FC = props => {
  const [text, setText] = useState('')

  const textRef = useRef('')

  const { mutate: mutateSearchUser } = useUserSearch({
    params: {
      name: textRef.current,
    },
  })

  const handleChangeText = useCallback((text: string) => {
    setText(text)
    textRef.current = text
  }, [])

  const debouncedMutateSearchUser = useCallback(
    debounce(() => {
      mutateSearchUser().then()
    }, 300),
    []
  )

  useEffect(() => {
    debouncedMutateSearchUser()
  }, [text])

  return (
    <>
      <Input
        value={text}
        onChangeText={handleChangeText}
      />
    </>
  )
}

export default UserSearch

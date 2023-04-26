import { MouseEvent, useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { MANTINE_NOTIFICATION_ERROR_TITLE } from '../../shared/constants'

import IdeologyButton from './IdeologyButton'
import MantineBox from './Box'
import { Group, Title, LoadingOverlay } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { viewpointApi as setViewpoint } from '../api/index'

const LOADER_PROPS = {
  size: 'xl',
  color: 'fawn',
}

export default function SelectionPage() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!error) {
      return
    }
    notifications.show({
      color: 'red',
      title: MANTINE_NOTIFICATION_ERROR_TITLE,
      message: error,
    })
  }, [error])

  const handleIdeologySelect = useCallback(
    (viewpoint: string) => {
      setLoading(true)
      setError('')
      setViewpoint(viewpoint)
        .then(() => {
          setLoading(false)
          navigate('/answer')
        })
        .catch((e) => {
          setLoading(false)
          let message = ''
          if (axios.isAxiosError(e)) {
            message = e.message
          } else {
            message = typeof e === 'string' ? e : 'An unknown error occurred.'
          }
          setError(message)
        })
    },
    [navigate]
  )

  const handleSelectConservative = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      handleIdeologySelect('conservative')
    },
    [handleIdeologySelect]
  )

  const handleSelectLiberal = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      handleIdeologySelect('liberal')
    },
    [handleIdeologySelect]
  )

  return (
    <>
      <MantineBox>
        <Title order={2}>Select your viewpoint</Title>
      </MantineBox>
      <Group position="center">
        <LoadingOverlay
          visible={loading}
          overlayBlur={2}
          loaderProps={LOADER_PROPS}
        />
        <IdeologyButton
          loaderProps={LOADER_PROPS}
          disabled={loading}
          onClick={handleSelectConservative}
        >
          Conservative
        </IdeologyButton>
        <IdeologyButton
          loaderProps={LOADER_PROPS}
          disabled={loading}
          onClick={handleSelectLiberal}
        >
          Liberal
        </IdeologyButton>
      </Group>
    </>
  )
}

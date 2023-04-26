import { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Textarea, Title, Button, Group, Box } from '@mantine/core'
import { useForm } from '@mantine/form'

import MantineBox from './Box'
import { Answer } from '../../shared/types'
import { scoreAnswerApi } from '../api'

export default function UserAnswerPage() {
  const [answer, setAnswer] = useState<Answer>('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const form = useForm({
    initialValues: {
      Answer: '',
    },
  })

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      await scoreAnswerApi(answer)
    } catch (e) {
      let message = ''
      if (axios.isAxiosError(e)) {
        message = e.message
      } else {
        message = typeof e === 'string' ? e : 'An unknown error occurred.'
      }
      setError(message)
    }
    setLoading(false)
  }

  return (
    <>
      {error}
      <MantineBox>
        <Title order={2}>
          Explain the INSERT VIEWPOINT view on INSERT TOPIC.
        </Title>
      </MantineBox>
      <Box maw={1370} mx="auto">
        <form onSubmit={handleSubmit}>
          <Textarea
            disabled={loading}
            aria-label="Answer Field"
            placeholder="Your Answer"
            {...form.getInputProps('answer')}
          />

          <Group position="right" mt="md">
            <Button component={Link} to="/score">
              Submit
            </Button>
          </Group>
        </form>
      </Box>
    </>
  )
}

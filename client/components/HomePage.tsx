import { Title, Skeleton } from '@mantine/core'
import { useState } from 'react'

import MantineBox from './Box'

export default function Homepage() {
  const [loading, setLoading] = useState(true)
  return (
    <>
      {loading == false ? (
        <>
          <Skeleton height={8} radius="md" />
          <Skeleton height={8} mt={6} radius="md" />
          <Skeleton height={8} mt={6} width="80%" radius="md" />
        </>
      ) : (
        <>
          <MantineBox>
            <Title fw={700} order={1}>
              Two Minds One
            </Title>
            <Title fw={700} fs="italic" order={2}>
              Bridging the Gap Between Minds
            </Title>
            <Title fw={700} order={3}>
              A platform for practising empathy and conflict minimisation.{' '}
            </Title>
          </MantineBox>
          <MantineBox>Pitch</MantineBox>
        </>
      )}
    </>
  )
}

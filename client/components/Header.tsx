import { Button, Header, Grid } from '@mantine/core'
import { Link } from 'react-router-dom'

import LightDarkButton from './LightDarkButton'

export default function HeaderDiv() {
  return (
    <Header
      height={{ base: 50, md: 70 }}
      p="md"
      sx={(theme) => ({
        padding: theme.spacing.xl,
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.fawn[0]
            : theme.colors.fawn[1],
        borderColor:
          theme.colorScheme === 'dark'
            ? theme.colors.fawn[0]
            : theme.colors.fawn[1],
      })}
    >
      <Grid justify="flex-end">
        <Button variant="outline" component={Link} to="/ideology">
          Let&apos;s Begin
        </Button>
        <LightDarkButton />
      </Grid>
    </Header>
  )
}

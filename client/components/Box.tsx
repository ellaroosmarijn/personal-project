import { Box as MantineBox } from '@mantine/core'

import { ChildrenProps } from '../../shared/types'

export default function Box({ children }: ChildrenProps) {
  return (
    <MantineBox
      sx={(theme) => ({
        textAlign: 'center',
        padding: theme.spacing.xl,
        margin: theme.spacing.lg,
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.fawn[0]
            : theme.colors.fawn[1],
        borderRadius: theme.radius.md,
      })}
    >
      {children}
    </MantineBox>
  )
}

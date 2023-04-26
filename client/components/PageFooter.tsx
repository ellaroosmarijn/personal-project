import { Footer } from '@mantine/core'

export default function PageFooter() {
  return (
    <Footer
      height={60}
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
      Application footer
    </Footer>
  )
}

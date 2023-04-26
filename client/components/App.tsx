import { Routes, Route } from 'react-router-dom'
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
  AppShell,
} from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { useHotkeys, useLocalStorage } from '@mantine/hooks'

import myTheme from '../theme'
import AnswerPage from './AnswerPage'
import Header from './Header'
import PageFooter from './PageFooter'

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  })

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  useHotkeys([['mod+J', () => toggleColorScheme()]])

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ ...myTheme, colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <AppShell fixed header={<Header />}>
          <Notifications />
          <Routes>
            <Route path="/answer" element={<AnswerPage />} />
            <Route
              path="*"
              element={
                <>
                  <h1>404</h1>Page not found
                </>
              }
            />
          </Routes>
          <PageFooter />
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App

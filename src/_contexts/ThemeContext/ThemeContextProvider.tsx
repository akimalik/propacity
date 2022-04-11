import { ThemeProvider, createTheme } from '@mui/material/styles'
import { createContext, useContext, useMemo, useState } from 'react'
type ContextProps = {
  setDarkMode?: any,
  isDarkMode?: boolean,
}

export const useThemeContext = () => useContext(ThemeContext)

const ThemeContext = createContext<Partial<ContextProps>>({})
const getTheme = (isDarkMode: boolean) => createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    }
  },
  palette: {
    mode: isDarkMode ? 'dark' : 'light',
  }
})

const ThemeContextProvider: React.FC = ({ children }) => {
  const [isDarkMode, setDarkMode] = useState<boolean>(false)
  const theme = useMemo(() => getTheme(isDarkMode), [isDarkMode])
  const value: ContextProps = {
    setDarkMode,
    isDarkMode
  }
  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}
export default ThemeContextProvider
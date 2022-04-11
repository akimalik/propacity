import { Alert, AlertColor, Snackbar } from "@mui/material"
import { createContext, useContext, useState } from "react"

type ContextProps = {
  notification: any
}

const WebContext = createContext<Partial<ContextProps>>({})
export const useWebContext = () => useContext(WebContext)

const WebProvider: React.FC = ({ children }) => {
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('Error')
  const [type, setType] = useState<AlertColor>('info')

  const notification = (text: string, type?: AlertColor) => {
    setOpen(true)
    type ? setType(type) : setType('info')
    setText(text)
  }

  const values: ContextProps = { notification }
  return (
    <WebContext.Provider value={values}>
      {children}
      <Snackbar open={open} autoHideDuration={4000} onClose={() => { setOpen(false) }} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={() => { setOpen(false) }} severity={type} sx={{ width: '100%' }}>{text}</Alert>
      </Snackbar>
    </WebContext.Provider>
  )
}
export default WebProvider
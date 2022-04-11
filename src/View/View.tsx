import { useEffect } from "react"
import { useOutletContext } from "react-router-dom"

type props = {
  pageName?: string;
  component: React.FC
}

const View: React.FC<props> = ({ pageName, component: Component }) => {
  const { setPageName } = useOutletContext<any>()

  useEffect(() => {
    setPageName(pageName ? pageName : '')
  }, [pageName])

  return <Component />
}
export default View
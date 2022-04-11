import { CSSProperties } from "@mui/styled-engine"
import { Box } from "@mui/system"

type props = {
  sx?: CSSProperties;
  alt?: string;
  src: string;
  className?: string;
}

const Img: React.FC<props> = (props) => <Box component="img" {...props} />

export default Img
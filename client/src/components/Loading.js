import { LineWave } from "react-loader-spinner"
import { StyledForm } from "./styles/StyledForm"

export default function Loading() {
 
 return (
    <StyledForm>
    <LineWave
  height="100"
  width="100"
  color="royalblue"
  ariaLabel="line-wave"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  firstLineColor=""
  middleLineColor=""
  lastLineColor=""
/>
</StyledForm>
)
}
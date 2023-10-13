import { LineWave } from "react-loader-spinner"
import { StyledForm } from "./styles/StyledForm"

export default function Loading() {
 
 return (
    <StyledForm>
    <LineWave
  height="300"
  width="300"
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
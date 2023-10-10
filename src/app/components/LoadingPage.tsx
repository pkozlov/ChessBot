import { ThreeCircles } from "react-loader-spinner";
import useStyles from "../hooks/useStyles";

const LoadingPage = () => {
  const style = useStyles();

  return <div className="Loading">
    <ThreeCircles
      height="75"
      width="75"
      color={style.text_color}
      wrapperStyle={{
        margin: "150px 150px"
      }}
      wrapperClass=""
      visible={true}
      ariaLabel="three-circles-rotating"
      outerCircleColor=""
      innerCircleColor=""
      middleCircleColor=""
    />
  </div>
}

export default LoadingPage;

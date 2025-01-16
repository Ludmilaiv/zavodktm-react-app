import Widget from "../widget";
import store from "../../store";
import { useEffect } from "react";

const BolerPage = (props) => {
  const getData = store.getState().funcGetData;
  useEffect(() => {
    const getDataInterval = setInterval(getData,5000)
    return function cleanup() {
      clearInterval(getDataInterval);
    }
  }, []);
  
  getData();
  return (
    <div className="content__page">
      <Widget typeClass="boler"/>
    </div>
  )
}

export default BolerPage
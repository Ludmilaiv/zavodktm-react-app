import Widget from "../widget";
import store from "../../store";
import { useEffect } from "react";

const KotelPage = (props) => {
  const getData = store.getState().funcGetData;
  useEffect(() => {
    const getDataInterval = setInterval(getData,3000)
    return function cleanup() {
      clearInterval(getDataInterval);
    }
  });
  
  getData();
  return (
    <div className="content__page">
      <Widget typeClass="settings"/>
    </div>
  )
}

export default KotelPage
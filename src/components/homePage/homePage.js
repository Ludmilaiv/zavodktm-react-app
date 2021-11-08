import Widget from "../widget";
import store from "../../store";
import { useEffect } from "react";

const HomePage = (props) => {
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
      <Widget typeClass="main" tempID="tempFlow" setID="setsTempCO" icon="main"/>
      <Widget typeClass="sup" tempID="tempBolerOrShnek1" setID="setsTempGV" icon="1"/>
      <Widget typeClass="sup" tempID="tempRoom" setID="setsTempRoom" icon="2"/>
    </div>
  )
}

export default HomePage
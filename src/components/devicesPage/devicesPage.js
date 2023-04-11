import Widget from "../widget";
import { useEffect } from "react";
import store from "../../store";
import { setTemp } from '../../actions';

const DevicesPage = ({showActivePage}) => {

  useEffect(() => {
    store.dispatch(setTemp({devType: 0}))
  }, [])

  return (
    <div className="content__page">
      <Widget typeClass="devices" showActivePage={showActivePage}/>
    </div>
  )
}

export default DevicesPage
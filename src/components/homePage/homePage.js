import Widget from "../widget";
import store from "../../store";
import { useEffect } from "react";
import { connect } from 'react-redux';
import { Oval } from  'react-loader-spinner'

const HomePage = ({devType=0, status=0}) => {
  const getData = store.getState().funcGetData;
  useEffect(() => {
    const getDataInterval = setInterval(getData,3000)
    return function cleanup() {
      clearInterval(getDataInterval);
    }
  });

  const loadingViev = <div className="content__page"><Oval
    height={100}
    width={100}
    color="#ff8000"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
    ariaLabel='loading'
    secondaryColor="#FFC400"
    strokeWidth={5}
    strokeWidthSecondary={5}
  /></div>

  const oneSheckViev = <div className="content__page">
    <Widget typeClass="main" tempID="tempFlow" setID="setsTempCO" icon="main" devType={devType}/>
    <Widget typeClass="sup" tempID="tempBolerOrShnek1" setID="setsTempGV" icon="1"/>
    <Widget typeClass="sup" tempID="tempRoom" setID="setsTempRoom" icon="2"/>
  </div>

  const twoSheckViev = <div className="content__page">
    <Widget typeClass="main-1" tempID="tempFlow" setID="setsTempCO" icon="main" devType={devType}/>
    <Widget typeClass="sup" tempID="tempRoom" setID="setsTempRoom" icon="2"/>
  </div>
  
  getData();
  return (
    (devType === 0 && status !== -1) ? loadingViev 
      : (devType === 3 && status !== -1) ? twoSheckViev
      : oneSheckViev
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    devType: state.devType,
    status: state.status
  }
}
  
export default connect(mapStateToProps)(HomePage)

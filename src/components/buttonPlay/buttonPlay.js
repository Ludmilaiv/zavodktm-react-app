import Button from "../button";
import { connect } from 'react-redux';
import store  from '../../store';
import { setTemp } from '../../actions';
import { useState, useEffect } from "react";

const statusDict = [ //справочник статусов
  "Выкл",
  "Работа",
  "Поддержка",
  "Розжиг"
];

const ButtonPlay = ({statusID, setID, setVal=0, status=-1, loading=false}) => {

  const [oldStatus, setOldStatus] = useState(!!Number(store.getState()[statusID]));

  const setLoading = (value) => {
    const state = {};
    state[`loading_${statusID}`] = value;
    store.dispatch(setTemp(state));
  }

  useEffect(()=>{
    if (!statusID) return;
    if (oldStatus !== !!Number(status)) {
      const state = {};
      state[`loading_${statusID}`] = false;
      store.dispatch(setTemp(state));
      }
  }, [oldStatus, status, statusID]);

  const startStop = () => {
    if (loading || status === -1) return;
    setOldStatus(!!Number(status));
    setLoading(true);
    let set = 0;
    if (statusDict[status] === 'Выкл') {
      set = 1;
    }
    const settings = {};
    settings[setID] = set;
    store.dispatch(setTemp(settings));
    store.getState().functionSendSettings(setID, set);
  }

  let buttonImg = '';
  let style = {};
  const addClass = 'button_play';

  if (loading) {
    buttonImg = "images/spiner.gif";
  } else if (statusID === "status") {
    if (status === -1) {
      buttonImg = "images/offline.png";
      style.backgroundColor = "#696969";
    } else if (statusDict[status] === "Выкл") {
      buttonImg = "images/play.png";
    } else {
      buttonImg = "images/stop.png";
      style.backgroundColor = "#228B22";
    }
  }
  const buttonSpan = <span><img className="button__img" src={buttonImg} alt="play"/></span>;

  return (
    <Button buttonSpan={buttonSpan} type="play" addClass={addClass} style={style} onClick={startStop} />
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    status: state[ownProps.statusID],
    setVal: state[ownProps.setID],
    loading: state[`loading_${ownProps.statusID}`]
  }
}

export default connect(mapStateToProps)(ButtonPlay)
import Button from "../button";
import { connect } from 'react-redux';
import store  from '../../store';
import { setTemp } from '../../actions';
import { useEffect } from "react";

const ButtonOnOff = ({setID, setVal=0, status=-1, loading=false}) => {

  const setLoading = (value) => {
    const state = {};
    state[`loading_${setID}`] = value;
    store.dispatch(setTemp(state));
  }

  useEffect(()=>{
    const stopLoading = () => {
      const state = {};
      state[`loading_${setID}`] = false;
      store.dispatch(setTemp(state));
    }
    if (loading) {
      setTimeout(stopLoading, 2000);
    }
    return () => clearTimeout(stopLoading);
    
  }, [setID, loading]);

  const onOff = () => {
    if (loading || status === -1) return;
    setLoading(true);
    let set = 0;
    if (Number(setVal) === 0) {
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
  } else if (status === -1) {
      buttonImg = "images/offline.png";
      style.backgroundColor = "#696969";
    } else if (Number(setVal) === 0) {
      buttonImg = "images/power.png";
    } else {
      buttonImg = "images/power.png";
      style.backgroundColor = "#228B22";
    }
  
  const buttonSpan = <span><img className="button__img" src={buttonImg} alt="play"/></span>;

  return (
    <Button buttonSpan={buttonSpan} type="play" addClass={addClass} style={style} onClick={onOff} />
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    status: state.status,
    setVal: state[ownProps.setID],
    loading: state[`loading_${ownProps.setID}`]
  }
}

export default connect(mapStateToProps)(ButtonOnOff)
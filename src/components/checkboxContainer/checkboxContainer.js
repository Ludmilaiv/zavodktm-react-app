import { connect } from 'react-redux';
import store  from '../../store';
import { setTemp } from '../../actions';
// import { useState, useEffect } from "react";


const CheckboxContainer = ({setID, setVal=0, items, uncheck=true, id}) => {

  function setData(val) {
    const states = {}; 
    states[setID] = val;
    states[`block_${setID}`] = true;
    store.dispatch(setTemp(states));
    store.getState().functionSendSettings(setID, val);
  }

  function unblock() {
    const states = {};
    states[`block_${setID}`] = false;
    setTimeout(()=>{store.dispatch(setTemp(states))}, 5000);
  }

  const setCheck = value => {
    if (!uncheck && Number(setVal) === Number(value)) return;
    if (uncheck && Number(setVal) !== 0) {
      setData(0);
    } else {
      setData(value);
    }
    unblock();
  }
  
  return (
    <div className="checkbox-container checkbox-container__position">
      {items.map(item => (
        <div className="checkbox-container__item" key={item.id}>
          <div className="checkbox" onClick={() => setCheck(item.value)}>
            {(Number(setVal) === item.value) ? <span>&#10003;</span> : ''}
          </div>
          <div className="checkbox__label">{item.label}</div>
        </div>
      ))}
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    setVal: state[ownProps.setID]
  }
}

export default connect(mapStateToProps)(CheckboxContainer)
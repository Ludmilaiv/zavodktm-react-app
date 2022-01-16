
import { Range } from 'react-range';
import { connect } from 'react-redux';
import Button from "../button";
import { setTemp } from '../../actions';
import store from '../../store';

const Slider = ({value, outID, min, max}) => {

  console.log(outID);

  function setData(val) {
    const states = {}; 
    states[outID] = (val < min) ? min : ((val > max) ? max : val);
    states[`block_${outID}`] = true;
    store.dispatch(setTemp(states));
  }

  function unblock() {
    const states = {};
    states[`block_${outID}`] = false;
    setTimeout(()=>{store.dispatch(setTemp(states))}, 7000);
  }

  return (
    <div className="slider slider_position">
      <Button buttonSpan="-" addClass="slider__button" type="slide" style={{padding:'0 0.3vw 2vw 0'}} onClick={()=>{
        if (Number(value) > min) {
          setData(Number(value) - 1);
          store.getState().functionSendSettings(outID, Number(value) - 1);
        }
        unblock();
      }}/>
      <Range
        step={1}
        min={min}
        max={max}
        values={(value < min) ? [min] : ((value > max) ? [max] : [value])}
        onChange={(val) => setData(val)}
        onFinalChange={() => {
          store.getState().functionSendSettings(outID, Number(value));
          unblock();
        }}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '7px',
              flexGrow: '1',
              marginLeft: '3vw',
              marginRight: '3vw',
              backgroundColor: '#fff'
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '6vw',
              width: '4vw',
              backgroundColor: '#000',
              border: '1px solid white',
              outline: 'none'
            }}
          />
        )}
      />
      <Button buttonSpan="+" addClass="slider__button" type="slide" onClick={()=>{
        if (Number(value) < max) {
          setData(Number(value) + 1);
          store.getState().functionSendSettings(outID, Number(value) + 1);
        }
        unblock();
      }}/>
    </div>
    
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    value: state[ownProps.outID]
  }
}

export default connect(mapStateToProps)(Slider)

import { Direction, Range } from 'react-range';
import { connect } from 'react-redux';
import Button from "../button";
//import { setTemp } from '../../actions';
import store from '../../store';
import classNames from 'classnames';

const Slider = ({classPrefix=null, value, outID, min, max}) => {
  function setData(val) {
    store.getState().functionSendSettings(outID, val);
    //states[`block_${outID}`] = true;
    //store.dispatch(setTemp(states));
  }

  // function unblock() {
  //   const states = {};
  //   states[`block_${outID}`] = false;
  //   setTimeout(()=>{store.dispatch(setTemp(states))}, 5000);
  // }

  return (
    <div className={classNames("slider", "slider_position", classPrefix && "slider_" + classPrefix)}>
      <Button buttonSpan="-" addClass="slider__button" type="slide" style={{padding:'0 0.3vw 2vw 0'}} onClick={()=>{
        if (Number(value) > min) {
          setData(Number(value) - 1);
          // store.getState().functionSendSettings(outID, Number(value) - 1, unblock);
        }
      }}/>
      <Range
        direction={classPrefix ? Direction.Up: Direction.Right}
        step={1}
        min={min}
        max={max}
        values={(value < min) ? [min] : ((value > max) ? [max] : [value])}
        onChange={(val) => setData(val)}
        // onFinalChange={() => {
        //   //store.getState().functionSendSettings(outID, Number(value), unblock);
        //   store.getState().functionSendSettings(outID, Number(value));
        // }}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              width: classPrefix ? '7px' : '',
              height: classPrefix ? '70%' : '7px',
              flexGrow: '1',
              marginLeft: !classPrefix ? '3vw' : '',
              marginRight: !classPrefix ? '3vw' : '',
              marginTop: classPrefix ? '3vw' : '',
              marginBottom: classPrefix ? '3vw' : '',
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
              height: classPrefix ? '4vw' : '6vw',
              width: classPrefix ? '6vw' : '4vw',
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
          //store.getState().functionSendSettings(outID, Number(value) + 1, unblock);
        }
      }}/>
    </div>
    
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    value: state['setsForSend'][ownProps.outID] || state[ownProps.outID],
  }
}

export default connect(mapStateToProps)(Slider)
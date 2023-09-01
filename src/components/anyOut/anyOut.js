import { connect } from 'react-redux';
import data from "../../data";
import store from "../../store";
import {truncStr} from "../../utilits";

function AnyOut({out=null, out2=null, outID, outID2, def='--', units, coef=-1}) {

  if (outID === "status") {
    const statusDict = [ //справочник статусов
      "Выкл",
      "Работа",
      "Поддержка",
      "Розжиг"
    ];
    return (
      <>  {(out && out > -1) ? statusDict[out] : "Не в сети"}  </>
    )
  }

  if (out===null) {
    out = "--";
  } else if (data.coefDict[outID]) {
    const fl = x => ( (x.toString().includes('.')) ? (x.toString().split('.').pop().length) : 0 );
    out = out * data.coefDict[outID];
    const fix = (coef === -1) ? data.coefDict[outID] : coef;
    out = out.toFixed(fl(fix));
    if (out.split(".")[0] === "-100" || out.split(".")[0] === "-127") {
      out = "--";
    } else if (outID === "shnekOrCurrent1" && store.getState().setsType === 1) {
      out = out.split(".")[0];
    }
  }

  if (outID2) {
    if (out2===null) {
      out2 = "--";
    } else if (data.coefDict[outID2]) {
      const fl = x => ( (x.toString().includes('.')) ? (x.toString().split('.').pop().length) : 0 );
      out2 = out2 * data.coefDict[outID2];
      const fix = (coef === -1) ? data.coefDict[outID2] : coef;
      out2 = out2.toFixed(fl(fix));
      if (out2.split(".")[0] === "-100" || out2.split(".")[0] === "-127") {
        out2 = "--";
      } 
    }
  }

  const style = {};
  if (+out >= 100 || +out2 >= 100) {
    style['fontSize'] = '0.7em';
  };

  return (
    <span style={style}> 
      {(out && +out !== -127 && +out !== -100) ? truncStr(out,30) : def}
      <span className="widget__text_normal">{units}</span> 
      {outID2 && 
      <><span className="widget__text_normal" style={{fontSize: "2rem"}}>&nbsp;|&nbsp;</span>
      {(out2 && +out2 !== -127 && +out2 !== -100) ? out2 : def}
      <span className="widget__text_normal">{units}</span></>}
    </span> 
  )
  
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    out: state[ownProps.outID],
    out2: ownProps.outID2 ? state[ownProps.outID2] : null,
  }
}

export default connect(mapStateToProps)(AnyOut)
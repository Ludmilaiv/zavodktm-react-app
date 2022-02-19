import { connect } from 'react-redux';
import data from "../../data";
import store from "../../store";

function AnyOut({out=null, outID, def='--'}) {

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
    const fl = x => ( (x.toString().includes('.')) ? (x.toString().split('.').pop().length) : (0) );
    out = out * data.coefDict[outID];
    out = out.toFixed(fl(data.coefDict[outID]));
    if (out.split(".")[0] === "-100" || out.split(".")[0] === "-127") {
      out = "--";
    } else if (outID === "shnekOrCurrent1" && store.getState().setsType === 1) {
      out = out.split(".")[0];
    }
  }

  const style = {};
  if (Number(out) >= 100) {
    style['fontSize'] = '0.7em';
  };

  return (
    <span style={style}> {(out && Number(out) !== -127 && Number(out) !== -100) ? out : def} </span>
  )
  
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    out: state[ownProps.outID]
  }
}

export default connect(mapStateToProps)(AnyOut)
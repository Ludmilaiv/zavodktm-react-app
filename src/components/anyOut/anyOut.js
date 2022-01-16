import { connect } from 'react-redux';
import data from "../../data";

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
    } else if (outID === "current2") {
      out = out.split(".")[0];
    }
  }

  return (
    <> {(out && Number(out) !== 127 && Number(out) !== 100) ? out : def} </>
  )
  
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    out: state[ownProps.outID]
  }
}

export default connect(mapStateToProps)(AnyOut)
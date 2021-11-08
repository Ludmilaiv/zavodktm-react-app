import { connect } from 'react-redux';
//import data from "../../data";

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
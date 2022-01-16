import { connect } from 'react-redux';
import data from "../../data";

function TempOut({temp=null, main=false, header=false, tempID, compact=false}) {

  const fl = x => ( (x.toString().includes('.')) ? (x.toString().split('.').pop().length) : (0) );
 
  let tempInt;
  let tempFraction = null;
  if (temp){
    temp = temp*data.coefDict[tempID];
    temp = temp.toFixed(fl(data.coefDict[tempID]));
    [tempInt, tempFraction] = temp.split(".");
    if (tempInt === "-100" || tempInt === "-127") {
      tempInt = "--";
      tempFraction = "-"
    }
  } else {
    tempInt = "--";
  }

  if (header) {
    return (
     <>
        <span>
          {tempInt}.
        </span>
        <span>
          {tempFraction ? tempFraction : "-"}   
        </span>
        <span >
          &nbsp;{data.metricDict[tempID]}   
        </span>
      </>
    )
  }

  const outType = (compact) ? "compact" : "center";

  return (
    <div className={`widget__out widget__out_${outType}`}id={tempID}>
      <span className={
        `widget__span-int ${main ? "widget__span-int_big" : (compact ? "widget__span-int_compact" : "")}`
        }>
        {tempInt}.
      </span>
      <span className={
        `widget__span-fraction ${main ? "widget__span-fraction_big": (compact ? "widget__span-fraction_compact" : "")}`
        }>
        {tempFraction ? tempFraction : "-"}   
      </span>
      <span className={`widget__span-unit ${compact ? "widget__span-unit_compact" : ""}`}>
        &nbsp;{data.metricDict[tempID]}   
      </span>
    </div>
  )
  
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    temp: state[ownProps.tempID]
  }
}

export default connect(mapStateToProps)(TempOut)
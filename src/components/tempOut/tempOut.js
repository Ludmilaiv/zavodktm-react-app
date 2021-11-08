import { connect } from 'react-redux';
import data from "../../data";

function TempOut({temp=null, main=false, header=false, tempID}) {

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

  return (
    <div className="widget__out widget__out_center" id={tempID}>
      <span className={
        `widget__span-int ${main ? "widget__span-int_big" : ""}`
        }>
        {tempInt}.
      </span>
      <span className={
        `widget__span-fraction ${main ? "widget__span-fraction_big" : ""}`
        }>
        {tempFraction ? tempFraction : "-"}   
      </span>
      <span className="widget__span-unit">
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
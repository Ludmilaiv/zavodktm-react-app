import TempOut from '../tempOut';
import Form from '../form';
import Devices from '../devices';
import AnyOut from "../anyOut";
import Kotel from "../kotel";
import Boler from '../boler';
import Termos from '../termos';
import store from "../../store";

const Widget = ({
  typeClass, tempID="tempFlow", setID="setsTempCO", icon, 
  showActivePage,
  activePage,
  errCount = 0,
}) => {

  const className = `widget widget_layout widget_${typeClass} widget_position`;
  const main = typeClass==="main";

  // Для виджета на страничке авторизации
  if (typeClass === "author") {
    return (
      <div className={className}>
        <Form formType={typeClass} activePage={activePage} showActivePage={showActivePage} />
      </div>
    )
  } 

  // Для виджета на страничке с устройствами

  if (typeClass === "devices") {
    return (
      <div className={className}>
        <Devices showActivePage={showActivePage}/>
      </div>
    )
  }
  
  // Для виджета на странице настроек котла (kotel)
  if (typeClass === "kotel") {
    return (
      <Kotel className={className}/>
    )
  }

  // Для виджета на странице настроек котла (boler)
  if (typeClass === "boler") {
    return (
      <Boler className={className}/>
    )
  }

  // Для виджета на странице настроек котла (termos)
  if (typeClass === "termos") {
    return (
      <Termos className={className}/>
    )
  }

  // Для виджета на главной странице контроля устройства (home)

  const outBottom = 
    <div className="widget__out widget__out_bottom">
      <span className="widget__span-label">
        <AnyOut outID="status"/>
      </span>
      <span className="widget__span-info widget__span-info_flex">
        <span className="widget__span-info-item">
          <img className="widget__span-info-img" src="images/shnek.png" alt=""/>
          <span>
            {store.getState().setsType === 1 ? <AnyOut outID="shnek"/> : <AnyOut outID="setsShnek1"/>}
            <span className="widget__text_normal">%</span>
          </span>
        </span>
        <span className="widget__span-info-item">
          <img className="widget__span-info-img" src="images/ventel.png" alt=""/>
          <span>
            {store.getState().setsType === 1 ? <AnyOut outID="ventel"/> : <AnyOut outID="setsVent1"/>}
            <span className="widget__text_normal">%</span>
          </span>
        </span>
      </span>
    </div>
  return (
    <div className={className}>
      <div className={
          `widget__out widget__out_corner ${typeClass==="main"?"widget__out_corner-big":""}`
          }>
          <AnyOut outID={setID}/>
      </div>
      <TempOut main={main} tempID={tempID}/>
      {main ? outBottom : ""}
      <div className="widget__icon">
        <img src={`images/icon_${icon}.png`} alt="" className="widget__img"/>
      </div>
    </div>
  )
}

 


export default Widget

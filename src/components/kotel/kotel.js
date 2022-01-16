import TempOut from "../tempOut";
import AnyOut from "../anyOut";
import ButtonPlay from "../buttonPlay";
import Slider from "../slider";
import store from "../../store";

const Kotel = ({className}) => {

  return (
    <div className={className}>
      <div className={`widget__subwidget widget__subwidget_main`}>
        <div className={`widget__out widget__out_corner widget__out_corner-big`}>
            <AnyOut outID="setsTempCO"/>
        </div>
        <TempOut main={false} compact={true} tempID="tempFlow" />
        <Slider outID="setsTempCO" min={10} max={95}/>
        <span className="widget__span-label widget__span-label_small">
          <AnyOut outID="status"/>
        </span>
        <ButtonPlay statusID="status" setID="setsStartGor1" />
        <div className="widget__out widget__out_column">
          <span className="widget__span-info-item widget__span-info-item_flex">
            <img className="widget__span-info-img_small" src="images/arrow-up.png" alt=""/>
            <span><AnyOut outID="tempReturn"/></span>
          </span>
          <span className="widget__span-info-item widget__span-info-item_flex">
            <img className="widget__span-info-img_small" src="images/truba.png" alt=""/>
            <span><AnyOut outID="tempSmoke"/></span>
          </span>
        </div>
        <div className="widget__icon">
          <img src={`images/icon_kotel_main.png`} alt="" className="widget__img"/>
        </div>
      </div>

      <div className="widget__hr"></div>

      <div className={`widget__subwidget widget__subwidget_sup`}>
        <div className={`widget__out widget__out_corner widget__out_corner`}>
            <AnyOut outID="setsShnek1"/>
        </div>
        <div className="widget__icon widget__icon_top">
          <img src="images/shnek.png" alt="" className="widget__img"/>
        </div>
        <div className="widget__out widget__out_top">
          <span>
            {store.getState().setsType === 1 ? <AnyOut outID="shnek"/> : <AnyOut outID="setsShnek1"/>}
            <span className="widget__text_normal">%</span>
          </span>
        </div>
        <Slider outID="setsShnek1" min={1} max={100}/>
        <div className="widget__out widget__out_bottom-center">
          <span className="widget__span-info widget__span-info_flex">
            <span className="widget__span-info-item widget__span-info-item_small">
              <img className="widget__span-info-img widget__span-info-img_small" src="images/amper.png" alt=""/>
              <span className="widget__span-flex"><AnyOut outID="current"/><span className="widget__text_normal">&nbsp;A</span></span>
            </span>
            <span className="widget__span-info-item widget__span-info-item_small">
              <img className="widget__span-info-img widget__span-info-img_small" src="images/small-deg.png" alt=""/>
              <span className="widget__span-flex"><AnyOut outID="tempShnekOrShek2"/><span className="widget__text_normal">&deg;C</span></span>
            </span>
          </span>
        </div>
      </div>

      <div className="widget__hr"></div>

      <div className={`widget__subwidget widget__subwidget_sup`}>
        <div className={`widget__out widget__out_corner widget__out_corner`}>
            <AnyOut outID="setsVent1"/>
        </div>
        <div className="widget__icon  widget__icon_top">
          <img src={`images/ventel.png`} alt="" className="widget__img"/>
        </div>
        <div className="widget__out widget__out_top">
          <span>
            {store.getState().setsType === 1 ? <AnyOut outID="ventel"/> : <AnyOut outID="setsVent1"/>}
            <span className="widget__text_normal">%</span>
          </span>
        </div>
        <Slider outID="setsVent1" min={1} max={100}/>
      </div>
    </div>

    
  )
} 
export default Kotel;
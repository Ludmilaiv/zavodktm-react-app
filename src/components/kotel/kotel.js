import TempOut from "../tempOut";
import AnyOut from "../anyOut";
import ButtonPlay from "../buttonPlay";
import Slider from "../slider";
import { connect } from 'react-redux';
import store from "../../store";
import { Oval } from  'react-loader-spinner'

const loadingViev = <div className="content__page"><Oval
    height={100}
    width={100}
    color="#ff8000"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
    ariaLabel='loading'
    secondaryColor="#FFC400"
    strokeWidth={5}
    strokeWidthSecondary={5}
  /></div>

const Kotel = ({className, devType=0, status=0, pid}) => { 

  const oneSheckViev = <div className={className}>
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
      {+pid > 1 && +pid < 4 ? <AnyOut outID="shnek" /> : <AnyOut outID="setsShnek1" />}
      </div>
      <div className="widget__icon widget__icon_top">
        <img src="images/shnek.png" alt="" className="widget__img"/>
      </div>
      <div className="widget__out widget__out_top">
        <span>
        {+pid > 1 && +pid < 4 ? <AnyOut outID="shnek" /> : <AnyOut outID="setsShnek1" />}
          <span className="widget__text_normal">%</span>
        </span>
      </div>
      {+pid > 1 && +pid < 4 ? <span className="widget__span-label widget__span-label_small">АВТО</span> :
      <Slider outID="setsShnek1" min={1} max={100}/>}
      
      <div className="widget__out widget__out_bottom-center">
        <span className="widget__span-info widget__span-info_flex">
          <span className="widget__span-info-item widget__span-info-item_small">
            <img className="widget__span-info-img widget__span-info-img_small" src="images/amper.png" alt=""/>
            <span className="widget__span-flex">
              <AnyOut coef={0.01} outID="current" units="&nbsp;A"/>
            </span>
          </span>
          <span className="widget__span-info-item widget__span-info-item_small">
            <img className="widget__span-info-img widget__span-info-img_small" src="images/small-deg.png" alt=""/>
            <span className="widget__span-flex"><AnyOut outID="tempShnekOrShek2" units="&deg;C"/></span>
          </span>
        </span>
      </div>
    </div>

    <div className="widget__hr"></div>

    <div className={`widget__subwidget widget__subwidget_sup`}>
      <div className={`widget__out widget__out_corner widget__out_corner`}>
      {+pid === 3 ? <AnyOut outID="ventel" /> : <AnyOut outID="setsVent1" notDecrease={true}/>}
      </div>
      <div className="widget__icon  widget__icon_top">
        <img src={`images/ventel.png`} alt="" className="widget__img"/>
      </div>
      <div className="widget__out widget__out_top">
        <span>
        {+pid === 3 ? <AnyOut outID="ventel" /> : <AnyOut outID="setsVent1" notDecrease={true} />}
          <span className="widget__text_normal">%</span>
        </span>
      </div>
      {+pid > 1 && +pid < 4 ? <span className="widget__span-label widget__span-label_small">АВТО</span> :
      <Slider outID="setsVent1" min={1} max={100}/>}
      
    </div>
  </div>

  const twoSheckViev = <div className={className}>
    <div className={`widget__subwidget widget__subwidget_sup`}>
      <div className={`widget__out widget__out_corner widget__out_corner-big`}>
        <AnyOut outID="setsTempCO"/>
      </div>
      <TempOut main={false} compact={true} tempID="tempFlow" />
      <Slider outID="setsTempCO" min={10} max={95}/>

      <div className="widget__out widget__out_row">
        <span className="widget__span-info-item widget__span-info-item_big widget__span-info-item_flex">
          <img className="widget__span-info-img_small" src="images/arrow-up.png" alt=""/>
          <span><AnyOut outID="tempReturn" units="&deg;C"/></span>
        </span>
        <span className="widget__span-info-item widget__span-info-item_big widget__span-info-item_flex">
          <img className="widget__span-info-img_small" src="images/truba.png" alt=""/>
          <span><AnyOut outID="tempSmoke" units="&deg;C"/></span>
        </span>
      </div>
      <div className="widget__icon">
        <img src={`images/icon_kotel_main.png`} alt="" className="widget__img"/>
      </div>
    </div>

    <div className="widget__hr"></div>

    <div className={`widget__subwidget widget__subwidget_main`}>
      
      <div className="widget__icon widget__icon_top">
        <img src="images/fire.png" alt="" className="widget__img"/>
      </div>
      <div className="widget__out widget__out_top">
        <span className="widget__span-label widget__span-label">
          <AnyOut outID="status"/>
        </span>
      </div>
     
      <div className="widget__out widget__out_center-center">
        <span className="widget__span-info widget__span-info_flex">
          <span className="widget__span-info-item widget__span-info-item_column">
            <img src="images/fire1.png" alt="" className="widget__img_big"/>
            <ButtonPlay addClass="button_play-static" statusID="status" setID="setsStartGor1" />
          </span>

          <span className="widget__span-info-item widget__span-info-item_column">
            <img src="images/fire2.png" alt="" className="widget__img_big"/>
            <ButtonPlay addClass="button_play-static" statusID="status" setID="setsStartGor2" />
          </span>
        </span>
      </div>
    </div>

  </div>

  return (
    (devType === 0 && status !== -1) ? loadingViev 
      : (devType === 3 && status !== -1) ? twoSheckViev
      : oneSheckViev    
  )
} 

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    devType: state.devType,
    status: state.status,
    pid: state.pid,
  }
}
 
export default connect(mapStateToProps)(Kotel);
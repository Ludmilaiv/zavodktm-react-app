import TempOut from "../tempOut";
import AnyOut from "../anyOut";
import ButtonPlay from "../buttonPlay";
import Slider from "../slider";
import { connect } from 'react-redux';
import store from "../../store";
import { Oval } from 'react-loader-spinner'

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

const Settings = ({ className, devType = 0, status = 0 }) => {

  const twoSheckViev = <div className={className}>

    <div className={`widget__subwidget widget__subwidget_sup`}>

      <div className="widget__icon widget__icon_top-center">
        <span className="widget__icon-text">1</span><img src="images/shnek.png" alt="" className="widget__img" /><span className="widget__icon-text">2</span>
      </div>
      <Slider classPrefix="vertical-left" outID="setsShnek1" min={1} max={100} />
      <Slider classPrefix="vertical-right" outID="setsShnek2" min={1} max={100} />
      <div className="widget__out widget__out_double">
        <div className="widget__out-section widget__out-section_left">
          <span>
            <AnyOut outID="setsShnek1" units="%" />
          </span>
          <div className={`widget__out widget__out_corner widget__out_corner-big widget__out_corner-bottom-right`}>
            <AnyOut outID="setsShnek1" />
          </div>
        </div>
        <div className="widget__out-section widget__out-section_right">
          <span>
            <AnyOut outID="setsShnek2" units="%" />
          </span>
          <div className={`widget__out widget__out_corner widget__out_corner-big widget__out_corner-bottom-left`}>
            <AnyOut outID="setsShnek2" />
          </div>
        </div>
      </div>

    </div>

    <div className="widget__hr"></div>


    <div className={`widget__subwidget widget__subwidget_sup`}>

      <div className="widget__icon widget__icon_top-center">
        <span className="widget__icon-text">1</span>
          <img src="images/ventel.png" alt="" className="widget__img" />
        <span className="widget__icon-text">2</span>
      </div>
      <Slider classPrefix="vertical-left" outID="setsVent1" min={1} max={100} />
      <Slider classPrefix="vertical-right" outID="setsVent2" min={1} max={100} />
      <div className="widget__out widget__out_double">
        <div className="widget__out-section widget__out-section_left">
          <span>
            <AnyOut outID="setsVent1" units="%" />
          </span>
          <div className={`widget__out widget__out_corner widget__out_corner-big widget__out_corner-bottom-right`}>
            <AnyOut outID="setsVent1" />
          </div>
        </div>
        <div className="widget__out-section widget__out-section_right">
          <span>
            <AnyOut outID="setsVent2" units="%" />
          </span>
          <div className={`widget__out widget__out_corner widget__out_corner-big widget__out_corner-bottom-left`}>
            <AnyOut outID="setsVent2" />
          </div>
        </div>
      </div>
      {/* <div className={`widget__out widget__out_corner widget__out_corner`}>
          <AnyOut outID="setsVent1"/>
      </div>
      <div className="widget__icon  widget__icon_top">
        <img src={`images/ventel.png`} alt="" className="widget__img"/>
      </div>
      <div className="widget__out widget__out_top">
        <span>
          {store.getState().ventel ? <AnyOut outID="ventel"/> : <AnyOut outID="setsVent1"/>}
          <span className="widget__text_normal">%</span>
        </span>
      </div>
      <Slider outID="setsVent1" min={1} max={100}/> */}
    </div>
  </div>



  return (
    (devType === 0 && status !== -1) ? loadingViev
      : (devType === 3 && status !== -1) ? twoSheckViev
        : ''
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    devType: state.devType,
    status: state.status
  }
}

export default connect(mapStateToProps)(Settings);
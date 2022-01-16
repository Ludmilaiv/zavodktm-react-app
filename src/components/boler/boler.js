import TempOut from "../tempOut";
import AnyOut from "../anyOut";
import ButtonOnOff from "../buttonOnOff";
import Slider from "../slider";
import CheckboxContainer from "../checkboxContainer";
const Boler = ({className}) => {
  return (
    <div className={className}>
      <div className={`widget__subwidget widget__subwidget_sup`}>
        <div className={`widget__out widget__out_corner widget__out_corner-big`}>
            <AnyOut outID="setsTempGV"/>
        </div>
        <TempOut main={false} compact={true} tempID="tempBolerOrShnek1" />
        <Slider outID="setsTempGV" min={40} max={80}/>
        <ButtonOnOff setID="setsOnGV" />
        <div className="widget__icon">
          <img src={`images/icon_1.png`} alt="" className="widget__img"/>
        </div>
      </div>

      <div className="widget__hr"></div>

      <div className={`widget__subwidget widget__subwidget_main`}>
        <div className="widget__icon widget__icon_top">
          <img src="images/pointer.png" alt="" className="widget__img"/>
        </div>
        <CheckboxContainer setID='setsOffNasosCOGV' items={[
        {label: 'выключать насос ЦО', value: 1, id:'setsOffNasosCOGV'}
        ]}/>
      </div>
    </div> 
  )
} 
export default Boler;
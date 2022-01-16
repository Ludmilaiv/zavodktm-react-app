import TempOut from "../tempOut";
import AnyOut from "../anyOut";
import ButtonOnOff from "../buttonOnOff";
import Slider from "../slider";
import CheckboxContainer from "../checkboxContainer";
const Termos = ({className}) => {
  return (
    <div className={className}>
    <div className={`widget__subwidget widget__subwidget_sup`}>
      <div className={`widget__out widget__out_corner widget__out_corner-big`}>
          <AnyOut outID="setsTempRoom"/>
      </div>
      <TempOut main={false} compact={true} tempID="tempRoom" />
      <Slider outID="setsTempRoom" min={10} max={40}/>
      <ButtonOnOff setID="SetsOnKomn" />
      <div className="widget__icon">
        <img src={`images/icon_2.png`} alt="" className="widget__img"/>
      </div>
    </div>

    <div className="widget__hr"></div>

    <div className={`widget__subwidget widget__subwidget_main`}>
      <div className="widget__icon widget__icon_top">
        <img src="images/pointer.png" alt="" className="widget__img"/>
      </div>
      <CheckboxContainer setID='setsModeKomn' uncheck={false} items={[
        {label: 'мощностью котла', value: 0, id:'setsModeKomn_1'},
        {label: 'насосом ЦО', value: 1, id:'setsModeKomn_2'},
        {label: 'клапаном', value: 2, id:'setsModeKomn_3'}
        ]}/>
    </div>
  </div> 
  )
} 
export default Termos;  
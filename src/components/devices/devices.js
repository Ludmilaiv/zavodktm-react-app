import { useState, useEffect } from "react";
import { connect } from 'react-redux';
import Button from '../button'
import Device from "../device";
import Popup from "../popup"
import axios from "axios";
import data from "../../data";
import store from "../../store";
import { setDevs } from "../../actions";
import { Oval } from  'react-loader-spinner';
//import QrScaner from "../qrScaner";

const Devices = ({showActivePage, devices=null}) => {

  const [addPopup, addPopupShow] = useState(false);
  const [errPopup, errPopupShow] = useState(false);
  const [doneAddPopup, doneAddPopupShow] = useState(false);
  const [name, nameSet] = useState("");
  const [id, idSet] = useState("");
  const [errMessage, errMessageSet] = useState("");
  const [errId, errIdSet] = useState("");
  const [errName, errNameSet] = useState("");
  //const [enabled, setEnabled] = useState(false);

  localStorage.removeItem(localStorage.getItem('user') + "defaultDevice");

  const loadingViev = <div className="content__page"><Oval
    height={100}
    width={100}
    color="#ff8000"
    wrapperStyle={{margin: '20px', height: '50px'}}
    wrapperClass=""
    visible={true}
    ariaLabel='loading'
    secondaryColor="#FFC400"
    strokeWidth={5}
    strokeWidthSecondary={5}
  /></div>

  const getDevices = store.getState().funcGetDevices;

  function stopGet() {
    store.dispatch(setDevs({pauseGet: true}));
  }

  function startGet() {
    store.dispatch(setDevs({pauseGet: false}));
  }

  useEffect(() => {
    getDevices();
    const getDevsInterval = setInterval(getDevices,5000);
    if (window.location.href.indexOf('qr') !== -1) {
      addPopupShow(true);
      const urlSplit = window.location.href.split("=");
      if (urlSplit.length > 1) {
        idSet(urlSplit[1]);
      }
    }
    return function cleanup() {
      clearInterval(getDevsInterval);
    }
  }, []);
 
  function handleChangeName(event) {
    errMessageSet("");
    errNameSet("");
    nameSet(event.target.value);
  }
  function handleChangeId(event) {
    errMessageSet("");
    errIdSet("");
    idSet(event.target.value);
  }


  const addDevice = () => {
    errMessageSet("");
    errIdSet("");
    errNameSet("");
    if (!(name && id)) {
      errMessageSet("Заполните все поля");
      if(!name) errNameSet("form__input_err");
      if(!id) errIdSet("form__input_err");
    } else {
      let user = {user_id: localStorage.getItem('user'), token: localStorage.getItem('token')};
      const dev = {dev_id: id, dev_name: name, ...user }
      axios.post(data.addDeviceURL, dev)
          .then(function (response) {
            if (response.data === 1) {
              addPopupShow(false);
              doneAddPopupShow(true);
            } else {
              if (response.data === "err1") {
                errMessageSet("Устройство с указанным идентификатором не найдено. Проверьте правильность ввода идентификатора или обратитесь к производителю");
                errIdSet("form__input_err");
              } else if (response.data === "err2") {
                errMessageSet("Устройство с указанным идентификатором уже добавлено Вами");
                errIdSet("form__input_err");
              } else if (response.data === "err3") {
                errMessageSet("Устройство с указанным идентификатором уже добавлено другим пользователем");
                errIdSet("form__input_err");
              } else if (response.data === "err4") {
                errMessageSet("Устройство с таким именем уже существует в Вашем списке. Пожалуйста, введите другое имя");
                errNameSet("form__input_err");
              } else {
                console.log(response.data);
                getDevices();
                addPopupShow(false);
                errPopupShow(true);
              }
            } 
          })
          .catch(function (error) {
            console.log(error);
            getDevices();
            addPopupShow(false);
            errPopupShow(true);
          });
      
    }
  }

  // const onNewScanResult = (decodedText) => {
  //   if (decodedText) {
  //     idSet(decodedText);
  //   } else {
  //     errIdSet('Не удалось распознать qr-код. Введите идентификатор вручную');
  //   }
  // };

  const addHTML = 
  <div className="form popup__form form_flex">
    <label className="form__label" htmlFor="devID">Введите или отсканируйте идентификатор устройства</label>
    <div className="form__input-wrapper">
      <input value={id} placeholder='ID устройства' onChange={handleChangeId} className={`form__input ${errId} form__input_grow`} type="text" name="devID"/>
      <a className='form__scan-button' href="?qr">
        <img className="form__scan-img" src={'images/qrscan.svg'} alt=""/>
      </a>
      {/* <button className='form__scan-button' onClick={() => setEnabled(!enabled)}>
        <img className="form__scan-img" src={!enabled ? 'images/qrscan.svg' : 'images/krest.svg'} alt=""/>
        
      </button> */}
      {/* <QrScaner
                fps={10}
                qrbox={{width: 150, height: 150}}
                disableFlip={false}
                qrCodeSuccessCallback={onNewScanResult}  
                setEnabled={setEnabled}  
                enabled={enabled}           
            /> */}
    </div>   
    
    <label className="form__label" htmlFor="devName">Дайте имя своему устройству</label>
    <input maxLength={30} value={name} placeholder='Наример,"Котёл в гараже"' onChange={handleChangeName} className={`form__input ${errName}`} type="text" name="devName"/>
    <div className="form__label form__error">{errMessage}</div>
  </div>

 return (
    <> 
      <ul className="devices">
        { Array.isArray(devices) ? devices.map(dev => (
          <Device dev={dev} key={dev.id} stopGet={stopGet} startGet={startGet} showActivePage={showActivePage} addPopup={addPopup}/>
        )) : loadingViev }
      </ul> 
      <Button addClass="devices__button" buttonSpan="Добавить устройство" type="popup" onClick={()=>addPopupShow(true)}/>
      {(addPopup)?<Popup popupOK={()=>addDevice(id,name,localStorage.getItem("user"))} startProcess={()=>{startGet(); getDevices()}} stopProcess={stopGet} popupShow={addPopupShow} text={addHTML}/>:""}
      {(doneAddPopup)?<Popup info="true" time="3000" startProcess={()=>{startGet(); getDevices()}} stopProcess={stopGet} popupShow={doneAddPopupShow} text={`Устройство "${name}" успешно добавлено`}/>:""}
      {(errPopup)?<Popup info="true" time="3000" startProcess={()=>{startGet(); getDevices()}} stopProcess={stopGet} popupShow={errPopupShow} text="Что-то пошло не так. Проверьте интернет-подключение и попробуйте ещё раз"/>:""}
    </>

    )
}

const mapStateToProps = (state, ownProps) => {
  
  return {
    ...ownProps,
    devices: state["devices"]
  }
}

export default connect(mapStateToProps)(Devices)

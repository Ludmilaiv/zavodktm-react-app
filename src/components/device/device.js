import { useState } from "react";
import Popup from "../popup"
import axios from "axios";
import data from "../../data";
import store from "../../store";

const Device = ({dev, stopGet, startGet, showActivePage}) => {

  const [delPopup, delPopupShow] = useState(false);
  const [doneDelPopup, doneDelPopupShow] = useState(false);
  const [errPopup, errPopupShow] = useState(false);
  const [editPopup, editPopupShow] = useState(false);
  const [newName, newNameSet] = useState(dev.name);

  const getDevices = store.getState().funcGetDevices;

  const lookDevice = (name, id) => {
    localStorage.setItem(localStorage.getItem("user")+"defaultDev", id)
    showActivePage("home", name);
  }

  const delDevice = (id) => {
    let dev = {dev_id: id};
    axios.post(data.delDeviceURL, dev)
          .then(function (response) {
            if (response.data === 1) {
              delPopupShow(false);
              doneDelPopupShow(true);
            } else {
              console.log(response.data);
              delPopupShow(false);
              errPopupShow(true);
            }  
          })
          .catch(function (error) {
            console.log(error);
            delPopupShow(false);
            errPopupShow(true);
          });
  }

  const renameDevice = (id, newName) => {
    let dev = {dev_id: id, new_name: newName};
    axios.post(data.editDeviceURL, dev)
          .then(function (response) {
            if (response.data !== 1) {
              editPopupShow(false);
              errPopupShow(true);
            }  else {
              editPopupShow(false);
              startGet();
              getDevices();
            }
          })
          .catch(function (error) {
            console.log(error);
            editPopupShow(false);
            errPopupShow(true);
          });
  }

  const editHTML = 
  <div className="form popup__form form_flex">
    <label className="form__label" htmlFor="nevDevName">Переименовать устройство</label>
    <input value={newName} onChange={handleChangeNewName} className="form__input" type="text" name="nevDevName"/>
  </div>

  function handleChangeNewName(event) {
    newNameSet(event.target.value);
  }

  return (
    <>
      <div className="devices__info">
        <span>{dev.name}</span> 
        <span>{(dev.temp===-3000)?"не в сети":((dev.temp===-1270 || dev.temp===-1000)?"--": ((dev.temp / 10).toFixed(1)+" °C"))}</span></div>
      <div className="devices__control">
        <div className={`devices__del  button button_normal`} onClick={()=>delPopupShow(true)}></div>
        <div className={`devices__edit  button button_normal`} onClick={()=>editPopupShow(true)}></div>
        <div className={`devices__look  button button_normal`} onClick={()=>lookDevice(dev.name, dev.id)}></div>
      </div>
      {(delPopup)?<Popup popupOK={()=>delDevice(dev.id)} startProcess={()=>{startGet(); getDevices()}} stopProcess={stopGet} popupShow={delPopupShow} text={`Вы уверены, что хотите удалить устройство "${dev.name}"?`}/>:""}
      {(doneDelPopup)?<Popup info="true" time="3000" startProcess={()=>{startGet(); getDevices()}} stopProcess={stopGet} popupShow={doneDelPopupShow} text={`Устройство "${dev.name}" успешно удалено`}/>:""}
      {(errPopup)?<Popup info="true" time="3000" startProcess={()=> {startGet(); getDevices()}} stopProcess={stopGet} popupShow={errPopupShow} text="Что-то пошло не так. Проверьте интернет-подключение и попробуйте ещё раз"/>:""}
      {(editPopup)?<Popup popupOK={()=>renameDevice(dev.id,newName)} startProcess={()=> {startGet(); getDevices()}} stopProcess={stopGet} popupShow={editPopupShow} text={editHTML}/>:""}
      
      
    </>
)}
    

export default Device

import { createStore } from "redux";
import {setTemp, setDevs} from '../actions'
import reducer from "../reducers";
import data from "../data";
import axios from "axios";

/* 
Соответствие с базой данных
t2 - подача
t3 - обратка
t4 - бойлер (шнек1  - пром)
t5 - шнек   (шнек2 - пром)
t6 - комнатная
t7 - уличная
t8 - дымовых газов
t9 - ток   (ток1 - пром)
t10 - (ток2 - пром)
*/

const initialState = {
  funcGetData: getData,
  funcGetDevices: getDevices,
  functionSendSettings: sendSettings,
  devType: 0,
  pauseGet: false,
  offline: false,
  name: null,
  errCount: 0,
  status: -1,
  tempFlow: null,
  tempReturn: null,
  tempBolerOrShnek1: null,
  tempShnekOrShek2: null,
  tempRoom: null,
  tempOutside: null,
  tempSmoke: null,
  current: null,
  shnekOrCurrent1: null,
  ventel: null,
  setsTempCO: null,
  setsTokShnek1: null,
  setsShnek1: null,
  setsVent1: null,
  setsTempGV: null,
  setsOffNasosCOGV: null,
  setsTempRoom: null,
  setsOnKomn: null,
  setsOnGV: null,
  setsStartGor1: null,
  setsModeKomn: null,
  loading_status: false,
  loading_setsStartGor1: false,
  block_setsTempCO: false,
  block_setsShnek1: false,
  block_setsTokShnek1: false,
  block_setsVent1: false,
  block_setsTempGV: false,
  block_setsTempRoom: false,
  block_setsOffNasosCOGV: false,
  block_setsModeKomn: false,
  block_setsOnKomn: false,
  block_setsOnGV: false,
  devices: []
};

const store = createStore(reducer, initialState);


function getDevices() {
  if (store.getState().pauseGet) return;
  let user = {userID: localStorage.getItem('user')};
  axios.post(data.devicesURL, user)
  .then(function (response) {
    if (typeof response.data === "object") {
      store.dispatch(setDevs({offline: false}));
      store.dispatch(setDevs(
        {
          errCount: 0,
          devices: response.data 
        })
      );
    } else {
      console.log(response.data);
      store.dispatch(setDevs({errCount: store.getState().errCount + 1}));
      if (store.getState().errCount > 3) {
        store.dispatch(setDevs({offline: true}));
      }
    }
  })
  .catch(function (error) {
    store.dispatch(setDevs({errCount: store.getState().errCount + 1}));
    console.log(error);
    if (store.getState().errCount > 3) {
      store.dispatch(setDevs({offline: true}));
    } 
  });
}

const tempDict = {
  'status': 0,
  'tempFlow': 1,
  'tempReturn': 2,
  'tempBolerOrShnek1': 3,
  'tempShnekOrShek2': 4,
  'tempRoom': 5,
  'tempOutside': 6,
  'tempSmoke': 7,
  'current': 8,
  'shnekOrCurrent1': 9,
  'ventel': 10
}

const setsDict = {
  'setsTempCO': 1,
  'setsShnek1': 4,
  'setsTokShnek1': 8,
  'setsVent1': 10,
  'setsStartGor1': 20,
  'setsOnGV': 38,
  'setsTempGV': 39,
  'setsOffNasosCOGV': 41,
  'setsOnKomn': 42,
  'setsTempRoom': 43,
  'setsModeKomn': 45,
}

const connect = {
  s5: 's6',
  s11: 's12'
}

const delaySend = {
  setsTempCO: null,
  setsTokShnek1: null,
  setsShnek1: null,
  setsVent1: null,
  setsTempGV: null,
  setsOffNasosCOGV: null,
  setsTempRoom: null,
  setsOnKomn: null,
  setsOnGV: null,
  setsStartGor1: null,
  setsModeKomn: null,
};

const delayAfterSend = {
  setsTempCO: null,
  setsTokShnek1: null,
  setsShnek1: null,
  setsVent1: null,
  setsTempGV: null,
  setsOffNasosCOGV: null,
  setsTempRoom: null,
  setsOnKomn: null,
  setsOnGV: null,
  setsStartGor1: null,
  setsModeKomn: null,
};

const sendStop = {
  setsTempCO: false,
  setsTokShnek1: false,
  setsShnek1: false,
  setsVent1: false,
  setsTempGV: false,
  setsOffNasosCOGV: false,
  setsTempRoom: false,
  setsOnKomn: false,
  setsOnGV: false,
  setsStartGor1: false,
  setsModeKomn: false,
};

function sendSettings(settingsName, value, afterSend) {
  clearTimeout(delayAfterSend[settingsName]);
  if (sendStop[settingsName]) {
    clearTimeout(delaySend[settingsName]);
    delaySend[settingsName] = setTimeout(() => {
      if (+store.getState()[settingsName] !== +value) return;
      sendStop[settingsName] = false;
      sendSettings(settingsName, value, afterSend);
    }, 1000);
    return;
  }
  sendStop[settingsName] = true;
  if (!localStorage.getItem(localStorage.getItem("user")+"defaultDev")) return;
  const id = localStorage.getItem(localStorage.getItem("user")+"defaultDev");
  const sets = {id};
  const k = `s${setsDict[settingsName] + 1}`;
  sets[k] = value;
  if (k in connect) {
    sets[connect[k]] = value;
  }
  axios.post(data.setDataURL, sets).then(() => {
    if (afterSend) {
      clearTimeout(delayAfterSend[settingsName]);
      delayAfterSend[settingsName] = setTimeout(afterSend, 5000);
    }
  });
  
}
 
function getData(){
  if (localStorage.getItem(localStorage.getItem("user")+"defaultDev")) {
    axios.post(data.getDataURL, {id: localStorage.getItem(localStorage.getItem("user")+"defaultDev")})
    .then(function(response) {
      if (typeof response.data !== 'object') {
        store.dispatch(setTemp({errCount: store.getState().errCount + 1}));
        if (store.getState().errCount > 3) {
          store.dispatch(setDevs({offline: true}));
        } 
      }
      if (response.data.temp[0] === -1) {
        store.dispatch(setTemp({
          devType: 0,
          errCount: 0,
          status: -1,
          tempFlow: null,
          tempReturn: null,
          tempBolerOrShnek1: null,
          tempShnekOrShek2: null,
          tempRoom: null,
          tempOutside: null,
          tempSmoke: null,
          current: null,
          shnekOrCurrent1: null,
          ventel: null,
          setsTempCO: null,
          setsTokShnek1: null,
          setsShnek1: null,
          setsVent1: null,
          setsTempGV: null,
          setsOffNasosCOGV: null,
          setsTempRoom: null,
          setsOnKomn: null,
          setsOnGV: null,
          setsStartGor1: null,
          setsModeKomn: null,
          block_setsTempCO: false,
          block_setsShnek1: false,
          block_setsTokShnek1: false,
          block_setsVent1: false,
          block_setsTempGV: false,
          block_setsTempRoom: false,
          block_setsStartGor1: false
        })) 
      } else {
        const devType = +response.data.type;
        const temp = response.data.temp;
        const set = response.data.set;
        const name = response.data.name;
        store.dispatch(setTemp({
          errCount: 0,
          devType: devType,
          name: name,
          status: temp[tempDict.status],
          tempFlow: temp[tempDict.tempFlow],
          tempReturn: temp[tempDict.tempReturn],
          tempBolerOrShnek1: temp[tempDict.tempBolerOrShnek1],
          tempShnekOrShek2: temp[tempDict.tempShnekOrShek2],
          tempRoom: temp[tempDict.tempRoom],
          tempOutside: temp[tempDict.tempOutside],
          tempSmoke: temp[tempDict.tempSmoke],
          current: temp[tempDict.current],
          shnekOrCurrent1: temp[tempDict.shnekOrCurrent1],
        }));
        if (!store.getState().block_setsTempCO) store.dispatch(setTemp({setsTempCO: set[setsDict.setsTempCO]}));
        if (!store.getState().block_setsShnek1) store.dispatch(setTemp({setsShnek1: set[setsDict.setsShnek1]}));
        if (!store.getState().block_setsTokShnek1) store.dispatch(setTemp({setsTokShnek1: set[setsDict.setsTokShnek1]}));
        if (!store.getState().block_setsVent1) store.dispatch(setTemp({setsVent1: set[setsDict.setsVent1]}));
        if (!store.getState().block_setsTempGV) store.dispatch(setTemp({setsTempGV: set[setsDict.setsTempGV]}));
        if (!store.getState().block_setsTempRoom) store.dispatch(setTemp({setsTempRoom: set[setsDict.setsTempRoom]}));
        if (!store.getState().block_setsStartGor1) store.dispatch(setTemp({setsStartGor1: set[setsDict.setsStartGor1]}));
        if (!store.getState().block_setsOffNasosCOGV) store.dispatch(setTemp({setsOffNasosCOGV: set[setsDict.setsOffNasosCOGV]}));
        if (!store.getState().block_setsModeKomn) store.dispatch(setTemp({setsModeKomn: set[setsDict.setsModeKomn]}));
        if (!store.getState().block_setsOnGV) store.dispatch(setTemp({setsOnGV: set[setsDict.setsOnGV]}));
        if (!store.getState().block_setsOnKomn) store.dispatch(setTemp({setsOnKomn: set[setsDict.setsOnKomn]}));

      } 
    })
    .catch(function (error) {
      store.dispatch(setTemp({errCount: store.getState().errCount + 1}));
      console.log(error);
      if (store.getState().errCount > 3) {
        store.dispatch(setDevs({offline: true}));
      } 
    });
  }
  
}

getDevices();

//setInterval(getData, 3000);


export default store;
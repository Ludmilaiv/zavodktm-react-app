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
  setsForSend: {},
  authError: false,
  devType: 0,
  pauseGet: false,
  offline: false,
  name: null,
  errCount: 0,
  status: 0,
  tempFlow: null,
  tempReturn: null,
  tempBolerOrShnek1: null,
  tempShnekOrShek2: null,
  tempRoom: null,
  tempOutside: null,
  tempSmoke: null,
  current: null,
  current2: null,
  shnekOrCurrent1: null,
  ventel: null,
  shnek: null,
  shnekOrCurrent2: null,
  ventel2: null,
  shnek2: null,
  setsTempCO: null,
  setsTokShnek1: null,
  setsShnek1: null,
  setsShnek2: null,
  setsVent1: null,
  setsVent2: null,
  setsTempGV: null,
  setsOffNasosCOGV: null,
  setsTempRoom: null,
  setsOnKomn: null,
  pid: null,
  setsOnGV: null,
  setsStartGor1: null,
  setsModeKomn: null,
  stopError: null,
  loading_status: false,
  loading_setsStartGor1: false,
  loading_setsStartGor2: false,
  block_setsStartGor1: false,
  block_setsStartGor2: false,
  block_setsTempCO: false,
  block_setsShnek1: false,
  block_setsShnek2: false,
  block_setsTokShnek1: false,
  block_setsVent1: false,
  block_setsTempGV: false,
  block_setsTempRoom: false,
  block_setsOffNasosCOGV: false,
  block_setsModeKomn: false,
  block_setsOnKomn: false,
  block_setsOnGV: false,
  devices: null,
};

const store = createStore(reducer, initialState);


function getDevices() {
  if (store.getState().pauseGet) return;
  let user = {userID: localStorage.getItem('user'), token: localStorage.getItem('token')};
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
      if (response.data === 'err5') {
        store.dispatch(setDevs({authError: true}));
      } else {
        store.dispatch(setDevs({errCount: store.getState().errCount + 1}));
        if (store.getState().errCount > 3) {
          store.dispatch(setDevs({offline: true}));
        }
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
  'ventel': 9,
  'shnek': 10,
  'current2': 11,
  'ventel2': 12,
  'shnek2': 13,
}

const setsDict = {
  'setsTempCO': 1,
  'setsShnek1': 4,
  'setsShnek2': 5,
  'setsTokShnek1': 8,
  'setsTokShnek2': 9,
  'setsVent1': 10,
  'setsVent2': 11,
  'setsStartGor1': 20,
  'setsStartGor2': 21,
  'pid': 32,
  'setsOnGV': 38,
  'setsTempGV': 39,
  'setsOffNasosCOGV': 41,
  'setsOnKomn': 42,
  'setsTempRoom': 43,
  'setsModeKomn': 45,
  'stopError': 62,
}

let setsForSendData = {};
let isRegul = false;

function sendSettings(settingsName, value) {
  const k = `s${setsDict[settingsName] + 1}`;
  store.dispatch(setDevs({setsForSend: {...store.getState().setsForSend, [settingsName]: +value}}));
  setsForSendData[k] = +value;
  isRegul = true;
}
 
function getData(){
  let user = {userID: localStorage.getItem('user'), token: localStorage.getItem('token')};
  if (localStorage.getItem(user['userID']+"defaultDevice")) {
    axios.post(data.getDataURL, {...user, id: localStorage.getItem(user['userID']+"defaultDevice"), sets: setsForSendData})
    .then(function(response) {
      if (typeof response.data !== 'object') {
        if (response.data === 'err5') {
          store.dispatch(setDevs({authError: true}));
        } else {
          store.dispatch(setTemp({errCount: store.getState().errCount + 1}));
          if (store.getState().errCount > 3) {
            store.dispatch(setDevs({offline: true}));
            store.dispatch(setTemp({setsForSend: {}}));
            setsForSendData = {};
          } 
        }
        return;
      }
      if (response.data.temp[0] === -1) {
        const name = response.data.name;
        store.dispatch(setTemp({
          devType: 0,
          changed: 0,
          errCount: 0,
          status: -1,
          name: name,
          tempFlow: null,
          tempReturn: null,
          tempBolerOrShnek1: null,
          tempShnekOrShek2: null,
          tempRoom: null,
          tempOutside: null,
          tempSmoke: null,
          current: null,
          current2: null,
          ventel: null,
          ventel2: null,
          shnek: null,
          shnek2: null,
          setsTempCO: null,
          setsTokShnek1: null,
          setsTokShnek2: null,
          setsShnek1: null,
          setsShnek2: null,
          setsVent1: null,
          setsVent2: null,
          setsTempGV: null,
          pid: null,
          setsOffNasosCOGV: null,
          setsTempRoom: null,
          setsOnKomn: null,
          setsOnGV: null,
          setsStartGor1: null,
          setsModeKomn: null,
          stopError: null,
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
        const changed = +response.data.changed;
        const temp = response.data.temp;
        const set = response.data.set;
        const name = response.data.name;
        store.dispatch(setTemp({
          errCount: 0,
          changed: changed,
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
          shnek: temp[tempDict.shnek],
          ventel: temp[tempDict.ventel],
          current2: temp[tempDict.current2],
          ventel2: temp[tempDict.ventel2],
          shnek2: temp[tempDict.shnek2],
        }));
        if (!isRegul) {
          store.dispatch(setTemp({setsForSend: {}}));
          setsForSendData = {};
        } else {
          isRegul = false;
        }
        store.dispatch(setTemp({setsTempCO: set[setsDict.setsTempCO]}));
        store.dispatch(setTemp({setsShnek1: set[setsDict.setsShnek1]}));
        store.dispatch(setTemp({setsShnek2: set[setsDict.setsShnek2]}));
        store.dispatch(setTemp({setsTokShnek1: set[setsDict.setsTokShnek1]}));
        store.dispatch(setTemp({setsVent1: set[setsDict.setsVent1]}));
        store.dispatch(setTemp({setsVent2: set[setsDict.setsVent2]}));
        store.dispatch(setTemp({setsTempGV: set[setsDict.setsTempGV]}));
        store.dispatch(setTemp({setsTempRoom: set[setsDict.setsTempRoom]}));
        store.dispatch(setTemp({setsStartGor1: set[setsDict.setsStartGor1]}));
        store.dispatch(setTemp({setsStartGor2: set[setsDict.setsStartGor2]}));
        store.dispatch(setTemp({setsOffNasosCOGV: set[setsDict.setsOffNasosCOGV]}));
        store.dispatch(setTemp({setsModeKomn: set[setsDict.setsModeKomn]}));
        store.dispatch(setTemp({setsOnGV: set[setsDict.setsOnGV]}));
        store.dispatch(setTemp({setsOnKomn: set[setsDict.setsOnKomn]}));
        store.dispatch(setTemp({pid: set[setsDict.pid]}));
        store.dispatch(setTemp({stopError: set[setsDict.stopError]}));
      } 
    })
    .catch(function (error) {
      store.dispatch(setTemp({errCount: store.getState().errCount + 1}));
      console.log(error);
      if (store.getState().errCount > 3) {
        store.dispatch(setDevs({offline: true}));
        store.dispatch(setTemp({setsForSend: {}}));
        setsForSendData = {};
      } 
    });
  }
  
}

export default store;
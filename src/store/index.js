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
  currentOrCurrent1: null,
  current2: null,
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
  'currentOrCurrent1': 8,
  'current2': 9,
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
  'setsModeKomn': 45
}

function sendSettings(settingsName, value) {
  if (!localStorage.getItem(localStorage.getItem("user")+"defaultDev")) return;
  const id = localStorage.getItem(localStorage.getItem("user")+"defaultDev");
  const sets = {id};
  sets[`s${setsDict[settingsName] + 1}`] = value;
  axios.post(data.setDataURL, sets)
  .then(function(response) {
    if (response.data === 1) {
      store.dispatch(setTemp({[`block_${settingsName}`]: false}));
    }
  })
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
          errCount: 0,
          status: -1,
          tempFlow: null,
          tempReturn: null,
          tempBolerOrShnek1: null,
          tempShnekOrShek2: null,
          tempRoom: null,
          tempOutside: null,
          tempSmoke: null,
          currentOrCurrent1: null,
          current2: null,
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
        const temp = response.data.temp;
        const set = response.data.set;
        const name = response.data.name;
        store.dispatch(setTemp({
          errCount: 0,
          name: name,
          status: temp[tempDict.status],
          tempFlow: temp[tempDict.tempFlow],
          tempReturn: temp[tempDict.tempReturn],
          tempBolerOrShnek1: temp[tempDict.tempBolerOrShnek1],
          tempShnekOrShek2: temp[tempDict.tempShnekOrShek2],
          tempRoom: temp[tempDict.tempRoom],
          tempOutside: temp[tempDict.tempOutside],
          tempSmoke: temp[tempDict.tempSmoke],
          currentOrCurrent1: temp[tempDict.currentOrCurrent1],
          current2: temp[tempDict.current2],
          ventel: temp[tempDict.ventel],
          setsTempCO: (store.getState().block_setsTempCO) ? store.getState().setsTempCO : set[setsDict.setsTempCO],
          setsShnek1: (store.getState().block_setsShnek1) ? store.getState().setsShnek1 : set[setsDict.setsShnek1],
          setsTokShnek1: (store.getState().block_setsTokShnek1) ? store.getState().setsTokShnek1 : set[setsDict.setsTokShnek1],
          setsVent1: (store.getState().block_setsVent1) ? store.getState().setsVent1 : set[setsDict.setsVent1],
          setsTempGV: (store.getState().block_setsTempGV) ? store.getState().setsTempGV : set[setsDict.setsTempGV],
          setsTempRoom: (store.getState().block_setsTempRoom) ? store.getState().setsTempRoom : set[setsDict.setsTempRoom],
          setsStartGor1: (store.getState().block_setsStartGor1) ? store.getState().setsStartGor1 : set[setsDict.setsStartGor1],
          setsOnGV: set[setsDict.setsOnGV],
          setsOffNasosCOGV: (store.getState().block_setsOffNasosCOGV) ? store.getState().setsOffNasosCOGV : set[setsDict.setsOffNasosCOGV],
          setsModeKomn: (store.getState().block_setsModeKomn) ? store.getState().setsModeKomn : set[setsDict.setsModeKomn]
        }));
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
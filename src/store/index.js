import { createStore } from "redux";
import {setTemp, setDevs} from '../actions'
import reducer from "../reducers";
import data from "../data";
import axios from "axios";

const initialState = {
  funcGetData: getData,
  funcGetDevices: getDevices,
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
  setsTempCO: null,
  setsTokShnek1: null,
  setsVent1: null,
  setsTempGV: null,
  setsTempRoom: null,
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

function getData(){
  if (localStorage.getItem(localStorage.getItem("user")+"defaultDev")) {
    axios.post(data.getDataURL, {id: localStorage.getItem(localStorage.getItem("user")+"defaultDev")})
    .then(function (response) {
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
          setsTempCO: null,
          setsTokShnek1: null,
          setsVent1: null,
          setsTempGV: null,
          setsTempRoom: null
        })) 
      } else {
        const temp = response.data.temp;
        const set = response.data.set;
        const name = response.data.name;
        store.dispatch(setTemp({
          errCount: 0,
          name: name,
          status: temp[0],
          tempFlow: temp[1],
          tempReturn: temp[2],
          tempBolerOrShnek1: temp[3],
          tempShnekOrShek2: temp[4],
          tempRoom: temp[5],
          tempOutside: temp[6],
          tempSmoke: temp[7],
          currentOrCurrent1: temp[8],
          current2: temp[9],
          setsTempCO: set[1],
          setsTokShnek1: set[8],
          setsVent1: set[10],
          setsTempGV: set[39],
          setsTempRoom: set[43]
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
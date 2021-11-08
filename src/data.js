const path = "https://zavodktm.ru";

const data = {
  regURL: path + "/reg",
  authURL: path + "/reg",
  recoveryPassURL: path + "/recovery-pass",
  devicesURL: path + "/get-devices",
  delDeviceURL: path + "/del-device",
  editDeviceURL: path + "/edit-device",
  addDeviceURL: path + "/add-device",
  getDataURL: path + "/get-data",
  metricDict: {
    tempFlow: <>&deg;C</>,
    tempReturn: <>&deg;C</>,
    tempBolerOrShnek1: <>&deg;C</>,
    tempShnekOrShek2: <>&deg;C</>,
    tempRoom: <>&deg;C</>,
    tempOutside: <>&deg;C</>,
    tempSmoke: <>&deg;C</>,
    currentOrCurrent1: <>A</>,
    current2: <>A</>
  },
  coefDict: {
    tempFlow: 0.1,
    tempReturn: 0.1,
    tempBolerOrShnek1: 0.1,
    tempShnekOrShek2: 0.1,
    tempRoom: 0.1,
    tempOutside: 0.1,
    tempSmoke: 0.1,
    currentOrCurrent1: 0.01,
    current2: 0.01
  }
}

export default data;
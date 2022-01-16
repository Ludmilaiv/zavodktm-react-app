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
  setDataURL: path + "/set-data",
  metricDict: {
    tempFlow: <>&deg;C</>,
    tempReturn: <>&deg;C</>,
    tempBolerOrShnek1: <>&deg;C</>,
    tempShnekOrShek2: <>&deg;C</>,
    tempRoom: <>&deg;C</>,
    tempOutside: <>&deg;C</>,
    tempSmoke: <>&deg;C</>,
    current: <>A</>,
    shnek: <>%</>
  },
  coefDict: {
    tempFlow: 0.1,
    tempReturn: 0.1,
    tempBolerOrShnek1: 0.1,
    tempShnekOrShek2: 0.1,
    tempRoom: 0.1,
    tempOutside: 0.1,
    tempSmoke: 0.1,
    current: 0.01,
    shnek: 0.01
  }
}

export default data;
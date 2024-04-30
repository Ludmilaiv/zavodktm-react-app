const path = "https://zavodktm.ru";

const data = {
  regURL: path + "/reg-v1",
  authURL: path + "/reg-v1",
  recoveryPassURL: path + "/recovery-pass",
  devicesURL: path + "/get-devices-v1",
  delDeviceURL: path + "/del-device-v1",
  editDeviceURL: path + "/edit-device-v1",
  addDeviceURL: path + "/add-device-v1",
  getDataURL: path + "/get-data-v1",
  setDataURL: path + "/set-data-v1",
  metricDict: {
    tempFlow: <>&deg;C</>,
    tempReturn: <>&deg;C</>,
    tempBolerOrShnek1: <>&deg;C</>,
    tempShnekOrShek2: <>&deg;C</>,
    tempRoom: <>&deg;C</>,
    tempOutside: <>&deg;C</>,
    tempSmoke: <>&deg;C</>,
    current: <>A</>,
    shnekOrCurrent1: <>A</>
  },
  coefDict: {
    tempFlow: 0.1,
    tempReturn: 0.1,
    tempBolerOrShnek1: 0.1,
    tempShnekOrShek2: 0.1,
    tempRoom: 0.1,
    tempOutside: 0.1,
    tempSmoke: 0.1,
    current: 0.1,
    shnekOrCurrent1: 0.01
  }
}

export default data;
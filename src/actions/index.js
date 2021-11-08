import { SET_TEMP, SET_DEVS } from "./types";

export const setTemp = data => ({
  type: SET_TEMP,
  data
});

export const setDevs = data => ({
  type: SET_DEVS,
  data
});
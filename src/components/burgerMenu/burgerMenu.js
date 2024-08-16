import Button from "../button";
import store from "../../store";
import data from "../../data";
import axios from "axios";

const BurgerMenu = ({showActivePage}) => {
  const buttonSpan = <span className="button__span button__span_burger"></span>

  function logout() {
    const userId = localStorage.getItem("user");
    axios.post(data.regURL, {id: userId, logout: localStorage.getItem("token")});
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.open(`https://biomatic24.ru/logout/${userId}`);
    showActivePage("author","Вход");
  }

  function showDevices() {
    store.getState().funcGetDevices();
    showActivePage("devices","Устройства");
  }

  return (
      <div className="burger-menu">
        <input className="burger-menu__toggle" id="menu__toggle" type="checkbox" />
        <label className="burger-menu__button" htmlFor="menu__toggle">
          <Button addClass="button header__button button_burger" buttonSpan={buttonSpan}/>
        </label>
        <ul className="burger-menu__box">
          <label className="burger-menu__exit" htmlFor="menu__toggle">
          </label>
          <li className="burger-menu__item" onClick={logout}><label htmlFor="menu__toggle">Выход</label></li>
          <li className="burger-menu__item" onClick={showDevices}><label htmlFor="menu__toggle">Мои устройства</label></li>
          <li className="burger-menu__item"><a href={`https://biomatic24.ru/${localStorage.getItem("user")}`} target="_blank">Настройки уведомлений</a></li>
        </ul>
      </div>
    ) 
}

export default BurgerMenu
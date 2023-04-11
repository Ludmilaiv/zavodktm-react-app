import React, { useState } from 'react';
import { connect } from 'react-redux';

const Menu = ({showActivePage, devType = 0}) => {

  const [activeID, setActiveItem] = useState("home");

  const items = devType === 0 ? []
   : devType === 3 ? [
      {title: "Главная", imgClass: "_home", id:"home"},
      {title: "Котёл", imgClass: "_kotel", id:"kotel"},
      {title: "Настройки", imgClass: "_settings", id:"settings"},
      {title: "Термостат", imgClass: "_termostat", id:"termos"},
    ]
    : [
      {title: "Главная", imgClass: "_home", id:"home"},
      {title: "Котёл", imgClass: "_kotel", id:"kotel"},
      {title: "Бойлер", imgClass: "_boler", id:"boler"},
      {title: "Термостат", imgClass: "_termostat", id:"termos"},
    ]


  return (
    <ul className="menu footer__menu">
      { items.map((item) => {
        const active = item.id === activeID;
        const itemClassName = `menu__item ${active?"menu__item_active":""}`
        const iconClassName = `menu__img menu__img${item.imgClass}`
        return (
          <li className={itemClassName} id={item.id} key={item.id}
          onClick={() => changeMenu(item.id)}>
            <div className={iconClassName}>
            </div>
            <div className="menu__label">{item.title}</div>
          </li>
        )  
      }) }
    </ul>)

  function changeMenu(id) {
    showActivePage(id);
    setActiveItem(id);
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    devType: state.devType
  }
}
  
export default connect(mapStateToProps)(Menu)
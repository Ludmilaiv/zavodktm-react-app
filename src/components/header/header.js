import BurgerMenu from "../burgerMenu";
import AnyOut from "../anyOut";
import TempOut from "../tempOut";

const Header = ({showActivePage, activePage, title}) => {
  if (localStorage.getItem("user")) {
    if (activePage==="home" || activePage==="kotel" || activePage==="boler" || activePage==="termos" || activePage==="settings") {
      return (
        <div className="header header_layout header_flex">
          <div className="header__content">
            <div className="header__label" id="outside_temp">
              <TempOut tempID="tempOutside" header="true"/>
            </div>
            <div className="header__title"><AnyOut outID="name" def={title}/></div>
          </div>
          <BurgerMenu showActivePage={showActivePage}/>
        </div>
      )
    } else {
      return (
        <div className="header header_layout header_flex">
          <div className="header__content">
            <div className="header__title">{title}</div>
          </div>
        <BurgerMenu showActivePage={showActivePage}/>
        </div>
      ) 
    }
   
  } else {
    return (
      <div className="header header_layout header_flex">
        <div className="header__content">
        <div className="header__title">{title}</div>
        </div>
      </div>
    )
  }
  
}

export default Header
import HomePage from "../homePage";
import KotelPage from "../kotelPage";
import AuthorPage from "../authorPage";
import DevicesPage from "../devicesPage";
import BolerPage from "../bolerPage";
import TermosPage from "../termosPage";
import SettingsPage from "../settingsPage";
import Loading from "../loading";
import ConfirmPage from "../confirmPage";
import ErrorPopup from "../errorPopup";

const Content = ({showActivePage, activePage, getDevices}) => {
  return (
    <div className="content content_position">
        {activePage==="author"||activePage==="reg"||activePage==="authorHelp"?(<AuthorPage showActivePage={showActivePage} activePage={activePage}/>):
            (activePage==="home"?(<><HomePage/><ErrorPopup showActivePage={showActivePage}/></>):(
                activePage==="devices"?(<DevicesPage getDevices={getDevices} showActivePage={showActivePage}/>): (
                  activePage === "kotel" ? (<><KotelPage/><ErrorPopup showActivePage={showActivePage}/></>): (
                    activePage === 'boler' ? (<><BolerPage/><ErrorPopup showActivePage={showActivePage}/></>) : (
                      activePage === 'termos' ? (<><TermosPage/><ErrorPopup showActivePage={showActivePage}/></>) : (
                        activePage === 'settings' ? (<><SettingsPage/><ErrorPopup showActivePage={showActivePage}/></>) : (
                          activePage === 'loading' ? (<Loading/>) : (
                            activePage === 'confirm' ? (<ConfirmPage/>) : ''
                        )
                      )
                    )
                  )
                )
              )
            )
          )
        }
       
        
    </div>
  )
}

export default Content
import HomePage from "../homePage";
import KotelPage from "../kotelPage";
import AuthorPage from "../authorPage";
import DevicesPage from "../devicesPage";
import BolerPage from "../bolerPage";
import TermosPage from "../termosPage";
import SettingsPage from "../settingsPage";
import Loading from "../loading";
import ConfirmPage from "../confirmPage";

const Content = ({showActivePage, activePage, getDevices}) => {
  return (
    <div className="content content_position">
        {activePage==="author"||activePage==="reg"||activePage==="authorHelp"?(<AuthorPage showActivePage={showActivePage} activePage={activePage}/>):
            (activePage==="home"?(<HomePage/>):(
                activePage==="devices"?(<DevicesPage getDevices={getDevices} showActivePage={showActivePage}/>): (
                  activePage === "kotel" ? (<KotelPage/>): (
                    activePage === 'boler' ? (<BolerPage/>) : (
                      activePage === 'termos' ? (<TermosPage/>) : (
                        activePage === 'settings' ? (<SettingsPage/>) : (
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
import HomePage from "../homePage";
import AuthorPage from "../authorPage";
import DevicesPage from "../devicesPage";

const Content = ({showActivePage, activePage, getDevices}) => {
  return (
    <div className="content content_position">
        {activePage==="author"||activePage==="reg"||activePage==="authorHelp"?(<AuthorPage showActivePage={showActivePage} activePage={activePage}/>):
            (activePage==="home"?(<HomePage/>):(
                activePage==="devices"?(<DevicesPage getDevices={getDevices} showActivePage={showActivePage}/>):""
              )
            )
        }
       
        
    </div>
  )
}

export default Content
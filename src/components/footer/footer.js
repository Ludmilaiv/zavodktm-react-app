import Menu from '../menu';

const Footer = ({showActivePage, activePage}) => {
  if (localStorage.getItem("user") && !(activePage==="devices" || activePage==="profile")) {

    return (
      <div className="footer footer_position">
        <Menu showActivePage={showActivePage}/>
      </div>
    )
  } else {
    return (
      <></>
    )
  }
}

export default Footer
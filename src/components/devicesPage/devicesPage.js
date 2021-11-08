import Widget from "../widget"

const DevicesPage = ({showActivePage}) => {
  return (
    <div className="content__page">
      <Widget typeClass="devices" showActivePage={showActivePage}/>
    </div>
  )
}

export default DevicesPage
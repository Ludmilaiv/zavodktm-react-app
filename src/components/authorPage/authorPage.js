import Widget from "../widget"

const AuthorPage = ({showActivePage, activePage}) => {
  return (
    <div className="content__page">
      <Widget typeClass="author" activePage={activePage} showActivePage={showActivePage}/>
    </div>
  )
}

export default AuthorPage
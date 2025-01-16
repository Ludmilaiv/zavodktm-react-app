import Widget from "../widget"

const AuthorPage = ({showActivePage, activePage}) => {
  return (
    <div className="content__page content__page_long">
      <Widget typeClass="author" activePage={activePage} showActivePage={showActivePage}/>
    </div>
  )
}

export default AuthorPage
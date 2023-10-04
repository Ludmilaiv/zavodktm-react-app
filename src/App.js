import './App.scss';
import Header from './components/header';
import Content from './components/content';
import Footer from './components/footer';
import React, { useState, useEffect } from 'react';
import store from "./store";
import { setDevs } from './actions';
import Popup from "./components/popup";
import { connect } from "react-redux";
import MobileDetect from 'mobile-detect';

function App(offline=false) {

  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`); 
    const md = new MobileDetect(window.navigator.userAgent);
    setIsMobile(!!md.mobile())
  }, []);

  let status = "author";
  let title = "Вход";
  if (localStorage.getItem("user")) {
    if (!offline) {
      store.getState().funcGetDevices();
    }
    status = "devices";
    title = "Устройства"
  }

  const [activePage, setActivePage] = useState(status);
  const [headerTitle, setHeaderTitle] = useState(title);

  const showActivePage = (page, title) => {
    if (page === "devices") {
      store.getState().funcGetDevices();
    }
    setActivePage(page);
    outHeaderTitle(title);
  }
  
  const outHeaderTitle = (title) => {
    setHeaderTitle(title)
  }

  return (
    <div className="App wraper wraper_background wraper_flex">
      {isMobile ? <>
        <Header showActivePage={showActivePage} activePage={activePage} title={headerTitle}/>
        <Content showActivePage={showActivePage} activePage={activePage}/>
        <Footer showActivePage={showActivePage} activePage={activePage}/>
        {(store.getState().offline)?(<Popup text="Не возможно получить данные. Проверьте интернет-подключение" info="true" error="true" popupShow={()=>{store.dispatch(setDevs({errCount: 0})); store.dispatch(setDevs({offline: false}))}}/>):""} 
      </> 
      :<div className="wraper__error"><span>Поддерживаются только мобильные устройства</span></div> }
    </div>
  );

  
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    offline: state["offline"]
  }
}

export default connect(mapStateToProps)(App);


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
import data from "./data";
import axios from "axios";

function App({offline=false, authError=false}) {

  const [isMobile, setIsMobile] = useState(true);
  const [isConfirm, setIsConfirm] = useState(false);
  const [isConfirmLoading, setIsConfirmLoading] = useState(true);

  useEffect(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`); 
    const md = new MobileDetect(window.navigator.userAgent);
    setIsMobile(!!md.mobile());
  }, []);

  useEffect(() => {
    if (authError) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      document.location.reload();
    }
  }, [authError])

  let status = "author";
  let title = "Вход";

  if (localStorage.getItem("user") && localStorage.getItem("token") && !authError) {
    if (isConfirm) {
      if (!offline) {
        store.getState().funcGetDevices();
      }
      if (localStorage.getItem(localStorage.getItem("user") + "defaultDev")) {
        status = "home";
        title = "Имя устройства"
      } else {
        status = "devices";
        title = "Устройства"
      }
    } else {
      if (isConfirmLoading) {
        status = "loading";
        title = "Подождите...";
      } else {
        status = "confirm";
        title = "Подтверждение эл. почты";
      }
    } 
  }

  const [activePage, setActivePage] = useState(status);
  const [headerTitle, setHeaderTitle] = useState(title);

  useEffect(() => {
    let timeout;
    function getConfirm () {
      axios.post(data.getConfirmURL, {user_id: localStorage.getItem("user")})
        .then(function (response) {
          console.log(+response.data);
          if (+response.data === 1) {
            setIsConfirm(true);
            setIsConfirmLoading(false);
          } else if (+response.data === 0) {
            setIsConfirm(false);
            setIsConfirmLoading(false);
          }
        })
        timeout = setTimeout(getConfirm, 3000);
    }
    if (activePage === 'author' || (isConfirm && !isConfirmLoading)) return;
    if (localStorage.getItem("user")) {
      getConfirm();
      return () => clearTimeout(timeout);
    }
  });

  useEffect(() => {
    console.log(activePage);
    if (!isConfirm) {
      if (activePage === 'author' || activePage === 'authorHelp') return;
      if (isConfirmLoading) {
        if (activePage !== 'loading') {
          setActivePage("loading");
          setHeaderTitle("Подождите...");
        }
      } else if (activePage !== "confirm") {
        setActivePage("confirm");
        setHeaderTitle("Подтверждение эл. почты");
      }       
    } else if (activePage === 'loading' || activePage === "confirm") {
      setActivePage('devices');
      setHeaderTitle('Устройства');
    }
  }, [isConfirm, isConfirmLoading, activePage]);

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
    offline: state["offline"],
    authError: state["authError"],
  }
}

export default connect(mapStateToProps)(App);


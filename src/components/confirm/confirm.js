import Button from "../button";
import data from "../../data";
import { useState } from 'react';
import axios from 'axios';

const Confirm = () => {

  const [errorMessage, setErrorMes] = useState("");

  function confirm(e) {
    e.preventDefault();
    setErrorMes("");
    setErrorMes("Подождите...");
    const userId = localStorage.getItem('user');
    if (!userId) return;
    axios.post(data.confirmURL, {user_id: userId})
        .then(function (response) {
        if (typeof response.data === "object" && response.data['email']) {
           setErrorMes(`На адрес электронной почты ${response.data['email']} отправлен запрос на подтверждение`);
        } else {
          setErrorMes("Что-то пошло не так. Попробуйте позже");
          console.log(response.data);
        }
        })
        .catch(function (error) {
          setErrorMes("Что-то пошло не так. Попробуйте позже");
          console.log(error);
        });
    }
  
  return (
    <>
      <p className="widget__text">Для использования аккаунта необходимо подтвердить адрес электронной почты</p>
      <Button onClick={confirm} addClass="widget__button" buttonSpan="Подтвердить" />
      <p className="widget__text widget__text_small">{ errorMessage }</p>
    </>
    
  )
  
}

export default Confirm
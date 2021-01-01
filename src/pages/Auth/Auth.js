import React, { useState } from "react";
import AuthOptions from "../../components/Auth/AuthOptions";
import RegisterForm from "../../components/Auth/RegisterForm";
import LoginForm from "../../components/Auth/LoginForm";
import BackGroundAuth from "../../assets/jpg/background-auth.jpg";
import LogoNameWhite from "../../assets/png/logo-name-white.png";
import "./Auth.scss";

export default function Auth() {
  const [selectedForm, setSelectedForm] = useState(null);
  const handlerForm = () => {
    switch (selectedForm) {
      case "login":
        return <LoginForm setSelectedForm={setSelectedForm}></LoginForm>;

      case "register":
        return <RegisterForm setSelectedForm={setSelectedForm}></RegisterForm>;

      default:
        return <AuthOptions setSelectedForm={setSelectedForm}></AuthOptions>;
    }
  };
  return (
    <div className='auth' style={{ backgroundImage: `url(${BackGroundAuth})` }}>
      <div className='auth__dark'></div>
      <div className='auth__box'>
        <div className='auth__box-logo'>
          <img src={LogoNameWhite} alt='Meiby'></img>
        </div>
        {handlerForm()}
      </div>
    </div>
  );
}

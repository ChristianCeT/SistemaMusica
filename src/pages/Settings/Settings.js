import React, { useState } from "react";
import UploadAvatar from "../../components/Settings/UploadAvatar";
import BasicModal from "../../components/Modal/BasicModal";
import UserName from "../../components/Settings/UserName";
import UserEmail from "../../components/Settings/UserEmail";
import "./Settings.scss";

export default function Settings(props) {
  const { user, setReloadApp } = props;
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [contentModal, setContentModal] = useState(null);

  return (
    <div className='settings'>
      <h1>Configuración</h1>
      <div className='avatar-name'>
        <UploadAvatar user={user} setReloadApp={setReloadApp}></UploadAvatar>
        <UserName
          user={user}
          setShowModal={setShowModal}
          setTitleModal={setTitleModal}
          setContentModal={setContentModal}
          setReloadApp={setReloadApp}
        ></UserName>
      </div>
      <UserEmail
        user={user}
        setShowModal={setShowModal}
        setTitleModal={setTitleModal}
        setContentModal={setContentModal}
      ></UserEmail>
      <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
        {contentModal}
      </BasicModal>
    </div>
  );
}

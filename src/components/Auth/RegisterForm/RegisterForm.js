import React, { useState } from "react";
import { Button, Icon, Form, Input } from "semantic-ui-react";
import { toast } from "react-toastify";
import { validateEmail } from "../../../utils/Validation";
import firebase from "../../../utils/Firebase";
import "firebase/auth";

import "./RegisterForm.scss";

export default function RegisterForm(props) {
  const { setSelectedForm } = props;

  const [formData, setFormData] = useState(defaultValueForm());
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handlerShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!validateEmail(formData.email)) {
      errors.email = true;
      formOk = false;
    }
    if (formData.password.length < 6) {
      errors.password = true;
      formOk = false;
    }
    if (!formData.username) {
      errors.username = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      setIsLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          changeUserName();
          setVerificationEmail();
        })
        .catch(() => {
          toast.error("Error al crear la cuenta.");
        })
        .finally(() => {
          setIsLoading(false);
          setSelectedForm(null);
        });
    }
  };

  const changeUserName = () => {
    firebase
      .auth()
      .currentUser.updateProfile({
        displayName: formData.username,
      })
      .catch(() => {
        toast.error("Error al asignar el nombre de usuario.");
      });
  };

  const setVerificationEmail = () => {
    firebase
      .auth()
      .currentUser.sendEmailVerification()
      .then(() => {
        toast.success("Se ha enviado un email de verificación.");
      })
      .catch(() => {
        toast.error("Error al enviar el email de verificación.");
      });
  };
  return (
    <div className='register-form'>
      <h1>Empieza a escuchar con una cuenta de Meiby gratis</h1>
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Field>
          <Input
            type='text'
            name='email'
            placeholder='Correo electrónico'
            icon='mail outline'
            error={formError.email}
          ></Input>

          {formError.email && (
            <span className='error-text'>
              Por favor, introduce un correo electrónico válido.
            </span>
          )}
        </Form.Field>

        <Form.Field>
          <Input
            type={showPassword ? "text" : "password"}
            name='password'
            placeholder='Contraseña'
            error={formError.password}
            icon={
              showPassword ? (
                <Icon
                  name='eye slash outline'
                  link
                  onClick={handlerShowPassword}
                ></Icon>
              ) : (
                <Icon name='eye' link onClick={handlerShowPassword}></Icon>
              )
            }
          ></Input>
          {formError.password && (
            <span className='error-text'>
              Por favor, elige una contraseña superior a 5 carácteres.
            </span>
          )}
        </Form.Field>

        <Form.Field>
          <Input
            type='text'
            name='username'
            placeholder='¿Cómo deberíamos llamarte?'
            icon='user circle outline'
            error={formError.username}
          ></Input>
          {formError.username && (
            <span className='error-text'>Por favor, introduce un nombre.</span>
          )}
        </Form.Field>

        <Button type='submit' loading={isLoading}>
          Continuar
        </Button>
      </Form>
      <div className='register-form__options'>
        <p onClick={() => setSelectedForm(null)}>Volver</p>
        <p>
          ¿Ya tienes Meiby?{" "}
          <span onClick={() => setSelectedForm("login")}>Iniciar sesión</span>
        </p>
      </div>
    </div>
  );
}

function defaultValueForm() {
  return {
    email: "",
    password: "",
    username: "",
  };
}

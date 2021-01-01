import React, { useState } from "react";
import { Button, Form, Input, Icon } from "semantic-ui-react";

export default function UserEmail(props) {
  const { user, setShowModal, setTitleModal, setContentModal } = props;

  const onEdit = () => {
    setTitleModal("Actualizar email");
    setContentModal(
      <ChangeEmailForm
        email={user.email}
        setShowModal={setShowModal}
      ></ChangeEmailForm>
    );
    setShowModal(true);
  };
  return (
    <div className='user-email'>
      <h3>Email: {user.email}</h3>
      <Button circular onClick={onEdit}>
        Actualizar
      </Button>
    </div>
  );
}

function ChangeEmailForm(props) {
  const { email, setShowModal } = props;
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = () => {
    console.log("formulario enviado");
    setShowModal(false);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <Input defaultValue={email} type='text'></Input>
      </Form.Field>

      <Form.Field>
        <Input
          placeholder='Contraseña'
          type={showPassword ? "text" : "password"}
          icon={
            <Icon
              name={showPassword ? "eye slash outline" : "eye"}
              link
              onClick={() => setShowPassword(!showPassword)}
            ></Icon>
          }
        ></Input>
      </Form.Field>
      <Button type='submit'>Actualizar email</Button>
    </Form>
  );
}

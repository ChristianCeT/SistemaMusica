import React from "react";
import { Grid } from "semantic-ui-react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "../../routes/Routes";
import MenuLeft from "../../components/MenuLeft";
import TopBar from "../../components/TopBar";
import "./LoggedLayout.scss";

export default function LoggedLayout(props) {
  const { user, setReloadApp } = props;

  return (
    <Router>
      <Grid className='logged-layout'>
        <Grid.Row>
          <Grid.Column width={3}>
            <MenuLeft user={user}></MenuLeft>
          </Grid.Column>
          <Grid.Column className='content' width={13}>
            <TopBar user={user}></TopBar>
            <Routes user={user} setReloadApp={setReloadApp}></Routes>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <h2>Player</h2>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Router>
  );
}

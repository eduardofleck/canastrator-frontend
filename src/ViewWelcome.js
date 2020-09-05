import React, { Component, useState, useEffect } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { withTranslation, Trans } from "react-i18next";

const WelcomeGrid = styled.div`
  display: grid;
  justify-content: center;
  justify-items: center;
  align-content: center;
  align-items: center;
`;

const LinesGrid = styled.div`
  display: grid;
  margin: 10px;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-template-rows: 50px;
  /* justify-content: center;
  justify-items: center; */
`;

const LineNewGame = styled.div`
  display: grid;
  grid-template-columns: 30px 230px;
  grid-template-rows: 40px;
  justify-content: left;
  justify-items: left;
  align-content: left;
  align-items: center;
`;

const LineAddPoints = styled.div`
  display: grid;
  grid-template-columns: 30px 50px auto;
  justify-content: left;
  justify-items: left;
  align-content: left;
  align-items: center;
`;

const LineShare = styled.div`
  display: grid;
  grid-template-columns: auto;
`;

const LineFun = styled.div`
  display: grid;
  grid-template-columns: auto;
`;

function ViewWelcome(props) {
  const newGame = (e) => {
    props.startNewGame(e);
  };

  return (
    <WelcomeGrid>
      <LinesGrid>
        <LineNewGame>
          <h2>1. </h2>
          <Button variant="contained" color="primary" onClick={newGame}>
            <Trans>welcome.createNewGame</Trans>
          </Button>
        </LineNewGame>
        <LineShare>
          <h2>
            2. <Trans>welcome.shareWithFriend</Trans>
          </h2>
        </LineShare>
        <LineAddPoints>
          <h2>3. </h2>
          <Fab size="small" color="secondary" aria-label="add">
            <AddIcon />
          </Fab>
          <h2>
            <Trans>welcome.addPoints</Trans>
          </h2>
        </LineAddPoints>
        <LineFun>
          <h2>
            4. <Trans>welcome.goodGame</Trans>
          </h2>
        </LineFun>
      </LinesGrid>
    </WelcomeGrid>
  );
}

export default ViewWelcome;

import React, { Component, useState, useEffect } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { withTranslation, Trans } from "react-i18next";

const NeGameGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr;
  justify-items: center;
  h2 {
    text-align: center;
  }
  h3 {
    text-align: center;
  }
`;

function ViewNewGameWarning(props) {
  const useStyles = makeStyles((theme) => ({
    right: {
      position: "absolute",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    left: {
      position: "absolute",
      bottom: theme.spacing(2),
      left: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  const startNewGame = (event) => {
    props.startNewGame(event);
  };

  const backToActiveGame = (event) => {
    props.backToActiveGame(event);
  };

  return (
    <div>
      <NeGameGrid>
        <h2>
          <Trans>newGameWarning.gameActiveTittle</Trans>
        </h2>
        <h3>
          <Trans>newGameWarning.doWannaStartAnyways</Trans>
        </h3>
      </NeGameGrid>
      <Button
        variant="contained"
        color="primary"
        className={classes.left}
        onClick={backToActiveGame}
      >
        <Trans>generic.no</Trans>
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.right}
        onClick={startNewGame}
      >
        <Trans>generic.letsPlay</Trans>
      </Button>
    </div>
  );
}

export default ViewNewGameWarning;

import React, { Component, useState, useEffect } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

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
        <h2>You already have and active game</h2>
        <h3>Do you wanna start a new game anywais?</h3>
      </NeGameGrid>
      <Button
        variant="contained"
        color="primary"
        className={classes.left}
        onClick={backToActiveGame}
      >
        No
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.right}
        onClick={startNewGame}
      >
        Let`s play
      </Button>
    </div>
  );
}

export default ViewNewGameWarning;

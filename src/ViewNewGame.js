import React, { Component, useState, useEffect } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { withTranslation, Trans } from "react-i18next";
import { ValidatorForm } from "react-material-ui-form-validator";

const NeGameGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr;
`;

const PlayerDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding: 5px;
`;

const NewPlayerButtonDiv = styled.div`
  display: grid;
  justify-items: center;
`;

function ViewNewGame(props) {
  const [playersList, setPlayersList] = useState([
    { name: "", id: 1 },
    { name: "", id: 2 },
  ]);

  const useStyles = makeStyles((theme) => ({
    fab: {
      position: "absolute",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    textInput: {
      width: "100%",
    },
  }));

  const classes = useStyles();

  const newPlayer = () => {
    var newId = Math.max(...playersList.map((player) => player.id)) + 1;

    setPlayersList([...playersList, { name: "", id: newId }]);
  };

  const handleChange = (event) => {
    var list = playersList;
    Object.keys(list).forEach((key) => {
      let input = list[key];
      if (input.id == event.target.name) {
        input.name = event.target.value;
      }
    });
    setPlayersList([...playersList]);
  };

  const handleSubmit = (event) => {
    props.startNewGame(playersList);
  };

  return (
    <div>
      <ValidatorForm
        onSubmit={handleSubmit}
        onError={(errors) => console.log(errors)}
      >
        <NeGameGrid>
          {playersList.map((player) => (
            <PlayerDiv key={player.id}>
              <h3>
                <Trans>generic.player</Trans> {player.id}:
              </h3>
              <TextField
                className={classes.textInput}
                name={player.id}
                value={player.name}
                onChange={handleChange}
                required
                label="Name"
                variant="outlined"
              />
            </PlayerDiv>
          ))}
          <NewPlayerButtonDiv>
            <Button
              className={classes.newPlayer}
              variant="contained"
              color="primary"
              onClick={newPlayer}
            >
              <Trans>newGame.addPlayer</Trans>
            </Button>
          </NewPlayerButtonDiv>
        </NeGameGrid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.fab}
        >
          <Trans>generic.letsPlay</Trans>
        </Button>
      </ValidatorForm>
    </div>
  );
}

export default ViewNewGame;

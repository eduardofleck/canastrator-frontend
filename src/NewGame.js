import React, { Component, useState, useEffect } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

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

function NewGame(props) {
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

  const startNewGame = (event) => {
    props.startNewGame(playersList);
  };

  return (
    <div>
      <NeGameGrid>
        {playersList.map((player) => (
          <PlayerDiv key={player.id}>
            <h3>Player {player.id} Name:</h3>
            <TextField
              name={player.id}
              value={player.name}
              onChange={handleChange}
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
            Add Player
          </Button>
        </NewPlayerButtonDiv>
      </NeGameGrid>
      <Button
        variant="contained"
        color="primary"
        className={classes.fab}
        onClick={startNewGame}
      >
        Let`s play
      </Button>
    </div>
  );
}

export default NewGame;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const NewRoundScoresGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr;
`;

const Score = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding: 5px;
`;

function NewRoundScores(props) {
  const [inputList, setInputList] = useState([
    { playerId: "", playerValue: "" },
  ]);

  const useStyles = makeStyles((theme) => ({
    fab: {
      position: "absolute",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  useEffect(() => {
    var playersState = [];
    props.game.players.forEach((player) => {
      playersState.push({
        playerId: player.id,
        playerName: player.name,
        playerScore: null,
      });
    });
    setInputList(playersState);
  }, [props.game.players]);

  const saveNewRound = () => {
    console.log("save");
    props.saveNewRound(inputList);
  };

  const handleChange = (event) => {
    var list = inputList;
    Object.keys(list).forEach((key) => {
      let input = list[key];
      if (input.playerId == event.target.name) {
        input.playerScore = event.target.value;
      }
    });
    setInputList(list);
  };

  return (
    <div>
      <NewRoundScoresGrid>
        {inputList.map((player) => (
          <Score key={player.playerId}>
            <h3>{player.playerName}</h3>
            <TextField
              name={player.playerId}
              value={player.playerScore}
              onChange={handleChange}
              label="Score"
              variant="outlined"
            />
          </Score>
        ))}
      </NewRoundScoresGrid>
      <Button
        variant="contained"
        color="primary"
        className={classes.fab}
        onClick={saveNewRound}
      >
        Save
      </Button>
    </div>
  );
}

export default NewRoundScores;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { withTranslation, Trans } from "react-i18next";
import { ValidatorForm } from "react-material-ui-form-validator";

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

function ViewNewRoundScores(props) {
  const [inputList, setInputList] = useState([
    { playerId: "", playerValue: "" },
  ]);

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
    textInput: {
      width: "100%",
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

  const handleSubmit = () => {
    props.saveNewRound(inputList);
  };

  const closeView = () => {
    props.closeView();
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
      <ValidatorForm
        onSubmit={handleSubmit}
        onError={(errors) => console.log(errors)}
      >
        <NewRoundScoresGrid>
          {inputList.map((player) => (
            <Score key={player.playerId}>
              <h3>{player.playerName}</h3>
              <TextField
                className={classes.textInput}
                name={player.playerId}
                value={player.playerScore}
                required
                type="number"
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
          className={classes.left}
          onClick={closeView}
        >
          <Trans>generic.close</Trans>
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.right}
        >
          <Trans>generic.save</Trans>
        </Button>
      </ValidatorForm>
    </div>
  );
}

export default ViewNewRoundScores;

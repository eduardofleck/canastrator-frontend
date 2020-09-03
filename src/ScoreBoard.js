import React, { Component } from "react";
import styled from "styled-components";
import ScoreLine from "./ScoreLine";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const ScoreBoardGrid = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template: 1fr;
`;

const TeamsHeader = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr;
  justify-content: center;
  justify-items: center;
  border-bottom: 1px solid #dfdfdf;
`;

const Board = styled.div`
  display: grid;
  width: 100%;
  justify-content: center;
  justify-items: center;
  grid-column: -1 /1;
  grid-template-columns: 1fr 1fr;
`;

function ScoreBoard(props) {
  const useStyles = makeStyles((theme) => ({
    fab: {
      position: "absolute",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  const newRound = (e) => {
    props.newRound();
  };

  return (
    <div>
      <ScoreBoardGrid>
        {props.game.players.map((player) => (
          <div key={player.id}>
            <TeamsHeader>
              <h2>{player.name}</h2>
            </TeamsHeader>
            <ScoreLine player={player}></ScoreLine>
          </div>
        ))}
      </ScoreBoardGrid>
      <Fab
        className={classes.fab}
        size="small"
        color="secondary"
        aria-label="add"
        onClick={newRound}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}

export default ScoreBoard;

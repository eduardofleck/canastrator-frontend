import React, { Component } from "react";
import styled from "styled-components";

const Score = styled.div`
  display: grid;
  border-top: 1px solid #dfdfdf;
  width: 100%;
  justify-content: center;
  justify-items: center;
  font-size: 22px;
`;

const ScoreBold = styled.div`
  display: grid;
  border-top: 1px solid #dfdfdf;
  width: 100%;
  justify-content: center;
  justify-items: center;
  font-weight: bold;
  font-size: 22px;
`;

const ScoreTotalBold = styled.div`
  display: grid;
  border-top: 1px solid black;
  width: 100%;
  justify-content: center;
  justify-items: center;
  font-weight: bold;
  font-size: 22px;
`;

const ScoreTotal = styled.div`
  display: grid;
  border-top: 1px solid black;
  width: 100%;
  justify-content: center;
  justify-items: center;
  font-size: 22px;
`;

class ScoreLine extends Component {
  getWinner(player, score) {
    if (score.roundWinner) {
      return (
        <ScoreBold key={player.id + "_" + score.round}>{score.score}</ScoreBold>
      );
    } else {
      return <Score key={player.id + "_" + score.round}>{score.score}</Score>;
    }
  }

  getPlayerWinner(player) {
    if (player.gameWinner) {
      return (
        <ScoreTotalBold key={player.id + "_winner"}>
          {player.playerTotal}
        </ScoreTotalBold>
      );
    } else {
      return (
        <ScoreTotal key={player.id + "_loser"}>{player.playerTotal}</ScoreTotal>
      );
    }
  }

  render() {
    return (
      <div>
        {(this.props.player.scores || []).map((score) =>
          this.getWinner(this.props.player, score)
        )}
        {this.getPlayerWinner(this.props.player)}
      </div>
    );
  }
}

export default ScoreLine;

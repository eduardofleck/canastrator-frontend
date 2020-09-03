import React from "react";
import "./App.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import ScoreBoard from "./ScoreBoard";
import NewGame from "./NewGame";
import axios from "axios";
import NewRoundScores from "./NewRoundScores";

function App() {
  const [game, setGame] = React.useState({
    players: [],
    name: "",
  });

  const [appView, setAppView] = React.useState("game");

  const loadGame = (e) => {
    console.log("Load game");
    setAppView("game");
    axios.get(`http://localhost:1337/game/full/1`).then((res) => {
      console.log(res);
      setGame(res.data);
    });
  };

  const newGame = (e) => {
    setAppView("newGame");
  };

  const newRound = (e) => {
    setAppView("newRound");
  };

  const startNewGame = (newPlayers) => {
    var players = [];
    newPlayers.forEach((player) => {
      players.push({
        name: player.name,
      });
    });

    var newGame = {
      game: {
        name: "This is a new game",
        players,
      },
    };

    console.log(newGame);

    axios.post(`http://localhost:1337/game/new-game`, newGame).then((res) => {
      console.log(res);
      setGame(res.data);
      setAppView("game");
    });
  };

  const saveNewRound = (round) => {
    console.log(round);

    var scores = [];
    round.forEach((roundScore) => {
      scores.push({
        player: roundScore.playerId,
        score: roundScore.playerScore,
      });
    });

    var newRound = {
      round: {
        game: game.id,
        scores,
      },
    };

    console.log(newRound);

    axios.post(`http://localhost:1337/game/new-round`, newRound).then((res) => {
      console.log(res);
      setGame(res.data);
      setAppView("game");
    });
  };

  const gameGrid = () => {
    if (appView === "newGame") {
      return <NewGame startNewGame={startNewGame}></NewGame>;
    } else if (appView === "newRound") {
      return (
        <NewRoundScores
          game={game}
          saveNewRound={saveNewRound}
        ></NewRoundScores>
      );
    } else if (appView === "game") {
      return <ScoreBoard game={game} newRound={newRound}></ScoreBoard>;
    }
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button onClick={newGame} color="inherit">
            New Game
          </Button>
          <Button onClick={loadGame} color="inherit">
            Load game
          </Button>
        </Toolbar>
      </AppBar>
      <div>{gameGrid()}</div>
    </div>
  );
}

export default App;

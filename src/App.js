import React, { useState, useEffect } from "react";
import "./App.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import axios from "axios";
import ScoreBoard from "./ScoreBoard";
import NewGame from "./NewGame";
import NewGameWarning from "./NewGameWarning";
import NewRoundScores from "./NewRoundScores";
import ShareGame from "./ShareGame";

function App() {
  const [game, setGame] = useState({
    players: [],
    name: "",
  });

  const [appView, setAppView] = useState("game");

  useEffect(() => {
    if (window.location.pathname) {
      //Validates if is token?
      loadGame(window.location.pathname.replace("/", ""));
    }
  }, []);

  const loadGame = (token) => {
    console.log(token);
    setAppView("game");
    axios.get(`/game/full/${token}`).then((res) => {
      console.log(res);
      setGame(res.data);
      addTokenUrl(res.data.token);
    });
  };

  const addTokenUrl = (token) => {
    var refresh =
      window.location.protocol + "//" + window.location.host + "/" + token;

    window.history.pushState({ path: refresh }, "", refresh);
  };

  const newGame = (e) => {
    setAppView("newGame");
  };

  const newGameWarning = (e) => {
    setGame(null);
    setAppView("newGame");
  };

  const shareGame = (e) => {
    setAppView("shareGame");
  };

  const newRound = (e) => {
    setAppView("newRound");
  };

  const setGameView = (e) => {
    setAppView("game");
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

    axios.post(`/game/new-game`, newGame).then((res) => {
      console.log(res);
      setGame(res.data);
      addTokenUrl(res.data.token);
      setGameView();
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

    axios.post(`/game/new-round`, newRound).then((res) => {
      console.log(res);
      setGame(res.data);
      setGameView(null);
    });
  };

  const gameGrid = () => {
    if (appView === "shareGame") {
      var url =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname;
      return <ShareGame url={url} closeView={setGameView}></ShareGame>;
    }
    if (appView === "newGame") {
      if (game) {
        return (
          <NewGameWarning
            backToActiveGame={setGameView}
            startNewGame={newGameWarning}
          ></NewGameWarning>
        );
      } else {
        return (
          <NewGame
            game={game}
            startNewGame={startNewGame}
            closeView={setGameView}
          ></NewGame>
        );
      }
    } else if (appView === "newRound") {
      return (
        <NewRoundScores
          game={game}
          saveNewRound={saveNewRound}
          closeView={setGameView}
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
          <Button onClick={shareGame} color="inherit">
            Share Game
          </Button>
        </Toolbar>
      </AppBar>
      <div>{gameGrid()}</div>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import "./App.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import axios from "axios";
import ScoreBoard from "./ScoreBoard";
import ViewNewGame from "./ViewNewGame";
import ViewNewGameWarning from "./ViewNewGameWarning";
import ViewNewRoundScores from "./ViewNewRoundScores";
import ViewShareGame from "./ViewShareGame";
import ViewWelcome from "./ViewWelcome";

function App() {
  const [game, setGame] = useState({
    players: [],
    name: "",
  });

  const [appView, setAppView] = useState("game");

  useEffect(() => {
    if (window.location.pathname.replace("/", "") != "") {
      //Validates if is token?
      loadGame(window.location.pathname.replace("/", ""));
    } else {
      setAppView("welcome");
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
    if (appView === "welcome") {
      return <ViewWelcome startNewGame={newGame}></ViewWelcome>;
    } else if (appView === "shareGame") {
      var url =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname;
      return <ViewShareGame url={url} closeView={setGameView}></ViewShareGame>;
    }
    if (appView === "newGame") {
      if (game.token) {
        return (
          <ViewNewGameWarning
            backToActiveGame={setGameView}
            startNewGame={newGameWarning}
          ></ViewNewGameWarning>
        );
      } else {
        return (
          <ViewNewGame
            game={game}
            startNewGame={startNewGame}
            closeView={setGameView}
          ></ViewNewGame>
        );
      }
    } else if (appView === "newRound") {
      return (
        <ViewNewRoundScores
          game={game}
          saveNewRound={saveNewRound}
          closeView={setGameView}
        ></ViewNewRoundScores>
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

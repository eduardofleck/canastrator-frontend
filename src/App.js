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
import { withTranslation, Trans } from "react-i18next";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import styled from "styled-components";
import flagBR from "./images/flagBR.png";
import flagUK from "./images/flagUK.png";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const Flag = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 32px;
`;

function App(props) {
  const [game, setGame] = useState({
    players: [],
    name: "",
  });

  const [appView, setAppView] = useState("game");

  const [language, setLanguage] = useState("en");

  const useStyles = makeStyles((theme) => ({
    absoluteRight: {
      position: "absolute",
      right: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  useEffect(() => {
    if (window.location.pathname.replace("/", "") != "") {
      //Validates if is token?
      loadGame(window.location.pathname.replace("/", ""));
    } else {
      setAppView("welcome");
    }
    setLanguage(props.i18n.language);
  }, []);

  const loadGame = (token) => {
    setAppView("game");
    axios.get(`/game/full/${token}`).then((res) => {
      setGame(res.data);
      addTokenUrl(res.data.token);
    });
  };

  const addTokenUrl = (token) => {
    var refresh =
      window.location.protocol + "//" + window.location.host + "/" + token;

    if (window.location.search) refresh = refresh + window.location.search;

    window.history.pushState({ path: refresh }, "", refresh);
  };

  const onLanguageChange = (e) => {
    let newLang = e.target.value;
    console.log("language set:", newLang);
    setLanguage(newLang);
    props.i18n.changeLanguage(newLang);
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

    axios.post(`/game/new-game`, newGame).then((res) => {
      setGame(res.data);
      addTokenUrl(res.data.token);
      setGameView();
    });
  };

  const saveNewRound = (round) => {
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
      setGame(res.data);
      setGameView(null);
    });
  };

  const gameGrid = () => {
    if (appView === "welcome") {
      return <ViewWelcome startNewGame={newGame}></ViewWelcome>;
    } else if (appView === "shareGame") {
      return (
        <ViewShareGame
          url={window.location.href}
          closeView={setGameView}
        ></ViewShareGame>
      );
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
            <Trans>menu.newGame</Trans>
          </Button>
          <Button onClick={shareGame} color="inherit">
            <Trans>menu.shareGame</Trans>
          </Button>
          <Select
            className={classes.absoluteRight}
            variant="outlined"
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            value={language}
            onChange={onLanguageChange}
          >
            <MenuItem value="en">
              <Flag src={flagUK} />
            </MenuItem>
            <MenuItem value="pt">
              <Flag src={flagBR} />
            </MenuItem>
          </Select>
        </Toolbar>
      </AppBar>
      <div>{gameGrid()}</div>
    </div>
  );
}

export default withTranslation()(App);

import React, { Component, useState, useEffect } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import QRCode from "qrcode";

const ShareGameGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr;
`;

const ButtonCopyUrl = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding: 5px;
  justify-content: center;
  justify-items: center;
`;

function ShareGame(props) {
  const [qrCodeData, setQrCodeData] = useState("");

  useEffect(() => {
    QRCode.toDataURL(props.url, { margin: 1 })
      .then((imageBase64) => {
        setQrCodeData(imageBase64);
      })
      .catch((err) => {
        console.log("Erro");
      });
  }, []);

  const closeView = (event) => {
    props.closeView();
  };

  const useStyles = makeStyles((theme) => ({
    fab: {
      position: "absolute",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <ShareGameGrid>
        <ButtonCopyUrl>
          <h1>Share this game</h1>
          <h2>Point your cellphone camera to this QRCode</h2>
          <img src={qrCodeData} className="card-img-top" alt="Game QRCode" />
          <h2>or copy the URL and share</h2>
          <Button variant="contained" color="primary">
            Copy URL
          </Button>
        </ButtonCopyUrl>
      </ShareGameGrid>
      <Button
        variant="contained"
        color="primary"
        className={classes.fab}
        onClick={closeView}
      >
        Close
      </Button>
    </div>
  );
}

export default ShareGame;

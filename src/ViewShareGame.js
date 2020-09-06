import React, { Component, useState, useEffect } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import QRCode from "qrcode";
import { withTranslation, Trans } from "react-i18next";

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

function ViewShareGame(props) {
  const [qrCodeData, setQrCodeData] = useState("");

  useEffect(() => {
    QRCode.toDataURL(props.url, { margin: 1 })
      .then((imageBase64) => {
        setQrCodeData(imageBase64);
      })
      .catch((err) => {
        console.log("Error creating QRCode: ", err);
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
          <h1>
            <Trans>share.shareThisGame</Trans>
          </h1>
          <h2>
            <Trans>share.pointCellQRCode</Trans>
          </h2>
          <img src={qrCodeData} className="card-img-top" alt="Game QRCode" />
          <h2>
            <Trans>share.copyURLAndShare</Trans>
          </h2>
          <Button variant="contained" color="primary">
            <Trans>share.copyURL</Trans>
          </Button>
        </ButtonCopyUrl>
      </ShareGameGrid>
      <Button
        variant="contained"
        color="primary"
        className={classes.fab}
        onClick={closeView}
      >
        <Trans>generic.close</Trans>
      </Button>
    </div>
  );
}

export default ViewShareGame;

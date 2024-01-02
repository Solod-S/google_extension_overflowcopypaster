import React from 'react';
import logo from '../../assets/img/logo.jpeg';
import './Popup.css';

const Popup = () => {
  return (
    <>
      <h2>Stackoverflow saver</h2>
      <img src={logo} alt="Staleks Tools Logo" width="80%" />

      <p>
        This application is designed to help you efficiently save code snippets,
        titles, and links from Stack Overflow directly to your Google Sheets.
      </p>
      <b></b>
      <p>
        Check out the project on GitHub:
        <a
          href="https://github.com/Solod-S/google_extension_overflowcopypaster"
          target="_blank"
          rel="noreferrer"
        >
          Staleks Tools on GitHub
        </a>
      </p>
    </>
  );
};

export default Popup;

import React, { useState } from 'react';
// import logo from '../../assets/img/logo.jpeg';
import Lottie from 'react-lottie';
import secrets from 'secrets';
import './Popup.css';
import animationData from '../../assets/img/animation_logo.json';
import useChromeStorage from '../Content/hooks/useChromeStorage';
const { docExempleUrl, imgExempleURL, sheetsEditor } = secrets;

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const Popup = () => {
  const [copied, setCopied] = useState(false);
  const [
    googleSheetsUrl,
    setGoogleSheetsUrl,
    { loading: googleSheetsUrlLoading },
  ] = useChromeStorage('google-sheets-url', '');

  const handleCopyButtonClick = () => {
    const textarea = document.createElement('textarea');
    textarea.value = sheetsEditor;
    document.body.appendChild(textarea);

    textarea.select();
    document.execCommand('copy');

    document.body.removeChild(textarea);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <>
      <h2>How to use?</h2>
      {/* <img src={logo} alt="Staleks Tools Logo" width="80%" /> */}
      <Lottie options={defaultOptions} height={100} width={100} />
      <ol>
        <li>
          Create a Google spreadsheet based on the{' '}
          <a href={docExempleUrl} target="_blank" rel="noreferrer">
            sample
          </a>{' '}
          (
          <a href={imgExempleURL} target="_blank" rel="noreferrer">
            img discriptions
          </a>
          )
        </li>
        <li>
          Add user + give him editor permission{' '}
          <button onClick={handleCopyButtonClick}>Copy user</button>
        </li>

        <li>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label
              htmlFor="url"
              style={{
                marginBottom: '4px',
              }}
            >
              Enter your Google spreadsheet url
            </label>
            <input
              type="text"
              id="url"
              placeholder="https://docs..."
              value={googleSheetsUrl}
              disabled={googleSheetsUrlLoading}
              onChange={(e) => {
                setGoogleSheetsUrl(e.target.value);
              }}
            />
            {copied && (
              <span
                style={{
                  color: '#F48024',
                  display: 'block',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  position: 'absolute',
                  bottom: '10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}
              >
                Copied to clipboard!
              </span>
            )}
          </div>
        </li>
      </ol>
    </>
  );
};

export default Popup;

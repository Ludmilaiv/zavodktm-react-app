import { Html5Qrcode } from 'html5-qrcode';
import { useEffect } from 'react';
import { useState } from 'react';

const qrcodeRegionId = "html5qr-code-full-region";

// Creates the configuration object for Html5QrcodeScanner.
const createConfig = (props) => {

  let config = {};
  if (props.fps) {
    config.fps = props.fps;
  }
  if (props.qrbox) {
    config.qrbox = props.qrbox;
  }
  if (props.aspectRatio) {
    config.aspectRatio = props.aspectRatio;
  }
  if (props.disableFlip !== undefined) {
    config.disableFlip = props.disableFlip;
  }
  return config;
};

const QrScaner = (props) => {

  useEffect(() => {
    const config = createConfig(props);
    const html5Qrcode = new Html5Qrcode(qrcodeRegionId);
    if (props.enabled)
    html5Qrcode.start({ facingMode: "environment" }, config, 
        (res) => {props.qrCodeSuccessCallback(res);
          html5Qrcode.pause();
          props.setEnabled(false)})

    // cleanup function when component will unmount
    return () => {
      if (html5Qrcode && html5Qrcode.isScanning) html5Qrcode.stop();
    };
  }, [props.enabled]);

  return (
    <>
      <div className='form__absolut' style={{display: props.enabled ? 'block' : 'none' }}>
        <div id={qrcodeRegionId}>

        </div>
      </div>
    </>
  );
};

export default QrScaner;
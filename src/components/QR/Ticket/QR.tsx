import QRCode from 'qrcode.react';
import { renderToStaticMarkup } from 'react-dom/server';
import { useLocation } from 'react-router-dom';


const MyComponent = () => {
  const location = useLocation();
  const qrResponse = location.state?.qrResponse;
  const qrValue = qrResponse?.qrData;

  const getQrCodeDataURL = (value: string) => {
    const canvas = document.createElement('canvas');
    const qrCodeElement = <QRCode value={value} />;
    const qrCodeSize = qrCodeElement.props.size || 200; // Adjust the default size if needed
    canvas.width = qrCodeSize;
    canvas.height = qrCodeSize;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#FFFFFF'; // Set the background color
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const svgString = renderToStaticMarkup(qrCodeElement);
      const img = new Image();
      img.src = `data:image/svg+xml;base64,${btoa(svgString)}`;
      img.onload = () => ctx.drawImage(img, 0, 0);
    }
    return canvas.toDataURL('image/png');
  };

  return (
    <div>
      <QRCode value={qrValue} size={256} bgColor="#ffffff" fgColor="#000000" level="H" includeMargin={true} />

      {qrValue ? (
        <QRCode value={qrValue} size={256} bgColor="#ffffff" fgColor="#000000" level="H" includeMargin={true} />
      ) : (
        <p>Loading QR code...</p>
      )}

      <img src={getQrCodeDataURL(qrValue)} alt="QR Code" />
      <h2>Payment Completion</h2>
      <p>Departure Point: {qrResponse?.departurePoint}</p>
      <p>Arrival Point: {qrResponse?.arrivalPoint}</p>
      <p>Status: {qrResponse?.status == 1 ? "Valid" : "Invalid"}</p>
    </div>
  );
};

export default MyComponent;
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import PropTypes from 'prop-types';

const QRCodeCard = ({ reservationId, titre, date, lieu }) => {
  const qrValue = `guideafrica://reservation/${reservationId}`;

  return (
    <div className="qr-code-card">
      <h3>QR Code Réservation</h3>
      <QRCodeSVG
        value={qrValue}
        size={180}
        bgColor="transparent"
        fgColor="#C9A84C"
        level="M"
        includeMargin={false}
      />
      <div style={{ marginTop: 16, color: 'var(--ivory-muted)', fontSize: '0.85rem' }}>
        <div style={{ fontWeight: 600, color: 'var(--ivory)' }}>{titre}</div>
        {date && <div style={{ marginTop: 4 }}>{date}</div>}
        {lieu && <div>{lieu}</div>}
      </div>
      <div style={{ marginTop: 12, fontSize: '0.7rem', color: 'var(--ivory-subtle)' }}>
        Présentez ce code à votre arrivée
      </div>
    </div>
  );
};

QRCodeCard.propTypes = {
  data: PropTypes.string,
  size: PropTypes.number,
};

export default QRCodeCard;

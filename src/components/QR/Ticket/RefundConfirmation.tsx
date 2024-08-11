import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import Utils from '../../Utils';
import { Button, Spinner } from 'react-bootstrap';
import { QRRefundDataProps } from '../../../services/types';
import { ApiMethod, postDataByParams } from '../../../services/ApiUtils';
import { useNavigate } from 'react-router-dom';

interface RefundConfirmationProps extends QRRefundDataProps {
  handleCloseQRPopup: () => void; // Define handleCloseQRPopup as a prop
}

const RefundConfirmation: React.FC<RefundConfirmationProps> = ({
  qrData,
  handleCloseQRPopup, // Destructure handleCloseQRPopup from props
}) => {
  const statusLabel = Utils.getStatusLabel(qrData.status);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const refundTicket = async () => {   
    setLoading(true)
    try {
      const response = await postDataByParams(ApiMethod.REFUND, {
        paymentIntentId: qrData.paymentRefNo,
        serialNumber: qrData.serialNumber,
        amount: qrData.amount,
      },
      {
        headers: { "Content-Type": "application/json" }
      });
      setLoading(false)
      handleCloseQRPopup(); // Call the handleCloseQRPopup function on successful refund
    } catch (error) {
      console.error("Error refund:", error);
    }
  };

  return (
    <div>
      <div>Serial Number: {qrData.serialNumber}</div>
      <div>Status: {statusLabel}</div>
      <div>Refund Amount: {qrData.amount}$</div>
      <div>Payment Ref No: {qrData.paymentRefNo}</div>
      <br></br>
      <div>
        {loading ? (
          <Button variant="primary" type="button" className="w-100 mb-3" disabled>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
          </Button>
        ) : (
          <Button
            variant="primary"
            type="button"
            className="w-100 mb-3"
            onClick={refundTicket}
          >
            Confirm
          </Button>
        )}
      </div>
    </div>
  );
};

export default RefundConfirmation;
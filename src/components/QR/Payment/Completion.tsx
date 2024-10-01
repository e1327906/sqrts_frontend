import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../../Layout';
import { ApiMethod, postDataByParams } from '../../../services/ApiUtils';

const Completion: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  // Convert URLSearchParams to object
  const paramsObj = Object.fromEntries(params.entries());
  const navigate = useNavigate();

  // Now you can access the parameters as a JSON object
  const {
    journeyType,
    groupSize,
    operatorId,
    startDatetime,
    endDatetime,
    departurePoint,
    arrivalPoint,
    paymentRefNo,
    amount,
    currency,
    phoneNo,
    email,
  } = paramsObj;

  const purchaseTicket = async () => {
    try {
      const params = { ...paramsObj };
      const response = await postDataByParams(ApiMethod.PURCHASETICKET, params,
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      const data = response.data;
      navigate('/qr', { state: { qrResponse: data } });
      setLoading(false);
      setSuccess(true);
      // Navigate to Payment component with state
      navigate('/viewQRTickets');
    } catch (error) {
      console.error('Error fetching points:', error);
      setError('An error occurred while processing your request.');
      setLoading(false);
    }
  };

  useEffect(() => {
    purchaseTicket();
  }, []);

  return (
    <Layout>
      <center>
        {loading && <h1>Loading...</h1>}
        {success && <h1>Thank you! 🎉</h1>}
        {error && <h1>Error: {error}</h1>}
      </center>
    </Layout>
  );
};

export default Completion;

import { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import axios, { AxiosError } from 'axios';
import { useLocation } from 'react-router-dom';
import CustomNavbar from '../../CustomNavbar';
import { getSessionUserData } from '../../Utils';
import Layout from '../../Layout';
import { ApiMethod, postDataByParams } from '../../../services/ApiUtils';

const Payment: React.FC = () => {

  const location = useLocation();
  const purchaseTicketRequest = location.state?.purchaseTicketRequest;
  console.info(purchaseTicketRequest);

  const [clientSecret, setClientSecret] = useState('');
  const [paymentIntentId, setPaymentIntentId] = useState(null);
  const [hasFetchedPaymentIntent, setHasFetchedPaymentIntent] = useState(false);

  const stripePromise = loadStripe('pk_test_51O42D0Fcp66ilBOoUKBwbM6SsFcD7PxYFa9DS2TC52LEMcQaRftJvT1r5KrqgUMGF3WujJo3bW33EvCpVp2MMdLL00r06Ele0x');

  //Get session user data
  const sessionUserData = getSessionUserData();
  const [amount, setAmount] = useState<number>(0);

  const fetchFare = async () => {
    try {
      const params = {
        srcStnId: purchaseTicketRequest.departurePoint,
        destStnId: purchaseTicketRequest.arrivalPoint,
        ticketType: purchaseTicketRequest.journeyType,
        journeyType: purchaseTicketRequest.journeyType,
        groupSize: purchaseTicketRequest.groupSize
      };

      const response = await postDataByParams(ApiMethod.GETTRAINFARE,
        params,
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );

      const data = response.data;
      setAmount(data.ResponseData.fare);
      return data.ResponseData.fare; // Return the fare amount for use in fetchPaymentIntent()
    } catch (error) {
      console.error('Error fetching points:', error);
      // Handle the error appropriately, e.g., display an error message to the user
    }
  };

  const fetchPaymentIntent = async (amount: number) => {
    try {
      const response = await postDataByParams(ApiMethod.CREATEPAYMENTINTENT,
        {
          email: sessionUserData?.isAuthenticated ? sessionUserData.email : purchaseTicketRequest.email,
          currency: purchaseTicketRequest.currency,
          allowFutureUsage: true,
          amount: amount * 100
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );

      setClientSecret(response.data.ResponseData.clientSecret);
      setPaymentIntentId(response.data.ResponseData.paymentIntentId);
      purchaseTicketRequest.paymentRefNo = response.data.ResponseData.paymentIntentId;
      purchaseTicketRequest.amount = amount;

    } catch (error) {
      console.error('Error fetching payment intent:', error);
      // Handle error gracefully, e.g., display an error message to the user
    }
  };

  useEffect(() => {
    const fetchDataAndPaymentIntent = async () => {
      const fareAmount = await fetchFare();
      if (fareAmount) {
        fetchPaymentIntent(fareAmount);
      }
    };
    fetchDataAndPaymentIntent();
  }, []);  

  return (
    <Layout>
      <div>
        <center><h3>Payment Confirmation</h3></center>
        {clientSecret && stripePromise && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm purchaseTicketRequest={purchaseTicketRequest} />
          </Elements>
        )}
      </div>
    </Layout>
  );
}

export default Payment;
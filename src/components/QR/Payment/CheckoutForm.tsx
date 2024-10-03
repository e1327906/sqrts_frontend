import { PaymentElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Utils from '../../Utils';
import qs from 'qs';
import { CheckoutProps } from '../../../services/types';


const CheckoutForm: React.FC<CheckoutProps> = ({ purchaseTicketRequest }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | undefined>('');
  const [isProcessing, setIsProcessing] = useState(false);
  //const [amount, setAmount] = useState<number>(0);

  /*const fetchFare = async () => {
    try {

      const params = {
        srcStnId: 1,
        destStnId: 2,
        ticketType: purchaseTicketRequest.journeyType,
        journeyType: purchaseTicketRequest.journeyType,
        groupSize: purchaseTicketRequest.groupSize
      };

      const response = await postDataByParams(ApiMethod.GETTRAINFARE,
        params,
        {
          headers: { "Content-Type": "application/json" }
        }
      );
      const data = response.data;
      setAmount(data.ResponseData.fare);
    } catch (error) {
      console.error('Error fetching points:', error);
      // Handle the error appropriately, e.g., display an error message to the user
    }
  }; 

  useEffect(() => {
    fetchFare();
  }, []);*/

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        //return_url: `${window.location.origin}/completion`,
        return_url: `${window.location.origin}/completion?${qs.stringify(purchaseTicketRequest)}`
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message);
    } else {
      setMessage('An unexpected error occured.');
    }

    setIsProcessing(false);
  };

  return (
      <Form id="payment-form" onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>            
            <Form.Group controlId="formArrivalPoint" className="mb-3">
              <Form.Label>Departure Point : {purchaseTicketRequest.departurePointDes}</Form.Label>
            </Form.Group>
            <Form.Group controlId="formArrivalPoint" className="mb-3">
              <Form.Label>Arrival Point : {purchaseTicketRequest.arrivalPointDes}</Form.Label>
            </Form.Group>
            <Form.Group controlId="formArrivalPoint" className="mb-3">
              <Form.Label>Group Size : {purchaseTicketRequest.groupSize}</Form.Label>
            </Form.Group>
            <Form.Group controlId="formArrivalPoint" className="mb-3">
              <Form.Label>JourneyType : {Utils.getJourneyTypeLabel(purchaseTicketRequest.journeyType)}</Form.Label>
            </Form.Group>
          </Col>
          <Col>
            <PaymentElement id="payment-element" />
            <Button variant="primary" type="submit" className="w-100 mb-3" disabled={isProcessing || !stripe || !elements} id="submit">
              <span id="button-text">
                {isProcessing ? 'Processing ... ' : `Pay now @ $${purchaseTicketRequest.amount}`}
              </span>
            </Button>
          </Col>
        </Row>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </Form>
  );
};

export default CheckoutForm;
import React, { useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { ApiMethod, postDataByParams } from '../../services/ApiUtils';
import { UserProps } from '../../services/types';
import { useNavigate } from 'react-router-dom';

const OTPForm: React.FC<UserProps> = ({ userPropsData }) => {

  const [loading, setLoading] = useState(false);
  const [otpNum, setOtpNum] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isValidateOTP, setIsValidateOTP] = useState(true);
  const [isShow, setIsShow] = useState(false);
  const navigate = useNavigate();

  // Check userPropsData and otpNum values
  console.log('userPropsData:', userPropsData);
  console.log('email:', userPropsData.email);
  console.log('otpNum:', otpNum);

  const validateOtp = async () => {
    setLoading(true);
    setIsShow(true);
    try {
      const params = {
        userName: userPropsData.email,
        emailOrPhone: true,
        otpNum: parseInt(otpNum)
      };
      const response = await postDataByParams(ApiMethod.VALIDATEOTP, params, 
        { headers: { "Content-Type": "application/json" } });

      const data = response.data;
      console.log('ResponseData:', data.ResponseData);

      setIsSuccess(true);

      setTimeout(() => {
        navigate('/home');
      }, 100);

    } catch (error) {
      console.error("Error otp:", error);
      setIsSuccess(false);
      setIsValidateOTP(!isValidateOTP);
    }
    setLoading(false);
  };

  const resendOtp = async () => {
    setLoading(true);
    setIsShow(true);
    try {
      const params = {
        email: userPropsData.email,
        otpNum: parseInt(otpNum)
      };
      const response = await postDataByParams(ApiMethod.VALIDATEOTP, params,
        {
          headers: { "Content-Type": "application/json" }
        });

      const data = response.data;
      console.log('ResponseData:', data.ResponseData);

      setIsSuccess(true);
      setIsValidateOTP(!isValidateOTP);

    } catch (error) {
      console.error("Error otp:", error);
      setIsSuccess(false);
    }
    setLoading(false);
  };

  return (
    <div>      
      <Form.Group controlId="formUsername" className="mb-3">
        <Form.Label>{`Please enter your OTP number which was sent to ${userPropsData.email}`}</Form.Label>
        <Form.Control
          type="number"
          placeholder={`000000`}
          value={otpNum}
          onChange={(e) => setOtpNum(e.target.value)}
          required
        />
      </Form.Group>
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
            onClick={isValidateOTP ? validateOtp : resendOtp}
          >
            {isValidateOTP ? 'Validate OTP' : 'Resend OTP'}
          </Button>
        )}
      </div>

      {!isSuccess && isShow && <div className="alert alert-danger" role="alert">
        {isValidateOTP ? 'Failed to validate OTP' : 'Failed to resend OTP'}</div>}
      {isSuccess && isShow && <div className="alert alert-success" role="alert">
        {isValidateOTP ? 'OTP successfully validated' : 'OTP successfully resent. Please check your email'}</div>}       
    </div>    
  );
};

export default OTPForm;
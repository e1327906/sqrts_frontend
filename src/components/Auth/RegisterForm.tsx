import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Modal, ProgressBar } from 'react-bootstrap';
import { registerUser } from '../../services/ApiUtils';
import OTPForm from './OTPForm';
import { SessionUserData, UserProps } from '../../services/types';

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [usernameError, setUsernameError] = useState<string>('');
  const [phoneNumberError, setPhoneNumberError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [registrationFormError, setRegistrationFormError] =useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const [showOTPPopup, setShowOTPPopup] = useState(false);
  const [userPropsData, setUserPropsData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Function to check password strength
  const checkPasswordStrength = (password: string) => {
    // Define the criteria for a strong password
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // Test the password against the criteria
    return strongPasswordRegex.test(password);
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    // Define the criteria for a valid phone number
    const phoneNumberRegex = /^[8-9]\d{7}$/;
    // Test the phone number against the criteria
    return phoneNumberRegex.test(phoneNumber);
  };

  // Function to validate email format
  const validateEmail = (email: string) => {
    // Define the regex pattern for email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // Test the email against the pattern
    return emailRegex.test(email);
  };

  const validateFields = () => {
    let isValid = true;
    const errors = {
      usernameError: '',
      phoneNumberError: '',
      emailError: '',
      passwordError: '',
      registrationFormError: '',
    };

    if (!username) {
      errors.usernameError = 'Username is required.';
      isValid = false;
    }

    if (!phoneNumber) {
      errors.phoneNumberError = 'Phone number is required.';
      isValid = false;
    } else if (!validatePhoneNumber(phoneNumber)) {
      errors.phoneNumberError =
        'Invalid phone number. Must be 8 digits starting with 8 or 9.';
      isValid = false;
    }

    if (!email) {
      errors.emailError = 'Email is required.';
      isValid = false;
    } else if (!validateEmail(email)) {
      errors.emailError = 'Invalid email format.';
      isValid = false;
    }

    if (!password) {
      errors.passwordError = 'Password is required.';
      isValid = false;
    } else if (!checkPasswordStrength(password)) {
      errors.passwordError =
        'Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters.';
      isValid = false;
    }

    if (!isValid) {
      errors.registrationFormError = 'Please correct the errors above.';
    }

    setUsernameError(errors.usernameError);
    setPhoneNumberError(errors.phoneNumberError);
    setEmailError(errors.emailError);
    setPasswordError(errors.passwordError);
    setRegistrationFormError(errors.registrationFormError);

    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!validateFields()) {
      setLoading(false);
      return;
    }

    const userData = {
      userName: username,
      phoneNumber,
      email,
      password,
      role: 'ROLE_USER',
    };

    // Initialize sessionUserData as a SessionUserData object
    const sessionUserData: SessionUserData = {
      email: email,
      userName: '',
      role: 'ROLE_USER',
      phoneNumber: '',
      userId: '',
      accessToken: '',
      refreshToken: '',
      isAuthenticated: true,
    };

    const userProps: UserProps = {
      userPropsData: {
        userName: username,
        phoneNumber: phoneNumber,
        email: email,
        password: password,
        role: 'ROLE_USER',
      },
    };

    try {
      const data = await registerUser(userData);
      const { accessToken, refreshToken, userName, email, role } = data;
      sessionUserData.accessToken = accessToken;
      sessionUserData.refreshToken = refreshToken;
      sessionUserData.userName = userName;
      sessionUserData.email = email;
      sessionUserData.role = role;
      localStorage.setItem('sessionUserData', JSON.stringify(sessionUserData));

      setSuccess(true);
      setRegistrationFormError('');
      showOTPDialogBox(userProps.userPropsData);
    } catch (error) {
      console.error(error);
      setRegistrationFormError('Registration failed. Please try again.'); // TODO: Update error message based on actual API error response
      setSuccess(false);
      setUsername('');
      setPhoneNumber('');
      setEmail('');
      setPassword('');
    } finally {
      setLoading(false);
    }
  };

  const handleContinueAsGuest = () => {
    localStorage.setItem('isGuest', 'true');
    navigate('/home', { state: { isAuthenticated: false } });
  };

  const showOTPDialogBox = (userData: any) => {
    setUserPropsData(userData);
    setLoading(false);
    setShowOTPPopup(true);
  };

  const handleCloseQRPopup = () => {
    setShowOTPPopup(false);
  };

  return (
    <Container className="d-flex align-items-center justify-content-center mt-3">
      <Form
        onSubmit={handleSubmit}
        style={{ width: '100%', maxWidth: '330px' }}
      >
        <Form.Group controlId="formUsername" className="mb-3">
          <Form.Label>Name *</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {usernameError && <div className="text-danger">{usernameError}</div>}
        </Form.Group>
        <Form.Group controlId="formContactNumber" className="mb-3">
          <Form.Label>Contact Number *</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter your contact number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          {phoneNumberError && (
            <div className="text-danger">{phoneNumberError}</div>
          )}
        </Form.Group>
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email *</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <div className="text-danger">{emailError}</div>}
        </Form.Group>
        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password *</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {passwordError && <div className="text-danger">{passwordError}</div>}
        </Form.Group>
        {/* <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label className="text-center">{!success && error}</Form.Label>
        </Form.Group> */}
        {loading ? (
          <Button
            variant="primary"
            type="button"
            className="w-100 mb-3"
            disabled
          >
            <ProgressBar animated now={100} />
          </Button>
        ) : (
          <Button variant="primary" type="submit" className="w-100 mb-3">
            Sign Up
          </Button>
        )}

        {registrationFormError && (
          <div className="alert alert-danger" role="alert">
            {registrationFormError}
          </div>
        )}
        {success && (
          <div className="alert alert-success" role="alert">
            Registration successful!
          </div>
        )}
        {/*<Form.Group className="text-muted text-center">
          Already have an account? <a href="/login">Sign in</a>
      </Form.Group> */}
        <Form.Group className="text-muted text-center mt-3">
          Or continue as a{' '}
          <a href="/home" onClick={handleContinueAsGuest}>
            Guest
          </a>
        </Form.Group>
      </Form>

      <Modal show={showOTPPopup} onHide={handleCloseQRPopup}>
        <Modal.Header closeButton>
          <Modal.Title>OTP Verification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {userPropsData && (
            <OTPForm
              userPropsData={userPropsData} // Pass the function as prop
            />
          )}{' '}
          {/* Pass qrData as prop if available */}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default RegisterForm;

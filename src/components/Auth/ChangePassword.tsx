import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Modal, ProgressBar } from 'react-bootstrap';
import { ApiMethod, postDataByParams } from '../../services/ApiUtils';
import Layout from '../Layout';
import { getSessionUserData } from '../Utils';

const ChangePassword: React.FC = () => {
  const [email, setEmail] = useState<string | undefined>('');
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [oldPasswordError, setOldPasswordError] = useState<string>('');
  const [newPasswordError, setNewPasswordError] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const navigate = useNavigate();
  const sessionUserData = getSessionUserData();

  const validatePasswordFields = () => {
    if (newPassword !== confirmPassword) {
      setNewPasswordError('New password and confirm password do not match.');
      return false;
    }

    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!strongPasswordRegex.test(newPassword)) {
      setNewPasswordError(
        'Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters.'
      );
      return false;
    }
    if (!strongPasswordRegex.test(oldPassword)) { // Not really needed, but added for consistency
      setOldPasswordError(
        'Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters.'
      );
      return false;
    }

    setNewPasswordError('');
    setOldPasswordError('');
    return true;
  };

  const passwordChange = async () => {
    if (!validatePasswordFields()) {
      return;
    }

    setLoading(true);
    try {
      const response = await postDataByParams(
        ApiMethod.CHANGEPASSWORD,
        {
          email: email,
          currentPassword: oldPassword,
          newPassword: newPassword,
          confirmationPassword: confirmPassword,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      // Log the specific property
      if (response.data && response.data.ResponseMsg) {
        if (response.data.ResponseMsg === 'Wrong password') setOldPasswordError('Wrong password');
      }

      if (response.status === 200) {
        setLoading(false);
        setShowSuccessPopup(true);
      } else {
        setError('Password change failed. Please try again.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error password change:', error);
      setError('Password change failed. Please try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    const initData = async () => {
      setEmail(sessionUserData?.email);
    };

    initData();
  }, [sessionUserData?.email]);

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
    navigate('/home'); // Navigate to the home page after successful password change
  };

  return (
    <Layout>
      <div>
        <h3 className='text-center mb-3'>Change Password</h3>
        <Container className='d-flex align-items-center justify-content-center'>
          <Form style={{ width: '100%', maxWidth: '330px' }}>
            <Form.Group controlId='formEmail' className='mb-3'>
              <Form.Label>Email *</Form.Label>
              <Form.Control
                type='email'
                placeholder='Your email'
                value={email}
                readOnly
              />
            </Form.Group>
            <Form.Group controlId='formOldPassword' className='mb-3'>
              <Form.Label>Old Password *</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter Old Password'
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
              {oldPasswordError && (
                <div className='text-danger'>{oldPasswordError}</div>
              )}
            </Form.Group>
            <Form.Group controlId='formNewPassword' className='mb-3'>
              <Form.Label>New Password *</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter New Password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              {newPasswordError && (
                <div className='text-danger'>{newPasswordError}</div>
              )}
            </Form.Group>
            <Form.Group controlId='formConfirmPassword' className='mb-3'>
              <Form.Label>Confirm Password *</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {newPasswordError && (
                <div className='text-danger'>{newPasswordError}</div>
              )}
            </Form.Group>

            <div>
              {loading ? (
                <Button
                  variant='primary'
                  type='button'
                  className='w-100 mb-3'
                  disabled
                >
                  <ProgressBar animated now={100} />
                </Button>
              ) : (
                <Button
                  variant='primary'
                  type='button'
                  onClick={passwordChange}
                  className='w-100 mb-3'
                >
                  Confirm
                </Button>
              )}
            </div>
            {error && (
              <div className='alert alert-danger' role='alert'>
                {error}
              </div>
            )}
            {/* {success && <div className='alert alert-success' role='alert'>Password change successful!</div>} */}
          </Form>

          <Modal show={showSuccessPopup} onHide={handleCloseSuccessPopup}>
            <Modal.Header className='alert alert-success' closeButton>
              <Modal.Title>Success</Modal.Title>
            </Modal.Header>
            <Modal.Body>Password change successfully.</Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={handleCloseSuccessPopup}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </div>
    </Layout>
  );
};

export default ChangePassword;

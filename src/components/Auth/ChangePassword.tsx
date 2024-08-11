import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Spinner, Modal } from 'react-bootstrap';
import { ApiMethod, postDataByParams, registerUser } from '../../services/ApiUtils';
import { SessionUserData } from '../../services/types';
import Layout from '../Layout';
import { getSessionUserData } from '../Utils';

const ChangePassword: React.FC = () => {
  const [email, setEmail] = useState<string | undefined>('');
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [passwordError, setPasswordError] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const navigate = useNavigate();
  const sessionUserData = getSessionUserData();

  const passwordChange = async () => {
    setLoading(true)
    try {
      const response = await postDataByParams(ApiMethod.CHANGEPASSWORD, {
        email: email,
        currentPassword: oldPassword,
        newPassword: newPassword,
        confirmationPassword: confirmPassword,
      },
        {
          headers: { "Content-Type": "application/json" }
        });
      setLoading(false)
      setShowSuccessPopup(true);
    } catch (error) {
      console.error("Error password change:", error);
    }
  };

  useEffect(() => {
    const initData = async () => {
      setEmail(sessionUserData?.email);
    };

    initData();
  }, []);

  const handleCloseSuccessPopup = () => {
    window.location.reload(); // Force reload the page
    setShowSuccessPopup(false)
  };

  return (
    <Layout>
      <div>
        <h3 className="text-center mb-3">Change Password</h3>
        <Container className="d-flex align-items-center justify-content-center">
          <Form style={{ width: '100%', maxWidth: '330px' }}>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email *</Form.Label>
              <Form.Control
                type="email"
                placeholder="Your email"
                value={email}
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="formOldPassword" className="mb-3">
              <Form.Label>Old Password *</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
              {passwordError && <div className="text-danger">{passwordError}</div>}
            </Form.Group>
            <Form.Group controlId="formNewPassword" className="mb-3">
              <Form.Label>New Password *</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              {passwordError && <div className="text-danger">{passwordError}</div>}
            </Form.Group>
            <Form.Group controlId="formConfirmPassword" className="mb-3">
              <Form.Label>Confirm Password *</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {passwordError && <div className="text-danger">{passwordError}</div>}
            </Form.Group>

            <div>
              {loading ? (
                <Button variant="primary" type="button" className="w-100 mb-3" disabled>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                </Button>
              ) : (
                <Button variant="primary" type="button" onClick={passwordChange} className="w-100 mb-3">
                  Confirm
                </Button>
              )}
            </div>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            {success && <div className="alert alert-success" role="alert">Password change successful!</div>}
          </Form>

          <Modal show={showSuccessPopup} onHide={handleCloseSuccessPopup}>
            <Modal.Header className="alert alert-success" closeButton>
              <Modal.Title>Success</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Password change successfully.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseSuccessPopup}>
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
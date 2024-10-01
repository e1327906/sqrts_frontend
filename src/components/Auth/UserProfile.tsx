import React from 'react';
import { Container, Table } from 'react-bootstrap';
import { getSessionUserData } from '../Utils';
import Layout from '../Layout';

const UserProfile: React.FC = () => {

  //Get session user data
  const sessionUserData = getSessionUserData();

  return (
    <Layout>
      <div>
        <h3 className="text-center mb-3">User Profile</h3>
        <Container className="d-flex align-items-center justify-content-center">
          <Table style={{ width: '100%', maxWidth: '500px' }}>
            <tbody>
              <tr>
                <td><strong>Email</strong></td>
                <td className="ms-5">{sessionUserData?.email}</td>
              </tr>
              <tr>
                <td><strong>Name</strong></td>
                <td className="ms-5">{sessionUserData?.userName}</td>
              </tr>
              <tr>
                <td><strong>Role</strong></td>
                <td className="ms-5">{sessionUserData?.role}</td>
              </tr>
              <tr>
                <td><strong>Password</strong></td>
                <td className="ms-5">******</td>
              </tr>
              <tr>
                <td><strong>Contact Number</strong></td>
                <td className="ms-5">{sessionUserData?.phoneNumber}</td>
              </tr>
            </tbody>
          </Table>
        </Container>

      </div>
    </Layout>
  );
};

export default UserProfile;
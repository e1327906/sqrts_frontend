import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Pagination } from 'react-bootstrap';
import QRCodeGenerator from './QRCodeGenerator';
import Utils, { getSessionUserData } from '../../Utils';
import Layout from '../../Layout';
import { ApiMethod, fetchDataByParam } from '../../../services/ApiUtils';

const ViewQRTickets: React.FC = () => {

  const [qrDataList, setQRDataList] = useState<any[]>([]);
  const [showQRPopup, setShowQRPopup] = useState(false);
  const [selectedQRData, setSelectedQRData] = useState<any>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // You can adjust the number of items per page as needed

  //Get session user data
  const sessionUserData = getSessionUserData();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          email: sessionUserData?.email
        };

        const response = await fetchDataByParam(ApiMethod.GETTICKETS, {
          params
        });

        setQRDataList(response.data.ResponseData); // Set the entire response data

      } catch (error) {
        console.error("Error fetching QR tickets:", error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = qrDataList.slice(indexOfFirstItem, indexOfLastItem);

  const handleCloseQRPopup = () => {
    setShowQRPopup(false);
  };

  const handleViewTicket = (qrData: any) => {
    setSelectedQRData(qrData);
    setShowQRPopup(true);
  };

  return (
    <Layout>
      <div>
        <h3 className="text-center mb-3">View Ticket</h3>
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '30vh' }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Serial Number</th>
                <th>Payment Ref Number</th>
                <th>Departure Point</th>
                <th>Arrival Point</th>
                <th>Status</th>
                <th>Effective Datetime</th>
                <th>Journey Type</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((qrData, index) => (
                <tr key={index}>
                  <td>{qrData.serialNumber}</td>
                  <td>{qrData.paymentRefNo}</td>
                  <td>{qrData.departurePointDes}</td>
                  <td>{qrData.arrivalPointDes}</td>
                  <td>
                    <span className={qrData.status === 1 ? "badge bg-success" : "badge bg-secondary"}>
                      {Utils.getStatusLabel(qrData.status)}
                    </span>
                  </td>
                  <td>{Utils.millisecondsToDateyyyyMMdd(qrData.effectiveDatetime)}</td>
                  <td>{Utils.getJourneyTypeLabel(qrData.journeyType)}</td>
                  <td>
                    {qrData.status === 1 &&
                      <Button
                        variant="primary"
                        type="submit"
                        className="w-100"
                        onClick={() => handleViewTicket(qrData)}
                      >
                        View Ticket
                      </Button>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={7}>
                  <Pagination className="d-flex justify-content-center">
                    <Pagination.Prev disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} />
                    {Array.from({ length: Math.ceil(qrDataList.length / itemsPerPage) }, (_, index) => (
                      <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => setCurrentPage(index + 1)}>
                        {index + 1}
                      </Pagination.Item>
                    ))}
                    <Pagination.Next
                      disabled={currentPage === Math.ceil(qrDataList.length / itemsPerPage)}
                      onClick={() => setCurrentPage(currentPage + 1)}
                    />
                  </Pagination>
                </td>
              </tr>
            </tfoot>
          </Table>

          <Modal show={showQRPopup} onHide={handleCloseQRPopup}>
            <Modal.Header closeButton>
              <Modal.Title>QR Code</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedQRData && <QRCodeGenerator qrData={selectedQRData} />} {/* Pass qrData as prop if available */}
            </Modal.Body>
          </Modal>
        </Container>
      </div>
    </Layout>
  );
}
export default ViewQRTickets;

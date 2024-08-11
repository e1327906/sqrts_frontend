import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Table, Pagination } from 'react-bootstrap';
import Layout from '../Layout';
import { ApiMethod, fetchDataWithoutParam } from '../../services/ApiUtils';

const ViewUser: React.FC = () => {
  const navigate = useNavigate();
  const [dataList, setDataList] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // You can adjust the number of items per page as needed

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchDataWithoutParam(ApiMethod.GETUSERS);
        setDataList(response.data.ResponseData); // Set the entire response data

      } catch (error) {
        console.error("Error fetching User:", error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataList.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Layout>
      <div>
        <h3 className="text-center mb-3">View User</h3>
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '30vh' }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>UserName</th>
                <th>PhoneNumber</th>
                <th>Email</th>                
              </tr>
            </thead>
            <tbody>
              {currentItems.map((data, index) => (
                <tr key={index}>
                  <td>{data.userName}</td>
                  <td>{data.phoneNumber}</td>
                  <td>{data.email}</td>                  
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={4}>
                  <Pagination className="d-flex justify-content-center">
                    <Pagination.Prev disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} />
                    {Array.from({ length: Math.ceil(dataList.length / itemsPerPage) }, (_, index) => (
                      <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => setCurrentPage(index + 1)}>
                        {index + 1}
                      </Pagination.Item>
                    ))}
                    <Pagination.Next
                      disabled={currentPage === Math.ceil(dataList.length / itemsPerPage)}
                      onClick={() => setCurrentPage(currentPage + 1)}
                    />
                  </Pagination>
                </td>
              </tr>
            </tfoot>
          </Table>
        </Container>
      </div>
    </Layout>
  );
};

export default ViewUser;
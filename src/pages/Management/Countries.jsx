import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [elementsPerPage, setElementsPerPage] = useState(6);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/countries');
        setCountries(response.data[0].data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (!token) {
      navigate('/Signin');
    } else {
      fetchData();
    }
  }, [token, navigate]);

  const indexOfLastElement = currentPage * elementsPerPage;
  const indexOfFirstElement = indexOfLastElement - elementsPerPage;
  const currentElements = countries.slice(indexOfFirstElement, indexOfLastElement);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Countries
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Flag</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Code</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentElements.map((country) => (
              <TableRow key={country.code}>
                <TableCell>
                  <img src={country.flag} alt={`Flag of ${country.country}`} style={{ width: '30px', height: 'auto' }} />
                </TableCell>
                <TableCell>{country.country}</TableCell>
                <TableCell>{country.code}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


      <div>
        <IconButton>
            <NavigateBeforeIcon onClick={() => handlePageChange(currentPage - 1)} style={{ cursor: 'pointer' }} disabled={currentPage === 1} />
        </IconButton>
        <span>{currentPage}</span>
        <IconButton>
        <NavigateNextIcon onClick={() => handlePageChange(currentPage + 1)} style={{ cursor: 'pointer' }} disabled={indexOfLastElement >= countries.length} />
            </IconButton>
      </div>
    </div>
  );
};

export default Countries;

// DataTable.js

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';

const DataTable = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(20);

  useEffect(() => {
    // Fetch data from your Node.js server
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/getData');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Run once when the component mounts

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (column) => {
    setSortedColumn(column);
    setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
  };

  const filteredData = data.filter(
    (item) =>
      item.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = sortedColumn
    ? [...filteredData].sort((a, b) => {
        const aValue =
          sortedColumn === 'date'
            ? new Date(a.created_at)
            : sortedColumn === 'time'
            ? new Date(a.created_at).toLocaleTimeString()
            : a[sortedColumn];
        const bValue =
          sortedColumn === 'date'
            ? new Date(b.created_at)
            : sortedColumn === 'time'
            ? new Date(b.created_at).toLocaleTimeString()
            : b[sortedColumn];

        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      })
    : filteredData;

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = sortedData.slice(indexOfFirstRecord, indexOfLastRecord);

  function splitDateTime(records) {
    return records.map((record) => {
      const { created_at, ...rest } = record;
      const [date, time] = created_at.split('T'); // Split at 'T' to separate date and time
  
      return {
        ...rest,
        created_date: date,
        created_time: time,
      };
    });
  }
  function convertTimestampTo12HourFormat(timestamp) {
    // Splitting the timestamp into hours, minutes, seconds, and milliseconds
    const [hours, minutes] = timestamp.split(':');
    // Converting hours to 12-hour format and determining AM/PM
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours % 12 || 12).toString();
  
    // Formatting the time in 12-hour format
    const formattedTime = `${formattedHours}:${minutes.padStart(2, '0')} ${ampm}`;
  
    return formattedTime;
}

const timestamp = "15:57:24.780Z";
const formattedTime = convertTimestampTo12HourFormat(timestamp);
console.log(formattedTime);

  
  
  // Example usage
  const updatedRecords = splitDateTime(currentRecords);

  const renderTable = () => (
    <table>
      {/* Table headers */}
      <thead>
        <tr>
          <th onClick={() => handleSort('sno')}>S.No</th>
          <th onClick={() => handleSort('customer_name')}>Customer Name</th>
          <th onClick={() => handleSort('age')}>Age</th>
          <th onClick={() => handleSort('phone')}>Phone</th>
          <th onClick={() => handleSort('location')}>Location</th>
          <th onClick={() => handleSort('date','asc')}>Date</th>
          <th onClick={() => handleSort('time','asc')}>Time</th>
        </tr>
      </thead>
      {/* Table body */}
      <tbody>
      {updatedRecords.map((item) => (
        <tr key={item.sno}>
          <td>{item.sno - 1}</td>
          <td>{item.customer_name}</td>
          <td>{item.age}</td>
          <td>{item.phone}</td>
          <td>{item.location}</td>
          <td>{item.created_date}</td>
          <td>{convertTimestampTo12HourFormat(item.created_time)}</td>
        </tr>
      ))}
      </tbody>
    </table>
  );

  return (
    <div>
    <h1>Customer Records Overview</h1>
     <div className='info'>
      {/* Search input */}
      <p>Enter Name or Location</p>
      <input type="text" placeholder="Search" value={searchTerm} onChange={handleSearch} />
      </div>
      <div className='sortbtns'>
      <button className='sort_time' onClick={() => handleSort('time','asc')}>Sort by Time</button>
      <button className='sort_date' onClick={() => handleSort('date','asc')}>Sort by date</button>   
  </div>
      {/* Table */}
      {renderTable()}

      {/* Pagination */}
      <div className='buttons'>
        <button className='prev' onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}>Previous</button>
        <span>{`Page ${currentPage} of ${Math.ceil(sortedData.length / recordsPerPage)}`}</span>
        <button className='next' onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(sortedData.length / recordsPerPage)))}>Next</button>
      </div>
      
    </div>
  );
};

export default DataTable;

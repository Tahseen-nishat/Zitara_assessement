// server.js
const express = require('express');
const cors = require('cors');
const { Client } = require('pg');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

const client = new Client({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'your_database',
  password: 'Taishu@2002',
  port: 5432,
});

client.connect();

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS your_table_name (
    sno SERIAL PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL,
    phone VARCHAR(15) NOT NULL,
    location VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

client.query(createTableQuery)
  .then(() => console.log('Table created successfully'))
  .catch(error => console.error('Error creating table:', error));

const insertDummyData = async () => {
  try {
    // Delete all rows from the table
    await client.query('DELETE FROM your_table_name');
    const baseDate = new Date(); // Set a base date for the records

const yourData = [
  { customer_name: 'John Doe', age: 25, phone: '1234567890', location: 'New York', created_at: '2024-04-17T11:16:02.780Z' },
  { customer_name: 'Jane Smith', age: 30, phone: '9876543210', location: 'Los Angeles', created_at: '2024-07-10T07:16:02.780Z' },
  { customer_name: 'Robert Johnson', age: 28, phone: '5551234567', location: 'Chicago', created_at: '2023-12-27T04:36:12.780Z' },
  { customer_name: 'Emily Davis', age: 22, phone: '9998887777', location: 'San Francisco', created_at: '2024-02-08T17:16:02.780Z' },
  { customer_name: 'Christopher Brown', age: 35, phone: '1112223333', location: 'Seattle', created_at: '2022-05-17T09:24:36.780Z' },
  { customer_name: 'Olivia Wilson', age: 29, phone: '7778889999', location: 'Toronto', created_at: '2022-09-28T18:45:21.780Z' },
  { customer_name: 'Liam Miller', age: 26, phone: '4445556666', location: 'Boston', created_at: '2022-12-05T12:33:49.780Z' },
  { customer_name: 'Sophia Moore', age: 32, phone: '3334445555', location: 'Dallas', created_at: '2023-03-14T08:56:27.780Z'},
  { customer_name: 'Daniel Lee', age: 27, phone: '8889990000', location: 'Miami', created_at: '2023-07-22T15:20:14.780Z' },
  { customer_name: 'Ava Davis', age: 31, phone: '1239876543', location: 'San Diego', created_at: '2023-11-03T21:42:50.780Z' },
  { customer_name: 'Jackson White', age: 23, phone: '1112223344', location: 'Atlanta', created_at: '2022-08-09T11:15:33.780Z' },
  { customer_name: 'Mia Hall', age: 29, phone: '9876543210', location: 'Denver', created_at: '2024-04-17T07:16:02.780Z' },
  { customer_name: 'Noah Turner', age: 26, phone: '5556667777', location: 'Houston', created_at: '2023-01-18T17:27:59.780Z'},
  { customer_name: 'Emma Harris', age: 33, phone: '9998887777', location: 'Phoenix', created_at: '2023-08-28T23:05:12.467Z' },
  { customer_name: 'Aiden Clark', age: 28, phone: '4445556666', location: 'Portland', created_at: '2024-02-18T06:29:58.002Z' },
  { customer_name: 'Isabella Young', age: 34, phone: '3334445555', location: 'Austin', created_at: '2024-02-25T09:29:55.600Z'},
  { customer_name: 'Caden King', age: 25, phone: '1119990000', location: 'Nashville', created_at: '2023-05-17T08:23:05.002Z' },
  { customer_name: 'Chloe Turner', age: 30, phone: '1239876543', location: 'San Antonio', created_at: '2022-07-28T21:47:40.150Z' },
  { customer_name: 'Ethan White', age: 26, phone: '5556667777', location: 'Minneapolis', created_at: '2024-01-08T13:10:15.780Z' },
  { customer_name: 'Grace Baker', age: 32, phone: '9998887777', location: 'Raleigh', created_at: '2023-10-21T03:36:50.412Z' },
  { customer_name: 'Liam Brooks', age: 27, phone: '4445556666', location: 'Detroit', created_at: '2022-12-01T16:59:25.975Z' },
  { customer_name: 'Ava Turner', age: 31, phone: '3334445555', location: 'Salt Lake City', created_at: '2023-06-20T10:32:00.321Z' },
  { customer_name: 'Mason Miller', age: 24, phone: '1112223333', location: 'Las Vegas', created_at: '2022-08-13T22:03:35.550Z' },
  { customer_name: 'Ella Wilson', age: 29, phone: '9876543210', location: 'Philadelphia', created_at: '2024-03-09T05:26:10.002Z' },
  { customer_name: 'Logan Harris', age: 26, phone: '5556667777', location: 'Charlotte', created_at: '2023-01-30T11:48:45.695Z' },
  { customer_name: 'Sophia Lee', age: 32, phone: '9998887777', location: 'Orlando', created_at: '2022-09-11T21:15:20.880Z' },
  { customer_name: 'Oliver Hall', age: 27, phone: '4445556666', location: 'Columbus', created_at: '2023-04-30T06:41:55.467Z'},
  { customer_name: 'Amelia Davis', age: 33, phone: '3334445555', location: 'Kansas City', created_at: '2023-07-03T01:27:05.600Z' },
  { customer_name: 'Elijah Turner', age: 28, phone: '1239876543', location: 'St. Louis', created_at: '2024-01-24T08:53:40.275Z' },
  { customer_name: 'Charlotte Brooks', age: 34, phone: '5556667777', location: 'Tampa', created_at: '2022-10-17T18:19:15.950Z' },
  { customer_name: 'Sebastian Baker', age: 25, phone: '4445556666', location: 'Pittsburgh', created_at: '2023-05-26T03:50:50.520Z' },
  { customer_name: 'Avery Turner', age: 30, phone: '1112223333', location: 'New Orleans', created_at:'2022-07-10T14:16:25.002Z' },
  { customer_name: 'Harper Wilson', age: 26, phone: '9876543210', location: 'Indianapolis', created_at: '2024-02-21T22:38:00.200Z' },
  { customer_name: 'Jackson Harris', age: 32, phone: '5556667777', location: 'Milwaukee', created_at: '2023-09-03T05:04:35.800Z' },
  { customer_name: 'Luna King', age: 27, phone: '9998887777', location: 'Albuquerque', created_at: '2022-11-26T15:27:10.412Z' },
  { customer_name: 'Grayson Lee', age: 33, phone: '1239876543', location: 'Sacramento', created_at: '2023-06-15T19:55:45.975Z' },
  { customer_name: 'Lily Baker', age: 28, phone: '4445556666', location: 'Oklahoma City', created_at: '2022-08-05T10:23:20.695Z' },
  { customer_name: 'Lincoln Turner', age: 34, phone: '3334445555', location: 'Memphis', created_at: '2024-03-04T16:46:55.321Z' },
  { customer_name: 'Aria Brooks', age: 25, phone: '1112223333', location: 'Louisville', created_at: '2023-01-23T08:12:20.550Z' },
  { customer_name: 'Ezra Harris', age: 30, phone: '5556667777', location: 'Portland', created_at: '2022-09-05T18:40:10.123Z' },
  { customer_name: 'Addison Wilson', age: 26, phone: '9876543210', location: 'Rochester', created_at: '2024-03-14T02:55:30.890Z' },
  { customer_name: 'Leo King', age: 32, phone: '9998887777', location: 'Boise', created_at: '2023-07-19T11:22:15.365Z' },
  { customer_name: 'Nova Lee', age: 27, phone: '4445556666', location: 'Anchorage', created_at: '2022-12-08T04:48:50.600Z' },
  { customer_name: 'Hudson Harris', age: 33, phone: '1239876543', location: 'Honolulu', created_at: '2023-04-27T20:10:25.975Z' },
  { customer_name: 'Aarav Patel', age: 28, phone: '9876543210', location: 'Mumbai', created_at: '2022-11-15T08:45:30.200Z' },
  { customer_name: 'Zara Khan', age: 36, phone: '8765432109', location: 'Karachi', created_at: '2023-02-22T15:20:45.550Z' },
  { customer_name: 'Ravi Sharma', age: 45, phone: '7654321098', location: 'Delhi', created_at: '2024-01-05T12:30:10.123Z' },
  { customer_name: 'Anaya Singh', age: 29, phone: '6543210987', location: 'Dhaka', created_at: '2022-08-10T22:18:20.890Z' },
  { customer_name: 'Aryan Khan', age: 31, phone: '5432109876', location: 'Islamabad', created_at: '2023-07-17T06:55:15.365Z' },
  { customer_name: 'Arjun Gupta', age: 27, phone: '3210987654', location: 'Colombo', created_at: '2023-05-28T09:10:25.975Z' },
  { customer_name: 'Rohan Verma', age: 32, phone: '1098765432', location: 'Kolkata', created_at: '2022-09-19T14:52:30.800Z' }

];


    // Insert new dummy data
    for (let i = 1; i < yourData.length; i++) {
      const created_at = new Date(yourData[i].created_at); // Convert string to Date object
      created_at.setSeconds(created_at.getSeconds() + i);
      const query = {
        text: 'INSERT INTO your_table_name(sno, customer_name, age, phone, location, created_at) VALUES($1, $2, $3, $4, $5, $6)',
        values: [
            i+1,
            yourData[i].customer_name,
          yourData[i].age,
          yourData[i].phone,
          yourData[i].location,
          yourData[i].created_at,
        ],
      };

      await client.query(query);
    }

    console.log('Dummy data inserted successfully');
  } catch (error) {
    console.error('Error inserting dummy data:', error);
  }
};

insertDummyData(); // Call the function to insert dummy data when the server starts

app.get('/getData', async (req, res) => {
  try {
    const { sortBy } = req.query;

    let orderByClause = 'ORDER BY created_at'; // Default sorting by created_at

    if (sortBy === 'date') {
      orderByClause = 'ORDER BY created_at::date';
    } else if (sortBy === 'time') {
      orderByClause = 'ORDER BY created_at::time';
    }

    const result = await client.query('SELECT * FROM your_table_name');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on('SIGINT', () => {
  client.end();
  process.exit();
});
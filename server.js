const express = require('express');
const axios = require('axios');
const app = express();
const port = 5000;

// Define the external API endpoints
const api1 = 'https://api.example1.com/data';  // Replace with actual API URL
const api2 = 'https://api.example2.com/data';  // Replace with actual API URL
const api3 = 'https://api.example3.com/data';  // Replace with actual API URL

// Define the route that fetches data from the APIs and combines the responses
app.get('/combined-data', async (req, res) => {
  try {
    // Use Promise.all to fetch data from all APIs concurrently
    const [response1, response2, response3] = await Promise.all([
      axios.get(api1),
      axios.get(api2),
      axios.get(api3)
    ]);

    // Combine the data
    const combinedData = {
      api1Data: response1.data,
      api2Data: response2.data,
      api3Data: response3.data
    };

    // Send the combined data as the final response
    res.json(combinedData);

  } catch (error) {
    // Handle errors (e.g., if any of the APIs fail)
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Error fetching data from APIs' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

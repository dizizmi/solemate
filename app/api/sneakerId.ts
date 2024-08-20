import axios from 'axios';

const getSneakers = async () => {
  try {
    // IDs of the first 10 sneakers - you can replace these with actual IDs.
    const sneakerIds = [
      "01c1af38-d1d0-462c-aca3-13349dc893a9",
      "another-sneaker-id-2",
      "another-sneaker-id-3",
      // Add more sneaker IDs here...
    ];

    const sneakerRequests = sneakerIds.map(id => 
      axios.get(`https://api.stockx.vlour.me/product/${id}`)
    );

    const sneakerResponses = await Promise.all(sneakerRequests);
    const sneakers = sneakerResponses.map(response => response.data);

    return sneakers;
  } catch (error) {
    console.error('Error fetching sneakers:', error);
    throw error;
  }
};

export default getSneakers;
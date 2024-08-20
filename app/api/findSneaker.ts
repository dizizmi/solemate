import axios from 'axios';

const findSneakers = async (query: string) => {
    const options = {
      method: 'GET',
      url: 'https://the-sneaker-database-api-your-ultimate-sneaker-encyclopedia.p.rapidapi.com/search',
      params: {
        query: query
      },
      headers: {
        'x-rapidapi-key': 'f207a35fcfmsh575e1cc770e9063p1e6dd6jsn4bf91b482db1',
        'x-rapidapi-host': 'the-sneaker-database-api-your-ultimate-sneaker-encyclopedia.p.rapidapi.com'
      }
    };
  
    try {
      const response = await axios.request(options);
      return response.data; // Return the data to use in other parts of the app
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error; // Throw the error so it can be handled by the calling function
    }
  };
  
  export default findSneakers;

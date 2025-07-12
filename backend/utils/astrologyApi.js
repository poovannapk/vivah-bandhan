const axios = require('axios');
exports.getHoroscopeMatch = async (boyDetails, girlDetails) => {
  // Call Prokerala or AstroVed API here
  // Replace with your actual API endpoint and key
  const response = await axios.post('https://api.prokerala.com/v2/astrology/match-making', {
    boy_birth_details: boyDetails,
    girl_birth_details: girlDetails,
  }, {
    headers: { Authorization: `Bearer ${process.env.PROKERALA_API_KEY}` }
  });
  return response.data;
};

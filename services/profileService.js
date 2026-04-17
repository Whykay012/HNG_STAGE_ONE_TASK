const axios = require('axios');
const https = require('https');
const { UpstreamError } = require('../utils/customErrors');

const httpsAgent = new https.Agent({
  rejectUnauthorized: false, 
  keepAlive: true,
});

const getAgeGroup = (age) => {
  if (age <= 12) return "child";
  if (age <= 19) return "teenager";
  if (age <= 59) return "adult";
  return "senior";
};

const fetchProcessedData = async (name) => {
  try {
    const [gRes, aRes, nRes] = await Promise.all([
      axios.get(`https://api.genderize.io?name=${name}`, { httpsAgent }),
      axios.get(`https://api.agify.io?name=${name}`, { httpsAgent }),
      axios.get(`https://api.nationalize.io?name=${name}`, { httpsAgent })
    ]);

    // Trap for empty/null responses as per HNG requirements
    if (!gRes.data.gender || gRes.data.count === 0) throw new UpstreamError('Genderize');
    if (aRes.data.age === null) throw new UpstreamError('Agify');
    if (!nRes.data.country || nRes.data.country.length === 0) throw new UpstreamError('Nationalize');

    const topCountry = nRes.data.country.reduce((prev, curr) => 
      (prev.probability > curr.probability) ? prev : curr
    );

    return {
      gender: gRes.data.gender,
      gender_probability: gRes.data.probability,
      sample_size: gRes.data.count,
      age: aRes.data.age,
      age_group: getAgeGroup(aRes.data.age),
      country_id: topCountry.country_id,
      country_probability: topCountry.probability
    };
  } catch (error) {
    // If it's already one of our custom UpstreamErrors, re-throw it
    if (error.statusCode === 502) throw error;
    
    // Otherwise, it's likely a network/SSL error (500)
    throw error;
  }
};

module.exports = { fetchProcessedData };
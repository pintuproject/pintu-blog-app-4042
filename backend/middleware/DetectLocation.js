


const detectLocation = async (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    try {
        const response = await axios.get(`http://api.ipstack.com/${ip}?access_key=${process.env.IPSTACK_API_KEY}`);
        req.location = response.data.country_code || 'India'; // Default to US if location is unavailable
    } catch (error) {
        req.location = 'India';
    }
    next();
};

module.exports=detectLocation
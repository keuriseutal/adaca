const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (request, response, next) => {
    // Get token from the header
    const token = request.header('x-auth-token');

    // Check if not token
    if(!token) {
        return response.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        request.user = decoded.user;
        next();
    } catch(error) {
        response.status(401).json({ msg: 'Token is not valid' });
    }  

};
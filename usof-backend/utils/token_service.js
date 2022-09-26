const jwt = require('jsonwebtoken');

class TokenService {
	generateTokens(payload) {
		try {
			const accessToken = jwt.sign(payload, '1a2b', {
				expiresIn: '30d'
			});
			return accessToken;
		} catch (e) {
			throw e;
		}
	}
}

module.exports = new TokenService();


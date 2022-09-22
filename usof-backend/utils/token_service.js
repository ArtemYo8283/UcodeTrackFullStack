const jwt = require('jsonwebtoken');

class TokenService {
	generateTokens(payload) {
		const accessToken = jwt.sign(payload, '1a2b', {
			expiresIn: '30d',
		});
		return accessToken;
	}

	generateTokensResetPassword(payload) {
		const resetToken = jwt.sign(payload, '1a2b', {
			expiresIn: '15m',
		});
		return resetToken;
	}

	validateAccessToken(token) {
		try {
			const userData = jwt.verify(token, '1a2b');
			return userData;
		} catch (e) {
			throw e;
		}
	}
}

module.exports = new TokenService();

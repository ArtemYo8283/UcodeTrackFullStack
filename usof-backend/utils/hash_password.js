const crypto = require('crypto');

module.exports = async function (password) {
    try {
        const hash = crypto.createHmac('sha512', 'salt');
        hash.update(password);
        return hash.digest('hex');
    } catch (e) {
        throw e;
    }
};


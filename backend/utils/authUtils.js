// utils/authUtils.js
const crypto = require('crypto');

/**
 * Generates the SECRET_HASH required by AWS Cognito
 * when using an App Client with a client secret.
 *
 * @param {string} username - The user's username (usually their email)
 * @param {string} clientId - Cognito App Client ID
 * @param {string} clientSecret - Cognito App Client Secret
 * @returns {string} - The base64 encoded HMAC-SHA256 hash
 */
function generateSecretHash(username, clientId, clientSecret) {
    return crypto
        .createHmac('SHA256', clientSecret)
        .update(username + clientId)
        .digest('base64');
}

module.exports = {
    generateSecretHash,
};
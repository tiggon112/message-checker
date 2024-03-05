var axios = require("axios");

const getEmail = async (email) => {
    const resp = await axios.get("https://generator.email/inbox1/", {
        headers: {
            Cookie: `embx=${encodeURIComponent([email])};surl=${email.split("@")[1]}%2Fwasnekit`,
        },
    });
    resp.data?.includes("ffffffff") ? console.log("true", email) : console.log("false", email);
};

module.exports = {
    getEmail,
};

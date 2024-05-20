const fs = require("fs");

const { domainChecker } = require("./services");

exports.startEmailCheck = async (emailList) => {
    // (function () {
    //   const P = ["\\", "|", "/", "-"];
    //   let x = 0;
    //   return setInterval(function () {
    //     process.stdout.write("\r"+P[x++]);
    //     x &= 3;
    //   }, 500);
    // })();
    const temp = {};
    emailList.forEach(email=> {
        if (email.includes("@"))
            temp[email.split("@")[1]] = true;
    });
    for (let domain of Object.keys(temp)) {
        if (["gmail.com", "hotmail.com", "outlook.com"].includes(domain)) continue;
        await domainChecker(domain);
        await wait(2000);
    }
}

const wait = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

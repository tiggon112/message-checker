const fs = require("fs");

const { msgChecker } = require("./services");
const { getEmailList } = require("./services/email-list");
const { startEmailCheck } = require("./email.check");

const start = async () => {
    // (function () {
    //   const P = ["\\", "|", "/", "-"];
    //   let x = 0;
    //   return setInterval(function () {
    //     process.stdout.write("\r"+P[x++]);
    //     x &= 3;
    //   }, 500);
    // })();
    let count = 0;
    while (1) {
        console.log(`Round: ${count+1}`);
        const emailList = await getEmailList();
        if (count % 20 == 3) {
            await startEmailCheck(emailList);
        }
        for (let email of emailList) {
            if (!email.includes("@")) continue;
            if (["gmail.com", "hotmail.com", "outlook.com"].includes(email.split("@")[1])) continue;
            await msgChecker(email);
            await wait(2000);
        }
        await wait(1000*60*2);
        count++;
    }
}

const wait = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

start();

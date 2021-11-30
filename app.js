const fs = require("fs");
const readline = require("readline");
const validator = require("validator");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("Masukkan nama anda: ", (nama) => {
    rl.question("Masukkan nomor telfon anda: ", (noHP) => {
        if (validator.isMobilePhone(noHP, "id-ID")) {
            let json = `{ "nama": "${nama}", "noHP": "${noHP}" }`;

            if (fs.existsSync("./contacts.json")) {
                let data = fs.readFileSync("./contacts.json", "utf-8");
                json = `${data.slice(1, data.length - 3)}, ${json}`;
            }

            fs.writeFileSync("./contacts.json", `[${json}]`);
        } else {
            console.error("Hanya Menerima Nomor Indonesia!");
        }

        rl.close();
    });
});

const puppeteer = require("puppeteer");

let getAdress = async (id) => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const $inputCEP = "#endereco";
    const $submit = "#btn_pesquisar";
    const $table = "#resultado-DNEC > tbody > tr";
    await page.setViewport({
        width: 1366,
        height: 758,
        deviceScaleFactor: 1,
    });
    await page.goto(
        "https://buscacepinter.correios.com.br/app/endereco/index.php"
    );
    await page.type($inputCEP, id);
    await page.click($submit);

    await page.waitForSelector($table);

    const Logradouro = await page.evaluate(() => {
        const targetLogradouro = document.querySelector(
            "#resultado-DNEC > tbody > tr > td:nth-child(1)"
        );
        return targetLogradouro.textContent;
    });
    const Bairro = await page.evaluate(() => {
        const targetBairro = document.querySelector(
            "#resultado-DNEC > tbody > tr > td:nth-child(2)"
        );
        return targetBairro.textContent;
    });
    const UF = await page.evaluate(() => {
        const targetUF = document.querySelector(
            "#resultado-DNEC > tbody > tr > td:nth-child(3)"
        );
        return targetUF.textContent;
    });
    const cep = await page.evaluate(() => {
        const targetCEP = document.querySelector(
            "#resultado-DNEC > tbody > tr > td:nth-child(4)"
        );
        return targetCEP.textContent;
    });

    console.log(
        `O endereço alvo é: ${Logradouro} - ${Bairro} - ${UF} - ${cep}`
    );

    await browser.close();
    if (Logradouro || Bairro || UF || cep) {
        return { Logradouro, Bairro, UF, cep };
    } else {
        return { Error: "CEP not found" };
    }
};

module.exports = getAdress;

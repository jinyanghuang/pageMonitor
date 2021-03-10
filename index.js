var request = require('request');
var nodemailer = require('nodemailer');
const axios = require('axios');

var cheerio = require('cheerio');
const { getMaxListeners } = require('process');



var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    auth: {
        user: "jinyanghuangjj@gmail.com",
        pass: "Aimilingyun0324!"
    }
});

const geForce='https://www.canadacomputers.com/product_info.php?cPath=43_557_559&item_id=186309'


const email_list = 'jinyanghuangjj@gmail.com';



async function main(){

const req_animal = {
    url: geForce,
    gzip: true,
    headers: {
        "Accept": "*/*",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36",
        
        "Accept-Encoding": "gzip,deflate,br"
    }
};

while (true) {
request(req_animal, (error, response, body) => {
    if (error){
        console.log(error);
    }
    if (body) {
        const $ = cheerio.load(body);
        const instore_availability = $('body > div > div > div > div > div > div> form.w-100 > div.col-12.py-2 > div.pi-prod-availability > span').last().text().trim();
        const online_availability = $('body > div > div > div > div > div > div> form.w-100 > div.col-12.py-2 > div.pi-prod-availability > span').first().text().trim();
        if (instore_availability === "In-Store Out Of Stock" ){
            console.log(instore_availability)
        }else{
            console.log('Geforce 3080 available')
            var mailOptions = {
                from: 'jinyanghuangjj@gmail.com',
                to: email_list,
                subject: 'Geforce 3080 available in store',
                text: 'Geforce 3080 available in store'
            };
            transporter.sendMail(mailOptions, function(error, info){
                if(error) {
                    console.log(error);
                }else{
                    console.log('Email sent: ' + info.response);
                }
            })
        }
        if (online_availability === "Not Available Online" ){
            console.log(online_availability)
        }else{
            console.log('Geforce 3080 available')
            var mailOptions = {
                from: 'jinyanghuangjj@gmail.com',
                to: email_list,
                subject: 'Geforce 3080 available online',
                text: 'Geforce 3080 available online'
            };
            transporter.sendMail(mailOptions, function(error, info){
                if(error) {
                    console.log(error);
                }else{
                    console.log('Email sent: ' + info.response);
                }
            })
        }
    }
})
    await new Promise(resolve => setTimeout(resolve, 10000));
}
}

main()
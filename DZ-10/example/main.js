import express from 'express';
import bodyParser from 'body-parser';
import Captcha from 'captcha-generator-alphanumeric';
import path from 'path';
import fs from 'fs';


let captchas = {};

function getSID() {
    let time = new Date().getTime();
    let salt = Math.trunc(Math.random() * 1000000000);
    return salt.toString(16) + Object.keys(captchas).length.toString(16) + time.toString(16);
}


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static(path.join(process.cwd(), 'public')));

app.get('/', (req, res) => {
    let sid = getSID();
    console.log("  New SID =", sid);

    let captcha = new Captcha.default();
    let captcha_id = Object.keys(captchas).length;
    let captchaUrl = `captcha/${captcha_id}.png`;
    let captchaFile = path.join(process.cwd(), 'public', 'captcha', `${captcha_id}.png`);
    captchas[sid] = {value: captcha.value, file: captchaFile};
    let captchaOut = fs.createWriteStream(captchaFile);
    captcha.PNGStream.pipe(captchaOut);
    captchaOut.on('finish', () => {
        res.setHeader('Set-Cookie', `sid=${sid}; Max-Age=220; HttpOnly`)
        res.type('html');
        res.end(`
            <img src="${ captchaUrl }"/><br>
            <form action="/login" method="post">
                <input type="text" name="captcha"/>
                <input type="submit"/>
            </form>
        `);
    });
});

function getCookies(cookieString) {
    let cookies = {};
    const cookieArray = cookieString.split(';');
    for (let x of cookieArray) {
        const [key, value] = x.trim().split('=');
        cookies[key] = value; 
    }
    return cookies;
}

app.post('/login', (req, res) => {
    const cookies = getCookies(req.header("Cookie"));
    const sid = cookies.sid;
    if (sid) {
        console.log(captchas[sid].value);
        let solved = captchas[sid].value === req.body['captcha'];
        if (captchas[sid].file) {
            fs.rm(captchas[sid].file, err => console.log(err));
            captchas[sid].value = null;
            captchas[sid].file = null;
        }
        res.type('html')
        res.end(`
            <p>CAPTCHA VALID: ${solved}</p>
        `);
    }
});

app.listen(3000, () => {
    console.log('server started')
});
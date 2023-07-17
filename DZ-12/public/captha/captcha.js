const svgCaptcha = require('svg-captcha');
const path = require('path');
const fs = require('fs').promises;

class Captcha {
    constructor() {
        this.captchas = new Map();
    }

    async generateCaptcha() {
        const captcha = svgCaptcha.create();
        const captchaId = this.captchas.size;
        const captchaSvg = captcha.data;
        const captchaValue = captcha.text;
        const captchaFile = path.join(process.cwd(), 'public', 'captcha', `${captchaId}.svg`);
        await fs.writeFile(captchaFile, captchaSvg);

        this.captchas.set(captchaId, { value: captchaValue, file: captchaFile });

        return {
            captchaValue,
            captchaFile
        };
    }

    validateCaptcha(captchaId, userInput) {
        const captcha = this.captchas.get(captchaId);
        this.captchas.delete(captchaId);

        return captcha && captcha.value === userInput;
    }

    async deleteCaptchaFile(captchaId) {
        const captcha = this.captchas.get(captchaId);
        if (captcha && captcha.file) {
            try {
                await fs.unlink(captcha.file);
            } catch (err) {
                console.log(err);
            }
            captcha.value = null;
            captcha.file = null;
        }
    }
}

module.exports = Captcha;

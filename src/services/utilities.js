const nodemailer = require('nodemailer');

const pointCal = (priceTotal) => {
    let total = priceTotal;
    var point = 0
    point = 0
    if (total >= 3000 && total < 10000) {
        return point = (total / 100)
    }
    else if (total >= 10000 && total < 25000) {
        return point = (total / 80)
    }
    else if (total >= 25000 && total < 35000) {
        return point = (total / 65)
    }
    else if (total >= 35000) {
        return point = (total / 50)
    }
    else {
        return "Price lower than 3,000 THB"
    }

};

const couponDis = (point, priceTotal, couponSelected) => {
    const userPoint = point;
    const total = priceTotal;

    const selected = couponSelected

    var balancePoint = 0
    var calTotal = 0

    balancePoint = 0
    calTotal = 0

    
    if (point >= 400 && selected == 1) {
        return  {'point': balancePoint = userPoint-400, 'total': calTotal = total-200}
    }
    else if (point >= 950 && selected == 2) {
        return  {'point': balancePoint = userPoint-950, 'total': calTotal = total-500}
    }
    else if (point >= 1300 && selected == 3) {
        return  {'point': balancePoint = userPoint-1300, 'total': calTotal = total-800}
    }
    else if (point >= 1800 && selected == 4) {
        return  {'point': balancePoint = userPoint-1800, 'total': calTotal = total-1000}
    }
    else if (point >= 3950 && selected == 5) {
        return  {'point': balancePoint = userPoint-3950, 'total': calTotal = total-2500}
    }
    else if (point >= 6500 && selected == 6) {
        return  {'point': balancePoint = userPoint-6500, 'total': calTotal = total-5000}
    }
    else {
        return "Not reaching minimum point."
    }
}

const mailer = (to, subject, html) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'mongkolteam.info@gmail.com',
          pass: 'oqqwhggsctjovgwe'
        },
    });

    let mailOptions = {
        from: 'mongkolteam.info@gmail.com',
        to: to,
        subject: `${subject}`,
        html: html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error.message);
        }
        console.log(`success send email`)
    });
};


exports.pointCal = pointCal;
exports.couponDis = couponDis;
exports.mailer = mailer;
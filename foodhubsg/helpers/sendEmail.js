const sgMail = require('@sendgrid/mail');


function sendEmail(sender, email) {
    sgMail.setApiKey("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");

    const message = {
        to: email,
        from: 'FoodHub.SG <admin@foodhubsg.com>',
        subject: `Invitation From ${sender.name}`,
        text: ' ',
        html: `<img src="../public/images/healthhub-logo.png" width="65px" height="60px" alt="FoodHub.SG Logo">
                <h4>FoodHub.SG</h4><br><br>
                Your friend, ${sender.name}, has invited you to FoodHub.SG, where you can log your calorie intake and compare your intake with other people
                Click here to <a href="http://127.0.0.1:5000"> <strong>register</strong></a> with us and use this referral code <strong>${sender.refCode}</strong> to 
                start your journey!`
    };

    return new Promise((resolve, reject) => {
        sgMail.send(message)
        .then(msg => resolve(msg))
        .catch(err => reject(err));
    });
}
   

module.exports = sendEmail; 
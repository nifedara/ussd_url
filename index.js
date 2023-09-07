const express = require('express');

const app = express();

const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/ussd', (req, res) => {
    try {
        if (req.body) {
            // Read the variables sent via POST from our API
            const {
                sessionId,
                serviceCode,
                phoneNumber,
                text,
            } = req.body;

            var phone = (String(phoneNumber));

            if (phone.startsWith("+23470") || phone.startsWith("+23480")){
                response = `END Welcome to the LASRRA USSD service \n\n`;
                response += `CARD STATUS: your card is being processed`;
            }
            else{
                response = `CON Welcome to the LASRRA USSD service \n\n`;
                response += `CARD STATUS: record not found\n`;
                response += `0. more options`;


                if (text == '0') {
                    response = `CON 1. Check with Lasrra ID`;
                }
                else if (text == '0*1') {
                    response = `CON This will cost you N50\n`;
                    response += `1. Continue`;
                }
                else if (text == '0*1*1') {
                    response = `CON Enter your Lasrra ID`;
                }
                else if (String(text).includes("LA") || String(text).includes("LR") ) {
                    response = `END CARD STATUS: Your card is ready`;
                }
                
            }

            // Send the response back to the API
            res.set('Content-Type: text/plain');
            res.send(response);
        } else {
            console.log("yepa")
            res.status(403).json({ message: "data incomplete" })
        }
    } catch (e) {
        console.log("Error", e)
        return res.status(500).json({ message: e })
    }
});

app.listen(port, console.log(`server running on port ${port}`));


//response = `END Welcome to the LASRRA USSD service`;
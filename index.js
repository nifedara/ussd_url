
const express = require('express');
const app = express();

const port = process.env.PORT || 5100;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/ussd', (req, res) => {
    try {
        if (req.body) {
            const { msisdn, network, session, text, shortcode, id } = req.body;

            if (msisdn.startsWith("+23470") || msisdn.startsWith("+23480")){
                response = `Welcome to the LASRRA USSD service \n\n`;
            }
            else{
                response = `Welcome to the LASRRA USSD service \n\n0. more options`;
            }

            res.set('Content-Type: text/plain');
            res.send(response);
        }
    } catch (e) {
        console.log("Error", e)
        return res.status(500).json({ message: e })
    }
});


app.listen(port, console.log(`server running on port ${port}`));
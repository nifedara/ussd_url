const express = require('express');
const app = express();

const port = process.env.PORT || 5100;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log(`Body: ${JSON.stringify(req.body)}`);
  next();
});

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

            res.send(response);
        }
    } catch (e) {
        console.error("Error", e);
        return res.status(500).json({ message: e.message });
    }
});

app.listen(port, () => console.log(`server running on port ${port}`));
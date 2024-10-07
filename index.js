const express = require('express');
const app = express();

const port = process.env.PORT || 5100;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log(`Body: ${JSON.stringify(req.body)}`);
  console.log(`Response: ${JSON.stringify(res)}`);
  next();
});

app.post('', (req, res) => {
    try {
        if (req.body) {
            const { 
                // msisdn, network, session, text, shortcode, id 
                backend: {
                    cuap: {
                        body: { code_scheme, msisdn, service_code, ussd_content, ussd_op_type, ussd_version },
                        header: { command_id, command_length, command_status, receiver_id, sender_id }
                    }
                },
                id: { session, ussd },
                network,
                session: {
                    type: { code },
                    ui: { name }
                },
                shortcode,
                status: { message },
                text
            } = req.body;

            if (msisdn.startsWith("+23470") || msisdn.startsWith("+23480") || msisdn.startsWith("080") || msisdn.startsWith("070")){
                ussdResponse = `Welcome to the LASRRA USSD service \n\n`;
            }
            else{
                ussdResponse = `Welcome to the LASRRA USSD service \n\n0. more options`;
            }

            const responseObject = {
                msisdn: msisdn, 
                network: network, 
                op_type: ussd_op_type, 
                session: {
                    type: { 
                        code: 3, 
                        name: "continue" 
                    },
                    ui: { 
                        code: 1, 
                        name: "input" 
                    }
                },
                shortcode: "", 
                text: ussdResponse
              };
              
            res.json(responseObject);
        }
    } catch (e) {
        console.error("Error", e);
        return res.status(500).json({ message: e.message });
    }
});

app.listen(port, () => console.log(`server running on port ${port}`));
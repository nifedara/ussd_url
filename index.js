const express = require('express');
const app = express();

const port = process.env.PORT || 5100;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log(`Body of request: ${req.body}`);
  //console.log(`Response: ${JSON.stringify(res)}`);
  next();
});

app.post('', (req, res) => {
    try {
        if (req.body) {
            // const { 
            //     // msisdn, network, session, text, shortcode, id 
            //     backend: {
            //         cuap: {
            //             body: { code_scheme, msisdn, service_code, ussd_content, ussd_op_type, ussd_version },
            //             header: { command_id, command_length, command_status, receiver_id, sender_id }
            //         }
            //     },
            //     id: { session, ussd },
            //     network,
            //     session: {
            //         type: { code },
            //         ui: { name }
            //     },
            //     shortcode,
            //     status: { message },
            //     text
            // } = req.body;

            const {
                "backend": {
                  "cuap": {
                    "body": { msisdn, service_code, ussd_content, ussd_op_type }
                  }
                },
                id,
                network,
                "session": { "type": { code, name } },
                shortcode,
                text
              } = req.body;

            // if (msisdn.startsWith("+23470") || msisdn.startsWith("+23480") || msisdn.startsWith("080") || msisdn.startsWith("070")){
            //     ussdResponse = `Welcome to the LASRRA USSD service \n\n`;
            // }
            // else{
            //     ussdResponse = `Welcome to the LASRRA USSD service \n\n0. more options`;
            // }

            
            if (name == "begin"){

              ussdResponse = `Welcome to the LASRRA USSD service \n\n0. more options`;
              type_code = 3;
              type_name = "continue";
              ui_code = 1;
              ui_name = "input";

            } else if (text == "0"){

              ussdResponse = `1. Check your card status \n\n2. Relocate your card`;
              type_code = 3;
              type_name = "continue";
              ui_code = 1;
              ui_name = "input";

            } else if (text == "1"){

              ussdResponse = `Check your card status: Ready`;
              type_code = 4;
              type_name = "end";
              ui_code = 0;
              ui_name = "none";

            } else if (text == "2"){

              ussdResponse = `Card relocated`;
              type_code = 4;
              type_name = "end";
              ui_code = 2;
              ui_name = "dialog";
            }

            const responseObject = {
              "msisdn": msisdn, 
              "network": network, 
              "op_type": ussd_op_type, 
              "session": {
                  "type": { 
                      "code": type_code, 
                      "name": type_name 
                  },
                  "ui": { 
                      "code": ui_code, 
                      "name": ui_name 
                  }
              },
              "shortcode": "", 
              "text": ussdResponse
            };
              
            res.json(responseObject);
        }
    } catch (e) {
        console.error("Error", e);
        return res.status(500).json({ message: e.message });
    }
});

app.listen(port, () => console.log(`server running on port ${port}`));
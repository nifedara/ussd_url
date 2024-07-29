import {
    createContinueResponse,
    createEndResponse,
    getCardStatusByLasrraId,
    getCardStatusByPhoneNumber
  } from "./ussdServices";

const express = require('express');
const app = express();

const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/ussd', async(req, res) => {
    try {
        if (req.body) {
            
            const { msisdn, network, session, text, shortcode, id } = req.body;
            const statusByPhone = await getCardStatusByPhoneNumber(msisdn);

            if (statusByPhone && statusByPhone.code === "00") {
                responseText = `Welcome to the LASRRA USSD service \n\nCARD STATUS: ${statusByPhone.cardStatus}`;
                sessionState.step = session_steps.start;
                response = createEndResponse(msisdn, network, shortcode, responseText);
            
            } 
            else {
                responseText = `Welcome to the LASRRA USSD service \n\nCARD STATUS: record not found\n0. more options`;
                sessionState.step = session_steps.main_menu;
                response = createContinueResponse(msisdn, network, shortcode, responseText);
            }

            res.status(200).json(response);
            console.log(req)
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
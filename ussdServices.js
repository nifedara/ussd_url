
const lasrraAPI = `https://lasrracardtrackingapi.azurewebsites.net/public/cardstatus`;

/**
 * The function `createContinueResponse` creates a ContinueResponse object with specified parameters.
 * @param msisdn - The `msisdn` parameter in the `createContinueResponse` function represents the
 * mobile subscriber integrated services digital network number, which is essentially the phone number
 * of the user interacting with the service.
 * @param network - The `network` parameter in the `createContinueResponse` function represents the
 * network to which the user's mobile number belongs. It is of type `Network`.
 * @param shortcode - The `shortcode` parameter in the `createContinueResponse` function is a string
 * that represents a specific shortcode used in messaging services. It is used to identify a specific
 * service or campaign when sending or receiving messages.
 * @param text - The `text` parameter in the `createContinueResponse` function represents the text
 * message that will be sent as a response. It is a string value that contains the content of the
 * message to be sent back to the user.
 * @returns The function `createContinueResponse` returns an object of type `ContinueResponse` with the
 * properties `msisdn`, `network`, `op_type`, `session`, `shortcode`, and `text` populated with the
 * values passed as arguments to the function.
 */
export const createContinueResponse = (
  msisdn,
  network,
  shortcode,
  text
) => {
  return {
    msisdn: msisdn,
    network: network,
    op_type: 1,
    session: {
      type: {
        code: 3,
        name: "continue",
      },
      ui: {
        code: 1,
        name: "input",
      },
    },
    shortcode: shortcode,
    text: text,
  };
};

/**
 * The function `createEndResponse` creates a response object with specific properties for ending a
 * session.
 * @param msisdn - The `msisdn` parameter in the `createEndResponse` function is a string representing
 * the mobile subscriber ISDN number.
 * @param network - The `network` parameter in the `createEndResponse` function represents the network
 * associated with a particular mobile number. It is likely an enum or object that contains information
 * about the network provider such as name, code, and other relevant details.
 * @param shortcode - The `shortcode` parameter in the `createEndResponse` function is a string that
 * represents a specific shortcode used in messaging services.
 * @param text - The `createEndResponse` function takes in four parameters: `msisdn` (a string
 * representing a phone number), `network` (an object representing the network), `shortcode` (a string
 * representing a shortcode), and `text` (a string representing the text message).
 * @returns The function `createEndResponse` returns an object with the following properties:
 * - `msisdn`: The phone number passed as the `msisdn` parameter.
 * - `network`: The network object passed as the `network` parameter.
 * - `op_type`: The value 2.
 * - `session`: An object with properties `type` and `ui`, each containing a `code`
 */
export const createEndResponse = (
  msisdn,
  network,
  shortcode,
  text
) => {
  return {
    msisdn: msisdn,
    network: network,
    op_type: 2,
    session: {
      type: {
        code: 4,
        name: "end",
      },
      ui: {
        code: 2,
        name: "dialog",
      },
    },
    shortcode: shortcode,
    text: text,
  };
};


export const getCardStatusByLasrraId = async (lasrraId) => {
  try {
    const lasrraResponse = await (await fetch(`${lasrraAPI}/${lasrraId}`)).json();
    return lasrraResponse;
  } catch (error) {
    console.error(error);
    return false;
  }
};


export const getCardStatusByPhoneNumber = async (phoneNumber) => {
  try {
    const lasrraResponse = await (await fetch(`${lasrraAPI}?phoneNumber=${phoneNumber}`)).json();
    return lasrraResponse;
  } catch (error) {
    console.error(error);
    return false;
  }
};

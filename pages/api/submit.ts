// import {NextApiRequest, NextApiResponse} from "next";
// import {google} from "../../node_modules/googleapis"
// type SheetForm={
//     Name: string
//     PhoneNumber: string
//     Description: string
// }
// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse
// ) 
// {
//     if (req.method !== 'POST') {
//     return res.status(405).send({message: 'Only POST requests are allowed'})
// }
// const body = req.body as SheetForm


//     // prepare auth
//     const auth = new google.auth.GoogleAuth({
//     credentials: {
    
//     client_email: process.env.GOOGLE_CLIENT_EMAIL,
//     private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
//     },
//     scopes: [
//     'https://www.googleapis.com/auth/drive',
//     'https://www.googleapis.com/auth/drive.file',
//     'https://www.googleapis.com/auth/spreadsheets',
//     ]
//     });
    
//     const sheets = google.sheets({
//     auth,
//     version: 'v4'
//     });


//     const response = await sheets.spreadsheets.values.append( { 
//         spreadsheetId: process.env.GOOGLE_SHEET_ID,
//         range: 'A1:D1',
//         valueInputOption: 'USER_ENTERED',
//         requestBody: {
//             values: [
//                 [body.Name, body.PhoneNumber, body.Description]
//             ]
//         }
//     });
    
//     return res.status( 200).json({
//     data: response.data
//     })

    
// }


import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { google } from "googleapis";

type SheetForm = {
  Name: string;
  PhoneNumber: string;
  DOB: string;
  Email:string;
};
function generateCode() {
  // Generate 3 random digits
  const code = Math.floor(100 + Math.random() * 900);

  // Get today's date
  const today = new Date();
  const date = today.getDate();
  const month = today.getMonth() + 1; // Months are zero-indexed
  const year = today.getFullYear();

  // Format the date as DD/MM/YYYY
  const formattedDate = `${date}/${month}/${year}`;

  return `${code} - ${formattedDate}`;
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) 
{
  if (req.method === "POST") {
    // Handle POST request
    const body = req.body as SheetForm;

    try {
      // Append data to Google Sheets
      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: process.env.GOOGLE_CLIENT_EMAIL,
          private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        },
        scopes: [
          "https://www.googleapis.com/auth/drive",
          "https://www.googleapis.com/auth/drive.file",
          "https://www.googleapis.com/auth/spreadsheets",
        ],
      });

      const sheets = google.sheets({
        auth,
        version: "v4",
      });

      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: "A1:D1",
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [
            [body.Name, body.PhoneNumber, body.DOB,body.Email]
          ],
        },
      });

      // Send SMS using Sparrow SMS API
      const sparrowsmsConfig = {
        headers: {
          Authorization: `Bearer ${process.env.SPARROW_SMS_TOKEN}`,
        },
      };

      const smsData = {
        token: process.env.SPARROW_SMS_TOKEN,
        from: "D",
        to: body.PhoneNumber, // Assuming PhoneNumber is a valid 10-digit number of Nepal
        text : `Hey ${body.Name}!\nThankyou for filling the form. \n- Liquors Nepal Pvt Ltd`
      };
      
      const smsResponse = await axios.post(
        "https://api.sparrowsms.com/v2/sms/",
        smsData,
        sparrowsmsConfig
      );

      return res.status(200).json({
        message: "Data appended to Google Sheets and SMS sent successfully",
        smsResponse: smsResponse.data,
      });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    // Handle unsupported methods
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}



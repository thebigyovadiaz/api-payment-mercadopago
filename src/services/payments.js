import dotenv from 'dotenv'
dotenv.config()

import getLoggerHandler from "../handlers/logger.handler.js";
import { MercadoPagoConfig, Payment, CardToken, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.ACCESS_TOKEN,
  options: { timeout: 5000 },
});

const payment = new Payment(client);
const cardToken = new CardToken(client);
const preferenceClient = new Preference(client);

const generateCardToken = async () =>
  await cardToken.create({
    card_number: "4168818844447115",
    security_code: "123",
    expiration_month: 11,
    expiration_year: 2025,
    /* cardholderIdentification: {
      type: "otro",
      number: "12345678"
    } */
  });

export const createPaymentSDK = async (amount, description) => {
  const token = await generateCardToken();
  console.log("token", token);

  const body = {
    transaction_amount: amount,
    token: token.id,
    description,
    installments: 1,
    payment_method_id: "visa", // Use the correct payment method ID
    payer: {
      email: "test_user_1260664642@testuser.com",
    },
  };

  try {
    const response = await payment.create({ body });
    // res.redirect(response.body.init_point);
    getLoggerHandler(
      "[SERVICES] [PAYMENTS - createPaymentSDK]",
      "INFO",
      response
    );
    return response;
  } catch (error) {
    getLoggerHandler(
      "[SERVICES] [PAYMENTS - createPaymentSDK]",
      "ERROR",
      JSON.stringify(error)
    );
    throw error;
  }
};

export const getPaymentByID = async (paymentId) => {
  try {
    return await payment.get({ id: paymentId})
  } catch (error) {
    throw error;
  }
}

export const createOrderPaymentServices = async () => {
  try {
    const body = {
      items: [
        {
          title: "IPAD Air M1 11'",
          quantity: 1,
          currency_id: "CLP",
          unit_price: 500000
        }
      ],
      back_urls: {
        success: `${process.env.HOST}/api/v1/success`,
        failure: `${process.env.HOST}/api/v1/failure`,
        pending: `${process.env.HOST}/api/v1/pending`
      },
      notification_url: `${process.env.HOST}/api/v1/webhook`
    }

    const result = await preferenceClient.create({ body });
    console.log({ result })
    return result;
  } catch (error) {
    console.log({error})
  }
}

const createPaymentAPI = () => {};

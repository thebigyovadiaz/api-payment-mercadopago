import getLoggerHandler from '../handlers/logger.handler.js'
import { createOrderPaymentServices, createPaymentSDK, getPaymentByID } from '../services/payments.js'

const ctrlCreatePaymentSDK = async (req, res) => {
  try {
    const { amount, description } = req.body;
    const responseServices = await createPaymentSDK(amount, description);

    getLoggerHandler("[CONTROLLERS] [PAYMENTS - ctrlCreatePaymentSDK]", "INFO", responseServices);
    return res.status(200).json({ code: 200, message: "SUCCESS", data: responseServices });
  } catch (error) {
    getLoggerHandler("[CONTROLLERS] [PAYMENTS - ctrlCreatePaymentSDK]", "ERROR", JSON.stringify(error));
    return res.status(500).json({ code: 500, message: error.message, data: {} });
  }
};

export const createOrderPaymentCtrl = async (req, res) => {
  const result = await createOrderPaymentServices();
  return res.status(200).json({ code: 200, message: "Creating Order", data: result });

  /* try {
    const { amount, description } = req.body;
    const responseServices = await createPaymentSDK(amount, description);

    getLoggerHandler("[CONTROLLERS] [PAYMENTS - ctrlCreatePaymentSDK]", "INFO", responseServices);
    return res.status(200).json({ code: 200, message: "SUCCESS", data: responseServices });
  } catch (error) {
    getLoggerHandler("[CONTROLLERS] [PAYMENTS - ctrlCreatePaymentSDK]", "ERROR", JSON.stringify(error));
    return res.status(500).json({ code: 500, message: error.message, data: {} });
  } */
};

export const webhookPaymentCtrl = async (req, res) => {
  try {
    console.log('QUERY :>> ', req.query);
    console.log('HEADERS :>> ', req.headers);
    console.log('BODY :>> ', req.body);

    const payment = req.query;
    if (payment.type === "payment") {
      const result = await getPaymentByID(payment['data.id']);
      console.log('result :>> ', result);
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default ctrlCreatePaymentSDK

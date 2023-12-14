import { Router } from "express";
import healthcheck from "../controllers/healthcheck.controller.js";
import ctrlCreatePaymentSDK, {
  createOrderPaymentCtrl,
  webhookPaymentCtrl,
} from "../controllers/payments.controller.js";

const router = Router();

router.get("/healthcheck", healthcheck);

router.post("/create-order-payment", createOrderPaymentCtrl);

router.get("/success", (req, res) => res.send("Order Created"));

router.get("/failure", (req, res) => res.send("Order Failed"));

router.get("/pending", (req, res) => res.send("Order Pending"));

router.post("/webhook", webhookPaymentCtrl);

router.post("/create-payment-sdk", ctrlCreatePaymentSDK);

const appRoutes = (api) => {
  api.use("/api/v1/", router);

  // Middleware Not Found
  api.use((req, res, next) => {
    return res.status(404).json({ code: 404, message: "RESOURCE NOT FOUND" });
  });
};

export default appRoutes;

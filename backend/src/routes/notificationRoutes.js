const express = require("express");
const router = express.Router();
const NotificationController = require("../controllers/notificationController");
const authController = require("../controllers/authController");

router.get(
  "/",
  // authController.protect,
  NotificationController.getNotifications
);

router.get(
  "/unread-count",
  // authController.protect,
  NotificationController.getUnreadCount
);

router.patch(
  "/:notificationId/read",
  // authController.protect,
  NotificationController.markAsRead
);

router.patch(
  "/mark-all-read",
  // authController.protect,
  NotificationController.markAllAsRead
);

router.delete(
  "/:notificationId",
  // authController.protect,
  NotificationController.deleteNotification
);

module.exports = router;

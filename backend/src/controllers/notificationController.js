const catchAsync = require('../utils/catchAsync');
const NotificationService = require('../services/notificationService');

class NotificationController {
  /**
   * Get user notifications
   */
  static getNotifications = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const { limit = 20, offset = 0, unread } = req.query;

    const notifications = await NotificationService.getUserNotifications(userId, {
      limit: parseInt(limit),
      offset: parseInt(offset),
      unreadOnly: unread === 'true'
    });

    res.status(200).json({
      status: 'success',
      results: notifications.length,
      data: notifications
    });
  });

  /**
   * Mark notification as read
   */
  static markAsRead = catchAsync(async (req, res) => {
    const { notificationId } = req.params;
    const userId = req.user.id;

    // Verify notification belongs to user
    const notification = await knex('notifications')
      .where({ id: notificationId, user_id: userId })
      .first();

    if (!notification) {
      return res.status(404).json({
        status: 'fail',
        message: 'Notification not found'
      });
    }

    const updatedNotification = await NotificationService.markAsRead(notificationId);

    res.status(200).json({
      status: 'success',
      data: updatedNotification
    });
  });

  /**
   * Mark all notifications as read
   */
  static markAllAsRead = catchAsync(async (req, res) => {
    const userId = req.user.id;

    const count = await NotificationService.markAllAsRead(userId);

    res.status(200).json({
      status: 'success',
      data: {
        markedCount: count
      }
    });
  });

  /**
   * Get unread notifications count
   */
  static getUnreadCount = catchAsync(async (req, res) => {
    const userId = req.user.id;

    const count = await NotificationService.getUnreadCount(userId);

    res.status(200).json({
      status: 'success',
      data: {
        count
      }
    });
  });

  /**
   * Delete notification
   */
  static deleteNotification = catchAsync(async (req, res) => {
    const { notificationId } = req.params;
    const userId = req.user.id;

    // Verify notification belongs to user
    const notification = await knex('notifications')
      .where({ id: notificationId, user_id: userId })
      .first();

    if (!notification) {
      return res.status(404).json({
        status: 'fail',
        message: 'Notification not found'
      });
    }

    await NotificationService.deleteNotification(notificationId);

    res.status(204).json({
      status: 'success',
      data: null
    });
  });
}

module.exports = NotificationController;
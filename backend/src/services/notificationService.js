const knex = require("../db/knex");
const io = require("../utils/socket");

class NotificationService {
  /**
   * Create a new notification
   * @param {Object} notificationData
   * @returns {Promise<Object>} Created notification
   */
  static async createNotification(notificationData) {
    try {
      if (!notificationData?.user_id) {
        throw new Error(
          `Notification user_id required. Received: ${JSON.stringify(
            notificationData
          )}`
        );
      }

      const [notification] = await knex("notifications")
        .insert({
          ...notificationData,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        })
        .returning("*");

      return notification;
      
    } catch (error) {
      console.error("Notification creation failed:", {
        error: error.message,
        notificationData,
        stack: error.stack,
      });
      throw error;
    }
  }

  /**
   * Get notifications for a user
   * @param {number} userId
   * @param {Object} [options]
   * @returns {Promise<Array>} List of notifications
   */
  static async getUserNotifications(userId, options = {}) {
    const { limit = 20, offset = 0, unreadOnly = false } = options;

    let query = knex("notifications")
      .where("user_id", userId)
      .orderBy("created_at", "desc")
      .limit(limit)
      .offset(offset);

    if (unreadOnly) {
      query.where("read", false);
    }

    return query;
  }

  /**
   * Mark notification as read
   * @param {number} notificationId
   * @returns {Promise<Object>} Updated notification
   */
  static async markAsRead(notificationId) {
    const [notification] = await knex("notifications")
      .where("id", notificationId)
      .update({
        read: true,
        read_at: knex.fn.now(),
        updated_at: knex.fn.now(),
      })
      .returning("*");

    return notification;
  }

  /**
   * Mark all notifications as read for a user
   * @param {number} userId
   * @returns {Promise<number>} Count of updated notifications
   */
  static async markAllAsRead(userId) {
    const count = await knex("notifications")
      .where({
        user_id: userId,
        read: false,
      })
      .update({
        read: true,
        read_at: knex.fn.now(),
        updated_at: knex.fn.now(),
      });

    return count;
  }

  /**
   * Get unread notification count for a user
   * @param {number} userId
   * @returns {Promise<number>} Count of unread notifications
   */
  static async getUnreadCount(userId) {
    const result = await knex("notifications")
      .where({
        user_id: userId,
        read: false,
      })
      .count("* as count")
      .first();

    return parseInt(result.count);
  }

  /**
   * Delete a notification
   * @param {number} notificationId
   * @returns {Promise<boolean>} Success status
   */
  static async deleteNotification(notificationId) {
    const count = await knex("notifications").where("id", notificationId).del();

    return count > 0;
  }

  /**
   * Create multiple notifications at once
   * @param {Array} notificationsData
   * @returns {Promise<Array>} Created notifications
   */
  static async batchCreate(notificationsData) {
    if (!notificationsData.length) return [];

    const notifications = await knex("notifications")
      .insert(
        notificationsData.map((n) => ({
          ...n,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        }))
      )
      .returning("*");

    return notifications;
  }

  static async createNotificationWithSocket(notificationData) {
    const notification = await this.createNotification(notificationData);

    // Emit real-time update
    io.to(`user_${notification.user_id}`).emit(
      "new_notification",
      notification
    );

    return notification;
  }
}

module.exports = NotificationService;

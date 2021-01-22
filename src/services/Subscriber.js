import models from "../models";
import ErrorHandler from "../utils/ErrorHandler";

class SubscriberService {
  /**
   * @description subscribe to email list
   * @param {*} email
   */
  static async create({ email }) {
    await models.subscriber.create({
      email,
    });
  }

  /**
   * @description unsubscribe from email list
   * @param {*} email
   */
  static async destroy({ email }) {
    const subscriber = await models.subscriber.destroy({ where: { email } });
    if (!subscriber) {
      throw new ErrorHandler("Email not found", 404);
    }
  }
}

export default SubscriberService;

import { Message } from 'node-nats-streaming';
import { Subjects, Listener, PaymentCreatedEvent, OrderStatus } from '@wyprawnik/common'
import { queueGroupName } from './queue-group-name';
import { Order } from '../../models/order';

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
  queueGroupName = queueGroupName

  async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
    const order = await Order.findById(data.orderId)

    if (!order) {
      throw new Error('Order not found')
    }

    order.set({
      status: OrderStatus.Complete
    });
    await order.save();
    // we are not expecting more changes to order, so there is no order updated event
    // ideally, there should be one

    msg.ack();
  }
}
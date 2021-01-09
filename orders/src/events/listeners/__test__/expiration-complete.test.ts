import { natsWrapper } from "../../../nats-wrapper";
import { ExpirationCompleteListener } from "../expiration-complete-listener"
import { Order, OrderStatus } from '../../../models/order'
import { Ticket } from '../../../models/ticket'
import mongoose from 'mongoose'
import { Message } from 'node-nats-streaming'
import { ExpirationCompleteEvent } from '@wyprawnik/common'
const setup = async () => {
  const listener = new ExpirationCompleteListener(natsWrapper.client);

  const ticket = Ticket.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20
  });
  await ticket.save();
  const order = Order.build({
    status: OrderStatus.Created,
    userId: 'ffdbdfb',
    expiresAt: new Date(),
    ticket,
  });
  await order.save();

  const data: ExpirationCompleteEvent['data'] = {
    orderId: order.id
  };
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };

  return { listener, order, ticket, data, msg };
};

it('updates the order status to cancelled', async () => {
  const { listener, order, ticket, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const updatedOrder = await Order.findById(order.id);

  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled)
})

it('emit an OrderCancelled event', async () => {
  const { listener, order, ticket, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
  const calls = (natsWrapper.client.publish as jest.Mock).mock.calls
  const eventData = JSON.parse(
    calls[calls.length-1][1]
  );
  
  expect(eventData.id).toEqual(order.id)
});

it('acks the message', async () => {
  const { listener, order, ticket, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
})


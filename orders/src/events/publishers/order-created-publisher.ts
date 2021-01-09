import { Publisher, OrderCreatedEvent, Subjects } from '@wyprawnik/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
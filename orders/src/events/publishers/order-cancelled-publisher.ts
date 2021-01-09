import { Publisher, OrderCancelledEvent, Subjects } from '@wyprawnik/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled
}
import { Subjects, Publisher, PaymentCreatedEvent } from '@wyprawnik/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
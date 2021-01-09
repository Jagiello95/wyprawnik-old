import { Publisher, Subjects, TicketUpdatedEvent } from '@wyprawnik/common'

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}

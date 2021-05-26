import { Ticket } from './ticket.model';

export const TicketProviders = [
  {
    provide: 'TICKETS_REPOSITORY',
    useValue: Ticket
  }
];

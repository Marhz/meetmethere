import { Event } from './event/event.model';

export class User {
  tg: string = '';
  id: number;
  name: string;
  email: string;
  avatar: string;
  created_at: string;
  updated_at: string;

	constructor() {}

  public isCreator(event: Event)  {
    return this.id === event.creator.id;
  }
}


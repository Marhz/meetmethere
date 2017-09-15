import { User } from '../user';

export class Event {
	id: number;
	name: string;
	description: string;
	address: string;
	begin_at: string;
	end_at: string;
  latitude: number;
  longitude: number;
  participants: User[];

  constructor() {}
}

import { User } from '../user';
import * as Globals from '../globals';

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
  banner;
  creator: User;
  participants_count: number;
  comments_count: number;

  constructor() {}

  public bannerUrl(): string {
    return Globals.url + this.banner;
  }
}

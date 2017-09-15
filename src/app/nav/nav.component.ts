import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  private showMenu: boolean = false
  private user: User;

	constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.getUser();
  }

  toggleMenu() {
    this.showMenu = !this.showMenu
  }

	loggedIn() {
		return this.authService.isLoggedIn();
	}
}

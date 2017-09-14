import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  private showMenu: boolean = false
	constructor(private authService: AuthService) {}

  ngOnInit() {
  }

  toggleMenu() {
    this.showMenu = !this.showMenu
    console.log(this.showMenu);
  }

	loggedIn() {
		return this.authService.isLoggedIn();
	}
}

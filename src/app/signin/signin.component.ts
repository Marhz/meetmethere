import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common'

import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(
    private authService: AuthService, 
    private location: Location, 
    private router: Router,
    private alertService: AlertService
   ) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
        this.location.replaceState("/");
        this.router.navigate(["/"]);
    }
  }

  onSignin(form: NgForm) {
  	this.authService.signin(form.value.email, form.value.password)
  		.then(res => {
        this.alertService.show('Successfully logged in!');
        this.location.replaceState("/");
        this.router.navigate(["/"]);
      })
  		.catch(err => console.log(err));
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private authSerice: AuthService) { }

  ngOnInit() {
  }
  onSignup(form: NgForm) {
  	this.authSerice.signup(
  		form.value.name,
  		form.value.email,
  		form.value.password,
  		form.value.password_confirmation
  	).then(res => console.log(res))
  	.catch(err => console.log(err));
  }
}

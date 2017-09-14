import { NgModule }      from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EventsComponent } from './../events/events.component';
import { EventComponent } from './../event/event.component';
import { SignupComponent } from './../signup/signup.component';
import { SigninComponent } from './../signin/signin.component';
import { EventsFormComponent } from './../events-form/events-form.component';
import { AuthGuard } from '../guards/auth-guard';
import { SignoutComponent } from '../signin/signout.component';
import { EventsMapComponent } from '../events-map/events-map.component'

const routes: Routes = [
  {
    path: '',
    component: EventsComponent,
  },
  {
    path: 'events',
    component: EventsComponent,
  },
	{
		path: 'events/new',
		component: EventsFormComponent,
		canActivate: [AuthGuard]
	},
  {
    path: 'events/map',
    component: EventsMapComponent,
    canActivate: [AuthGuard]
  },
	{
		path: 'events/:id',
		component: EventComponent
	},
	{
		path: 'events/:id/edit',
		component: EventsFormComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'signup',
		component: SignupComponent
	},
	{
		path: 'signin',
		component: SigninComponent
	},
	{
		path:'signout',
		component: SignoutComponent,
		canActivate: [AuthGuard]
	}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ],
	providers: [AuthGuard]
})
export class AppRoutingModule {}

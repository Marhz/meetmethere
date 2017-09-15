import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './routing/app-routing.module';

import { AppComponent } from './app.component';
import { EventsComponent } from './events/events.component';
import { EventComponent } from './event/event.component';
import { EventService } from './event/event.service';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { SignoutComponent } from './signin/signout.component';
import { AuthService } from './services/auth.service';
import { AlertService } from './alert/alert.service';
import { EventsFormComponent } from './events-form/events-form.component';
import { NavComponent } from './nav/nav.component';
import { AgmCoreModule } from '@agm/core';
import { AlertComponent } from './alert/alert.component';
import { CommentsComponent } from './comments/comments.component';
import { CommentComponent } from './comments/comment/comment.component';
import { CommentsFormComponent } from './comments/comments-form/comments-form.component';
import { EventsMapComponent } from './events-map/events-map.component';
import { AddressInputComponent } from './address-input/address-input.component';
import { ParticipationService } from './services/participation.service';


@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    EventComponent,
    SignupComponent,
    SigninComponent,
    SignoutComponent,
    EventsFormComponent,
    NavComponent,
    AlertComponent,
    CommentsComponent,
    CommentComponent,
    CommentsFormComponent,
    EventsMapComponent,
    AddressInputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDTEB9KInzNBTsPt3vUYZkrpuWb88oiqDE',
      libraries: ["places"]
    })
  ],
  providers: [EventService, AuthService, AlertService, ParticipationService],
  bootstrap: [AppComponent]
})
export class AppModule { }

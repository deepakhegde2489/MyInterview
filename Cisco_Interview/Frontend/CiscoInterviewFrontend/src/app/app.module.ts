import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule,HttpClientXsrfModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentComponent } from './student/student.component';
import {NgForm,FormGroup,FormControl,Validators,FormBuilder,ReactiveFormsModule} from '@angular/forms';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './register/register.component';
import { websockservice } from './homepage/websock.service';
import { WebsocketService } from './homepage/websocket.service';
import { Subject } from 'rxjs';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    HomepageComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
ToastrModule.forRoot({
      closeButton: true,
      timeOut: 150000, // 15 seconds
      progressBar: true,
      positionClass :'toast-top-right'
    }),
    AppRoutingModule,

    ReactiveFormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'csrftoken',
      headerName: 'X-CSRFTOKEN',
    }),
  ],
  providers: [websockservice,WebsocketService,Subject],
  bootstrap: [AppComponent]
})

export class AppModule { }

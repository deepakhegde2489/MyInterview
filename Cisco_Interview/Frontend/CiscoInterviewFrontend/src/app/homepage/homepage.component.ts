import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { websockservice } from './websock.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})



export class HomepageComponent implements OnInit {
username:any;
address:any;
is_admin: boolean = false;
socket:any;
  constructor(private http: HttpClient,private router: Router,private chatService: websockservice,private toastrService: ToastrService) {



  }

  ngOnInit(): void {
  this.chatService.messages.subscribe((msg:any) => {
    console.log(msg)
       this.toastrService.success(msg.message);
    });
    if (localStorage.getItem("token")) {
    this.http.get<any>('/api/Login/'+ localStorage.getItem("user")).subscribe((data:any) => {

        this.username = data['user'].split("@")[0];
        this.address= data['address'];
        this.is_admin= data['is_admin'];
        console.log(data)
    });
    }
    else {
    this.router.navigate(['/']);
    }
  }
  public message = {
    author: "Cisco Admin",
    message: "Welcome Back!!"
  };

  sendMsg() {
    console.log("new message from client to websocket: ", {
    author: "Cisco Admin2",
    message: "Welcome Back!!"
  });
    this.chatService.messages.next({
    author: "Cisco Admin2",
    message: "Welcome Back!!"
  });
  }

}

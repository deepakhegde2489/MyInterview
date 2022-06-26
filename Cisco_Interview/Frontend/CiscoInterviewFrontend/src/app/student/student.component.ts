import { Component, OnInit } from '@angular/core';
import {NgForm,FormGroup,FormControl,Validators,FormBuilder,ReactiveFormsModule} from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})

export class StudentComponent implements OnInit {
formData:any;
redirectUrl:any;
isLoggedIn: boolean = true;
    constructor(fb: FormBuilder,private http: HttpClient,private router: Router){}
  ngOnInit(): void {
this.isLoggedIn = false;
localStorage.clear();
  this.formData = new FormGroup({
       uname: new FormControl("angular@gmail.com"),
     pwd: new FormControl("abcd1234")
   });
   this.redirectUrl = '/homepage'

  }

UserLogout(e:any) {
    this.http.get<any>('/api/UserLogout/').subscribe((data:any) => {
        this.isLoggedIn = false;
        this.router.navigate(['/']);
        this.redirectUrl = null;
    });
    }
  AuthenticateUser(e:any) {

  console.log(e.target.uname.value);
  const headers = {};
    const body = { username: e.target.uname.value,password:e.target.pwd.value };
    this.http.post<any>('/api/AuthToken/', body, { headers }).subscribe(data => {
        localStorage.setItem("token",data['token']);
        localStorage.setItem("uid",data['user_id']);
        localStorage.setItem("user",data['user'])
        this.isLoggedIn = true;
        this.router.navigate([this.redirectUrl]);
        this.redirectUrl = null;
    });

  }






}

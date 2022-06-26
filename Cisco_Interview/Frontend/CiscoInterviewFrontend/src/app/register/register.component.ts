import { Component, OnInit } from '@angular/core';
import {NgForm,FormGroup,FormControl,Validators,FormBuilder,ReactiveFormsModule} from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
formData:any;
redirectUrl:any;
isLoggedIn: boolean = true;
  constructor(fb: FormBuilder,private http: HttpClient,private router: Router) { }

  ngOnInit(): void {
  this.formData = new FormGroup({
       uname: new FormControl("angular@gmail.com"),
     pwd: new FormControl("abcd1234")
   });
   this.redirectUrl = '/homepage'
  }

  RegisterUser(e:any) {

  console.log(e.target.uname.value);
  const headers = {};
    const body = { user: e.target.uname.value,password:e.target.pwd.value,address:e.target.address.value,
    is_admin:e.target.is_admin.value
    };
    this.http.post<any>('/api/CreateStudent/', body, { headers }).subscribe(data => {
        localStorage.setItem("token",data['token'])
        localStorage.setItem("uid",data['user_id'])
        localStorage.setItem("user",data['user'])
        this.isLoggedIn = true;
        this.router.navigate([this.redirectUrl]);
    });

  }

}

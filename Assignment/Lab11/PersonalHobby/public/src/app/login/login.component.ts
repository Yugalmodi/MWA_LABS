import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, Subscriber } from 'rxjs';

import { AuthService } from '../auth.service';
import { UserCredential } from '../registration/registration.component';
import { UsersService } from '../users.service';

export class LoginResponse{
  Success!:boolean;
  token!:string;
  constructor(Success:boolean, token:string){
    this.Success = Success;
    this.token = token;
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  notificationMessage!:string;
  isError:boolean = false;
  isSuccess:boolean = false;
  get isLoggedIn(){
    return this.authservice.isLoggedIn;
  }
  get username(){
    return this.authservice.username;
  }

  constructor(private userService:UsersService, private authservice:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  onLoginClick(myForm:NgForm){
    this.userService.login(this.fillForm(myForm.value)).subscribe({
      next:(loginResponse:LoginResponse)=>{
        this.authservice.token = loginResponse.token;
        this.authservice.isLoggedIn = true;
        this.router.navigate(["/"]);
      }, 
      error:(err)=>{
        this.displayMessage(err.error, true);
      }, 
      complete:()=>{
        console.log("complete");
      }
    });
  }
  displayMessage(message:string, isErrMsg:boolean){
    this.notificationMessage = message;
    if(isErrMsg){
      this.isError = true;
      this.isSuccess = false;
    } else{
      this.isError = false;
      this.isSuccess = true;
    }
  }
  fillForm(formData:UserCredential):UserCredential{
    // console.log(formData);
    const userCredential:UserCredential = new UserCredential("","", formData.username, formData.password);
    return userCredential;
  }
  logoutCilck(){
    this.authservice.clearToken();
    this.authservice.isLoggedIn = false;
    this.router.navigate(["/"]);
  }

  time = new Observable<string>((observer: Subscriber<string>) => {
    setInterval(() => observer.next(new Date().toString()), 1000);
});
}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { UserCredential } from '../registration/registration.component';
import { UsersService } from '../users.service';

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
      next:(loginResponse)=>{
        this.authservice.token = loginResponse.token;
        this.authservice.isLoggedIn = true;
        console.log(this.authservice.isLoggedIn );
        this.router.navigate(["/"]);
        // console.log("next", loginResponse);
        // this.displayMessage(environment.LOGIN_SUCCESS, false);
      }, 
      error:(err)=>{
        this.displayMessage(err.error, true);
        console.log("error", err.error);
        console.log("error2", err);
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
  fillForm(formData:any):UserCredential{
    console.log(formData);
    const userCredential:UserCredential = new UserCredential("","", formData.username, formData.password);
    return userCredential;
  }
  logoutCilck(){
    this.authservice.clearToken();
    this.authservice.isLoggedIn = false;
    this.router.navigate(["/"]);
  }
}

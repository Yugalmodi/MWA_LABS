import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
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

  constructor(private userService:UsersService) { }

  ngOnInit(): void {
  }

  onLoginClick(myForm:NgForm){
    this.userService.login(this.fillForm(myForm.value)).subscribe({
      next:(loginResponse)=>{
        console.log("next", loginResponse);
        this.displayMessage(environment.LOGIN_SUCCESS, false);
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
}

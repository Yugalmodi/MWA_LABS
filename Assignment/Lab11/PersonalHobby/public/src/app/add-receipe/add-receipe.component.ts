import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';

import { Receipe } from '../all-receipes/all-receipes.component';
import { ReceipeServiceService } from '../receipe-service.service';

@Component({
  selector: 'app-add-receipe',
  templateUrl: './add-receipe.component.html',
  styleUrls: ['./add-receipe.component.css']
})
export class AddReceipeComponent implements OnInit {
  @ViewChild("receipeForm")
  receipeForm!:NgForm;
  receipe!:Receipe;

  constructor(private service:ReceipeServiceService) { }
  
  ngOnInit(): void {
    setTimeout(()=>{
      // this.setDefaultForm();
    }, 0)
  }

  setDefaultForm(){
    this.receipe = new Receipe("", "", "");
    this.receipeForm.setValue(this.receipe);
  }
  onSubmit(){
    console.log("onSubmit called");
    if(!this.receipeForm.value.name || !this.receipeForm.value.country){
      this.displayMessage(environment.MSG_REC_EMP, true);
      return;
    }
    this.service.addOneReceipe(this.receipeForm.value).subscribe({
      next:(result)=>{
        this.setDefaultForm();      
      }, 
      error:(err)=>{
        console.log("Find an error", err);
        alert("Error Found\n"+err);
        this.displayMessage(err.message, true);
      },
      complete:()=>{
        this.displayMessage(environment.MSG_REC_ADD, false);
        console.log("Get All Receipe Completed");
      }
    });
  }

  notificationMessage!:string;
  isError:boolean = false;
  isSuccess:boolean = false;
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
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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
    console.log(this.receipeForm.value);
    this.service.addOneReceipe(this.receipeForm.value).subscribe({
      next:(result)=>{
        this.setDefaultForm();      
      }, 
      error:(err)=>{
        console.log("Find an error", err);
        alert("Error Found\n"+err);
      },
      complete:()=>{
        alert("Receipe Added Succesfully");
        console.log("Get All Receipe Completed");
      }
    });
  }

}

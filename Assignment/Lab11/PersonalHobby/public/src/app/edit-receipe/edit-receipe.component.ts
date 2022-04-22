import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Receipe } from '../all-receipes/all-receipes.component';
import { ReceipeServiceService } from '../receipe-service.service';

@Component({
  selector: 'app-edit-receipe',
  templateUrl: './edit-receipe.component.html',
  styleUrls: ['./edit-receipe.component.css']
})
export class EditReceipeComponent implements OnInit {
  @Input()
  receipeId!:string;
  @Input()
  receipe!:Receipe;

  @ViewChild("editReceipeForm")
  editReceipeForm!:NgForm;

  @Output()
  editReceipeEmitter: EventEmitter<number> = new EventEmitter<number>();

  isFormVisible = false;

  constructor(private service:ReceipeServiceService) { }

  ngOnInit(): void {
    setTimeout(()=>{
      // this.setDefaultForm();
    }, 0)
  }

  setDefaultForm(){
    console.log("setDefaultForm", this.receipe, this.editReceipeForm);
    this.editReceipeForm.setValue(this.receipe);
  }

  onEditClick(){
    this.isFormVisible = true;
  }

  onCancel(){
    this.isFormVisible = false;
  }

  onDelete(){
    console.log("onEdit called");
    this.service.deleteOneIngredient(this.receipeId, this.receipe._id).subscribe({
      next:(result)=>{
      }, 
      error:(err)=>{
        console.log("Find an error", err);
        this.editReceipeEmitter.emit(500);
      },
      complete:()=>{
        this.editReceipeEmitter.emit(200);
        console.log("Ingredient Delted");
        this.isFormVisible = false;
      }
    });
  }
  onUpdateClick(){
    console.log("onEdit called", this.editReceipeForm.value);
    this.service.editOneReceipe(this.receipeId, this.editReceipeForm.value).subscribe({
      next:(result)=>{
      }, 
      error:(err)=>{
        console.log("Find an error", err);
        this.editReceipeEmitter.emit(500);
      },
      complete:()=>{
        this.editReceipeEmitter.emit(200);
        console.log("Get All Receipe Completed");
        this.isFormVisible = false;
      }
    });
  }
}

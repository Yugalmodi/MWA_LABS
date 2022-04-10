import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredients } from '../all-receipes/all-receipes.component';
import { ReceipeServiceService } from '../receipe-service.service';

@Component({
  selector: 'app-edit-ingredient',
  templateUrl: './edit-ingredient.component.html',
  styleUrls: ['./edit-ingredient.component.css']
})
export class EditIngredientComponent implements OnInit {
  @Input()
  receipeId!:string;

  @Input()
  ingredient!:Ingredients;

  @ViewChild("ingredientForm",  { static: false })
  ingredientForm!:NgForm;

  @Output()
  editIngredientEmitter: EventEmitter<number> = new EventEmitter<number>();

  isFormVisible:boolean=false;

  constructor(private service:ReceipeServiceService) { }

  ngOnInit(): void {    
    setTimeout(()=>{
      this.setDefaultForm();
    }, 0)
  }

  setDefaultForm(){
    console.log("setDefaultForm", this.ingredient, this.ingredientForm);
    this.ingredientForm.setValue(this.ingredient);
  }

  onIngredientClick(){
    this.isFormVisible = true;
  }

  onCancel(){
    this.isFormVisible = false;
  }

  onDelete(){
    console.log("onEdit called");
    this.service.deleteOneIngredient(this.receipeId, this.ingredient._id).subscribe({
      next:(result)=>{
      }, 
      error:(err)=>{
        console.log("Find an error", err);
        this.editIngredientEmitter.emit(500);
      },
      complete:()=>{
        this.editIngredientEmitter.emit(200);
        console.log("Ingredient Delted");
        this.isFormVisible = false;
      }
    });
  }
  onEditClick(){
    console.log("onEdit called", this.ingredientForm.value);
    this.service.editOneIngredient(this.receipeId, this.ingredientForm.value).subscribe({
      next:(result)=>{
      }, 
      error:(err)=>{
        console.log("Find an error", err);
        this.editIngredientEmitter.emit(500);
      },
      complete:()=>{
        this.editIngredientEmitter.emit(200);
        console.log("Get All Receipe Completed");
        this.isFormVisible = false;
      }
    });
  }
}

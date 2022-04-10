import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Ingredients } from '../all-receipes/all-receipes.component';
import { ReceipeServiceService } from '../receipe-service.service';

@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.component.html',
  styleUrls: ['./add-ingredient.component.css']
})
export class AddIngredientComponent implements OnInit {
  @Input()
  receipeId!:string;

  @ViewChild("ingredientForm",  { static: false })
  ingredientForm!:NgForm;

  @Output()
  addIngredientEmitter: EventEmitter<number> = new EventEmitter<number>();

  ingredient!:Ingredients;
  isFormVisible:boolean=false;

  constructor(private service:ReceipeServiceService) { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.setDefaultForm();
    }, 0)
  }

  setDefaultForm(){
    this.ingredient = new Ingredients("", "", "");
    console.log("setDefaultForm", this.ingredient, this.ingredientForm);
    this.ingredientForm.setValue(this.ingredient);
  }

  onIngredientClick(){
    this.isFormVisible = true;
  }
  onCancelClick(){
    this.isFormVisible = false;
  }
  onSubmit(){
    console.log(this.ingredientForm.value);
    this.service.addOneIngredient(this.receipeId, this.ingredientForm.value).subscribe({
      next:(result)=>{
      }, 
      error:(err)=>{
        console.log("Find an error", err);
        this.addIngredientEmitter.emit(500);
      },
      complete:()=>{
        this.addIngredientEmitter.emit(200);
        console.log("Get All Receipe Completed");
        this.isFormVisible = false;
      }
    });
  }

}
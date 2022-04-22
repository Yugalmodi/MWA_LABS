import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Ingredients } from '../all-receipes/all-receipes.component';
import { ReceipeServiceService } from '../receipe-service.service';

@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.component.html',
  styleUrls: ['./add-ingredient.component.css']
})
export class AddIngredientComponent implements OnInit, AfterViewInit {
  @Input()
  receipeId!:string;

  @ViewChild("addIngredientForm")
  addIngredientForm!:NgForm;

  @Output()
  addIngredientEmitter: EventEmitter<number> = new EventEmitter<number>();

  ingredient!:Ingredients;
  isFormVisible:boolean=false;

  constructor(private service:ReceipeServiceService) { }
  ngAfterViewInit(): void {
    console.log("ngAfterViewInit", this.addIngredientForm);
  }

  ngOnInit(): void {
    console.log("ngOnInit", this.addIngredientForm);
    setTimeout(()=>{
      // this.setDefaultForm();
    }, 0)
  }

  setDefaultForm(){
    this.ingredient = new Ingredients("", "", "");
    this.addIngredientForm.setValue(this.ingredient);
  }

  onIngredientClick(){
    this.isFormVisible = true;
  }
  onCancelClick(){
    this.isFormVisible = false;
  }
  onSubmit(){
    console.log(this.addIngredientForm.value);
    this.service.addOneIngredient(this.receipeId, this.addIngredientForm.value).subscribe({
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
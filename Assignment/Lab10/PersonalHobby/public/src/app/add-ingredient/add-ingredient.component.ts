import { Component, Input, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild("ingredientForm")
  ingredientForm!:NgForm;

  ingredient!:Ingredients;
  isFormVisible:boolean=false;

  constructor(private service:ReceipeServiceService, private router:Router) { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.setDefaultForm();
    }, 0)
  }

  setDefaultForm(){
    this.ingredient = new Ingredients("", "");
    this.ingredientForm.setValue(this.ingredient);
  }

  onIngredientClick(){
    this.isFormVisible = true;
  }

  onSubmit(){
    this.isFormVisible = false;
    console.log("onSubmit called");
    console.log(this.ingredientForm.value);
    this.service.addOneIngredient(this.receipeId, this.ingredientForm.value).subscribe({
      next:(result)=>{
        this.router.navigate(['/receipes/'+this.receipeId]);
        this.setDefaultForm();
      }, 
      error:(err)=>{
        console.log("Find an error", err);
      },
      complete:()=>{
        console.log("Get All Receipe Completed");
      }
    });
  }

}

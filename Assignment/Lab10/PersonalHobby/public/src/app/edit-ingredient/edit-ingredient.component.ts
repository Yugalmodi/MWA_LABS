import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredients } from '../all-receipes/all-receipes.component';
import { ReceipeServiceService } from '../receipe-service.service';

@Component({
  selector: 'app-edit-ingredient',
  templateUrl: './edit-ingredient.component.html',
  styleUrls: ['./edit-ingredient.component.css']
})
export class EditIngredientComponent implements OnInit, AfterViewInit {
  @Input()
  receipeId!:string;

  @Input()
  ingredient!:Ingredients;

  @ViewChild("editIngredientForm",  { static: false })
  editIngredientForm!:NgForm;

  @Output()
  editIngredientEmitter: EventEmitter<number> = new EventEmitter<number>();

  isFormVisible:boolean=false;

  constructor(private service:ReceipeServiceService) { }
  ngAfterViewInit(): void {
    setTimeout(()=>{
      // this.setDefaultForm();
    }, 0)
  }

  ngOnInit(): void { 
  }

  setDefaultForm(){
    console.log("setDefaultForm", this.ingredient, this.editIngredientForm);
    this.editIngredientForm.setValue(this.ingredient);
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
    console.log("onEdit called", this.editIngredientForm.value);
    this.service.editOneIngredient(this.receipeId, this.ingredient._id, this.editIngredientForm.value).subscribe({
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

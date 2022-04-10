import { Component, OnInit } from '@angular/core';
import { ReceipeServiceService } from '../receipe-service.service';

export class Ingredients {
  _id!:string;
  name!:string;
  color!:string;
  constructor(id:string, name:string, color?:string){
    this._id = id
    this.name= name;
    this.color = color??'';
  }
}

export class Receipe {
  _id!:string;
  name!:string;
  country!:string;
  ingredients!:Ingredients[]

  constructor (_id:string, name:string, country:string, ingredient?:Ingredients[]){
    this._id = _id;
    this.name = name;
    this.country = country;
    this.ingredients= ingredient??[];
  }
}

@Component({
  selector: 'app-all-receipes',
  templateUrl: './all-receipes.component.html',
  styleUrls: ['./all-receipes.component.css']
})
export class AllReceipesComponent implements OnInit {
  receipes!:Receipe[];
  constructor(private service:ReceipeServiceService) { 
  }

  ngOnInit(): void {
    this.service.getAllReceipe().subscribe({
      next:(result)=>{
        this.receipes = result;
        console.log(this.receipes);
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

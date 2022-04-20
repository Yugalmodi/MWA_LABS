import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  countList:number[] = [3, 5, 8, 10];
  ngSelectCount = this.countList[0];
  constructor(private service:ReceipeServiceService) { 
  }

  ngOnInit(): void {
    this.getDataFromServer();
  }

  getDataFromServer(){
    this.service.getAllReceipe(this.ngSelectCount, '', '').subscribe({
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
  onChange(value:any){
    this.ngSelectCount = value;
    this.getDataFromServer();
  }
}

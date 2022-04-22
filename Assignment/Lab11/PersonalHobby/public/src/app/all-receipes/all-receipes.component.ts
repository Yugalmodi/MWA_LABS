import { Component, OnInit, ViewChild } from '@angular/core';

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
    // console.log("getDataFromServer", this.offset, this.ngSelectCount);
    
    this.service.getAllReceipe(this.offset, this.ngSelectCount, '', '').subscribe({
        next:(result)=>{
          this.receipes = result;
          // console.log(this.receipes);
        }, 
        error:(err)=>{
          console.log("Find an error", err);
        },
        complete:()=>{
          console.log("Get All Receipe Completed");
        }
    });
  }
  onChange(value:number){
    this.ngSelectCount = Number(value);
    this.getDataFromServer();
  }

  offset: number = 0;
  disableNext: boolean = false;
  disablePrev: boolean = true;

  previous(): void {
    if (this.offset > 0) {
      this.offset = this.offset - this.ngSelectCount;
    }
    if (this.offset <= 0) {
      this.offset = 0;
      this.disablePrev = true;
    }
    this.getDataFromServer();
  }

  next(): void {    
    this.offset = this.offset+this.ngSelectCount;
    this.disablePrev = false;
    this.getDataFromServer();
  }
}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Receipe } from '../all-receipes/all-receipes.component';
import { ReceipeServiceService } from '../receipe-service.service';

@Component({
  selector: 'app-search-receipe',
  templateUrl: './search-receipe.component.html',
  styleUrls: ['./search-receipe.component.css']
})
export class SearchReceipeComponent implements OnInit {
  receipes!:Receipe[];
  ngSelectCount = 10;
  
  searchList:string[] = ["name","country"];
  ngSelectSearch = this.searchList[0];

  constructor(private service:ReceipeServiceService) { }

  ngOnInit(): void {
  }

  onSearch(formData:NgForm){
    this.getDataFromServer(formData.value.searchBy, formData.value.search_query);
  }

  getDataFromServer(searchBy:string, query:string){
    this.service.getAllReceipe(0, this.ngSelectCount, searchBy, query).subscribe({
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

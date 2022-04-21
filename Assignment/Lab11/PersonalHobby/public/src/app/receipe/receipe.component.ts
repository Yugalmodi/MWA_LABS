import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Receipe } from '../all-receipes/all-receipes.component';
import { AuthService } from '../auth.service';
import { ReceipeServiceService } from '../receipe-service.service';

@Component({
  selector: 'app-receipe',
  templateUrl: './receipe.component.html',
  styleUrls: ['./receipe.component.css']
})
export class ReceipeComponent implements OnInit {
  get isLoggedIn(){
    return this.authservice.isLoggedIn;
  }

  receipe!:Receipe;
  receipeId!:string;

  constructor(private activeRoute:ActivatedRoute, private service:ReceipeServiceService, private authservice:AuthService) { 
    this.receipe= new Receipe("", "", "", []);
  }
  
  ngOnInit(): void {
    this.receipeId = this.activeRoute.snapshot.params["receipeId"];
    this._updateReceipe();
  }

  _updateReceipe(){
    this.service.getOneReceipe(this.receipeId).subscribe({
      next:(result)=>{
        this.receipe = result;
      }, 
      error:(err)=>{
        console.log("Find an error", err);
      },
      complete:()=>{
        console.log("Get All Receipe Completed");
      }
    });
  }

  onIngredientChange(status:any){
    console.log("onIngredientAdded", status);
    this._onDataChanges(status);
  }
  onReceipeChange(status:any){
    console.log("onReceipeChange", status);
    this._onDataChanges(status);
  }
  _onDataChanges(status:any){
    if(status==200){
      this._updateReceipe();
    }
  }
}

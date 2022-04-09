import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Receipe } from '../all-receipes/all-receipes.component';
import { ReceipeServiceService } from '../receipe-service.service';

@Component({
  selector: 'app-receipe',
  templateUrl: './receipe.component.html',
  styleUrls: ['./receipe.component.css']
})
export class ReceipeComponent implements OnInit {
  receipe!:Receipe;

  constructor(private activeRoute:ActivatedRoute, private service:ReceipeServiceService) { 
    this.receipe= new Receipe("", "", "", []);
  }

  ngOnInit(): void {
    const receipeId = this.activeRoute.snapshot.params["receipeId"];
    this.service.getOneReceipe(receipeId).subscribe({
      next:(result)=>{
        this.receipe = result;
        console.log(this.receipe);
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

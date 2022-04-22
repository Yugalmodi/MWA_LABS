import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ReceipeServiceService } from '../receipe-service.service';

@Component({
  selector: 'app-delete-receipe',
  templateUrl: './delete-receipe.component.html',
  styleUrls: ['./delete-receipe.component.css']
})
export class DeleteReceipeComponent implements OnInit {
  @Input()
  receipeId!:string;

  constructor(private service:ReceipeServiceService, private router:Router) { }

  ngOnInit(): void {
  }

  onDelete(){
    console.log(this.receipeId);
    this.service.deleteOneReceipe(this.receipeId).subscribe({
      next:(result)=>{
        this.router.navigate(['/receipes']);
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

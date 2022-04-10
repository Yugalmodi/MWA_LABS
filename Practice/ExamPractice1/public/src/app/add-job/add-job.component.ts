import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent implements OnInit {
  @ViewChild("addJobForm")
  addJobForm!:NgForm;

  constructor(private service:JobsService) { }

  ngOnInit(): void {
  }
  onAdd(){
    console.log(this.addJobForm.value);
    this.service.addOneJob(this.addJobForm.value).subscribe({
      next:()=>{
        console.log("Added succedsfullly");
      },
      error:(err)=>{
        console.log("OnAdd err"), err;
      },
      complete:()=>{
        console.log("Added Completed");
      }
    });
  }
}

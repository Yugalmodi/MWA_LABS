import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Job } from '../all-jobs/all-jobs.component';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-one-job',
  templateUrl: './one-job.component.html',
  styleUrls: ['./one-job.component.css']
})
export class OneJobComponent implements OnInit {
  jobId!:string;
  job!:Job;
  constructor(private service:JobsService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.jobId = this.route.snapshot.params["jobId"];
    this.getJobFromServer();
  }

  getJobFromServer(){
    this.service.getOneJob(this.jobId).subscribe({
      next:(result)=>{
        this.job = result;
      },
      error:(err)=>{
        console.log(err);
      },
      complete:()=>{
        console.log("Get One Job - completed");
      },
    });
  }
}

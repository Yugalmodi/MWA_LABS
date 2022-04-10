import { Component, OnInit } from '@angular/core';
import { JobsService } from '../jobs.service';

export class Location {
  _id!:string;
  address!:string;
  city!:string;
  state!:string;
  zip!:number;
  country!:string;
  constructor (id:string, address:string, city:string, state:string, zip:string, country:string){
    this._id = id;
    this.address = address;
    this.city = city;
    this.state = state;
    this.country = country;
  }
}
export class Job {
  _id!:string;
  title!:string;
  salary!:number;
  location!:Location;
  description!:string;
  experience!:number;
  postDate!:Date;
  skills!:string[];

  constructor (id:string, title:string, salary:number, description:string,
         experience:number, postDate:Date, skills:string[], location:Location){
        this._id = id;
        this.title = title;
        this.salary = salary; 
        this.location = location;
        this.description = description;
        this.experience = experience;
        this.postDate = postDate;
        this.skills = skills;
  }
}

@Component({
  selector: 'app-all-jobs',
  templateUrl: './all-jobs.component.html',
  styleUrls: ['./all-jobs.component.css']
})
export class AllJobsComponent implements OnInit {
  jobs!:Job[];

  constructor(private service:JobsService) { }

  ngOnInit(): void {
    this.getJobsFromServer();
  }

  getJobsFromServer(){
    this.service.getAllJobs().subscribe({
      next:(result)=>{
        this.jobs = result;
      },
      error:(err)=>{
        console.log("Get All Jobs errro", err);
        
      },
      complete:()=>{
        console.log("GetAllJobs Completed");
        
      }
    });
  }
}

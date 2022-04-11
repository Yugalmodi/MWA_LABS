import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  postDate!:string;
  skills!:string[];

  constructor (id:string, title:string, salary:number, description:string,
         experience:number, postDate:string, skills:string[], location:Location){
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
  // jobs!:Job[];
  jobs : Job[] = [];
  duration:number = 0;
  constructor(private service:JobsService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    const duration:number = this.route.snapshot.params["duration"] || 0;
    console.log(duration);
    this.getJobsFromServer(duration);
  }

  getJobsFromServer(duration:number){
    const params = this.getRequestParams(this.page, this.pageSize);
    this.service.getAllJobs(duration, params).subscribe({
      next:(results)=>{
        const {result, newCount} = results;
        this.jobs = result;
        this.count = newCount;
        console.log(results, result, newCount);
        
      },
      error:(err)=>{
        console.log("Get All Jobs errro", err);
        
      },
      complete:()=>{
        console.log("GetAllJobs Completed"); 
      }
    });
  }


  /////
  //PAGINATION
  ///
  page:number = 0;
  count:number = 1;
  pageSize:number = 5;
  handelPageChange(event:any){
    this.page = event;
    this.getJobsFromServer(0);
  }
  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getJobsFromServer(0);
  }
  
  getRequestParams(page: number, pageSize: number): any {
    let params: any = {};
    console.log(page, pageSize);
    if (page) {
      params[`offset`] = pageSize*(page-1);
    }
    if (pageSize) {
      params[`count`] = pageSize;
    }
    return params;
  }
}

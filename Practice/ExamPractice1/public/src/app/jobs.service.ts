import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Job } from './all-jobs/all-jobs.component';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private http:HttpClient) { }

  getAllJobs(duration:number):Observable<Job[]>{
    let url = environment.BASE_URL+"jobs";
    if(duration>0){
      url = url+"?duration="+duration;
    }
    return this.http.get<Job[]>(url);
  }
  getOneJob(jobId:string):Observable<Job>{
    const url = environment.BASE_URL+"jobs/"+jobId;
    return this.http.get<Job>(url);
  }
  addOneJob(job:any):Observable<any>{
    const url = environment.BASE_URL+"jobs";
    return this.http.post<any>(url, job);
  }
}

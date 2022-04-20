import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';

export class Course{
  _id!:string;
  name!:string;
  duration!:number
  constructor(id:string, name:string, duration?:number){
    this._id = id;
    this.name = name;
    this.duration=duration??0;
  }
}

export class Student{
  _id!:string;
 name!:string;
 gpa!:number;
 courses!:Course[];
 constructor (id:string, name:string, gpa:number, courses?:Course[]){
   this._id = id;
   this.name = name;
   this.gpa = gpa;
   this.courses = courses??[];
 }
}

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.css']
})
export class AllStudentsComponent implements OnInit {
  students!:Student[];

  constructor(private service:StudentService) { }

  ngOnInit(): void {
    this.getStudentsFromServer();
  }

  getStudentsFromServer(){
    this.service.getAllStudents().subscribe({
      next:(result)=>{
        this.students =result;
      }, 
      error:(err)=>{
        console.log(err);
      }, 
      complete:()=>{

      }
    });
  }
}

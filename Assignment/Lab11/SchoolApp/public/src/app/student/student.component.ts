import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../all-students/all-students.component';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  studentId!:string;
  student!:Student;
  constructor(private route:ActivatedRoute, private service: StudentService) {
    this.student = new Student("", "", 0);
   }

  ngOnInit(): void {
    this.studentId = this.route.snapshot.params["studentId"];
    this.getStudentFromServer();
  }

  getStudentFromServer(){
    console.log("getOneStudent", this.studentId);
    this.service.getOneStudent(this.studentId).subscribe({
      next:(result)=>{
        this.student = result;
        console.log("GetOneStudnet next");
      },
      error:(err)=>{
        console.log(err);
      }, 
      complete:()=>{
        console.log("GetOneStudnet Complete");
        
      }
    });
  }

}

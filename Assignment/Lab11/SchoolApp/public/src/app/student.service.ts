import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Student } from './all-students/all-students.component';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http:HttpClient) { }

  getAllStudents():Observable<Student[]>{
    const url = environment.BASE_URL+"students"
    return this.http.get<Student[]>(url);
  }
  getOneStudent(studentId: string):Observable<Student>{
    const url = environment.BASE_URL+"students/"+studentId;
    return this.http.get<Student>(url);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { UserCredential } from './registration/registration.component';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  register(credential:UserCredential) : Observable<any>{
    return this.http.post(environment.URL_REGISTER, credential);
  }
  
  login(credential:UserCredential) : Observable<any>{
    return this.http.post(environment.URL_LOGIN, credential);
  } 

}

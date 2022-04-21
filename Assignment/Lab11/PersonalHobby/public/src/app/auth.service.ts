import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private jwtService:JwtHelperService) { }
  #isLoggedIn:boolean=false;

  get username(){ 
    let username = "Unknown";
    if(this.token){
      username = this.jwtService.decodeToken(this.token).username;
    }
    return username; 
  }
  set token(token:string){ 
    localStorage.setItem(environment.TOKEN_STORAGE_KEY, token);
  }
  get token(){ 
    return localStorage.getItem(environment.TOKEN_STORAGE_KEY) as string;
   }
   set isLoggedIn(isLoggedIn:boolean){ 
     this.#isLoggedIn = isLoggedIn; 
   }
   get isLoggedIn(){ 
     return this.#isLoggedIn; 
   }

  clearToken(){
    localStorage.clear();
    this.isLoggedIn = false;
  }
}

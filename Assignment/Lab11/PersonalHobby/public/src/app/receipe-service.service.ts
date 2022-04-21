import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'

import { Observable } from 'rxjs';

import { Ingredients, Receipe } from './all-receipes/all-receipes.component';
import { environment } from 'src/environments/environment.dev';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReceipeServiceService {
  constructor(private http:HttpClient, private _authService:AuthService) { }

  getAllReceipe(offset:number, count:number, searchBy:string, query:string):Observable<Receipe[]>{
    if(query && query!=''){
      query = searchBy+"="+query;
    }
    const url= environment.BASE_URL+"receipes?offset="+offset+"&count="+count+"&"+query;
    return this.http.get<Receipe[]>(url);
  }

  getOneReceipe(receipeId:string):Observable<Receipe>{
    const url= environment.BASE_URL+"receipes/"+receipeId;
    return this.http.get<Receipe>(url);
  }

  deleteOneReceipe(receipeId:string):Observable<any>{
    const url= environment.BASE_URL+"receipes/"+receipeId;
    return this.http.delete<any>(url, this._authService.geTokenHeader());
  }

  addOneReceipe(receipe:Receipe):Observable<any>{
    const url= environment.BASE_URL+"receipes";    
    return this.http.post<any>(url, receipe, this._authService.geTokenHeader()); 
  }

  editOneReceipe(receipeId:string, receipe:Receipe):Observable<any>{
    const url= environment.BASE_URL+"receipes/"+receipeId;
    console.log("editOneReceipe", url, receipeId, receipe);
    return this.http.patch<any>(url, receipe, this._authService.geTokenHeader()); 
  }

  addOneIngredient(receipeId:string, ingredient:Ingredients):Observable<any>{
    const url= environment.BASE_URL+"receipes/"+receipeId+"/ingredients";
    return this.http.post<any>(url, ingredient, this._authService.geTokenHeader()); 
  }

  editOneIngredient(receipeId:string, ingredientId:string, ingredient:Ingredients):Observable<any>{
    const url= environment.BASE_URL+"receipes/"+receipeId+"/ingredients/"+ingredientId;    
    return this.http.patch<any>(url, ingredient, this._authService.geTokenHeader()); 
  }

  deleteOneIngredient(receipeId:string, ingredientId:string):Observable<any>{
    const url= environment.BASE_URL+"receipes/"+receipeId+"/ingredients/"+ingredientId;
    return this.http.delete<any>(url, this._authService.geTokenHeader());
  }


}

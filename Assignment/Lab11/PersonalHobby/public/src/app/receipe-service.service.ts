import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

import { Observable } from 'rxjs';

import { Ingredients, Receipe } from './all-receipes/all-receipes.component';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class ReceipeServiceService {
  constructor(private http:HttpClient) { }

  getAllReceipe(count:number, searchBy:string, query:string):Observable<Receipe[]>{
    if(query && query!=''){
      query = searchBy+"="+query;
    } else if(!count){
      query = "count="+count;
    }
    const url= environment.BASE_URL+"receipes?count="+count+"&"+query;
    console.log("getAllReceipeBySearch", url, query);
    return this.http.get<Receipe[]>(url);
  }

  getOneReceipe(receipeId:string):Observable<Receipe>{
    const url= environment.BASE_URL+"receipes/"+receipeId;
    return this.http.get<Receipe>(url);
  }

  deleteOneReceipe(receipeId:string):Observable<any>{
    const url= environment.BASE_URL+"receipes/"+receipeId;
    return this.http.delete<any>(url);
  }

  addOneReceipe(receipe:Receipe):Observable<any>{
    const url= environment.BASE_URL+"receipes";    
    return this.http.post<any>(url, receipe); 
  }

  editOneReceipe(receipeId:string, receipe:Receipe):Observable<any>{
    const url= environment.BASE_URL+"receipes/"+receipeId;
    console.log("editOneReceipe", url, receipeId, receipe);
    return this.http.patch<any>(url, receipe); 
  }

  addOneIngredient(receipeId:string, ingredient:Ingredients):Observable<any>{
    const url= environment.BASE_URL+"receipes/"+receipeId+"/ingredients";
    return this.http.post<any>(url, ingredient); 
  }

  editOneIngredient(receipeId:string, ingredientId:string, ingredient:Ingredients):Observable<any>{
    const url= environment.BASE_URL+"receipes/"+receipeId+"/ingredients/"+ingredientId;    
    return this.http.patch<any>(url, ingredient); 
  }

  deleteOneIngredient(receipeId:string, ingredientId:string):Observable<any>{
    const url= environment.BASE_URL+"receipes/"+receipeId+"/ingredients/"+ingredientId;
    return this.http.delete<any>(url);
  }
}

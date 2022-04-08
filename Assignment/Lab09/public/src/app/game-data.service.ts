import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Games } from './games-list/games-list.component';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {
  private _baseUrl:string = "http://localhost:3000/api";

  constructor(private http:HttpClient) { }

  getAllGames():Observable<Games[]>{
    const url:string = this._baseUrl+"/games";
    return this.http.get<Games[]>(url);
  }
  getOneGame(gameId:string):Observable<Games>{
    const url:string = this._baseUrl+"/games/"+gameId;
    return this.http.get<Games>(url);
  }
  deleteOne(gameId:string){
    const url:string = this._baseUrl+"/games/"+gameId;
    return this.http.delete<Games>(url);
  }
  addGame(newGame:any){
    const url:string = this._baseUrl+"/games/";
    return this.http.post(url,newGame);
  }
}
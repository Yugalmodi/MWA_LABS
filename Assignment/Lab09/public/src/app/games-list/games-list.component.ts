import { Component, OnInit } from '@angular/core';
import { GameDataService } from '../game-data.service';
export class Games{
  _id!:string;
  title!:string;
  year!:number;
  rate!:number;
  price!:number;
  minPlayers!:number;
  maxPlayers!:number;
  minAge!:number;
}

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {
  games!:Games[];

  constructor(private gameDataservice:GameDataService) {}

  ngOnInit(): void {
    // this.getStaticData();
    this.getDBData();
  }

  getDBData():void{
    this.gameDataservice.getAllGames().subscribe(games=>this.games=games);
  }
  getStaticData():void{
    this.games=[
      {_id:"abcd12344",title:"Windows game",year:2008, price:99.0, rate:1, minPlayers:3, maxPlayers:10, minAge:10},
      {_id:"abcd12345",title:"Hockey",year:2018, price:89.78, rate:3, minPlayers:10, maxPlayers:15, minAge:10},
      {_id:"abcd12346",title:"Footbal",year:2080, price:23.33, rate:3, minPlayers:3, maxPlayers:10, minAge:10},
      {_id:"abcd12347",title:"cricket",year:2000, price:17.99, rate:5, minPlayers:3, maxPlayers:10, minAge:10},
      {_id:"abcd12348",title:"Tennis",year:1999, price:19.00, rate:4, minPlayers:3, maxPlayers:10, minAge:10}
    ];
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameDataService } from '../game-data.service';
import { Games } from '../games-list/games-list.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  game!:Games;
  constructor(private route:ActivatedRoute, private gameDataservice:GameDataService) { }

  ngOnInit(): void {
    const gameId = this.route.snapshot.params["gameId"];
    this.gameDataservice.getOneGame(gameId).subscribe(game=>{
      console.log(game);
      
      this.game=game})
  }

}

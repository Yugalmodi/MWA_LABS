import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameDataService } from '../game-data.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})

export class DeleteComponent implements OnInit {
  _gameId!:string;
  constructor(private gameDataservice:GameDataService, private router:Router) { }

  ngOnInit(): void {
  }

  @Input()
  set gameId(gameId:string){
    this._gameId = gameId;
  }

  onDelete():void{
    console.log("OnDelete Called", this._gameId);
    this.gameDataservice.deleteOne(this._gameId).subscribe(result=>{
      this.router.navigate(["games"]);
    });
  }
}

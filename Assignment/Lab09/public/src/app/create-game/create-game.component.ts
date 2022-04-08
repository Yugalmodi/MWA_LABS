import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GameDataService } from '../game-data.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent implements OnInit {
  addForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private gamsService: GameDataService) {
    this.addForm = formBuilder.group({
      title: "",
      rate: 0,
      price: 0.0,
      year: 0,
      minPlayers: 0,
      maxPlayers: 0,
      minAge: 0
    })
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log("This is onSubmit");

    this.gamsService.addGame(this.addForm.value).subscribe(
      output => console.log("Success", output)
    )
  }

}

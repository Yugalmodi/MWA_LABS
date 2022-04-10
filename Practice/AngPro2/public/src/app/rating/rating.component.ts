import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  stars!:number[];
  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  set rate(star: number){
    this.stars=new Array<number>(star);
  }
}

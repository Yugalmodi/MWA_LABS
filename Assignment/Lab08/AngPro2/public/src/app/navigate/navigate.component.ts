import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigate',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.css']
})
export class NavigateComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit(): void {
  }

  onHome() :void{
    this._router.navigate([""]);
  }
  onGame():void{    
    this._router.navigate(['games']);
  }
}

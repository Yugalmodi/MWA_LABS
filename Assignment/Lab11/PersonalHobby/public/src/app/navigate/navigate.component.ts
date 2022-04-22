import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';


@Component({
  selector: 'app-navigate',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.css']
})
export class NavigateComponent implements OnInit {
  get isLoggedIn(){
    return this.authservice.isLoggedIn;
  }
  constructor(private router:Router, private authservice:AuthService) { }

  ngOnInit(): void {
  }

}

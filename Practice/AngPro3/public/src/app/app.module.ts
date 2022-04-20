import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavigateComponent } from './navigate/navigate.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { GamesListComponent } from './games-list/games-list.component';
import { GameComponent } from './game/game.component';
import { RatingComponent } from './rating/rating.component';
import { DeleteComponent } from './delete/delete.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigateComponent,
    FooterComponent,
    HomeComponent,
    GamesListComponent,
    GameComponent,
    RatingComponent,
    DeleteComponent,
    CreateGameComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path:"",
        component:HomeComponent
      },
      {
        path:"games",
        component:GamesListComponent
      },
      {
        path:"registration",
        component:RegistrationComponent
      },
      {
        path:"games/:gameId",
        component:GameComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

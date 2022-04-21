import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MyErrorComponent } from './my-error/my-error.component';
import { FormsModule } from '@angular/forms';
import {JwtHelperService, JWT_OPTIONS} from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { NavigateComponent } from './navigate/navigate.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { AllReceipesComponent } from './all-receipes/all-receipes.component';
import { ReceipeComponent } from './receipe/receipe.component';
import { DeleteReceipeComponent } from './delete-receipe/delete-receipe.component';
import { AddReceipeComponent } from './add-receipe/add-receipe.component';
import { EditIngredientComponent } from './edit-ingredient/edit-ingredient.component';
import { AddIngredientComponent } from './add-ingredient/add-ingredient.component';
import { EditReceipeComponent } from './edit-receipe/edit-receipe.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { SearchReceipeComponent } from './search-receipe/search-receipe.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigateComponent,
    HomeComponent,
    FooterComponent,
    AllReceipesComponent,
    ReceipeComponent,
    DeleteReceipeComponent,
    AddReceipeComponent,
    MyErrorComponent,
    EditIngredientComponent,
    AddIngredientComponent,
    EditReceipeComponent,
    RegistrationComponent,
    LoginComponent,
    SearchReceipeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path:"",
        component:HomeComponent
      },
      {
        path:"receipes",
        component:AllReceipesComponent
      },
      {
        path:"receipes/:receipeId",
        component:ReceipeComponent
      },
      {
        path:"addNew",
        component:AddReceipeComponent
      },
      {
        path:"register",
        component:RegistrationComponent
      },
      {
        path:"search",
        component:SearchReceipeComponent
      },
      {
        path:"**",
        component:MyErrorComponent
      },
    ])
  ],
  providers: [{provide:JWT_OPTIONS, useValue:JWT_OPTIONS}, JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }

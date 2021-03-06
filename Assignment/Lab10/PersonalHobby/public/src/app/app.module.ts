import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavigateComponent } from './navigate/navigate.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { AllReceipesComponent } from './all-receipes/all-receipes.component';
import { ReceipeComponent } from './receipe/receipe.component';
import { DeleteReceipeComponent } from './delete-receipe/delete-receipe.component';
import { AddReceipeComponent } from './add-receipe/add-receipe.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MyErrorComponent } from './my-error/my-error.component';
import { FormsModule } from '@angular/forms';
import { EditIngredientComponent } from './edit-ingredient/edit-ingredient.component';
import { AddIngredientComponent } from './add-ingredient/add-ingredient.component';
import { EditReceipeComponent } from './edit-receipe/edit-receipe.component';

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
    EditReceipeComponent
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
        path:"**",
        component:MyErrorComponent
      },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FooteerComponent } from './footeer/footeer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { AllStudentsComponent } from './all-students/all-students.component';
import { StudentComponent } from './student/student.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooteerComponent,
    NavigationComponent, 
    AllStudentsComponent, 
    StudentComponent
  ],
  imports: [
    BrowserModule, 
    HttpClientModule, 
    RouterModule.forRoot([
      {
        path:"",
        component:HomeComponent
      },
      {   
        path:"students",
        component:AllStudentsComponent
      },
      {   
        path:"students/:studentId",
        component:StudentComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})  
export class AppModule { }
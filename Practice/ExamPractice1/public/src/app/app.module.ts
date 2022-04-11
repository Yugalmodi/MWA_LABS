import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { AllJobsComponent } from './all-jobs/all-jobs.component';
import { OneJobComponent } from './one-job/one-job.component';
import { RouterModule } from '@angular/router';
import { AddJobComponent } from './add-job/add-job.component';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination'

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    AllJobsComponent,
    OneJobComponent,
    AddJobComponent
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path:"",
        component:HomeComponent
      },
      {
        path:"jobs",
        component:AllJobsComponent
      },
      {
        path:"alljobs/:duration",
        component:AllJobsComponent
      },
      {
        path:"jobs/:jobId",
        component:OneJobComponent
      },
      {
        path:"add",
        component:AddJobComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

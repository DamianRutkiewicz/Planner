import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule , Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { SettingsComponent } from './settings/settings.component';
import { RegisterComponent } from './register/register.component';
import { PulpitComponent } from './pulpit/pulpit.component';
import { PlannerComponent } from './planner/planner.component';
import { NoteComponent } from './note/note.component';
import { MainmenuComponent } from './mainmenu/mainmenu.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { environment } from '../environments/environment';

import { AuthService } from './connect-db.service';
import { RowService } from './planner/rows/row.service';
import { RowComponent } from './planner/rows/row/row.component';

import { ContextMenuModule } from '../../node_modules/ngx-contextmenu';
import { TimelineComponent } from './planner/rows/timeline/timeline.component';
import { ColumnTdComponent } from './planner/rows/row/column/column.component';
import { ChangeColorComponent } from './planner/rows/row/column/change-color/change-color.component';


// export const firebase = {
//     apiKey: "AIzaSyCxzsxWDEmZVtnZAYgQ3ojuAQ44x0Q5hGE",
//     authDomain: "plannerdb-86284.firebaseapp.com",
//     databaseURL: "https://plannerdb-86284.firebaseio.com",
//     projectId: "plannerdb-86284",
//     storageBucket: "plannerdb-86284.appspot.com",
//     messagingSenderId: "1061006930360"
//   };


const appRoutes:Routes=[
  {
    path:'',
    component:StartComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent,
    children:[
      {
        path:'',
        redirectTo: 'pulpit',
        pathMatch:'full'
      },
      {
        path:'pulpit',
        component:PulpitComponent
      },
      {
        path:'planner',
        component:PlannerComponent
      },
      {
        path:'settings',
        component:SettingsComponent
      },
      {
        path:'about',
        component:AboutComponent
      }
    ]
  },
]

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    SettingsComponent,
    RegisterComponent,
    PulpitComponent,
    PlannerComponent,
    NoteComponent,
    MainmenuComponent,
    LoginComponent,
    HeaderComponent,
    DashboardComponent,
    AboutComponent,
    RowComponent,
    TimelineComponent,
    ColumnTdComponent,
    ChangeColorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ContextMenuModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [AuthService, RowService],
  bootstrap: [AppComponent]
})
export class AppModule { }

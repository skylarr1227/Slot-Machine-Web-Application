import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AngularFireModule} from 'angularfire2';
import {FirebaseService} from './services/firebase.service';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

import { NavbarComponent } from './components/navbar/navbar.component';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule, AUTH_PROVIDERS } from 'angularfire2/auth';
import { SlotMachineComponent } from './components/slot-machine/slot-machine.component';
import { StatisticsComponent } from './components/statistics/statistics.component';


import { ChartsModule } from 'ng2-charts';
import { HomeComponent } from './components/home/home.component';

const appRoutes: Routes = [
  {path:'', component:HomeComponent},
  {path:'machine', component:SlotMachineComponent},
  {path:'stats', component:StatisticsComponent}
  
  
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SlotMachineComponent,
    StatisticsComponent,
    HomeComponent,
 
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule,
    ChartsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }

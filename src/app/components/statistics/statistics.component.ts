import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { FirebaseService } from '../../services/firebase.service';
import { leaderboard } from '../../models/leaderboard';
import { SlotMachineComponent } from '../slot-machine/slot-machine.component';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  details: any;
  //wins:number = 0; 
  //losts:number = 0;

  wins: any;
  losts: any;

  constructor(
    private itemService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }
  // Pie
  public pieChartType: string = 'pie';
  public pieChartLabels: string[] = [];
  public pieChartData: number[] = [];

  private dataLoad() {
    this.itemService.getData().subscribe(items => {
      this.details = items;
      console.log(this.details);

      //this.wins = this.details[0].matchWins;
      //this.losts = this.details[0].matchLost;
      
      //this.pieChartData = [this.wins, this.losts];
      //this.pieChartLabels = ['Matches Win', 'Matches Lost'];
      
    });
    
  
  }
  ngOnInit() {
    

  }

  


  public randomizeType(): void {
    this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
  }

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  viewItemsWin() {
    this.dataLoad();

    for (let i = 0; i < this.details.length; i++) {
      this.wins = this.details[i].matchWins;
      this.losts = this.details[i].matchLost;
    }
    return this.wins;
  }

}

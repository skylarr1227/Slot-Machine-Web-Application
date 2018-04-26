import { Component, OnInit } from '@angular/core';
import { symbols } from './symbols';
import { leaderboard } from '../../models/leaderboard';
import { FirebaseService } from '../../services/firebase.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-slot-machine',
  templateUrl: './slot-machine.component.html',
  styleUrls: ['./slot-machine.component.css']
})
export class SlotMachineComponent implements OnInit {

  id;

  credits: number = 10; // varaible to count the credits
  betCredits: number = 0; // total betting credits
  netCredits:any;

  details:any;
  detailObj: leaderboard;
  win;
  lost;

  stopSpin; //variable to clear the setinterval(stop) method

  currentSym1: symbols;//Symbol1 in the reel
  currentSym2: symbols;//Symbol2 in the reel
  currentSym3: symbols;//Symbol3 in the reel

  //creating symbol objects
  symbol1:symbols = {
    value: 7,
    symbolLink: "/assets/Images/redseven.png"
  };
  symbol2:symbols = {
    value: 2,
    symbolLink: "/assets/Images/cherry.png"
  };
  symbol3:symbols = {
    value: 3,
    symbolLink: "/assets/Images/lemon.png"
  };
  symbol4:symbols = {
    value: 4,
    symbolLink: "/assets/Images/plum.png"
  };
  symbol5:symbols = {
    value: 5,
    symbolLink: "/assets/Images/watermelon.png"
  };
  symbol6:symbols = {
    value: 6,
    symbolLink: "/assets/Images/bell.png"
  };

  symbolReel: symbols[] = [this.symbol1, this.symbol2, this.symbol3, this.symbol4, this.symbol5, this.symbol6];
  
  constructor(
    private itemService:FirebaseService,
  ) { }

  ngOnInit() {
    //console.log("machine");  
    //initializing the current symbols
    this.currentSym1 = this.symbolReel[2];
    this.currentSym2 = this.symbolReel[4];
    this.currentSym3 = this.symbolReel[5]; 
    console.log("Machine ran");
    
  }

  stopSpinning(){
    clearInterval(this.stopSpin);
    this.winOrLose();

    //this.id = this.route.snapshot.params['id'];
    this.itemService.getListings().subscribe(items => {
      this.details = items;
      //console.log(this.details);

      this.id = this.details[0].id;
      this.win = this.details[0].matchWins;
      this.lost = this.details[0].matchLost;
      console.log("machine");
      
      });
  }

  spinning(){
    if(this.betCredits > 0){
    //spinning
    this.stopSpin = setInterval(()=>{this.spin()},30);
    }else{
      alert("Insufficent Credits!");
    }  
  }

  spin(){
    //Generating random numbers to get random element from the reel array
    let randomNum1 = Math.floor(Math.random() * (this.symbolReel.length-1));
    let randomNum2 = Math.floor(Math.random() * (this.symbolReel.length-1));
    let randomNum3 = Math.floor(Math.random() * (this.symbolReel.length-1));
    
    //assigning the element to a variable
    this.currentSym1 = this.symbolReel[randomNum1];
    this.currentSym2 = this.symbolReel[randomNum2];
    this.currentSym3 = this.symbolReel[randomNum3];

  }
  
  addCoin(){
    //adding a coin to credit
    this.credits++;
    console.log("Credits" + this.credits);
  }

  betCoin(){
    if(this.credits > 0){
      //adding credit to bettingcredit
      this.betCredits++;
      this.netCredits++;
      this.credits--;
    }
    console.log("Bet Credits" + this.betCredits);
    console.log("Credits" + this.credits);
  }

  betMax(){
    if (this.credits > 2){
      //betting maximum of 3 credits
      this.betCredits += 3;
      this.netCredits += 3;
      this.credits -= 3;
    }
  }

  reset(){
    this.credits += this.betCredits;
    this.betCredits = 0;
    console.log("Bet Credits" + this.betCredits);
    
    
  }


  winOrLose(){
    //boolean values to compare reel slots
    let slot1_eq_slot2: boolean = (this.currentSym1 == this.currentSym2);
    let slot2_eq_slot3: boolean = (this.currentSym2 == this.currentSym3);
    let slot1_eq_slot3: boolean = (this.currentSym1 == this.currentSym3);
    
    if(slot1_eq_slot2 || slot2_eq_slot3 || slot1_eq_slot3){
      //if 2 or 3 symbols are matching game is won
      if(slot1_eq_slot2){
        this.credits += (this.currentSym1.value * this.betCredits);
      }else if(slot1_eq_slot3){
        this.credits += (this.currentSym3.value * this.betCredits);
      }else if(slot2_eq_slot3){
        this.credits += (this.currentSym2.value * this.betCredits);
      }
      //match win counts
      this.win++;
      //setting the bet credits to 0 after a game
      this.betCredits = 0;
      alert("You WON!");
    }else{
      //match lost count
      this.lost++;
      //setting the bet credits to 0 after a game
      this.betCredits = 0;
      alert("You have Lost!");
    }
    let winAndLost ={
      id: this.id,
      matchLost: this.lost,
      matchWins: this.win
    }

    this.updateDetails(winAndLost);  
  }

  updateDetails(winsAndLost: leaderboard){
    this.itemService.updateItem(winsAndLost);
    //this.router.navigate(['/stats']);
    
  }

  /*getListObjects(){
    for(let i = 0;i < this.details.length; i++){
      this.detailObj = this.details[i];
    }
    return this.detailObj;
  }*/



}

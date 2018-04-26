import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseService } from '../../services/firebase.service';
import { leaderboard } from '../../models/leaderboard';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  details: leaderboard[];

  constructor(
    private itemService: FirebaseService,
    private router: Router,
    public afAuth: AngularFireAuth

  ) { }

  ngOnInit() {}

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

  }
  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

}

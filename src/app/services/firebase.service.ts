import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { symbols } from '../components/slot-machine/symbols';
import { leaderboard } from '../models/leaderboard';

@Injectable()
export class FirebaseService {

  private postId: string = "Lx0gHNGXAUxUln5t6V7N";

  listings: Observable<leaderboard[]>;
  listing: Observable<leaderboard[]>;
  listingCollection: AngularFirestoreCollection<leaderboard>;
  itemDoc: AngularFirestoreDocument<leaderboard>;


  constructor(public afs: AngularFirestore) { 
    this.listing = this.afs.collection('/items').valueChanges();

    this.listingCollection = this.afs.collection('items');

    this.listings = this.listingCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as leaderboard;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  getListings(){
    return this.listings;
  }

  getData(){
    return this.listing;
  }

  updateItem(winsAndLost: leaderboard){
    //console.log(winsAndLost);
    this.itemDoc = this.afs.doc(`items/${winsAndLost.id}`);
    this.itemDoc.update(winsAndLost);

  }

 

}


import {Injectable, NgZone} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {User} from './user';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    sortedArray: Array<{ username: string }>;
    currentUserPosition: Number;
    private dbPath = '/users';
    userRef: AngularFireList<User> = null;

    constructor(
        public ngFireAuth: AngularFireAuth,
        public router: Router,
        public ngZone: NgZone,
        private db: AngularFirestore) {


    }

    getAllUsers(): AngularFireList<User> {
        return this.userRef;
    }
    tambahTemen(list,uid){
        var userCollection = this.db.collection("userId").doc(uid);
        return userCollection.update({
            friendList: list
        })
            .then(function(){
                console.log("yey sukses di apdet");
            })
            .catch(function(error){
                console.log("ciye ga bisa apdet: ", error);
            })
    }

    setUserLocation(userId, location, time, userHistoryLoc) {
        var lat = location['lat'];
        var lng = location['lng'];
        var userCollection = this.db.collection('userId').doc(userId);

        return userCollection.update({
            lat: lat,
            lng: lng,
            time: time,
            lasLoc: userHistoryLoc,
        })
            .then(function() {
                console.log('yey selese aplot!!!!');

            })
            .catch(function(error) {
                console.error('ciyeee gabisa apdet yaaaa', error);

            });

    }

}

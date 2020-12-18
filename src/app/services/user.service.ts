import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { promise } from 'protractor';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { friend, UserProfile } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user:Observable<UserProfile[]>;
  private userCollection:AngularFirestoreCollection<UserProfile>;

  private friendCollection:AngularFirestoreCollection<friend>;
  constructor(private afs:AngularFirestore) {
    this.userCollection = this.afs.collection<UserProfile>('userProfile');
    this.user = this.userCollection.snapshotChanges().pipe(
      map(action=>{
        return action.map(a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id
          return {id,...data};
        });
      })
    );
   }

   getAllUser():Observable<UserProfile[]>{
     return this.user;
   }

   addUser(user:UserProfile):Promise<DocumentReference>{
     return this.userCollection.add(user);
   }

   addFriend(friend:friend,id:string):Promise<DocumentReference>{
     return this.userCollection.doc(id).collection('friend').add(friend);
   }

   deleteUser(id:string):Promise<void>{
     return this.userCollection.doc(id).delete();
   }
}

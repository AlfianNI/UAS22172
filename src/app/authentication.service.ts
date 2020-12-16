import {Injectable, NgZone} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {User} from './user';
import firebase from 'firebase';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';

// import {auth} from 'firebase/app';


@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    userData: any;
    userRef: AngularFireList<User> = null;
    // getting from database
    userId;
    email;
    username;

    name;
    id;

    // // getting data from users table
    // users_array = [];
    // usernames_table;
    // names_table;
    // emails_table;
    // password_table;
    private afAuth: any;

    constructor(
        public afStore: AngularFirestore,
        public ngFireAuth: AngularFireAuth,
        public router: Router,
        public ngZone: NgZone,
        private db: AngularFirestore
    ) {

    }

    // Login in with email/password
    SignIn(email, password) {
        return this.ngFireAuth.signInWithEmailAndPassword(email, password);
    }

    // Register user with email/password
    // RegisterUser(email, password, name, username) {
    //   return this.ngFireAuth.createUserWithEmailAndPassword(email, password)
    // }

    RegisterUser(email, password, name, username) {
        return firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
            if (user) {
                console.log(user);
                const userDaftar = {
                    userId : user.user.uid,
                    emails : email,
                    names : name,
                    usernames : username
                };
                this.db.collection('userId').doc(user.user.uid).set(userDaftar);

            }
            return user;
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            return errorMessage;
            // ...
        });
    }


    // Email verification when new user register
    SendVerificationMail() {
        return firebase.auth().currentUser.sendEmailVerification()
            .then(() => {
                this.router.navigate(['home/verify-email']);
            });
    }

    // Recover password
    PasswordRecover(passwordResetEmail) {
        return this.ngFireAuth.sendPasswordResetEmail(passwordResetEmail)
            .then(() => {
                window.alert('Password reset email has been sent, please check your inbox.');
            }).catch((error) => {
                window.alert(error);
            });
    }

    // Returns true when user is looged in
    get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user'));
        return (user !== null && user.emailVerified !== false) ? true : false;
    }
    getCurrentUser(){
        if (firebase.auth().currentUser){
            return firebase.auth().currentUser;
        } else{
            return null;
        }
    }


    // Returns true when user's email is verified
    get isEmailVerified(): boolean {
        const user = JSON.parse(localStorage.getItem('user'));
        return (user.emailVerified !== false) ? true : false;
    }


    // Auth providers
    // AuthLogin(provider) {
    //   return this.ngFireAuth.signInWithPopup(provider)
    //       .then((result) => {
    //         this.ngZone.run(() => {
    //           this.router.navigate(['dashboard']);
    //         })
    //         this.SetUserData(result.user);
    //       }).catch((error) => {
    //         window.alert(error)
    //       })
    // }

    // Store user in localStorage
    // SetUserData(user) {
    //   const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.user_id}`);
    //   const userData: User = {
    //     user_id: user.user_id,
    //     email: user.email,
    //     name: user.name,
    //     username: user.username,
    //     emailVerified: user.emailVerified,
    //     photo_profile: user.photo_profile,
    //     user_point: user.user_point,
    //     achivement: user.achivement,
    //     total_correct_answer: user.total_correct_answer
    //   }
    //   return userRef.set(userData, {
    //     merge: true
    //   })
    // }

    // Sign-out navigate to home landing page
    SignOut() {
        return this.ngFireAuth.signOut().then(() => {
            localStorage.removeItem('user');
            this.router.navigate(['/']);
        });
    }

    // // Show user's information
    // userDetails() {
    //   return this.ngFireAuth.user
    // }

    getUserData(): AngularFireList<User> {
        return this.userRef;
    }

    // // Profile reauth
    // reAuth(username: string, password: string){
    //   return this.afAuth.Auth.currentUser.reauthenticateWithCredential(auth.EmailAuthProvider.credential(username, password))
    // }

    // updatePassword(newpassword: string){
    //   return this.afAuth.auth.currentUser.updatePassword(newpassword)
    // }
    //
    // updateEmail(newemail: string){
    //   return this.afAuth.Auth.currentUser.updateEmail(newemail)
    // }

}

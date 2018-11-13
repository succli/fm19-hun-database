import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

interface User {
  uid: string;
  email: string;
  photoURL: string;
}

@Injectable()
export class AuthService {
  user: Observable<User>;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {

                // Define the user observable
                this.user = this.afAuth.authState
                  .pipe(switchMap(user => {
                    if (user) {
                      return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
                    } else {
                      return of(null);
                    }
                    }));
              }

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(response => {
        return this.setUserDoc(response.user);
      })
      .then(() => {
        this.router.navigate(['/admin']);
      });
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(response => {
        return this.setUserDoc(response.user);
      })
      .then(() => {
        this.router.navigate(['/admin']);
      });
  }

  updateUser(user: User, data: any) {
    return this.afs.doc(`users/${user.uid}`).update(data);
  }

  logout() {
    this.afAuth.auth.signOut()
      .then(() => {
        this.router.navigate(['/login']);
      });
  }

  private setUserDoc(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email || null,
      photoURL: 'https://goo.gl/Fz9nrQ'
    };

    return userRef.set(data);
  }
}

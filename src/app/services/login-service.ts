import { Injectable } from '@angular/core';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { environment } from '../environments/environments';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { isUserRegistered } from './service-core-functions';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private auth;
  private db;

  constructor() {
    const app = initializeApp(environment.firebaseConfig);
    this.auth = getAuth(app);
    this.db = getFirestore(app);
  }

  async login(email: string, password: string) {
    const usersCollection = collection(this.db, 'users');
    const usersSnapshot = await getDocs(usersCollection);
    const usersList = usersSnapshot.docs.map((doc) => doc.data());
    const findedUser = isUserRegistered({ email, password }, usersList);
    return findedUser;
  }
}

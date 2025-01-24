import { Injectable } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { environment } from '../environments/environments';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root',
})
export class Services {
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
    const user: any = usersList.find(
      (existingUser: any) => existingUser.email === email
    );
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        return user;
      }
    }
    return null;
  }

  async createUser(user: any) {
    const usersCollection = collection(this.db, 'users');
    const usersSnapshot = await getDocs(usersCollection);
    const usersList = usersSnapshot.docs.map((doc) => doc.data());
    const isEmailAlreadyRegistered = usersList.some(
      (existingUser: any) => existingUser.email === user.email
    );
    if (isEmailAlreadyRegistered) {
      return false;
    }

    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await addDoc(usersCollection, {
        email: user.email,
        password: hashedPassword,
      });
      return user;
    } catch (error) {
      return false;
    }
  }

  async createUnity(data: any) {
    try {
      const unitsCollection = collection(this.db, 'units');
      const unitsSnapshot = await getDocs(unitsCollection);
      const unitsList = unitsSnapshot.docs.map((doc) => doc.data());

      const isEmailAlreadyRegistered = unitsList.some(
        (existingUnit: any) => existingUnit.email === data.email
      );

      if (isEmailAlreadyRegistered) {
        return false;
      }

      await addDoc(unitsCollection, data);
      return data;
    } catch (error) {
      return false;
    }
  }

  async getUnits() {
    try {
      const unitsCollection = collection(this.db, 'units');
      const unitsSnapshot = await getDocs(unitsCollection);
      const unitsList = unitsSnapshot.docs.map((doc) => ({
        id: doc.id, // Inclui o ID do documento, caso necessário
        ...doc.data(), // Inclui os dados do documento
      }));
      return unitsList;
    } catch (error) {
      console.error('Erro ao buscar unidades:', error);
      return []; // Retorna um array vazio em caso de erro
    }
  }
}

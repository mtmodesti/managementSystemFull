import { Injectable } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { environment } from '../environments/environments';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import * as bcrypt from 'bcryptjs';
import { Utils } from '../utils/utils';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class Services {
  private auth;
  private db;

  constructor(private snackBar: MatSnackBar) {
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
      if (!user.password) {
        user['password'] = 'default';
      }
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
      await addDoc(usersCollection, user);
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
        id: doc.id,
        ...doc.data(),
      }));
      return unitsList;
    } catch (error) {
      Utils.showToast(
        this.snackBar,
        'Erro ao buscar unidades. Contate o suporte.'
      );
      return [];
    }
  }

  async getServices() {
    try {
      const servicesColeection = collection(this.db, 'services');
      const servicesSnapshot = await getDocs(servicesColeection);
      const servicesList = servicesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return servicesList;
    } catch (error) {
      Utils.showToast(
        this.snackBar,
        'Erro ao buscar serviços. Contate o suporte.'
      );
      return [];
    }
  }

  async deleteUnit(id: string) {
    try {
      const unitRef = doc(this.db, 'units', id);
      await deleteDoc(unitRef);
      return true;
    } catch (error) {
      Utils.showToast(
        this.snackBar,
        'Erro ao remover unidade. Contate o suporte.'
      );
      return false;
    }
  }

  async updateUnits(units: any[]) {
    try {
      const updatePromises = units.map(async (unit) => {
        const unitRef = doc(this.db, 'units', unit.id);
        await updateDoc(unitRef, unit);
      });

      await Promise.all(updatePromises);
      return true;
    } catch (error) {
      Utils.showToast(
        this.snackBar,
        'Erro ao atualizar unidades. Contate o suporte.'
      );
      return false;
    }
  }

  async createProfessionalClass(className: string) {
    try {
      const professionalClassesCollection = collection(
        this.db,
        'professionalClasses'
      );
      const professionalClassesSnapshot = await getDocs(
        professionalClassesCollection
      );
      const professionalClassesList = professionalClassesSnapshot.docs.map(
        (doc) => doc.data()
      );

      const isClassAlreadyExists = professionalClassesList.some(
        (existingClass: any) => existingClass.name === className
      );

      if (isClassAlreadyExists) {
        Utils.showToast(this.snackBar, 'Essa classe já existe.');
        return false;
      }

      await addDoc(professionalClassesCollection, {
        name: className,
        createdAt: new Date(),
      });
      Utils.showToast(this.snackBar, 'Classe criada com sucesso!');
      return true;
    } catch (error) {
      Utils.showToast(this.snackBar, 'Erro ao criar classe. Contate o suporte');
      console.error('Erro ao criar a classe profissional:', error);
      return false;
    }
  }

  async getProfessionalClasses(): Promise<any[]> {
    try {
      const professionalClassesColeection = collection(
        this.db,
        'professionalClasses'
      );
      const professionalClassesSnapshot = await getDocs(
        professionalClassesColeection
      );
      const professionalClassesList = professionalClassesSnapshot.docs.map(
        (doc) => ({
          id: doc.id,
          ...doc.data(),
        })
      );
      return professionalClassesList;
    } catch (error) {
      Utils.showToast(
        this.snackBar,
        'Erro ao buscar classes profissionais. Contate o suporte.'
      );
      return [];
    }
  }

  async deleteProfessionalClass(id: string) {
    try {
      const unitRef = doc(this.db, 'professionalClasses', id);
      await deleteDoc(unitRef);
      Utils.showToast(this.snackBar, 'Classe removida com sucesso!');
      return true;
    } catch (error) {
      Utils.showToast(
        this.snackBar,
        'Erro ao remover unidade. Contate o suporte.'
      );
      return false;
    }
  }

  async updateProfessionalClasses(professionalClasses: any[]) {
    try {
      const updatePromises = professionalClasses.map(
        async (professionalClass) => {
          const professionalClassesRef = doc(
            this.db,
            'professionalClasses',
            professionalClass.id
          );
          await updateDoc(professionalClassesRef, professionalClass);
        }
      );

      await Promise.all(updatePromises);
      Utils.showToast(this.snackBar, 'Classe(s) atualizada(s) com sucesso! ');
      return true;
    } catch (error) {
      Utils.showToast(
        this.snackBar,
        'Erro ao atualizar classes. Contate o suporte.'
      );
      return false;
    }
  }

  async getUsers() {
    try {
      const usersColeection = collection(this.db, 'users');
      const usersSnapshot = await getDocs(usersColeection);
      const usersList = usersSnapshot.docs.map((user) => ({
        id: user.id,
        ...user.data(),
      }));
      return usersList;
    } catch (error) {
      Utils.showToast(
        this.snackBar,
        'Erro ao buscar usuários. Contate o suporte.'
      );
      return [];
    }
  }
}

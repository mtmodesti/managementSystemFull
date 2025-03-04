import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RxjsService {
  public loogedUserSubject$ = new BehaviorSubject<any>(null);

  constructor() {}

  setUser(user: any): void {
    this.loogedUserSubject$.next(user);
    sessionStorage.setItem('user', user.role);
  }

  getUser(): Observable<boolean> {
    return this.loogedUserSubject$;
  }
}

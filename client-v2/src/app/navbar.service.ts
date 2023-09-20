import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private _navbarVisible$ = new BehaviorSubject<boolean>(false);

  get navbarVisible$(): Observable<boolean> {
    return this._navbarVisible$.asObservable();
  }

  toggleNavbarVisibility(): void {
    this._navbarVisible$.next(!this._navbarVisible$.value);
  }
}


import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'auth_token';

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private http = inject(HttpClient);
  private router = inject(Router);

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }


  private isTokenValid(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp * 1000;
      return Date.now() < expiry;
    } catch (error) {
      return false;
    }
  }

  login(credentials: { login: string; password: string }) {
    return this.http.post<{ acess_token: string} | {statusCode: number}>(`${environment.API_URL}/auth/login`, credentials).pipe(
      tap(response => {
        if("statusCode" in response){
          console.log(response);
          throw new Error("Falha ao logar!");
        }else{
          localStorage.setItem(this.tokenKey, response.acess_token);
          this.isLoggedInSubject.next(true);
          this.router.navigate(['/products']);
        }
      })
    );
  }
  checkLoginState(){
    if (this.getToken()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    console.log(this.isTokenValid());
    return this.isTokenValid() ? localStorage.getItem(this.tokenKey) : null;
  }
}

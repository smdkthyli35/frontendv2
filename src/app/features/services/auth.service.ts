import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  fullname!: string;
  userId!: string;
  token: any;
  jwtHelper: JwtHelperService = new JwtHelperService;
  claims: string[] = [];

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  getDecodedToken() {
    try {
      this.token = this.tokenService.token;
      return this.jwtHelper.decodeToken(this.token)
    }
    catch (error) {
      return error;
    }
  }

  isAuthenticated(): boolean {
    let isExpired = this.tokenService.isTokenValid();
    return !isExpired;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getUserRoles(): string[] {
    const token = this.tokenService.token;

    if (token) {
      var decoded = this.getDecodedToken();
      var role = Object.keys(decoded).filter(x => x.endsWith("/role"))[0]
      this.claims = decoded[role]
    }

    return this.claims;
  }

  hasRole(role: string): boolean {
    if (this.claims.includes(role)) {
      return true;
    }
    return false;
  }

  getCurrentUserId(): string {
    var decoded = this.getDecodedToken();
    var propUserId = Object.keys(decoded).filter(x => x.endsWith("/nameidentifier"))[0]
    return this.userId = decoded[propUserId]
  }

  getUserEmail(): string {
    var decoded = this.getDecodedToken();
    var propUserEmail = Object.keys(decoded).filter(x => x.endsWith("/email"))[0]
    return this.fullname = decoded[propUserEmail];
  }

  isUser(): boolean {
    if (this.claims.includes('user'))
      return true;
    return false;
  }

  isAdmin(): boolean {
    if (this.claims.includes("admin"))
      return true;
    return false;
  }
}

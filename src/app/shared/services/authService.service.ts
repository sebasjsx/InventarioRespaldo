import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private roles: string[] = [];

  constructor() {
    this.loadRolesFromLocalStorage();
  }

  // metodo para establecer el token y cargar roles
  setToken(token: string) {
    localStorage.setItem('token', token);
    this.roles = this.getRolesFromToken(token);
  }

  // metodo para obtener roles del token
  private getRolesFromToken(token: string): string[] {
    const decoded: any = jwtDecode(token);
    return decoded.roles || [];
  }

  // metodo para verificar si el usuario tiene un rol especifico
  hasRole(role: string): boolean {
    return this.roles.includes(role);
  }

  // Método para cargar roles del localStorage al iniciar la aplicación
  private loadRolesFromLocalStorage() {
    const token = localStorage.getItem('token');
    if (token) {
      this.roles = this.getRolesFromToken(token);
    }
  }
}

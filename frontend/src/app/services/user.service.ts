import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap, timeout } from 'rxjs';
import { USER_CHANGE_PASSWORD, USER_LIST, USER_LOGIN, USER_REGISTER, USER_RESET_PASSWORD, USER_DELETE } from '../shared/constants/urls';

const USER_KEY = 'User';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject(this.getUserFromLocalStorage());
  public userObservable:Observable<any>;
  constructor(private http:HttpClient, private toastrService:ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  }

  public get currentUser() {
    return this.userSubject?.value;
  }

  getUsers():Observable<any>{
    return this.http.get(USER_LIST).pipe(
      tap({
        next: (user: any) =>{
          return user;
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error.message, 'Algo deu errado:');
        }
      })
    );
  }

  login(userLogin:any):Observable<any>{
    return this.http.post(USER_LOGIN, userLogin).pipe(
      tap({
        next: (user: any) =>{
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Bem vindo(a) ao Quiz!`,
            'Login feito com sucesso'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error.message, 'Algo deu errado:');
        }
      })
    );
  }

  register(userRegiser: any): Observable<any>{
    return this.http.post(USER_REGISTER, userRegiser).pipe(
      tap({
        next: (user: any) => {
          this.toastrService.success(
            `Cadastro de ${user?.name} efetuado com sucesso!`,
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error.message,
            'Erro ao tentar cadastrar, tente novamente!')
        }
      })
    )
  }

  chagePassword(user: string, password: string, newPassword: string): Observable<any>{
    return this.http.post(USER_CHANGE_PASSWORD, {
      id: user,
      password: password,
      new_password: newPassword
    }).pipe(
      tap({
        next: (user: any) => {
          this.toastrService.success(
            `Senha alterada com sucesso!`,
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error.message,
            'Erro ao tentar atualizar senha, tente novamente!')
        }
      })
    )
  }

  resetPassword(user: any) {

    this.http.post(USER_RESET_PASSWORD, user).pipe(
      tap({
        next: (res: any) => {
          this.toastrService.success(
            `Senha resetada com sucesso!`,
            `Nova senha: ${res?.password}`,
            {timeOut: 5000}
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error.message,
            'Erro ao tentar resetar senha, tente novamente!')
        }
      })
    )
  }

  deleteUser(userId: string): Observable<any>{
    return this.http.post(USER_DELETE, { user_id: userId}).pipe(
      tap({
        next: (res: any) => {
          // this.setUserToLocalStorage(user);
          // this.userSubject.next(user);
          this.toastrService.success(
            `Usuário deletado com sucesso!`
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error.message,
            'Erro ao tentar resetar senha, tente novamente!')
        }
      })
    )
  }

  logout(){
    this.userSubject.next({});
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  private setUserToLocalStorage(user:any){
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage() {
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson) return JSON.parse(userJson);
    return {};
  }
}

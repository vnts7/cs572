import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { shareReplay } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
    console.log('abc')
    if (localStorage.getItem('users')) return;
    const s = this.http.get('https://randomuser.me/api/?results=10').subscribe(data => {
      console.log(data);
      localStorage.setItem('users', JSON.stringify(data['results']))
      s.unsubscribe();
    })

  }
  getData() {
    return JSON.parse(localStorage.getItem('users'));
  }
  getCacheData(): Observable<[any]> {
    return of(this.getData()).pipe(shareReplay(1));
  }
  checkUser(id: string): Observable<boolean> {
    return of(!!this.getData().find(i => i.login.uuid === id))
  }
}

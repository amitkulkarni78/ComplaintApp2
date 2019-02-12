import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../interfaces/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'http://localhost:3000/api/user';

  constructor(private httpclient: HttpClient, private cookie: CookieService) {


  }

  login(userdata): Promise<any> {
    const params = new HttpParams().set('email', userdata.email).set('password', userdata.password);
    return this.httpclient.post(this.baseUrl + '/login', params)
      .toPromise()
      .then((data) => data);
  }


register(userdata) : Promise<any> {
  const params = new HttpParams().set('email', userdata.email).set('password', userdata.password);
  return this.httpclient.post(this.baseUrl + '/register', params)
    .toPromise()
    .then((data) => data);
}

getUserById(id) :Promise<any> {
  const params = new HttpParams().set('id', id);
  return this.httpclient.post(this.baseUrl + '/id', params)
    .toPromise()
    .then((data) => data);
}

logout(){
  this.cookie.delete('UserId');
}

}

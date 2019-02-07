import { Injectable } from '@angular/core';
import { HttpClient , HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'http://localhost:3000/api/user';

  constructor(private httpclient: HttpClient, private cookie : CookieService) {


  }

  login(userdata) {

      const params = new HttpParams().set('email', userdata.email).set('password', userdata.password);
      return this.httpclient.post(this.baseUrl + '/login', params);


  }

  register(userdata) {
    const params = new HttpParams().set('email', userdata.email).set('password', userdata.password);
    return this.httpclient.post(this.baseUrl + '/register', params);

  }

  getUserById(id) {
    const params = new HttpParams().set('id', id);
    return this.httpclient.post(this.baseUrl + '/id' , params);
  }

  logout(){
    this.cookie.delete('UserId');
  }

}

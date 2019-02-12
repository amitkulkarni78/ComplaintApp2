import { Routes } from '@angular/router';
import { UserService } from './../../services/user.service';
import { User } from './../../interfaces/user';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  user = {} as User;

  constructor(private userservice: UserService , private cookieservice: CookieService , private router : Router, private toster: ToastrService) {
    this.user.email = '';
    this.user.password = '';
    /* this.toster.success('User Logged in','Major',{
      timeOut: 3000
    }); */
  }

  ngOnInit() {

  }

  login() {
    console.log(this.user);
    this.userservice.login(this.user).then(data => {
      console.log(data);
      if(data.status == true){
        this.cookieservice.set('UserId', data.data._id);
        this.toster.success('Success Message: You are logged in','wlecome '+this.user.email,{
          timeOut: 3000
        });
        this.router.navigate(['/home']);
      }else{
        this.toster.error('Error Message: You are not logged in','Please try again ',{
          timeOut: 3000
        });
      }

    });
  }

  signup() {
    this.router.navigate(['/signup']);
  }
}

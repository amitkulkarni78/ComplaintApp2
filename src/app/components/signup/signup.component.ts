import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { isGeneratedFile } from '@angular/compiler/src/aot/util';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user = {} as User;
  cnpassword : string = '';
  constructor(private router : Router,private userservice : UserService) { }

  ngOnInit() {
  }

  backTologin(){
    this.router.navigate(['/login']);
  }

  signup(){
    if(this.cnpassword == this.user.password){
        this.userservice.register(this.user).subscribe((data)=>{
          console.log(data);
          if(data.status){
            this.backTologin();
          }else{
            console.log("user might exist");
          }

        })
    }else{
        console.log(this.cnpassword);
        console.log('error',this.user);
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user = {} as User;
  cnpassword : string = '';
  constructor(private router : Router,private userservice : UserService, private toster : ToastrService) { }

  ngOnInit() {
  }

  backTologin(){
    this.router.navigate(['/login']);
  }

  signup(){
    if(this.cnpassword == this.user.password){
        this.userservice.register(this.user).then((data)=>{
          console.log(data);
          if(data.status){
            this.toster.success('Success Message: User id registered','Please Login',{
              timeOut: 3000
            });
            this.backTologin();
          }else{
            console.log("user might exist");
            this.toster.error('Error Message: Error while signing up','This username already exisits ; Please try again ',{
              timeOut: 3000
            });
          }

        })
    }else{
        console.log(this.cnpassword);
        console.log('error',this.user);
    }
  }

}

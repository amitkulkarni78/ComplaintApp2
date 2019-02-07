import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from './../../services/user.service';
import { ComplaintService } from './../../services/complaint.service';
import { Complaint } from './../../interfaces/complaint';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../interfaces/user';
import { Observable } from 'rxjs';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cokieeValue : string ;
  user = {} as User;
  closeResult: string;
  complaints : Observable<Complaint[]>;
  selectedItem : Observable<Complaint>;
  complaint = {} as Complaint;
  actionLog : string[];

  d = new Date();
  constructor(private cookieservice: CookieService , private userservice: UserService , private router: Router , private complaintservice: ComplaintService,private modalService: NgbModal ) { }

  ngOnInit() {

    if( this.cookieservice.get('UserId')){
      this.cokieeValue = this.cookieservice.get('UserId');
      console.log( this.cokieeValue);

      this.userservice.getUserById(this.cokieeValue).subscribe((data) =>{
        console.log(data);
        this.user = data.data.email;
        console.log(this.user);
      });

      this.getAllComplaints();

    }else{
      console.log("no cookies");
      this.router.navigate(['/login']);
    }



  }
  open(content,item) {
    console.log("// open ",item);

    this.selectedItem = item;
    console.log('// open',this.selectedItem);
    this.actionLog =  this.selectedItem.actionLog;
    console.log(this.actionLog);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  open2(content2) {
    this.complaint;
    this.modalService.open(content2, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  getarray(array){
    return array.split(',');
  }

  update(complaint){
    console.log( "selected //",this.selectedItem);

    var action = "updated by "+this.user+" on "+ this.d;
    complaint.actionLog.unshift(action);

    console.log(complaint);
    this.complaintservice.updateComplaint(complaint).subscribe((data)=>{
      console.log(data);
      this.getAllComplaints();
    })
  }

  getAllComplaints(){
    this.complaintservice.getAllComplaints().subscribe(data=>{
      console.log(data);
      this.complaints = data.data;
   });
  }

  save(complaint){
    console.log(complaint);
    complaint.email = this.user;
    complaint.actionLog = "complaint created by "+this.user+" on "+ this.d,
    this.complaintservice.register(complaint).subscribe(data=>{
      console.log(data);
      this.getAllComplaints();
    })
  }

  delete(complaint){
    console.log(complaint);

    this.complaintservice.delete(complaint).subscribe(data=>{
      console.log(data);
      this.getAllComplaints();
    })
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  logout(){
    this.userservice.logout();
    this.router.navigate(['/login']);
  }

  getUserDetails(){

  }

}

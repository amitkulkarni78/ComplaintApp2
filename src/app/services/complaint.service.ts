import { Complaint } from './../interfaces/complaint';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})



export class ComplaintService {

  baseUrl = 'http://localhost:3000/api';

  constructor(private httpclient: HttpClient) { }

  register(complaint) : Promise<any>{
    const params = new HttpParams().set('email', complaint.email).set('title', complaint.title).set('description', complaint.description).set('status', complaint.status).set('actionLog', complaint.actionLog);
    return this.httpclient.post(this.baseUrl + '/complaint/register', params)
                    .toPromise()
                    .then((data) => data);
  }


  getAllComplaints():Promise<any>{
    return this.httpclient.get(this.baseUrl + '/complaints')
                    .toPromise()
                    .then((data) => data);
  }

  updateComplaint(complaint) : Promise<any>{
    console.log(complaint);
    const params = new HttpParams().set('email', complaint.email).set('title', complaint.title).set('description', complaint.description).set('status', complaint.status).set('actionLog', complaint.actionLog);
    return this.httpclient.post(this.baseUrl+"/complaint/update/"+complaint._id, params)
                    .toPromise()
                    .then((data) => data);
  }

  delete(complaint) {
    const params = new HttpParams();
    return this.httpclient.post(this.baseUrl + '/complaint/delete/'+complaint._id, params);

  }



}


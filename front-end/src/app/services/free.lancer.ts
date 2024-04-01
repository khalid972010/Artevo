import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FreelancerService {

  constructor(private http:HttpClient) {};
  DB_URL = "http://localhost:7010/api/Freelancer";
  getAllFreelancers(){
    return this.http.get(this.DB_URL);
  }

}

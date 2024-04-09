import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FreelancerService {
   private DB_URL = 'https://angularproject-rokp.onrender.com/api/Freelancer';
 // private DB_URL = 'http://localhost:7010/api/Freelancer';

  constructor(private http: HttpClient) {}
  getAllFreelancers() {
    return this.http.get(this.DB_URL);
  }

  searchFreelancers(fullName: string) {
    return this.http.get(this.DB_URL + '/search', { params: { fullName } });
  }
  filter(
    Budget: { max: Number; min: Number },
    JopTitle: String,
    Location: String
  ) {
    var res = this.http.post(this.DB_URL + '/filter', {
      Location: Location,
      budget: Budget,
      JopTitle: JopTitle,
    });

    return res;
  }
  getFreelancerByID(freelancerID: any) {
    const url = this.DB_URL + '/' + freelancerID;
    return this.http.get<any>(url);
  }
  updateFreelancer(freelancer: any) {
    this.http.patch(this.DB_URL, freelancer);
  }
}

// export class PortfolioService {

//   constructor(private http:HttpClient) {};
//   DB_URL = "http://localhost:7011/api/portfolio";
//   getAllPortfolio(){
//     return this.http.get(this.DB_URL);
//   }
//   like(portfolioId: string, userId: string) {
//     return this.http.post(this.DB_URL+'/Like', { portfolioId, userId });
//   }

/*
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http:HttpClient) {

  }
  DB_URL = "http://localhost:3000/students";
  getAllStudents(){
    return this.http.get(this.DB_URL);
  }
  getStudentBtyID(id:number){
    return this.http.get(this.DB_URL+"/"+id);
  }
  AddStudent(student:any){
    return this.http.post(this.DB_URL, student);
  }
}

 */

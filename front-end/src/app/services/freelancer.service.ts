import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FreelancerService {
<<<<<<< Updated upstream
  private DB_URL = "http://localhost:7010/api/Freelancer";

  constructor(private http: HttpClient) {};
  getAllFreelancers() {
    return this.http.get(this.DB_URL);
  }

  searchFreelancers( fullName:string) {
    return this.http.get(this.DB_URL+"/search" , { params: { fullName } });
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
=======

  constructor(private http:HttpClient) {};
  DB_URL = "http://localhost:7010/api/Freelancer";
  getAllFreelancers(){
    return this.http.get(this.DB_URL);
  }

}
>>>>>>> Stashed changes

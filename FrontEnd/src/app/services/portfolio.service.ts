import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private http:HttpClient) {};
  DB_URL = "http://localhost:7015/api/portfolio";
  getAllPortfolio(){
    return this.http.get(this.DB_URL);
  }
  
  like(portfolioId: string, userId: string) {
    return this.http.post(this.DB_URL+'/Like', { portfolioId, userId });
  }

}


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

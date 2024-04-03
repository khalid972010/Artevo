import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  constructor(private http: HttpClient) {}
  DB_URL = 'https://angularproject-rokp.onrender.com/api/portfolio';
  getAllPortfolio() {
    return this.http.get(this.DB_URL);
  }
  getPortfolioByCategory(categories: string[]) {
    const url = `${this.DB_URL}?categories=${encodeURIComponent(
      categories.join(',')
    )}`;
    return this.http.get(url);
  }
  like(portfolioId: string, userId: string) {
    return this.http.post(this.DB_URL + '/Like', { portfolioId, userId });
  }
  filter(technologies: string[]) {
    return this.http.post(this.DB_URL + '/filter', {
      technologies: technologies,
    });
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

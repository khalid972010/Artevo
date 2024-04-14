import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private DB_URL = 'https://angularproject-rokp.onrender.com/api/admins/';

  constructor(private http: HttpClient) {}
  getAllFreelancers() {
    let url = this.DB_URL + 'freelancers';
    return this.http.get<any[]>(url, { observe: 'response' });
  }
  getAllClients() {
    let url = this.DB_URL + 'clients';
    return this.http.get<any[]>(url);
  }
  getAllOrders() {
    let url = this.DB_URL + 'orders';
    return this.http.get<any[]>(url);
  }

  getNumberOfReviews() {
    let url = this.DB_URL + 'reviews';
    return this.http.get<any[]>(url);
  }

  // modifyOrder(){
  //   let url = this.DB_URL + 'orders';
  //   return this.http.get<any[]>(url);
  // }
  searchFreelancers(fullName: string) {
    return this.http.get(this.DB_URL + '/freelancers/search', {
      params: { fullName },
    });
  }
  deleteFreelancer(freelancerID: string) {
    return this.http.delete(this.DB_URL + 'freelancers/', {
      body: { id: freelancerID },
    });
  }
  deleteClient(clientID: string) {
    return this.http.delete(this.DB_URL + 'clients/', {
      body: { id: clientID },
    });
  }
}

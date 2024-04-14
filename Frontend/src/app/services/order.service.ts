import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  // private DB_URL = 'https://angularproject-rokp.onrender.com/api/Order';
  private DB_URL = 'http://localhost:7010/api/Order';
  constructor(private http: HttpClient) {};
  CreateOrder(NewOrder:any){
   // console.log(NewOrder);
    return this.http.post(this.DB_URL ,NewOrder);
  }
  FreelancerOrders(freelancerID:any)
  {
   // console.log(freelancerID);
    return this.http.post(this.DB_URL+"/FreelancerOrders",{freelancerID});
  }
  updateOrderStatus(orderID:String,orderStatus:string)
  {
    return this.http.post(this.DB_URL+"/updateOrderStatus",{orderID,orderStatus});
  }
  updateFreelancerResponse(orderID:String,freelancerResponse:string)
  {
    return this.http.post(this.DB_URL+"/updateFreelancerResponse",{orderID,freelancerResponse});
  }
  getClientOrders(clientID:string)
  {
    return this.http.post(this.DB_URL+"/getClientOrders",{clientID});
  }
  getOrderByID(orderID:string)
  {

    return this.http.post(this.DB_URL+"/getOrderByID",{orderID:orderID});
  }

  updateOrderPaymentStatus(orderID:string)
  {

    return this.http.post(this.DB_URL+"/updateOrderPaymentStatus",{orderID:orderID});
  }
  updateOrderPaymentID(orderID:string , paymentID:Number){
    return this.http.post(this.DB_URL+"/updateOrderPaymentID",{orderID:orderID,paymentID:paymentID});
  }

  findByPaymentID( paymentID:Number){
    return this.http.post(this.DB_URL+"/findByPaymentID",{paymentID:paymentID});
  }
}



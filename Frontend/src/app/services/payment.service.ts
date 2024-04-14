import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  getToken(Apikey: String) {
     console.log(Apikey);
    return this.http.post('https://accept.paymob.com/api/auth/tokens', {
      api_key: Apikey,
    });
  }

  OrderRegistrationAPI(requestData:any){
    console.log(requestData);
    return this.http.post('https://accept.paymob.com/api/ecommerce/orders',
      requestData
    );
  }
  PaymentKeyRequest(requestData:any){
    return this.http.post("https://accept.paymob.com/api/acceptance/payment_keys",
      requestData
    )
  }
  
}

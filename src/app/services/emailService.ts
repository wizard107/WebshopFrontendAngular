import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private baseUrl = 'http://localhost:8080/api/v1/webshop/email';

  constructor(private http: HttpClient) {}

  // 📧 Bestellung per E-Mail bestätigen
  sendOrderConfirmation(orderId: number, email: string): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/send-confirmation`, { orderId, email });
  }
}

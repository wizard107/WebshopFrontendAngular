import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderDetails, OrderDetailsDTO } from '../model/order-details';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  //private baseUrl = 'http://localhost:8080/api/v1/webshop/order';
  private baseUrl = 'https://cloud-808233828339.europe-west3.run.app/api/v1/webshop/order';

  constructor(private http: HttpClient) {}

  // 🛍 Bestellung speichern
  saveOrder(order: OrderDetailsDTO): Observable<OrderDetailsDTO> {
    return this.http.post<OrderDetailsDTO>(`${this.baseUrl}/save`, order);
  }

  // 🔍 Bestellung per ID abrufen
  getOrder(id: number): Observable<OrderDetails> {
    return this.http.get<OrderDetails>(`${this.baseUrl}/${id}`);
  }

  // 📜 Alle Bestellungen abrufen
  getAllOrders(): Observable<OrderDetails[]> {
    return this.http.get<OrderDetails[]>(`${this.baseUrl}/getAll`);
  }

  // ✏️ Bestellung aktualisieren
  updateOrder(id: number, order: OrderDetailsDTO): Observable<OrderDetailsDTO> {
    return this.http.post<OrderDetailsDTO>(`${this.baseUrl}/update/${id}`, order);
  }

  // 🗑️ Bestellung löschen
  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  // 🔄 Health Check
  healthCheck(): Observable<string> {
    return this.http.get(`${this.baseUrl}/health`, { responseType: 'text' });
  }
}

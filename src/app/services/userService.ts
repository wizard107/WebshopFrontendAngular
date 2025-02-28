import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
    providedIn: 'root'
  })
  export class UserService {
    private baseUrl = 'https://cloud-808233828339.europe-west3.run.app/api/v1/webshop/user';
    constructor(private http: HttpClient) {}
  
    // Save a new user
    saveUser(user: User): Observable<User> {
      return this.http.post<User>(`${this.baseUrl}/save`, user);
    }
  
    // Get a user by ID
    getUser(id: number): Observable<User> {
      return this.http.get<User>(`${this.baseUrl}/${id}`);
    }
  
    // Get all users
    getUsers(): Observable<User[]> {
      return this.http.get<User[]>(`${this.baseUrl}/getAll`);
    }
  
    // Update an existing user
    updateUser(id: number, user: User): Observable<User> {
      return this.http.post<User>(`${this.baseUrl}/update/${id}`, user);
    }
  
    // Delete a user by ID
    deleteUser(id: number): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
    }
  
    // Health check
    healthCheck(): Observable<string> {
      return this.http.get(`${this.baseUrl}/health`, { responseType: 'text' });
    }
  }
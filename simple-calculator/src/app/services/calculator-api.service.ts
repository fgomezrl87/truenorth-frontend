import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculatorApiService {
  private apiUrl = 'https://your-api-url.com/'; // Reemplaza esto con la URL de tu API

  constructor(private http: HttpClient) { }

  calculate(num1: number, num2: number, operation: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}?num1=${num1}&num2=${num2}&operation=${operation}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CalculationResult } from '../models/calculator-api.models';

@Injectable({
  providedIn: 'root'
})
export class CalculatorApiService {
  private apiUrl = 'https://truenorth-backend-z2fzc.ondigitalocean.app/operator';

  constructor(private http: HttpClient) { }

  calculate(operation_type: string, a: number, b: number, user_balance: number): Observable<CalculationResult> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = {
      operation_type: operation_type,
      a: a,
      b: b,
      user_balance: user_balance
    };

    return this.http.post<CalculationResult>(this.apiUrl, body, { headers: headers });
  }
}

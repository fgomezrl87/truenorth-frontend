import { Component } from '@angular/core';
import { CalculatorApiService } from '../services/calculator-api.service';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {
  result: number = 0;
  num1: number = 0;
  currentInput: number | string = 0;
  operation: string = '';

  constructor(private calculatorApiService: CalculatorApiService) { }

  onCalculate() {
    if (this.num1 && this.currentInput && this.operation) {
      this.calculatorApiService
        .calculate(this.num1, Number(this.currentInput), this.operation)
        .pipe(
          tap((response) => {
            this.result = response;
            this.num1 = 0;
            this.currentInput = 0;
            this.operation = '';
          }),
          catchError((error: unknown) => {
            console.error('Error:', error);
            return throwError(error);
          })
        )
        .subscribe();
    }
  }
   
  handleButtonClick(value: string) {
    if (!isNaN(Number(value))) {
      // If it's a number
      if (typeof this.currentInput === 'number') {
        this.currentInput = this.currentInput * 10 + Number(value);
      } else {
        this.currentInput += value;
      }
    } else {
      switch (value) {
        case 'add':
        case 'subtract':
        case 'multiply':
        case 'divide':
          this.operation = value;
          this.num1 = Number(this.currentInput);
          this.currentInput = 0;
          break;
        case 'equals':
          this.onCalculate();
          break;
        case 'clear':
          this.currentInput = 0;
          break;
        case '.':
          if (typeof this.currentInput === 'number') {
            this.currentInput = this.currentInput.toString() + '.';
          }
          break;
        default:
          break;
      }
    }
  }
  
}

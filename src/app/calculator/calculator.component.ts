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
  userBalance: number = 50;
  justCalculated: boolean = false;

  constructor(private calculatorApiService: CalculatorApiService) { }

  onCalculate() {
    if (this.num1 && this.currentInput && this.operation) {
      this.calculatorApiService
        .calculate(this.operation, this.num1, Number(this.currentInput), this.userBalance)
        .pipe(
          tap((response) => {
            this.result = response.result;
            this.userBalance = response.new_balance;
            this.num1 = 0;
            this.currentInput = 0;
            this.operation = '';
            this.justCalculated = true;
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
    if (this.justCalculated && value !== 'clear') {
      this.justCalculated = false;
    }

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
          this.operation = 'addition';
          this.num1 = Number(this.currentInput);
          this.currentInput = 0;
          break;
        case 'subtract':
          this.operation = 'subtraction';
          this.num1 = Number(this.currentInput);
          this.currentInput = 0;
          break;
        case 'multiply':
          this.operation = 'multiplication';
          this.num1 = Number(this.currentInput);
          this.currentInput = 0;
          break;
        case 'divide':
          this.operation = 'division';
          this.num1 = Number(this.currentInput);
          this.currentInput = 0;
          break;
        case 'equals':
          this.onCalculate();
          break;
        case 'clear':
          if (this.justCalculated) {
            this.result = 0;
            this.userBalance = 50;
          } else {
            this.currentInput = 0;
          }
          this.justCalculated = false;
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

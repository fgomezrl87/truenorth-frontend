import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss']
})
export class ScreenComponent implements OnChanges {
  @Input() result: number = 0;
  @Input() currentInput: number | string = 0;
  displayValue: number | string = 0;

  ngOnChanges() {
    this.displayValue = this.currentInput !== 0 ? this.currentInput : this.result;
  }
}

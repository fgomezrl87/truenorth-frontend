import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent {
  @Output() buttonClickedEvent = new EventEmitter<string>();

  buttons = [
    [
      { label: '7', value: '7' },
      { label: '8', value: '8' },
      { label: '9', value: '9' },
      { label: '÷', value: 'divide', class: 'operation' },
    ],
    [
      { label: '4', value: '4' },
      { label: '5', value: '5' },
      { label: '6', value: '6' },
      { label: '×', value: 'multiply', class: 'operation' },
    ],
    [
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '3', value: '3' },
      { label: '−', value: 'subtract', class: 'operation' },
    ],
    [
      { label: '0', value: '0' },
      { label: '.', value: '.' },
      { label: 'C', value: 'clear' },
      { label: '+', value: 'add', class: 'operation' },
    ],
    [
      { label: '=', value: 'equals', class: 'equals' },
    ],
  ]; 

  onButtonClick(value: string) {
    this.buttonClickedEvent.emit(value);
  }
}

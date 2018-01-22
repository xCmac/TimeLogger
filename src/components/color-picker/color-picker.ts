import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'color-picker',
  templateUrl: 'color-picker.html'
})
export class ColorPickerComponent {

  @Input() current: string;
  @Output() selected: EventEmitter<any> = new EventEmitter<any>();

  colors: Array<string> = [
    "red",
    "pink",
    "purple",
    "deepPurple",
    "indigo",
    "blue",
    "lightBlue",
    "cyan",
    "teal",
    "green",
    "lightGreen",
    "lime",
    "yellow",
    "amber",
    "orange",
    "deepOrange",
    "brown",
    "grey", 
    "blueGrey",
    "black"
  ];

  constructor() {
  }

  selectColor(color: string) {
    this.selected.emit(color);
  }

}

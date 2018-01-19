import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'time-block',
  templateUrl: 'time-block.html'
})
export class TimeBlockComponent {

  @Input() color: string;
  @Input() name: number;
  @Output() toggle: EventEmitter<any> = new EventEmitter<any>();
  selected: boolean = false;

  constructor() {}

  toggleSelected() {
    this.selected = !this.selected;
    this.toggle.emit({
      name: this.name,
      selected: this.selected
    });
  }

  isOutline(): boolean {
    return this.selected == false && this.color == 'default';
  }

  getColor(): string {
    let color = this.selected ? 'dark' : this.color;
    return color;
  }
}

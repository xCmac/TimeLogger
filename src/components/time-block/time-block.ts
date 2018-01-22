import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'time-block',
  templateUrl: 'time-block.html'
})
export class TimeBlockComponent {

  @Input() color: string;
  @Input() name: number;
  @Input() selected: boolean;
  @Output() selectedChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  toggleSelected() {
    this.selected = !this.selected;
    this.selectedChange.emit(this.selected);
  }

  isOutline(): boolean {
    return this.selected == false && this.color == 'default';
  }

  getColor(): string {
    let color = this.selected ? 'dark' : this.color;
    return color;
  }
}

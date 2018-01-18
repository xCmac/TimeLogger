import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'time-block',
  templateUrl: 'time-block.html'
})
export class TimeBlockComponent {

  @Input() name: string;
  @Output() toggle: EventEmitter<any> = new EventEmitter<any>();
  selected: boolean = false;

  constructor() {
  }

  private toggleSelected() {
    this.selected = !this.selected;
    this.toggle.emit({
      name: this.name,
      selected: this.selected
    });
  }
}

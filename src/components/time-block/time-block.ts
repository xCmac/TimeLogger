import { Component, Input } from '@angular/core';

@Component({
  selector: 'time-block',
  templateUrl: 'time-block.html'
})
export class TimeBlockComponent {

  @Input() name: string;

  constructor() {
  }
}

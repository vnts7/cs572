import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <p>
      <button (click)="clicked(-1)">-</button> {{counterValue}} <button (click)="clicked(1)">+</button>
    </p>
  `,
  styles: []
})
export class CounterComponent implements OnInit {
  @Input() counterValue: number = 0;
  @Output() counterChange = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes)
  {
    console.log(changes);
  }
  clicked(value){
    this.counterValue += value;
    this.counterChange.emit(this.counterValue);
  }
}

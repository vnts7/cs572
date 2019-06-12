import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dumb',
  template: `
    <p>
      {{item}}
    </p>
  `,
  styles: []
})
export class DumbComponent implements OnInit {
  @Input() item;
  constructor() { }

  ngOnInit() {
  }

}

import { Component, Input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { CalloutComponent } from '@coreui/angular';

@Component({
  selector: 'app-docs-callout',
  templateUrl: './docs-callout.component.html',
  styleUrls: ['./docs-callout.component.scss'],
  standalone: true,
  imports: [CalloutComponent, NgTemplateOutlet],
})
export class DocsCalloutComponent {
  @Input() name: string = '';

  constructor() {}

  private _href: string = 'https://coreui.io/angular/docs/';

  get href(): string {
    return this._href;
  }

  @Input()
  set href(value: string) {
    const version = null;
    const docsUrl = 'https://coreui.io/angular/';
    // const path: string = version ? `${version}/${value}` : '';
    this._href = `${docsUrl}${value}`;
  }

  get plural() {
    return this.name?.slice(-1) === 's';
  }
}

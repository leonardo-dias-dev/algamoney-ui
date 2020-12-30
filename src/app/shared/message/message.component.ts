import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-message',
    template: `<div class="p-message p-message-error" *ngIf="temErro()">{{text}}</div>`,
    styles: []
})
export class MessageComponent {

    @Input() error: string;
    @Input() control: FormControl;
    @Input() text: string;

    constructor() { }

    temErro(): boolean {
        return this.control.hasError(this.error) && this.control.dirty;
    }

}

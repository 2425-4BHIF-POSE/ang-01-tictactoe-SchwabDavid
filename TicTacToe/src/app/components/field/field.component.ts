import {Component, Input, Output} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-field',
  standalone: true,
  imports: [
    MatButton,
    NgClass
  ],
  templateUrl: './field.component.html',
  styleUrl: './field.component.scss'
})
export class FieldComponent {
  @Input() value : number = 0;
}

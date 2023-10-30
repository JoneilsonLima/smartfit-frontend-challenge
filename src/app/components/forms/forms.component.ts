import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {
  public results = [];
  public formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this._buildForm();
  }

  onSubmit(): void {
    console.log(this.formGroup.value);
  }

  onClean(): void {
    this.formGroup.reset();
  }

  private _buildForm(): void {
    this.formGroup = this.formBuilder.group({
      hour: [null],
      showClosed: [false]
    });
  }
}

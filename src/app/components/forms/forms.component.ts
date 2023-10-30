import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GetUnitsService } from 'src/app/services/get-units.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {
  public results = [];
  public formGroup!: FormGroup;

  constructor(
      private formBuilder: FormBuilder,
      private service: GetUnitsService
      ) { }

  ngOnInit(): void {
    this._buildForm();
    this.getUnitsService();
  }

  onSubmit(): void {
    console.log(this.formGroup.value);
  }

  onClean(): void {
    this.formGroup.reset();
  }

  private getUnitsService(): void {
    this.service.getAllunits().subscribe({
      next: (resp) => {
        console.log(resp);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  private _buildForm(): void {
    this.formGroup = this.formBuilder.group({
      hour: [null],
      showClosed: [false]
    });
  }
}

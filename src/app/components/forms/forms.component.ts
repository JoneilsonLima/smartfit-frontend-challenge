import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from 'src/app/models/location';
import { GetUnitsService } from 'src/app/services/get-units.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {
  public dataSource: Location[] = [];
  public filteredDataSource: Location[] = [];
  public formGroup!: FormGroup;

  constructor(
      private formBuilder: FormBuilder,
      private service: GetUnitsService
      ) { }

  ngOnInit(): void {
    this._buildForm();
    this.getUnitsService();
  }

  onClean(): void {
    this.formGroup.reset();
  }

  onSubmit(): void {
    const { showClosed } = this.formGroup.getRawValue();
    if (!showClosed) {
      this.filteredDataSource = this.dataSource.filter(item => item.opened === true);
    } else {
      this.filteredDataSource = this.dataSource;
    }
  }

  private getUnitsService(): void {
    this.service.getAllunits().subscribe({
      next: (resp) => {

        this.dataSource = resp.locations;
        this.filteredDataSource = resp.locations;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  private _buildForm(): void {
    this.formGroup = this.formBuilder.group({
      hour: [null],
      showClosed: [true]
    });
  }
}

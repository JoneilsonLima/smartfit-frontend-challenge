import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location, Schedules } from 'src/app/models/location';
import { FilterUnitsService } from 'src/app/services/filter-units.service';
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
      private service: GetUnitsService,
      private filterUnitsService: FilterUnitsService,
      ) { }

  ngOnInit(): void {
    this._buildForm();
    this._getUnitsService();
  }

  onClean(): void {
    this.formGroup.reset();
  }

  onSubmit(): void {
    const { showClosed, hour } = this.formGroup.getRawValue();
    this.filteredDataSource = this.filterUnitsService.filter(this.dataSource, showClosed, hour);
    this.service.setFilteredUnits(this.filteredDataSource);
  }

  private _getUnitsService(): void {
    this.service.getAllunits().subscribe({
      next: (resp) => {
        this.dataSource = resp;
        this.filteredDataSource = resp;
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

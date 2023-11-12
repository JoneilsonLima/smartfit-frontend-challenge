import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { UnitsResponse } from '../models/units-response';
import { BehaviorSubject, Observable } from 'rxjs';
import { Location } from '../models/location';

@Injectable({
  providedIn: 'root'
})
export class GetUnitsService {
  readonly apiUrl = 'https://test-frontend-developer.s3.amazonaws.com/data/locations.json';

  private allUnitsSubject: BehaviorSubject<Location[]> = new BehaviorSubject<Location[]>([]);
  private allUnits$: Observable<Location[]> = this.allUnitsSubject.asObservable();
  private filteredUnits: Location[] = [];

  constructor(private httpClient: HttpClient) {
    this.httpClient.get<UnitsResponse>(this.apiUrl)
      .subscribe((data) => {
        this.allUnitsSubject.next(data.locations);
        this.filteredUnits = data.locations;
      });
  }

  getAllunits(): Observable<Location[]> {
    return this.allUnits$;
  }

  getFilteredUnits(): Location[] {
    return this.filteredUnits;
  }

  setFilteredUnits(value: Location[]): void {
    this.filteredUnits = value;
  }
}

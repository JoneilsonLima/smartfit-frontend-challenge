import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { UnitsResponse } from '../models/units-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetUnitsService {
  readonly apiUrl = 'https://test-frontend-developer.s3.amazonaws.com/data/locations.json';

  constructor(private httpClient: HttpClient) { }

  getAllunits(): Observable<UnitsResponse> {
    return this.httpClient.get<UnitsResponse>(this.apiUrl);
  }
}

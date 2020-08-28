import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BACKEND_SERVICE } from '../constants/constants';
import { FlightBriefing, FlightBriefingParams, FlightBriefingResponse } from '../interfaces/flight-briefing';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private readonly _httpClient: HttpClient) {
  }

  flightBriefing(data: FlightBriefingParams[]): Observable<FlightBriefingResponse> {
    const request: FlightBriefing = {
      id: uuid(),
      method: 'query',
      params: data
    };

    return this._httpClient.post<FlightBriefingResponse>(BACKEND_SERVICE, request);
  }
}

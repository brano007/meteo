import { ReportTypes } from '../enums/report-types.enum';

export interface FlightBriefing {
  id?: string;
  method: string;
  params: FlightBriefingParams[];
}

export interface FlightBriefingParams {
  id?: string;
  reportTypes: ReportTypes[];
  stations?: string[];
  countries?: string[];
}

export interface FlightStationHeader {
  header: string;
}

export interface FlightBriefingResponse {
  error: string;
  id: string;
  result?: FlighBriefingResult[];
}

export interface FlighBriefingResult {
  placeId: string;
  queryType: ReportTypes;
  receptionTime: string;
  refs: string[];
  reportTime: string;
  reportType: string;
  stationId: string;
  text: string;
  textHTML?: string;
}

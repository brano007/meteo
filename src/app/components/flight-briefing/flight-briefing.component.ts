import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { COUNTRIES, STATIONS, oneFieldRequired } from 'src/app/utils/validations';
import { BackendService } from 'src/app/services/backend.service';
import { ReportTypes } from '../../enums/report-types.enum';
import { v4 as uuid } from 'uuid';
import {
  FlighBriefingResult,
  FlightBriefingParams,
  FlightBriefingResponse,
  FlightStationHeader
} from '../../interfaces/flight-briefing';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-flight-briefing',
  templateUrl: './flight-briefing.component.html',
  styleUrls: ['./flight-briefing.component.scss']
})
export class FlightBriefingComponent {
  loading: boolean = false;
  reportTypes = [
    ReportTypes.METAR,
    ReportTypes.TAF,
    ReportTypes.SIGMET
  ];

  displayedColumns: string[] = ['queryType', 'reportTime', 'text'];
  dataTable: FlightStationHeader[] | FlighBriefingResult[];

  form = new FormGroup({
      reportTypes: new FormControl([], [Validators.required]),
      stations: new FormControl('', [Validators.pattern(STATIONS)]),
      countries: new FormControl('', [Validators.pattern(COUNTRIES)]),
    },
    oneFieldRequired(Validators.required, ['stations', 'countries']));

  constructor(private readonly _backend: BackendService) {}

  submit(): void {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.loading = true;
      this._backend.flightBriefing([{ id: uuid(), ...this.sendParams()}])
      .pipe(take(1))
      .subscribe((value: FlightBriefingResponse) => {
        this.loading = false;
        console.log('eee', value);
        this.dataTable = this.groupByProperty(value.result, 'stationId');
      });
    }
  }

  hasError(name: string, errorName: string): boolean {
    return !!this.form?.controls[name].hasError(errorName) && !!this.form?.controls[name].touched;
  }

  countryStationChosen(): boolean {
    return this.form?.errors?.oneFieldRequired && (this.form?.controls['countries'].touched || this.form?.controls['stations'].touched);
  }

  sendParams(): FlightBriefingParams {
    return <FlightBriefingParams>Object.keys(this.form.value)
    .filter((key: string) => this.form.value[key] != '')
    .reduce((acc: object, key: string) => Object.assign(acc, {[key]: this.formatOptions(this.form.value[key])}), {});
  }

  formatOptions(options: string): string[] | string {
    if (typeof options !== 'string') {
      return options;
    }

    return options.toUpperCase().split(' ');
  }

  groupByProperty(data: FlighBriefingResult[], property: string): FlightStationHeader[] | FlighBriefingResult[] {
    const table = [];

    const values = data.sort((a: FlighBriefingResult, b: FlighBriefingResult) =>
      a.stationId.localeCompare(b.stationId),
    );

    values.forEach((flight: FlighBriefingResult) => {
      const header = table.find((tableHeader: FlightStationHeader) => tableHeader.header === flight[property]);

      if (!header) {
        table.push({ header: flight.stationId });
      }

      table.push(flight);
    });

    return table;
  }

  isGroup(index, item): boolean{
    return item.header;
  }

  showNoResult(): boolean {
    if (this.dataTable === undefined) {
      return false;
    }

    return this.dataTable?.length === 0;
  }
}

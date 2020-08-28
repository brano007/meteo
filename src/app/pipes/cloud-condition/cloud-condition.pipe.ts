import { Pipe, PipeTransform } from '@angular/core';
import { CloudCondition } from '../../enums/cloud-condition.enum';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { WEATHER_WARNING } from '../../constants/constants';

@Pipe({
  name: 'cloudCondition'
})
export class CloudConditionPipe implements PipeTransform {

  constructor(private readonly _sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml | string {
    const weatherReport: string[] = value.split(' ');

    const cloudState: string[] = weatherReport.map((weatherCondition: string) => {
      if (new RegExp(`${CloudCondition.BKN}|${CloudCondition.FEW}|${CloudCondition.SCT}`, 'g').test(weatherCondition)) {
        const warning = Number(weatherCondition.replace(/\D+/g, '').replace(/^0+/, ''));

        return `<span class="${this.displayWarning(warning) ? 'red' : 'blue'}">${weatherCondition}</span>`;
      }

      return weatherCondition;
    });

    return this._sanitizer.bypassSecurityTrustHtml(cloudState.join(' '));
  }

  displayWarning(value: number): boolean {
    return value > WEATHER_WARNING;
  }
}

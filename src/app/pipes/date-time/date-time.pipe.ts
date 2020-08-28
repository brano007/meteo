import { Pipe, PipeTransform } from '@angular/core';
import { COUNTRY_CONFIG } from '../../constants/constants';

@Pipe({
  name: 'dateTime'
})
export class DateTimePipe implements PipeTransform {

  transform(value: string): string {
    return new Date(value).toLocaleString(COUNTRY_CONFIG.locale, { timeZone: COUNTRY_CONFIG.timezone }).replace(',', '');
  }
}

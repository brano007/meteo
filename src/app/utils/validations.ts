import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const STATIONS = /^([a-zA-Z]{4}\s)*[a-zA-Z]{4}$/;

export const COUNTRIES = /^([a-zA-Z]{2}\s)*[a-zA-Z]{2}$/;

export function oneFieldRequired(validator: ValidatorFn, controls: string[]): ValidationErrors | null {
  return (formGroup: FormGroup) => {
    const hasOneFieldRequired = formGroup && formGroup.controls && controls
    .some((fieldName: string) => !validator(formGroup.controls[fieldName]));

    return hasOneFieldRequired ? null : {
      oneFieldRequired: true,
    };
  }
};

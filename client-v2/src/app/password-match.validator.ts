import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(
  controlName: string,
  matchingControlName: string
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const password = control.get(controlName)?.value;
    const confirmPassword = control.get(matchingControlName)?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }

    return null;
  };
}

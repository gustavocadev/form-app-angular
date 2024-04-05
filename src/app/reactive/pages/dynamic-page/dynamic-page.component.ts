import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styles: ``,
})
export class DynamicPageComponent {
  myForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.formBuilder.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required],
    ]),
  });

  newFavorite = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
  ]);

  constructor(private readonly formBuilder: FormBuilder) {}

  get favoriteGames() {
    // get array of favoriteGames form control
    return this.myForm.get('favoriteGames') as FormArray;
  }

  isNotValidField(field: 'name' | 'favoriteGames'): boolean {
    return (
      this.myForm.controls[field].errors! &&
      this.myForm.controls[field].touched!
    );
  }

  isValidFieldInArray(formArray: any, idx: number): boolean {
    return formArray.controls[idx].errors! && formArray.controls[idx].touched!;
  }

  getFieldError(field: 'name' | 'favoriteGames'): string {
    if (!this.myForm.controls[field]) return '';

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'El campo es requerido';
        case 'minlength':
          return `Este campo debe tener al menos ${errors[key].requiredLength} caracteres`;
        case 'min':
          return `Este campo debe ser mayor a ${errors[key].min}`;
      }
    }

    return '';
  }

  onAddToFavorite(): void {
    if (this.newFavorite.invalid) return;
    const newGame = this.newFavorite.value;

    // this.favoriteGames.push(new FormControl(newGame, Validators.required));
    this.favoriteGames.push(
      this.formBuilder.control(newGame, Validators.required)
    );

    this.newFavorite.reset();
  }

  onDeleteFavorite(idx: number): void {
    this.favoriteGames.removeAt(idx);
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.myForm.reset();

    //clear array of favoriteGames
    this.favoriteGames.clear();
  }
}

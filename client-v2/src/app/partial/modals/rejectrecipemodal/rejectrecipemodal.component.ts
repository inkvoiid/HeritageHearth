import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-rejectrecipemodal',
  templateUrl: './rejectrecipemodal.component.html',
  styleUrls: ['./rejectrecipemodal.component.css'],
})
export class RejectrecipemodalComponent implements OnInit {
  recipeIdToDelete: string = '';
  redirect: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<RejectrecipemodalComponent>,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.recipeIdToDelete = this.data.recipeIdToDelete;
    this.redirect = this.data.redirect;
  }

  close() {
    this.dialogRef.close();
  }

  deleteRecipe() {
    this.recipeService
      .rejectRecipe(this.recipeIdToDelete, this.redirect)
      .subscribe((response: any) => {
        if (response.status === 200) {
          this.dialogRef.close('deleted');
        }
      });
  }
}

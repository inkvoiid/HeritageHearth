import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-deleterecipemodal',
  templateUrl: './deleterecipemodal.component.html',
  styleUrls: ['./deleterecipemodal.component.css'],
})
export class DeleterecipemodalComponent implements OnInit {
  recipeIdToDelete: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<DeleterecipemodalComponent>,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.recipeIdToDelete = this.data.recipeIdToDelete;
  }

  close() {
    this.dialogRef.close();
  }

  deleteRecipe() {
    this.recipeService
      .deleteRecipe(this.recipeIdToDelete)
      .subscribe((response: any) => {
        if (response.status === 200) {
          this.dialogRef.close();
        }
      });
  }
}

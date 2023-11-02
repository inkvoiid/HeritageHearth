import { RecipeService } from 'src/app/services/recipe.service';
import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { formatTimeAgo } from '../../utils';
import { MatDialog } from '@angular/material/dialog';
import { RejectrecipemodalComponent } from '../modals/rejectrecipemodal/rejectrecipemodal.component';

@Component({
  selector: 'app-recipeapprovalpreview',
  templateUrl: './recipeapprovalpreview.component.html',
  styleUrls: ['./recipeapprovalpreview.component.css'],
})
export class RecipeapprovalpreviewComponent implements OnInit {
  @Input() recipe: any;
  recipeImageSrc: string =
    '../../../assets/media/images/recipeimages/default-recipe-pic.png';
  creatorName: string = '';
  isHidden: boolean = false;
  rejected: boolean = false;
  accepted: boolean = false;

  timeSinceLastUpdated: string = '';

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private recipeService: RecipeService
  ) {}
  ngOnInit(): void {
    if (this.recipe != null) {
      this.recipeImageSrc = this.recipe.recipeImage;

      if (this.recipe.creator != null) {
        this.userService.getUser(this.recipe.creator, true).subscribe(
          (response: any) => {
            if (response.status === 200) {
              this.creatorName =
                response.body.firstName + ' ' + response.body.lastName;
            }
          },
          (error) => {
            this.creatorName = 'An unknown user';
          }
        );
      } else {
        this.creatorName = 'An unknown user';
      }

      this.timeSinceLastUpdated = formatTimeAgo(this.recipe.updatedAt);
    }
  }

  loadPlaceholderImage() {
    this.recipeImageSrc =
      '../../../assets/media/images/recipeimages/default-recipe-pic.png';
  }

  rejectRecipe() {
    let dialogRef = this.dialog.open(RejectrecipemodalComponent, {
      data: { recipeIdToDelete: this.recipe.recipeId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'deleted') {
        this.rejected = true;
      }
    });
  }

  approveRecipe() {
    this.recipeService.approveRecipe(this.recipe.recipeId);

    this.accepted = true;
  }
}

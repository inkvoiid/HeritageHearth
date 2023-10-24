import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-userpreview',
  templateUrl: './userpreview.component.html',
  styleUrls: ['./userpreview.component.css'],
})
export class UserpreviewComponent implements OnInit {
  @Input() user: any;
  userImage: string = 'egg_blue.jpg';

  ngOnInit(): void {
    if (this.user != null) {
      this.userImage = this.user.profilePic;
    }
  }

  loadPlaceholderImage() {
    this.userImage = 'egg_blue.jpg';
  }
}

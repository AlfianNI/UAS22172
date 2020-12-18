import { Component, OnInit } from '@angular/core';
import { friend, UserProfile } from 'src/app/models/user';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.page.html',
  styleUrls: ['./friend.page.scss'],
})
export class FriendPage implements OnInit {

  public userProfile: UserProfile;
  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.getUserProfile().then(profile$ => {
      profile$.subscribe(userProfile => {
        this.userProfile = userProfile;
      });
    });
  }

  deleteFriend(friend:friend){

  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { friend, UserProfile } from 'src/app/models/user';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.page.html',
  styleUrls: ['./add-friend.page.scss'],
})
export class AddFriendPage implements OnInit {

  public userProfile: UserProfile;
  private uId:any;
  private users:Observable<UserProfile[]>
  constructor(private navCtrl:NavController,private profileService: ProfileService,private userSrv:UserService,private router:Router) { }

  ngOnInit() {
    this.users = this.userSrv.getAllUser();
    this.profileService.getUserProfile().then(profile$ => {
      profile$.subscribe(userProfile => {
        this.userProfile = userProfile;
      });
    });
  }

  back(){
    this.navCtrl.navigateRoot('tabs/friend');
  }

  addFriend(friend:friend){
   this.uId = this.profileService.getId();
   this.userSrv.addFriend(friend,this.uId).then(()=>{
     this.router.navigateByUrl('tabs/friend');
   })
  }

  

}

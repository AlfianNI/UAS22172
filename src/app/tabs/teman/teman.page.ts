import {Component, OnInit} from '@angular/core';
import {UserService} from '../../user.service';
import {AuthenticationService} from '../../authentication.service';

@Component({
    selector: 'app-teman',
    templateUrl: './teman.page.html',
    styleUrls: ['./teman.page.scss'],
})
export class TemanPage implements OnInit {
    temenEuy: string;
    namaTemen: string;
    userId: string;
    friendList: Array<any> = [];

    constructor(
        private userService: UserService,
        private authService: AuthenticationService
    ) {
        console.log(this.authService.getCurrentUser().uid);
        this.userId = this.authService.getCurrentUser().uid;
    }

    ngOnInit() {
    }

    tambahTemen() {
        console.log(this.temenEuy);
        this.friendList.push(this.temenEuy);
        this.userService.tambahTemen(this.friendList, this.userId);
    }
}

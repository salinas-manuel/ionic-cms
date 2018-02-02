import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { User } from '../../models/user';
import { UserEditPage } from '../user-edit/user-edit';


@IonicPage()
@Component({
  selector: 'page-user-view',
  templateUrl: 'user-view.html',
})
export class UserViewPage {

  user: User;
  pushPage: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: UserProvider
  ) {
    this.pushPage = UserEditPage;
  }

  ionViewDidLoad() {
    const id = this.navParams.data;
    this.getUser(id);
  }

  getUser(id): void {
    this.userProvider.getUser(id).subscribe(
      (response) => {
        this.user = response.user
      }
    );
  }

  deleteUser(id: string): void {
    this.userProvider.deleteUser(id).subscribe(
      ()=>{this.navCtrl.push(UserViewPage)/*NEEDS WORK*/}
      );

  }

}

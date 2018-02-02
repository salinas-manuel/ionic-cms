import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { UserProvider } from '../../providers/user/user';
import { User } from '../../models/user';
import { UserViewPage } from '../user-view/user-view';
import { UserCreatePage } from '../user-create/user-create';

/**
 * Generated class for the UsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {

  pushPage: any;
  pushPage2: any;
  public users: User[];
  private loader:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: UserProvider,
    public loadingCtrl: LoadingController,
  ) {
    this.loader = this.loadingCtrl.create({
      content: 'Loading...',
    });

    this.pushPage = UserViewPage;
    //this.navParams.get()
    this.pushPage2 = UserCreatePage;
  }

  public ionViewDidLoad() {
    console.log(this.userProvider.getUsers());
    this.getUsers();
  }

  public getUsers(): void {
    this.userProvider.getUsers().subscribe(
      (response) => {
        this.users = response.users,
        this.loader.dismiss()
      }
    );
  }

  /*itemTapped(event, item) {
    this.navCtrl.push(UserViewPage, {
      item: item
    });
  }*/

}

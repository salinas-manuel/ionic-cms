import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UserProvider } from '../../providers/user/user';
import { User } from '../../models/user';
import { UsersPage } from '../users/users';

/**
 * Generated class for the UserCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-create',
  templateUrl: 'user-create.html',
})
export class UserCreatePage {

  pushPage: any;
  user = new User();
  errors: Array<any> = [];
  errorMessage: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: UserProvider
  ) {
    this.pushPage = UsersPage;
  }

  ionViewDidLoad(): void {}

  response(response): void{
    if(response.success===false){
      this.errors = response.errors.errors;
      this.errorMessage = response.errors.message;
    }

    if(response.success===true){
      this.navCtrl.push(UsersPage, response.user._id)
    }
  }

  onSubmit(): void {
    this.userProvider.createUser(this.user).subscribe(
      (response) => {this.response(response)}
    );
  }

}

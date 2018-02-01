import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { User } from '../../models/user';
import { UserViewPage } from '../user-view/user-view';

/**
 * Generated class for the UserEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-edit',
  templateUrl: 'user-edit.html',
})
export class UserEditPage {

  user: User;
  errors: Array<any> = [];
  errorMessage: string;
  pushPage: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: UserProvider
  ) {
    this.pushPage = UserViewPage;
  }

  ionViewDidLoad() {
    const id = this.navParams.data;
    this.getUser(id);
  }

  getUser(id): void {
    this.userProvider.getUser(id).subscribe(
      user => this.user = user.user
    );
  }

  response(response): void{
    console.log(response)
    if(response.success===false){
      this.errors = response.error.errors;
      this.errorMessage = response.error.message;
    }

    if(response.success===true){
      this.pushPage = UserViewPage;
    }
  }

  onSubmit(): void {
    this.userProvider.editUser(this.user).subscribe(
      (response) => {
        this.response(response)
      }
    );
  }


}

import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { HttpClient } from '@angular/common/http';
import { AlertController } from 'ionic-angular';



/*
  Generated class for the NetworkProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NetworkProvider {

  public networkAlertIsOpened:boolean = false;

  constructor(public httpClient : HttpClient, public network: Network, public alertCtrl : AlertController) {
    console.log('Hello NetworkProvider Provider');
  }

  // get connection type of the device, like wifi, 4G ...
  getConnectionState(){
    return this.network.type;
  }

  // method used to know when device have an access to internet
  hasInternetConnection(){
    return this.network.type !== this.network.Connection.NONE;
  }

  // Display an alert when device has no internet access on an action requiring it
  doNetworkAlert() {
    if(!this.networkAlertIsOpened){
      this.networkAlertIsOpened=true;
      let alert = this.alertCtrl.create({
        title: 'Erreur de connexion',
        subTitle: "Aucun accès internet. Veuillez connecter votre appareil à internet.",
        enableBackdropDismiss:false,
        buttons: [{
          text: 'Ok',
          role: 'Cancel',
          handler: () => {
            this.networkAlertIsOpened=false;
          }
        }]
      });
      alert.present();
    }
  }

}

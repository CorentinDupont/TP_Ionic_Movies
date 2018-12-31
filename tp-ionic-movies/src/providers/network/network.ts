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

  getConnectionState(){
    return this.network.type;
  }

  hasInternetConnection(){
    return this.network.type !== this.network.Connection.NONE;
  }

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

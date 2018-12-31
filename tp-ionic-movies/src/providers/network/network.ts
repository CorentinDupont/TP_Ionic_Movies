import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { HttpClient } from '@angular/common/http';



/*
  Generated class for the NetworkProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NetworkProvider {

  connected:boolean;
  connection:any;

  constructor(public httpClient : HttpClient, public network: Network) {
    console.log('Hello NetworkProvider Provider');

    this.connection = network.Connection;

    // watch network for a disconnection
    this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
      this.connected=false;
    });

    // watch network for a connection
    this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      // We just got a connection but we need to wait briefly
      // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          this.connected = true;
        }
      }, 3000);
    });

  }

  getConnectionState(){
    return this.network.type;
  }

  hasInternetConnection(){
    return this.network.type !== this.network.Connection.NONE;
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the DeuxMille48Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-deux-mille48',
  templateUrl: 'deux-mille48.html',
})
export class DeuxMille48Page {
  plateau = [
    [ 0, 0, 0, 0],
    [ 0, 0, 0, 0],
    [ 0, 0, 0, 0],
    [ 0, 0, 0, 0]
  ];
  score = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeuxMille48Page');
  }

  swipeEvent(event){
    let dx=0;
    let dy=0;
    switch(event.direction){
      case 2: dx-=1; break;
      case 4: dx+=1; break;
      case 8: dy-=1; break;
      case 16: dy+=1; break;
    }
    if( (dx!=0 || dy!=0) && (dx==0 || dy==0) ){
      console.log(dx+" "+dy);
      let loopGame = 0;
      for(loopGame=0;loopGame<10;loopGame++){
        this.setGravity(dx,dy);
        this.fusionCase(dx,dy);
      }
      
      this.popRand2();
    }
  }

  private fusionCase(dx,dy){
    let x,y;
    for(y=0;y<4;++y){
      for(x=0;x<4;++x){
        let x2 = x+dx;
        let y2 = y+dy;
        if(x2 >= 0 && x2 < 4 &&  y2 >= 0 && y2 < 4)
        {
          if(this.plateau[x][y] == this.plateau[x2][y2]){
            this.score+=this.plateau[x][y]
            this.plateau[x][y] = 0;
            this.plateau[x2][y2] *=2;
          }
        }
      }
    }
  }

  private setGravity(dx, dy){
    let nbLoop = 0;
    let x,y;
    for(nbLoop=0; nbLoop<4; nbLoop++){
      for(y=0; y<4; y++){
        for( x=0; x<4; x++){
          if(x+dx>=0 && x+dx<4 && y+dy >=0 && y+dy <4){
            if(this.plateau[x][y]!=0 && this.plateau[x+dx][y+dy]==0){
              this.plateau[x+dx][y+dy] = this.plateau[x][y];
              this.plateau[x][y] = 0;
            }
          }
        }
      }
    }
  }

  private popRand2(){
    if(!this.grilleIsEnd()){
      while(1){
        let x = Math.floor((Math.random() * 4));
        let y = Math.floor((Math.random() * 4));
        if(this.plateau[y][x]==0){
          this.plateau[y][x] = 2;
          break;
        }
      }
    } else {
      this.resetAlert();
    }
  }

  private grilleIsEnd(){
    let j;
    let l;
    for(j=0;j<4;++j){
      for(l=0;l<4;++l){
        if(this.plateau[j][l]==0){
          return false;
        }
      }
    }
    return true;
  }

  private resetAlert() {
    let j;
    let l;
    for(j=0;j<4;++j){
      for(l=0;l<4;++l){
        this.plateau[j][l]=0;
      }
    }

    let alert = this.alertCtrl.create({
      title: 'Game Over',
      subTitle: 'Score : '+this.score,
      buttons: [
        {
          text: 'Reset',
          handler: () => {
            this.score = 0;
          }
        }
      ]
    });
    alert.present();
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 *  DeuxMille48Page page. Use to plau to 2048 game
 */

@IonicPage()
@Component({
  selector: 'page-deux-mille48',
  templateUrl: 'deux-mille48.html',
})
export class DeuxMille48Page {
  /**
   * Starting board
   */
  plateau = [
    [ {value:0, x:0, y:0}, {value:0, x:0, y:0}, {value:0, x:0, y:0}, {value:0, x:0, y:0}],
    [ {value:0, x:0, y:0}, {value:0, x:0, y:0}, {value:0, x:0, y:0}, {value:0, x:0, y:0}],
    [ {value:0, x:0, y:0}, {value:0, x:0, y:0}, {value:0, x:0, y:0}, {value:0, x:0, y:0}],
    [ {value:0, x:0, y:0}, {value:0, x:0, y:0}, {value:0, x:0, y:0}, {value:0, x:0, y:0}]
  ];
  /** starting score */
  score = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
    this.initArray();
    this.score = 0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeuxMille48Page');
  }

  /**
   * Where swip event is do in the board
   * @param event the event
   */
  swipeEvent(event){
    let dx=0;
    let dy=0;

    // get swip direction
    switch(event.direction){
      case 2: dx-=1; break;
      case 4: dx+=1; break;
      case 8: dy-=1; break;
      case 16: dy+=1; break;
    }
    // looping 10X game event
    if( (dx!=0 || dy!=0) && (dx==0 || dy==0) ){
      
      let loopGame = 0;
      let haveFusion = false;
      for(loopGame=0;loopGame<10;loopGame++){
        this.setGravity(dx,dy);
        haveFusion= this.fusionCase(dx,dy)? true : haveFusion;
      }
      // pop a random 2 in board
      if(haveFusion){
        this.popRand2();
      }
    }
  }

  private initArray(){
    this.plateau.fill([{value:0, x:0, y:0}]);
    let firestNbX = Math.floor(Math.random() * 3);
    let firestNbY = Math.floor(Math.random() * 3);
    this.plateau[firestNbX][firestNbY].value = 2;
  }

  /**
   * Fusion 2 same number in one by direction
   * @param dx direction x
   * @param dy  direction y
   */
  private fusionCase(dx,dy){
    let haveFusion = false;
    let x,y;
    for(y=0;y<4;++y){
      for(x=0;x<4;++x){
        let x2 = x+dx;
        let y2 = y+dy;
        if(x2 >= 0 && x2 < 4 &&  y2 >= 0 && y2 < 4)
        {
          if(this.plateau[x][y].value == this.plateau[x2][y2].value){
            this.score+=this.plateau[x][y].value
            this.plateau[x][y].value = 0;
            this.plateau[x2][y2].value *=2;
            haveFusion = true;
          }
        }
      }
    }
    return haveFusion;
  }
  /**
   * Move all number to swip direction
   * @param dx direction x
   * @param dy direction y
   */
  private setGravity(dx, dy){
    let nbLoop = 0;
    let x,y;
    for(nbLoop=0; nbLoop<4; nbLoop++){
      for(y=0; y<4; y++){
        for( x=0; x<4; x++){
          if(x+dx>=0 && x+dx<4 && y+dy >=0 && y+dy <4){
            if(this.plateau[x][y].value!=0 && this.plateau[x+dx][y+dy].value==0){
              this.plateau[x][y].x += 50*dx;
              this.plateau[x][y].y += 50*dy;
              this.plateau[x+dx][y+dy].value = this.plateau[x][y].value;
              this.plateau[x][y].value = 0;
              this.resetAllAnimation();
            }
          }
        }
      }
    }
  }

  /**
   * Create a 2 un board if is not full
   */
  private popRand2(){
    if(!this.grilleIsEnd()){
      while(1){
        let x = Math.floor((Math.random() * 4));
        let y = Math.floor((Math.random() * 4));
        if(this.plateau[y][x].value==0){
          this.plateau[y][x].value = Math.floor(Math.random() * 2)*2;
          break;
        }
      }
    } else {
      this.resetAlert();
    }
  }

  /**
   * Test if board is full
   */
  private grilleIsEnd(){
    let j;
    let l;
    for(j=0;j<4;++j){
      for(l=0;l<4;++l){
        if(this.plateau[j][l].value==0){
          return false;
        }
      }
    }
    return true;
  }

  private resetAllAnimation()
  {
    let j=0,l=0;
    for(j=0;j<4;++j){
      for(l=0;l<4;++l){
        this.plateau[j][l].x=0;
        this.plateau[j][l].y=0;
      }
    }
  }

  /**
   * Where board is full, print alert and reset board and score
   */
  private resetAlert() {
    let j;
    let l;
    for(j=0;j<4;++j){
      for(l=0;l<4;++l){
        this.plateau[j][l].value=0;
      }
    }
    this.plateau[1][1].value==2;

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

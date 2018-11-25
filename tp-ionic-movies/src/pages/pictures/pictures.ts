import { Camera, CameraOptions } from '@ionic-native/camera';
import { Component } from '@angular/core';

@Component({
  selector: 'pictures',
  templateUrl: 'pictures.html'
})
export class Pictures {

  /**
   * 
   * FIXME: 
   * Attention, le composant a été ajouté, pour tester, c"'est sur la tab Contact.
   * Je n'ai pas pu le tester sur téléphone, donc ca marche sans péter sur navigateur, 
   * Il faut donc le tester sur mobile pour valider
   * Je mets un ticket trello pour ne pas l'oublier
   */
  constructor(private camera: Camera) { }

  getPicture(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      }, (err) => {
      // Handle error
      });
  }
  
}
import { Pipe, PipeTransform, Injectable } from '@angular/core';

/**
 * Generated class for the GetFirstGenrePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'getFirstGenre',
})
@Injectable()
export class GetFirstGenrePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return value.split(', ')[0];
  }
}

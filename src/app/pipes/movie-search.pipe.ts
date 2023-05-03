import {Pipe, PipeTransform} from '@angular/core';
import {Movie} from "../models/movie";

@Pipe({
  name: 'movieSearch'
})
export class MovieSearchPipe implements PipeTransform {

  transform(value: Movie[], searchValue: string): any {
    if (!searchValue) return value;
    return value.filter((v) => v.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1)
  }

}

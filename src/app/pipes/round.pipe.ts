import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'round'
})
export class RoundPipe implements PipeTransform {

  transform(value: number): unknown {
    let result: string;
    if (value >= 1_000 && value <1_000_000){
      result = (value/1000).toFixed(1).toString() + "K"
    }
    else if (value >= 1_000_000 && value <1_000_000_000){
      result = (value/1_000_000).toFixed(1).toString() + "M"
    }
    else{
      result = (value/1_000_000_000).toFixed(1).toString() + "B"
    }
    return result;
  }

}

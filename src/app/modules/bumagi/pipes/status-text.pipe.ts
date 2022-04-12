import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'statusText'})
export class StatusTextPipe implements PipeTransform {
  transform(
    value: number,
  ): string {
    let status: string
    switch (value) {
      case 0:
        status = 'активна';
        break;
      case 1:
        status = 'приостановлена';
        break;
      case 2:
        status = 'заблокирована';
        break;
      default:
        status = 'неизвестна'
    }
    return status

  }
}

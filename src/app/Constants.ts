import {Injectable} from '@angular/core';

@Injectable()
export class Constants {
  readonly baseUrl: string = 'http://localhost:9090';
  readonly YES: string = 'YES';
  readonly NO: string = 'NO';
}

import { Injectable } from '@angular/core';

@Injectable()
export class UserProvider {
  private _userId: string;

  constructor() {
    console.log('Hello UserProvider Provider');
  }

  get userId(): string {
    return this._userId;
  }

  set userId(uid: string) {
    this._userId = uid;
  }

}

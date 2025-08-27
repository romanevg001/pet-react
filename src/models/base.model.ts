export interface IBaseModel {
  [index: string]: any;
//  checkFields?(row?: any): void;
}

export class BaseModel {
  [index: string]: any;
  checkFields(row?: any): void {
    if (row) {
      for (const prop in this) {
        if (row.hasOwnProperty(prop)) {
            this[prop] =  row[prop];
        }
      }
    }
  }

  matchAndReduceFields(row?: any): void {
    for (const prop in this) {
      if (row.hasOwnProperty(prop)) {
          this[prop] =  row[prop];
      } else {
        delete this[prop];
      }
    }
  }

}

export interface IObjAnyModel {
  [key: string]: any;
}

export interface IObjValueModel<K> {
  [key: string]: K;
}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { concatMap, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export default class PhotosService {

  private url:string;
  private currentPage:number;
  private photos$:Subject<any>;
  private option:string;
  private camera:string;
  private date:any;
  private today:any;
  private sol:any;
  private form:any;

  constructor(private http: HttpClient) {
    this.url = "https://api.nasa.gov/mars-photos/api/v1/rovers";
    this.currentPage = 1;
    this.photos$ = new Subject();
    this.option = "";
    this.camera = "";
    this.today = new Date().toISOString().split('T')[0];
   }

  getPhotos() {
    const formValues = this.form.value;
    let url = `${this.url}/${formValues.roverSelected}/photos?page=${this.currentPage}&api_key=DEMO_KEY`;

    if(formValues.cameraSelected) {
      url = `${url}&camera=${formValues.cameraSelected}`
    }

    const date = this.date? this.date: this.today;

    if(formValues.solDate) {
      url = `${url}&sol=${formValues.solDate}`
    } else {
      url = `${url}&earth_date=${formValues.dateFilter}`
    }
    
    const req= this.http.get(url)
    .subscribe(data => {
      this.photos$.next(data);
      return data;
    });
  }

  nextPage() {
    this.currentPage++;
    this.getPhotos();
  }

  getPhotos$():Observable<any> {
    return this.photos$.asObservable();
  }

  getToday(){
    return this.today;
  }

  setForm(form:any) {
    this.form = form;
  }
}

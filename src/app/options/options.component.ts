import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import PhotosService from '../services/photos.service';
import { FormGroup, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.less']
})
export class OptionsComponent implements OnInit {
  form:FormGroup;
  public options: string[] = ["curiosity", "opportunity", "spirit"];
  public cameras = [] = [{ abbreviation: "FHAZ", name: "Front Hazard Avoidance Camera" },
  { abbreviation: "RHAZ", name: "Rear Hazard Avoidance Camera" },
  { abbreviation: "MAST", name: "Mast Camera" },
  { abbreviation: "CHEMCAM", name: "Chemistry and Camera Complex" },
  { abbreviation: "MAHLI", name: "Mars Hand Lens Imager" },
  { abbreviation: "MARDI", name: "Mars Descent Imager" },
  { abbreviation: "NAVCAM", name: "Navigation Camera" },
  { abbreviation: "PANCAM", name: "Panoramic Camera" },
  { abbreviation: "MINITES", name: "Miniature Thermal Emission Spectrometer (Mini-TES)" },
  ];
  public cameraSelected: any;
  public error: any;
  public dt:any;
  public sol:any;

  constructor(private photosService: PhotosService) {
    this.dt = this.getTodayFormated();
    this.form = new FormGroup({
        'cameraSelected' : new FormControl(""),
        'dateFilter': new FormControl(this.dt),
        'solDate': new FormControl(""),
        'roverSelected': new FormControl(""),
      })
   }

  ngOnInit(){

  }
  

  public selectRover(option: string) {
    return this.form.controls['roverSelected'].setValue(option);
  }

  public getPhotos() {
    if(this.form.value.selectRover) {
      this.photosService.getPhotos();
      this.error = null;
    } else {
      this.error = "Debe seleccionar una opción"
    }
  }

  public getTodayFormated() {
    return this.photosService.getToday();
  }

  public onSubmit() {
    this.photosService.setForm(this.form);
    this.photosService.getPhotos();
  }
}

import { Component, OnInit } from '@angular/core';
import PhotosService from '../services/photos.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.less']
})
export class PhotosComponent implements OnInit {
  photos: any;
  currentPage: any;

  constructor(private photosService: PhotosService) { }

  ngOnInit(): void {
    this.photosService.getPhotos$().subscribe((photos: any) => {
      this.photos = photos.photos;
    });
  }

  public nextPage(): boolean {
    this.photosService.nextPage();
    return true;
  } 
}

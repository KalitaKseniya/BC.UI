import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.scss']
})
export class ImageInputComponent implements OnInit {
  @Input() imageUrl: string;
  @Input() OnSelectedImageCallback: (args: any) => void;
  imageBase64: string;
  imageBase64Src: string;

  constructor() { }

  ngOnInit(): void {
  }

  uploadImage() {
    const file = (<HTMLInputElement>document.querySelector('input[type=file]')).files[0]
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageBase64 = e.target.result.split('base64,')[1];
      this.imageBase64Src = `data:image/png;base64,${this.imageBase64}`;
      this.OnSelectedImageCallback(this.imageBase64);
      console.log(this.imageBase64)
      this.imageUrl = null;
    };
    reader.readAsDataURL(file)
  }
}

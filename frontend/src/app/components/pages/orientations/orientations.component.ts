import { Component } from '@angular/core';
import { orientations } from 'src/utils/orientations';
import { DOWNLOADPDF } from '../../../shared/constants/urls';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-orientations',
  templateUrl: './orientations.component.html',
  styleUrls: ['./orientations.component.scss']
})
export class OrientationsComponent {
  orientationsArray = orientations;
  downloadPdf = DOWNLOADPDF;

  constructor(private http: HttpClient) {}

  downloadFile(path: string): void {
    const url = `${DOWNLOADPDF}${path}`;
    this.http.get(url, { responseType: 'blob' }).subscribe((blob) => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${path}`;
      link.click();
    });
  }
}

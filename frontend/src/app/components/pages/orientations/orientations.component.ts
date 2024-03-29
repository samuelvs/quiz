import { Component } from '@angular/core';
import { orientations } from 'src/utils/orientations';
import { DOWNLOADPDF } from '../../../shared/constants/urls';


@Component({
  selector: 'app-orientations',
  templateUrl: './orientations.component.html',
  styleUrls: ['./orientations.component.scss']
})
export class OrientationsComponent {
  orientationsArray = orientations;
  downloadPdf = DOWNLOADPDF;
}

import { Component, OnInit } from '@angular/core';
import { faShareAlt, faFileDownload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'fmhun-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {
  faShareAlt = faShareAlt;
  faFileDownload = faFileDownload;

  constructor() { }

  ngOnInit() {
  }

}

import { Component } from '@angular/core';
import { DirPathService } from './services/dir-path.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'browser-client';
  currentDirPath = '/';
  currentPage = 0;

  constructor(
    dirPathService: DirPathService
  ) {}

  btnStartClick() {}

  btnPreviousClick() {}

  btnNextClick() {}

  btnEndClick() {}

  itemsPerPageChange(value: string) {}
}

import { Component, OnInit } from '@angular/core';
import { DirPathService } from './services/dir-path.service';
import { FileDataEntity } from './data-entities/file-data-entity';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'browser-client';
  currentDirPath = '/';
  currentPage = 0;
  itemsPerPage = 20;
  fromIndex = 0;
  toIndex = this.itemsPerPage;
  public dataentitiesObservable : Observable<FileDataEntity[]> ;

  constructor(
    private dirPathService: DirPathService
  ) {
    this.dataentitiesObservable = dirPathService.getDirPath(
      this.currentDirPath,
      this.fromIndex,
      this.toIndex
    )
  }

  ngOnInit(): void {
  }

  btnStartClick() {
    this.currentPage = 0;
    this.refreshData();
  }

  btnPreviousClick() {
    this.currentPage--;
    this.currentPage = this.currentPage < 0 ? 0 : this.currentPage;
    this.refreshData();
  }

  btnNextClick() {
    this.currentPage++;
    this.refreshData();
  }

  btnEndClick() {
    this.currentPage++
    this.refreshData();
  }

  itemsPerPageChange(value: string) {
    console.log('In itemsPerPageChange');
    const newItemsPerPage = parseInt(value);
    this.currentPage = Math.floor((this.currentPage * this.itemsPerPage) / newItemsPerPage);
    this.itemsPerPage = newItemsPerPage;
    this.refreshData();
  }

  refreshData() {
    this.fromIndex = this.itemsPerPage * this.currentPage;
    this.toIndex = this.itemsPerPage * (this.currentPage + 1);
    this.dataentitiesObservable = this.dirPathService.getDirPath(this.currentDirPath, this.fromIndex, this.toIndex);
  }

  newDirPathSelected(newPath: string) {
    this.currentPage = 0;
    this.currentDirPath += '/' + newPath;
    this.currentDirPath = this.currentDirPath.replace('//', '/');
    console.log(this.currentDirPath);
    this.refreshData();
  }

  btnBackClick() {
    const arrPath = this.currentDirPath.split('/');
    arrPath.pop();
    this.currentDirPath = arrPath.join('/');
    this.currentDirPath = this.currentDirPath.length == 0 ? '/' : this.currentDirPath;
    this.currentPage = 0;
    this.refreshData();
  }
}

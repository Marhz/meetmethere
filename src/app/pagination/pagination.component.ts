import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() infos;
  @Input() pagesAround = 2;
  @Output() pageChange = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
    console.log(this.infos);
  }

  next() {
    this.pageChange.emit(this.infos.page + 1);
  }

  prev() {
    this.pageChange.emit(this.infos.page - 1);
  }

  changePage(page: number) {
    this.pageChange.emit(page);
  }

  needFirst(): boolean {
    return (this.infos.page - this.pagesAround) > 1;
  }

  needLast():boolean {
    return (this.infos.page + this.pagesAround) < this.infos.lastPage;
  }

  getPages() {
    const res = [];
    for (let i = (this.infos.page - this.pagesAround); i < this.infos.page; i++) {
      if (i > 0)
        res.push(i);
    }
    for (let i = this.infos.page; i <= (this.infos.page + this.pagesAround); i++) {
      if (i <= this.infos.lastPage)
        res.push(i);
    }
    return res;
  }
}

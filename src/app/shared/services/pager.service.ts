import * as _ from 'underscore';

export class PagerService {

  getPager = (totalItems: number, currentPage: number = 1, pageSize: number = 9) => {
    let totalPages = Math.ceil(totalItems / pageSize);
    let startPage: number;
    let endPage: number;
    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage + 2 >= totalPages) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    let pages = _.range(startPage, endPage + 1);

    return {
      totalItems: totalItems,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      currentPage: currentPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    }
  }

}

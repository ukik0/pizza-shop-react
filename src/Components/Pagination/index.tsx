import React from 'react';
import ReactPaginate from 'react-paginate';
import cl from './Pagination.module.scss';


type PaginationProps = {
  onChangePage: (e: number) => void
}
const Pagination:React.FC<PaginationProps> = ({onChangePage}) => {
  return (
    <ReactPaginate
      className={cl.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(e) => onChangePage(e.selected+1)}
      pageRangeDisplayed={4}
      pageCount={3}  
    />
  );
};

export default Pagination;

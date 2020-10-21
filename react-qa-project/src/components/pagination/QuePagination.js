import React, { useEffect, useState } from "react";
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

// Code to use outside of components
//  const [currentPage, setCurrentPage] = useState(1);
//   const [questionPerPage] = useState(10);

//   // Change page
//   const paginate = pageNumber => setCurrentPage(pageNumber);

//   // Get current posts
//   const indexOfLastQuestion = currentPage * questionPerPage;
//   const indexOfFirstQuestion = indexOfLastQuestion - questionPerPage;
//   const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);
  /* <QuestionPagination
    questionPerPage={questionPerPage}
    totalQuestions={questions.length}
    paginate={paginate}
  /> */

const QuestionPagination = ({ questionPerPage, totalQuestions, paginate }) => {
  const pageNumbers = [];
  const [num, setNum] = useState(1);

  for (let i = 1; i <= Math.ceil(totalQuestions / questionPerPage); i++) {
    pageNumbers.push(i);
  }

  const handelClick = (number) => {
    paginate(number);
    console.log(number);
    console.log(pageNumbers.length);
    setNum(number);
  };

  return (
    <div className="text-center">
      <Pagination aria-label="Page navigation example">
        <PaginationItem disabled>
          <PaginationLink first href="#" />
        </PaginationItem>
        <PaginationItem disabled>
          <PaginationLink previous href="#" />
        </PaginationItem>

        {pageNumbers.map((number) => (
            <PaginationItem key={number} active>
              <PaginationLink onClick={() => handelClick(number)}>
                {number}
              </PaginationLink>
            </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationLink next href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink last href="#" />
        </PaginationItem>
      </Pagination>
    </div>

    // <div className='uk-margin-large-top uk-text-small'>
    //   <ul
    //     className='uk-pagination uk-flex-center uk-text-500 uk-margin-remove'
    //     data-uk-margin
    //   >
    //     {num <= 1 ? (
    //       ""
    //     ) : (
    //       <li>
    //         <a onClick={() => handelClick(num - 1)}>
    //           <span data-uk-pagination-previous />
    //         </a>
    //       </li>
    //     )}

    //     {pageNumbers.map((number) => (
    //       <li key={number} className='page-item'>
    //         <a onClick={() => handelClick(number)}>{number}</a>
    //       </li>
    //     ))}

    //     {num >= pageNumbers.length ? (
    //       ""
    //     ) : (
    //       <li>
    //         <a onClick={() => handelClick(num + 1)}>
    //           <span data-uk-pagination-next />
    //         </a>
    //       </li>
    //     )}
    //   </ul>
    // </div>
  );
}

export default QuestionPagination

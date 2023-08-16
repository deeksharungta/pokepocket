import React from "react";
import styles from "./Pagination.module.css";
import Image from "next/image";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const renderPages = () => {
    const pagesToRender = [];
    let maxVisiblePages = 7;

    if (currentPage > maxVisiblePages - 3) {
      pagesToRender.push(
        <button
          key={1}
          className={`${styles.pageNumber}`}
          onClick={() => handlePageChange(1)}
        >
          {1}
        </button>
      );
      if (currentPage > maxVisiblePages - 2) {
        pagesToRender.push(
          <span key="ellipsisLeft" className={styles.ellipsis}>
            ...
          </span>
        );
      }
    }

    for (
      let page = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      page <=
      Math.min(totalPages, currentPage + Math.floor(maxVisiblePages / 2));
      page++
    ) {
      pagesToRender.push(
        <button
          key={page}
          className={`${styles.pageNumber} ${
            page === currentPage ? styles.activePage : ""
          }`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      );
    }

    if (currentPage < totalPages - Math.floor(maxVisiblePages / 2) + 1) {
      if (currentPage < totalPages - Math.floor(maxVisiblePages / 2)) {
        pagesToRender.push(
          <span key="ellipsisRight" className={styles.ellipsis}>
            ...
          </span>
        );
      }
      pagesToRender.push(
        <button
          key={totalPages}
          className={styles.pageNumber}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return pagesToRender;
  };

  // const renderPages = () => {
  //   const pagesToRender = [];
  //   let maxVisiblePages = 7;

  //   for (let page = 1; page <= Math.min(totalPages, maxVisiblePages); page++) {
  //     pagesToRender.push(
  //       <button
  //         key={page}
  //         className={`${styles.pageNumber} ${
  //           page === currentPage ? styles.activePage : ""
  //         }`}
  //         onClick={() => handlePageChange(page)}
  //       >
  //         {page}
  //       </button>
  //     );
  //   }
  //   pagesToRender.push(
  //     <span key="ellipsis1" className={styles.ellipsis}>
  //       ...
  //     </span>
  //   );
  //   pagesToRender.push(
  //     <button
  //       key={totalPages}
  //       className={styles.pageNumber}
  //       onClick={() => handlePageChange(totalPages)}
  //     >
  //       {totalPages}
  //     </button>
  //   );

  //   return pagesToRender;
  // };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.paginationButton}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <Image src="./previous.svg" width={8} height={16} alt="Previous Icon" />
      </button>
      {renderPages()}
      <button
        className={styles.paginationButton}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <Image src="./next.svg" width={8} height={16} alt="Next Icon" />
      </button>
    </div>
  );
};

export default Pagination;

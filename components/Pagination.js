import React from "react";
import styles from "./Pagination.module.css";
import Image from "next/image";
import { useSelector } from "react-redux";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const loading = useSelector((state) => state.pokemon.loading);
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      window.scrollTo(0, 0);
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
          disabled={loading}
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
          disabled={loading}
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
          disabled={loading}
        >
          {totalPages}
        </button>
      );
    }

    return pagesToRender;
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.paginationButton}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1 || loading}
      >
        <Image src="./previous.svg" width={8} height={16} alt="Previous Icon" />
      </button>
      {renderPages()}
      <button
        className={styles.paginationButton}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || loading}
      >
        <Image src="./next.svg" width={8} height={16} alt="Next Icon" />
      </button>
    </div>
  );
};

export default Pagination;

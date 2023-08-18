"use-client";

import { useEffect, useState } from "react";
import IconArrowDown from "../icons/IconArrowDown";

interface Props {
  totalPage: number;
  page: number;
  PageButtonComponent?: any;
  onPageChange: (page: number) => void;
  className?: string;
}

const defaultButton = (props: any) => (
  <button
    {...props}
    label={props.children}
    className={`p-1 ${props.className}`}
  />
);

function Pagination({
  page,
  totalPage,
  PageButtonComponent = defaultButton,
  onPageChange,
  className,
}: Props) {
  const [visiblePages, setVisiblePages] = useState<number[]>([]);
  const [activePage, setActivePage] = useState<number>(page);

  const filterPages = (visiblePages: number[], totalPages: number) => {
    return visiblePages.filter((page) => page <= totalPages);
  };

  const getVisiblePages = (page: number, total: number) => {
    if (total < 7) {
      return filterPages([1, 2, 3, 4, 5, 6], total);
    } else {
      if (page % 5 >= 0 && page > 4 && page + 2 < total) {
        return [1, page - 1, page, page + 1, total];
      } else if (page % 5 >= 0 && page > 4 && page + 2 >= total) {
        return [1, total - 3, total - 2, total - 1, total];
      } else {
        return [1, 2, 3, 4, 5, total];
      }
    }
  };

  const changePage = (page: number) => {
    if (page < 1 || page > totalPage || page === activePage) return;
    setActivePage(page);
    onPageChange(page);
  };

  useEffect(() => {
    const visiblePages = getVisiblePages(activePage, totalPage);
    setVisiblePages(filterPages(visiblePages, totalPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage, totalPage]);

  useEffect(() => {
    if (page === activePage) return;
    setActivePage(page);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className={`Table__pagination flex items-center gap-3 ${className}`}>
      <div className="Table__prevPageWrapper">
        <PageButtonComponent
          className={`border rounded-md p-2 bg-gray-200 text-sm ${
            activePage === 1
              ? "cursor-not-allowed opacity-40 border-gray-400"
              : "hover:bg-gray-300 hover:border-gray-800 border-gray-400"
          }`}
          onClick={() => changePage(activePage - 1)}
          disabled={activePage === 1}>
          <IconArrowDown width={16} className="rotate-90" />
        </PageButtonComponent>
      </div>

      <div className="Table__visiblePagesWrapper flex items-center gap-2">
        {visiblePages.map((page, index, array) => {
          return (
            <PageButtonComponent
              key={page}
              className={
                activePage === page
                  ? "bg-indigo-500 w-8 rounded-md text-white"
                  : ""
              }
              onClick={changePage.bind(null, page)}>
              {array[index - 1] + 2 < page ? `...${page}` : page}
            </PageButtonComponent>
          );
        })}
      </div>

      <div className="Table__nextPageWrapper">
        <PageButtonComponent
          className={`border rounded-md p-2 bg-gray-200 text-sm ${
            activePage === totalPage
              ? "cursor-not-allowed opacity-40 border-gray-400"
              : "hover:bg-gray-300 hover:border-gray-800 border-gray-400"
          }`}
          onClick={() => changePage(activePage + 1)}
          disabled={activePage === totalPage}>
          <IconArrowDown width={16} className="rotate-[-90deg]" />
        </PageButtonComponent>
      </div>
    </div>
  );
}

export default Pagination;

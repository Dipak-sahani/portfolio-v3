import React from 'react';

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg font-medium ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        style={{ backgroundColor: '#F5F5F5', color: '#3C4044' }}
      >
        ← Previous
      </button>

      {/* Page Numbers */}
      <div className="flex space-x-2">
        {getPageNumbers().map((page, index) => (
          page === '...' ? (
            <span key={index} className="px-3 py-2" style={{ color: '#3C4044' }}>...</span>
          ) : (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentPage === page ? 'text-white' : ''}`}
              style={{
                backgroundColor: currentPage === page ? '#FD7B41' : '#F5F5F5',
                color: currentPage === page ? 'white' : '#3C4044'
              }}
            >
              {page}
            </button>
          )
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg font-medium ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
        style={{ backgroundColor: '#F5F5F5', color: '#3C4044' }}
      >
        Next →
      </button>

      {/* Page Info */}
      <div className="text-sm ml-4" style={{ color: '#3C4044' }}>
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};
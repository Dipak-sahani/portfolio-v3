import React, { useState, useEffect, useCallback, useRef } from "react";
import { useToast } from "../components/toast/ToastProvider";
import { SearchFilters } from "../components/component/SearchFilters";
import { PeopleList } from "../components/component/PeopleList";
import { Pagination } from "../components/component/Pagination";
import { searchPeople } from "../services/people.service";

const PeopleSearch = () => {
  const [filters, setFilters] = useState({
    query: "",
    skills: [],
    location: "",
    minExperience: "",
    maxExperience: "",
    availability: [],
    minRate: "",
    maxRate: "",
    sortBy: "relevance",
    sortOrder: "desc",
  });

  const [showSearch, setShowSearch] = useState(false);
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalResults: 0,
    limit: 10,
  });

  const toast = useToast();
  const lastSearchRef = useRef("");
  const isMountedRef = useRef(true);
  const errorShownRef = useRef(false);

  // Cleanup on unmount
  useEffect(() => {
    isMountedRef.current = true; // ✅ component mounted

    return () => {
      isMountedRef.current = false; // ✅ component unmounted
    };
  }, []);

  // Debounced search with error handling
  const debouncedSearch = useCallback(
    debounce(async (searchFilters, page) => {

      if (!isMountedRef.current) return;

      const searchKey = JSON.stringify({ ...searchFilters, page });
      if (lastSearchRef.current === searchKey) return;

      lastSearchRef.current = searchKey;
      errorShownRef.current = false;

      try {
        setLoading(true);
        const response = await searchPeople({
          ...searchFilters,
          page,
          limit: pagination.limit,
        });
        // console.log(response);

        if (!isMountedRef.current) return;

        setPeople(response.data || []);
        setPagination((prev) => ({
          ...prev,
          page: response.page || 1,
          totalPages: response.totalPages || 1,
          totalResults: response.totalResults || 0,
        }));
      } catch (error) {
        if (!isMountedRef.current || errorShownRef.current) return;

        errorShownRef.current = true;

        // Show error only once
        toast.error("Failed to fetch people. Please try again.");
        console.error("Search error:", error);

        // Reset to empty state
        if (isMountedRef.current) {
          setPeople([]);
          setPagination((prev) => ({
            ...prev,
            page: 1,
            totalPages: 1,
            totalResults: 0,
          }));
        }
      } finally {
        if (isMountedRef.current) {
          setLoading(false);
        }
      }
    }, 500),
    [pagination.limit, toast],
  );

  // Initial load and when filters change
  useEffect(() => {
    

    debouncedSearch(filters, 1);

    // Cleanup function
    return () => {
      // Cancel any pending search
      debouncedSearch.cancel && debouncedSearch.cancel();
    };
  }, [filters, debouncedSearch]);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages && !loading) {
      debouncedSearch(filters, newPage);
    }
  };

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  // Handle search query change
  const handleSearchChange = (e) => {
    handleFilterChange({ query: e.target.value });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      query: "",
      skills: [],
      location: "",
      minExperience: "",
      maxExperience: "",
      availability: [],
      minRate: "",
      maxRate: "",
      sortBy: "relevance",
      sortOrder: "desc",
    });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#DDDCDB" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: "#3C4044" }}>
            Find Talented People
          </h1>
          <p className="text-lg" style={{ color: "#3C4044" }}>
            Search and filter through our talented community
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={filters.query}
              onChange={handleSearchChange}
              disabled={loading}
              placeholder="Search by name, title, or skills..."
              className="w-full px-6 py-4 rounded-xl border-2 focus:outline-none focus:ring-2 shadow-lg disabled:opacity-50"
              style={{
                backgroundColor: "white",
                borderColor: "#EDBF9B",
                color: "#3C4044",
              }}
            />
            <div className="absolute right-3 top-3">
              {loading && (
                <div
                  className="w-8 h-8 border-2 rounded-full animate-spin"
                  style={{ borderTopColor: "#FD7B41" }}
                ></div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          {showSearch && (
            <div className="lg:w-1/4">
              <SearchFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={clearFilters}
                disabled={loading}
              />
            </div>
          )}

          {/* Results Section */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
              <div className="mb-4 sm:mb-0 flex-1/3">
                <p className="text-lg font-medium" style={{ color: "#3C4044" }}>
                  {pagination?.totalResults-1} people found
                  {filters.query && ` for "${filters.query}"`}
                </p>
              </div>
              <div className="w-full flex items-center flex-1/3">
                <button
                  className="flex-1 py-2 px-4 rounded-lg font-medium text-center transition-colors w-fit mx-4"
                  style={{ backgroundColor: "#FD7B41", color: "white" }}
                  onClick={() => setShowSearch(!showSearch)}
                >
                  {showSearch?<h1>Hide Filters</h1>:<h1>Show Filters</h1> }
                </button>
              </div>

              {/* Sort Options */}
              <div className="flex-1/3 items-center space-x-2">
                <span className="text-sm" style={{ color: "#3C4044" }}>
                  Sort by:
                </span>
                <select
                  value={filters.sortBy}
                  onChange={(e) =>
                    handleFilterChange({ sortBy: e.target.value })
                  }
                  disabled={loading}
                  className="px-3 py-2 rounded-lg border focus:outline-none focus:ring-1 disabled:opacity-50"
                  style={{
                    backgroundColor: "white",
                    borderColor: "#EDBF9B",
                    color: "#3C4044",
                  }}
                >
                  <option value="relevance">Relevance</option>
                  <option value="experience">Experience</option>
                  <option value="rate">Hourly Rate</option>
                  <option value="name">Name</option>
                </select>
                <button
                  onClick={() =>
                    handleFilterChange({
                      sortOrder: filters.sortOrder === "asc" ? "desc" : "asc",
                    })
                  }
                  disabled={loading}
                  className="px-3 py-2 rounded-lg border disabled:opacity-50"
                  style={{
                    backgroundColor: "white",
                    borderColor: "#EDBF9B",
                    color: "#3C4044",
                  }}
                >
                  {filters.sortOrder === "asc" ? "↑" : "↓"}
                </button>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-12">
                <div className="text-center">
                  <div
                    className="w-16 h-16 border-4 rounded-full animate-spin mx-auto mb-4"
                    style={{ borderTopColor: "#FD7B41" }}
                  ></div>
                  <p style={{ color: "#3C4044" }}>Loading people...</p>
                </div>
              </div>
            )}

            {/* Results */}
            {!loading && (
              <>
                <PeopleList people={people} />

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <Pagination
                    currentPage={pagination.page}
                    totalPages={pagination.totalPages}
                    onPageChange={handlePageChange}
                    disabled={loading}
                  />
                )}
              </>
            )}

            {/* No Results */}
            {!loading && people.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4" style={{ color: "#EDBF9B" }}>
                  👥
                </div>
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ color: "#3C4044" }}
                >
                  No people found
                </h3>
                <p className="mb-4" style={{ color: "#3C4044" }}>
                  Try adjusting your search filters
                </p>
                <button
                  onClick={clearFilters}
                  disabled={loading}
                  className="px-6 py-2 rounded-lg font-medium disabled:opacity-50"
                  style={{ backgroundColor: "#FD7B41", color: "white" }}
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Improved debounce utility with cancel function
function debounce(func, wait) {
  let timeout;

  const debounced = function (...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };

  debounced.cancel = function () {
    clearTimeout(timeout);
  };

  return debounced;
}

export default PeopleSearch;

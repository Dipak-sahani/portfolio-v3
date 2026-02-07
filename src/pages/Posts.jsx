import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostStore } from '../store/post.store';
import PostCard from '../components/post/PostCard';
import { useAuthStore } from '../store/auth.store';

const PostSkeleton = () => (
  <div className="bg-white rounded-lg shadow-sm p-4 mb-4 animate-pulse">
    <div className="flex items-center space-x-3 mb-4">
      <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
    <div className="space-y-3 mb-4">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
    <div className="h-64 bg-gray-200 rounded w-full mb-4"></div>
    <div className="flex justify-between">
      <div className="h-8 bg-gray-200 rounded w-20"></div>
      <div className="h-8 bg-gray-200 rounded w-20"></div>
      <div className="h-8 bg-gray-200 rounded w-20"></div>
    </div>
  </div>
);

const PostsPage = ({ isHome = false }) => {
  const { posts, fetchPosts, pagination, loading } = usePostStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const loadMoreRef = useRef(null);
  const navigate = useNavigate();

  // initial fetch
  useEffect(() => {
    fetchPosts(false, isAuthenticated);
  }, []);

  // infinite scroll - only if not home
  useEffect(() => {
    if (isHome) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && pagination.page < pagination.totalPages && !loading) {
          fetchPosts(true);
        }
      },
      { threshold: 0.7 }
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [pagination.page, pagination.totalPages, loading, isHome]);

  return (
    <div className="space-y-4 pb-20">
      {posts?.map((post) => (
        <div key={post?._id}>
          <PostCard postId={post?._id} />
        </div>
      ))}

      {loading && !isHome && (
        <>
          <PostSkeleton />
          <PostSkeleton />
        </>
      )}

      {isHome ? (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate('/post')}
            className="px-6 py-2 bg-[#FD7B41] text-white font-medium rounded-full hover:bg-[#e06b36] transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Show More Posts
          </button>
        </div>
      ) : (
        <div ref={loadMoreRef} className="h-10 flex justify-center items-center">
          {!loading && pagination.page >= pagination.totalPages && (
            <span className="text-gray-400 text-sm bg-gray-100 px-4 py-2 rounded-full">No more posts to show</span>
          )}
        </div>
      )}
    </div>
  );
};

export default PostsPage;

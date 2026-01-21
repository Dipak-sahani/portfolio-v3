import { useEffect, useRef } from 'react';
import { usePostStore } from '../store/post.store';
import PostCard from '../components/post/PostCard';

const PostsPage = () => {
  const { posts, fetchPosts, pagination, loading } = usePostStore();
  const loadMoreRef = useRef(null);

  // initial fetch
  useEffect(() => {
    fetchPosts(false);
  }, []);

  // infinite scroll
  useEffect(() => {
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
  }, [pagination.page, pagination.totalPages, loading]);

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post?._id}>
        <PostCard  postId={post?._id} />

        </div>
      ))}

      <div ref={loadMoreRef} className="h-12 flex justify-center items-center">
        {loading && <span className="text-gray-400 text-sm">Loading...</span>}
        {!loading && pagination.page >= pagination.totalPages && (
          <span className="text-gray-400 text-xs">No more posts</span>
        )}
      </div>
    </div>
  );
};

export default PostsPage;

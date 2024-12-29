import { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Import framer-motion
import PostPreview from 'components/PostPreview';
import type { Post } from 'lib/sanity.queries';

export default function MoreStories({ posts }: { posts: Post[] }) {
  const [visibleCount, setVisibleCount] = useState(4); // Initial visible posts count
  const [visiblePosts, setVisiblePosts] = useState([]);

  useEffect(() => {
    console.log("Posts received: ", posts);  // Debugging - check if posts are passed
    // Show posts up to the visible count
    setVisiblePosts(posts.slice(0, visibleCount));
  }, [posts, visibleCount]);

  const handleLoadMore = () => {
    // Increase visible count only if there are more posts to show
    if (visibleCount < posts.length) {
      setVisibleCount((prevCount) => prevCount + 2);
    }
  };

  // Debugging - check if the visibleCount is correct
  console.log("Visible posts count: ", visibleCount);
  console.log("Posts length: ", posts.length);

  return (
    <section className="max-w-full sm:px-6 lg:px-16 pb-8"> {/* Responsive padding for the section */}
      <div className='border w-full border-yellow-500 mb-16'></div>
      <div className="mb-32 grid grid-cols-1 gap-y-10 sm:gap-y-16 md:grid-cols-2 md:gap-x-12 md:gap-y-20 lg:gap-x-20">
        {visiblePosts.map((post, index) => (
          <motion.div
            key={post._id}
            initial={{ opacity: 0, y: 20 }} // Animation starts with opacity 0 and slides up
            animate={{ opacity: 1, y: 0 }} // Animation ends with full opacity and original position
            transition={{ delay: index * 0.2, duration: 0.3 }} // Staggered animation
            whileHover={{
              scale: 1.05, // Slight zoom on hover
              boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)', // Add shadow
              transition: { duration: 0.2 }, // Smooth hover transition
            }}
          >
            <PostPreview
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              author={post.author}
              slug={post.slug}
              excerpt={post.excerpt}
            />
          </motion.div>
        ))}
      </div>
      {visibleCount < posts.length && ( // Show button only if there are more posts to load
        <div className="text-center">
          <button
            onClick={handleLoadMore}
            className="wave bg-[#FF9933]  text-white px-14 py-3 rounded-lg font-bold hover:from-orange-600 hover:to-orange-800 mb-10"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
}

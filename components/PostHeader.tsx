import Avatar from 'components/AuthorAvatar'
import Date from 'components/PostDate'
import PostTitle from 'components/PostTitle'
import type { Post } from 'lib/sanity.queries'
import { FaArrowLeftLong } from "react-icons/fa6";
import Link from 'next/link';

export default function PostHeader(
  props: Pick<Post, 'title' | 'date' | 'author' | 'slug'>,
) {
  const { title, date, author } = props;

  return (
    <div className='max-w-7xl m-auto'>
      <div className="relative mb-10">
        {/* Primary button with background color effect */}
        <button className=" px-8 py-3 text-white font-semibold bg-yellow-500 border-4 border-yellow-500 rounded-lg z-10 transition-all duration-300 ease-in-out transform hover:bg-yellow-600 hover:wave focus:outline-none flex items-center space-x-3">
          <FaArrowLeftLong />
          <span>Go Back</span>
        </button>

        {/* Secondary button with background color effect */}
        <Link href="/">
        <button className="absolute bottom-[5px] left-[-5px] px-8 py-3 text-black font-semibold bg-white border-4 rounded-lg shadow-lg hover:bg-yellow-100 active:bg-gray-200 hover:wave active:shadow-md z-20 transition-all duration-300 ease-in-out transform hover:wave focus:outline-none flex items-center space-x-3">
          <FaArrowLeftLong />
         
          <span>Go Back</span>
         
        </button>
        </Link>
      </div>

      <div className='bg-[url("/proxy-image1.jpeg")] max-w-7xl mx-auto bg-cover bg-center md:h-[200px] h-[200px]'>
        <div className='bg-[#FF9933] opacity-80 p-10 h-full '>
          <div className=' md:flex-row md:justify-between items-center h-full'>
            <div className="text-lg text-center md:text-left z-30">
              <PostTitle>{title}</PostTitle>
              <Date dateString={date} />
            </div>

            {/* Author's Avatar moved inside the yellow section on mobile with higher z-index */}
            <div className="md:mt-0 z-30 text-black text-center m-auto ">  {/* Increased z-index for author */}
              {author && <Avatar name={author.name} picture={author.picture} />}
            </div>
          </div>
        </div>

        {/* For Mobile Version: */}
      
      </div>
    </div>
  );
}

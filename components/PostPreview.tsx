import Avatar from 'components/AuthorAvatar'
import CoverImage from 'components/CoverImage'
import Date from 'components/PostDate'
import type { Post } from 'lib/sanity.queries'
import Link from 'next/link'

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Omit<Post, '_id'>) {
  return (
    <div className='border max-h-[500px] rounded-md'>
      <div className="mb-5 relative">
        <CoverImage
          slug={slug}
          title={title}
          image={coverImage}
          priority={false}
        />
     <div className='absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 z-30 flex items-end p-5 h-20'>
          <div>
            <h3 className="text-xl leading-snug text-gray-300">
              {title}
            </h3>
            <div className="text-sm text-gray-300 mt-2">
              <Date dateString={date} />
            </div>
          </div>
        </div>
      </div>

      <h3 className="mb-3 text-2xl underline leading-snug text-balance px-5">
        <Link href={`/posts/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>

      {excerpt && (
        <p className="flex flex-wrap pl-5 pb-5">{excerpt}</p>
      )}
    </div>
  )
}

import { format, parseISO } from 'date-fns'

export default function PostDate({ dateString }: { dateString: string }) {
  if (!dateString) return null

  const date = parseISO(dateString)
  return <time dateTime={dateString} className='md:px-5 px-0 text-sm md:text-lg'>{format(date, 'LLLL	d, yyyy')}</time>
}

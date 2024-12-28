export default function PostTitle({ children }) {
  return (
    <h1 className="max-w-[90%] w-full z-50 ml-5 text-center text-black text-2xl font-bold leading-tight tracking-tighter md:text-left md:text-3xl md:leading-none lg:text-4xl text-balance">
      {children}
    </h1>
  )
}

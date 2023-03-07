import Posts from "./components/Posts";

export default function Home() {
  return (
    <>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <Posts />
        </div>
      </main>
    </>
  )
}

export const revalidate = 0;

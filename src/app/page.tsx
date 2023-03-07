import CreateVideo from "./components/CreateVideo";
import { Post } from "@/types/post";
import PostComponent from "./components/Post";
import { getPosts } from "@/utils/supabase";

export default async function Home() {
  let posts;
  try {
    posts = await getPosts();
  } catch (error) {

  }

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <CreateVideo />
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts && posts.map(post => (
              <PostComponent key={post.id} post={post} />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

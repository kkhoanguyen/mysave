import Head from 'next/head';
import { getPostById } from "@/utils/supabase";
import { } from 'next/navigation';
import { Post } from "@/types/post";
import ShowMoreText from "@/app/components/ShowMoreText";
import PostActions from "@/app/components/PostActions";


type Params = {
  pid: string;
};
export interface Props {
  params: Params;
}


export async function generateMetadata({ params }: Props) {
  const post: Post = await getPostById(Number(params.pid));
  return {
    title: `My Save : ${post.title}`,
    openGraph: {
      title: `My Save : ${post.title}`,
      description: post.description,
      siteName: 'My Save',
      images: [
        {
          url: post.thumbnail,
          width: 800,
          height: 600,
        },
      ],
      locale: 'en-US',
      type: 'website',
    },
  };
}

const PostDetails = async ({ params }: Props) => {
  const post: Post = await getPostById(Number(params.pid));
  const ytLink = `https://www.youtube.com/embed/${post.videoId}?autoplay=1`;
  return (
    <>
      <header className="">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <a className="btn btn-primary" href="/">Back to home</a>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              width="853"
              height="480"
              src={`https://www.youtube.com/embed/${post.videoId}?autoplay=1&enablejsapi=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={post.title}
            />
          </div>
          <div className="mt-5">
            <div className="flex">
              <h1 className="text-2xl font-bold flex-1">{post.title}</h1>
              <PostActions post={post} />
            </div>
            {post.description && <ShowMoreText text={post.description} />}
          </div>
        </div>
      </main>
    </>
  );
};

export default PostDetails;
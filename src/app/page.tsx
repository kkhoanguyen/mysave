import Posts from "./components/Posts";
import { getPosts } from "@/utils/supabase";
import { headers } from 'next/headers';

const LIMIT = 9;

export async function generateMetadata() {
  const data = await getPosts(LIMIT, 1);
  return {
    title: `My Save : Home : Total Posts ${data.total}`,
    openGraph: {
      title: `My Save : Home : Total Posts ${data.total}`,
      siteName: 'My Save',
      images: [
        {
          url: "/my-save-mock-home.png",
          width: 800,
          height: 600,
        },
      ],
      locale: 'en-US',
      type: 'website',
    },
  };
}
export default async function Home() {
  const data = await getPosts(LIMIT, 1);
  const headersList = headers();
  const host = headersList.get('host');
  return (
    <>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <Posts initData={data} initPage={2} host={host || ""} />
        </div>
      </main>
    </>
  )
}

export const revalidate = 0;

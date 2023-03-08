import Posts from "./components/Posts";
import { headers } from "next/headers";
import { getPosts } from "@/utils/supabase";

const LIMIT = 9;
export default async function Home() {
  const data = await getPosts(LIMIT, 1);
  const headersList = headers();
  const host = headersList.get('host');
  return (
    <>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <Posts initData={data} initPage={2} />
        </div>
      </main>
    </>
  )
}

export const revalidate = 0;

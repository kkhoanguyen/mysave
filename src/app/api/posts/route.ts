import { getPosts, insertPost } from "@/utils/supabase";
import { getVideoMeta, youtubeParser } from "@/utils/youtube";
import { Post } from "@/types/post";

export async function GET(request: Request, res: Response) {
  const { data, error } = await getPosts();
  return new Response(JSON.stringify(data));
}
export async function POST(req: Request, res: Response) {
  const ytLink = await req.text();
  let resOption = {};
  const vId = youtubeParser(ytLink);
  if (vId) {
    const vMeta = await getVideoMeta(vId);
    if (vMeta) {
      const { data, error } = await insertPost({
        title: vMeta.title,
        videoId: vId,
        link: ytLink,
        description: vMeta.description,
        thumbnail: vMeta.thumbnails.standard.url,
      });
      if (!error) {
        return new Response(JSON.stringify(data[0]));
      } else {
        resOption = {
          status: 500,
          statusText: "failed to create video",
        };
      }
    }
  }

  return new Response(
    null,
    resOption || {
      status: 400,
      statusText: "invalid youtube url",
    },
  );
  // const { error } = await insertPost({ link: "testing" });
}

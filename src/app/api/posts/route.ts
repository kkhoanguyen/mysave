import { getPosts, insertPost } from "@/utils/supabase";
import { getVideoMeta, youtubeParser } from "@/utils/youtube";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, res: Response) {
  try {
    const { searchParams } = req.nextUrl;
    const limit = Number(searchParams.get("limit")) || 10;
    const page = Number(searchParams.get("page")) || 1;
    const data = await getPosts(limit, page);
    return new Response(JSON.stringify(data));
  } catch (error) {}
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

export interface YouTubeThumbnail {
  url: string;
  width: number;
  height: number;
}
export interface YouTubeMeta {
  title: string;
  description: string;
  thumbnails: Record<string, YouTubeThumbnail>;
}

interface ApiItem {
  id: string;
  snippet: YouTubeMeta;
}

export async function getVideoMeta(id: string) {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${process.env.NEXT_PUBLIC_YOUTUBE_KEY}`,
  );
  const data: { items: ApiItem[] } = await res.json();
  const item = data.items ? data.items.find((i) => i.id === id) : undefined;
  if (item) {
    return item.snippet;
  }
  return undefined;
}

export function youtubeParser(url: string): string {
  var regExp =
    /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
  var match = url.match(regExp);
  return match && match[1].length == 11 ? match[1] : "";
}

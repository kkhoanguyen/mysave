import Image from 'next/image';
import { Post as PostTpe } from '@/types/post';
import ShowMoreText from './ShowMoreText';
export interface Props {
  post: PostTpe;
}
export default function Post({ post }: Props) {
  return (

    <div className="mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow"
    >
      <Image
        className="aspect-video w-full object-cover"
        src={post.thumbnail}
        width={640}
        height={480}
        alt={post.thumbnail} />
      <div className="p-4">
        <a className="text-xl font-medium text-gray-900" href={`/posts/${post.id}`}>{post.title}</a>
      </div >
    </div >
  );
}

export const revalidate = 0




import { useState } from 'react';
import { Post as PostTpe } from '@/types/post';
import { Button, Card } from 'react-daisyui';
import { shareIcon } from '@/icons';
import ShareModal from './ShareModal';

export interface Props {
  post: PostTpe;
  host: string;
}
export default function Post({ post, host }: Props) {
  const [isShare, setIsShare] = useState(false);
  return (
    <div className='w-full'>
      <Card bordered className='bg-white'>
        <div className="flex justify-end">
          <Button startIcon={shareIcon} onClick={() => setIsShare(true)} color="primary" shape="circle" variant="link" />
        </div>
        <a className="text-xl font-medium text-gray-900" href={`/posts/${post.id}`}>
          <Card.Image
            src={post.thumbnail}
            alt={post.thumbnail}
          />
          <Card.Body>
            {post.title}
          </Card.Body>
        </a>
      </Card >
      <ShareModal open={isShare} setOpen={(t: boolean) => setIsShare(t)} shareURL={`${host}/posts/${post.id}`} />
    </div>
  );
}



import { usePathname } from 'next/navigation';

type Params = {
  pid: string;
};
export interface Props {
  params: Params;
}

const PostDetails = ({ params }: Props) => {
  return <p>Post: {params.pid}</p>;
};

export default PostDetails;
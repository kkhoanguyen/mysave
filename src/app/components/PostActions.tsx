"use client";
import React, { useState } from 'react';
import { Dropdown, Modal, Button } from 'react-daisyui';
import { useRouter } from 'next/navigation';
import { dotIcon, trashIcon, shareIcon, copyIcon } from '@/icons';
import { Post } from '@/types/post';
import ShareModal from './ShareModal';

export interface Props {
  post: Post;
}
export default function PostActions({ post }: Props) {
  const [isDelete, setIsDelete] = useState(false);
  const [isShare, setIsShare] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    const resp = await fetch(`/api/posts/${post.id}`, { method: "DELETE" });
    if (resp.status >= 200 && resp.status < 300) {
      router.replace("/");
    }
  };

  return (
    <>
      <Dropdown hover horizontal="left">
        <Dropdown.Toggle>{dotIcon}</Dropdown.Toggle>
        <Dropdown.Menu className="w-52 bg-neutral">
          <Dropdown.Item onClick={() => setIsShare(true)} > {shareIcon} Share</Dropdown.Item>
          <Dropdown.Item color='error' onClick={() => setIsDelete(true)}>{trashIcon} Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <ShareModal open={isShare} setOpen={(t: boolean) => setIsShare(t)} />

      <Modal open={isDelete} responsive>
        <Button
          size="sm"
          shape="circle"
          className="absolute right-2 top-2"
          onClick={() => { setIsDelete(false); }}
        >
          ✕
        </Button>
        <Modal.Header className="font-bold">
          Delete this post
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this post?</p>
          {post && <p className='font-bold'>{post.link}</p>}
        </Modal.Body>
        <Modal.Actions>
          < Button onClick={() => setIsDelete(false)} color="ghost">Cancel</Button>
          <Button onClick={handleDelete}>Yes!</Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

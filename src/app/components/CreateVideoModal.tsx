'use client';
import { Fragment, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Modal } from 'react-daisyui';
import { youtubeParser } from '@/utils/youtube';

export interface Props {
  open: boolean;
  onClose: () => void,
  onCreateDone: () => void,
}
export default function CreateVideoModal({ open, onClose, onCreateDone }: Props) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [creating, setCreating] = useState(false);
  const cancelButtonRef = useRef(null);
  const onCreateVideo = async () => {
    setCreating(true);
    try {
      await fetch("/api/posts", {
        method: "POST",
        body: value
      });
      onClose();
      onCreateDone()
    } catch (error) {

    } finally {
      setCreating(false);
    }
  };
  const handleCreate = () => {
    if (youtubeParser(value)) {
      onCreateVideo();
    }
  };
  const validatedLink = () => {
    if (!youtubeParser(value)) {
      setError(true);
    } else {
      setError(false);
    }
  };
  return (
    <Modal open={open} responsive>
      <Modal.Header className="font-bold">
        Add Video
      </Modal.Header>

      <Modal.Body>
        <div className="form-control w-full">
          <label className="label" htmlFor='video-link'>
            YouTube Video Link
          </label>
          <Input
            type="text"
            name="video-link"
            id="video-link"
            placeholder="https://www.youtube.com/watch?v={videoID}, https://youtu.be/{videoID}"
            onChange={(e) => setValue(e.target.value)}
            onBlur={validatedLink}
          />
        </div>
      </Modal.Body>

      <Modal.Actions>
        <Button onClick={onClose} color="ghost">Cancel</Button>
        <Button onClick={handleCreate} color="primary" disabled={error}>Add</Button>
      </Modal.Actions>
      {creating &&
        <div className="absolute flex items-center justify-center w-full h-full top-0 bg-white bg-opacity-50">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
            <span
              className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...</span>
          </div>
        </div>}
    </Modal>
  );
}
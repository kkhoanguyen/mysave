import React from 'react';
import { Modal, Button } from 'react-daisyui';
import { copyIcon } from '@/icons';
import useCopyToClipboard from '@/hooks/useCopyToClickboard';

export default function ShareModal({ open, setOpen }: { open: boolean; setOpen: (t: boolean) => void; }) {
  const [value, copy, reset] = useCopyToClipboard();

  return (
    <Modal open={open}>
      <Button
        size="sm"
        shape="circle"
        className="absolute right-2 top-2"
        onClick={() => { setOpen(false); reset(); }}
      >
        ✕
      </Button>
      <Modal.Header className="font-bold">
        Share this post
      </Modal.Header>

      <Modal.Body>
        <div className='flex items-stretch gap-2'>
          <div className='flex items-center flex-1 rounded-md bg-neutral p-2'>
            <p>{window.location.href}</p>
          </div>
          <Button startIcon={copyIcon} onClick={() => copy(window.location.href)}>{value ? "Copied" : "Copy"}</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

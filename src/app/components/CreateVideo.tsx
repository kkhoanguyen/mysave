'use client';
import React, { useState, useCallback } from 'react';
import CreateVideoModal from './CreateVideoModal';
export default function CreateVideo() {

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <button className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
        onClick={() => setOpen(true)}>
        Create Video
      </button>
      <CreateVideoModal open={open} onClose={handleClose} />
    </div >
  );
}

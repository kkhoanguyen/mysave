'use client';
import { Fragment, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, Transition } from '@headlessui/react';
import { youtubeParser } from '@/utils/youtube';

export interface Props {
  open: boolean;
  onClose: () => void,
}
export default function CreateVideoModal({ open, onClose }: Props) {
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
      router.refresh();
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
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      Create Video
                    </Dialog.Title>
                    <div className="mt-2">
                      <div>
                        <label htmlFor="video-link" className="block text-sm font-medium leading-6 text-gray-900">
                          Video Lik
                        </label>
                        <input
                          type="text"
                          name="video-link"
                          id="video-link"
                          className={["w-full rounded-md py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 border", error ? "border-red-500" : ""].join(" ")}
                          placeholder="https://www.youtube.com/watch?v={videoID}, https://youtu.be/{videoID}"
                          onChange={(e) => setValue(e.target.value)}
                          onBlur={validatedLink}
                        />
                      </div>
                      {error && <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        Invalid YouTube video url
                      </span>}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className={["inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto", error ? "opacity-50 cursor-not-allowed" : ""].join(" ")}
                    disabled={error}
                    onClick={handleCreate}
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    ref={cancelButtonRef}
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                </div>
                {creating && <div className="absolute flex items-center justify-center w-full h-full top-0 bg-white bg-opacity-50">
                  <div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status">
                    <span
                      className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                    >Loading...</span>
                  </div>
                </div>}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

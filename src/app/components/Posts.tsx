"use client";
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Post from './Post';
import { Post as PostType } from '@/types/post';
import CreateVideo from "./CreateVideo";

const LIMIT = 9;
interface ResData { posts: PostType[], total: Number; }
export default function Posts() {
  const [data, setData] = useState<ResData>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const getPosts = useCallback(async () => {
    setError("");
    setLoading(true);
    const resp = await fetch(`/api/posts?limit=${LIMIT}&page=${page}`);
    if (resp.status >= 200 && resp.status < 300) {
      const respData: ResData = await resp.json();
      setData((prev) => ({
        posts: prev && prev.posts ? prev.posts.concat(respData.posts) : respData.posts,
        total: respData.total
      }));
    } else {
      setError("Error fetching posts");
    }
    setLoading(false);

  }, [page]);
  useEffect(() => {
    getPosts();
  }, [page, getPosts]);

  const elementRef = useRef<HTMLDivElement>(null);

  const handleNextPage = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && data && (page * LIMIT <= data?.total)) {
      setPage(prev => prev + 1);
    }
  }, [page, data]);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: .5
    };
    const observer = new IntersectionObserver(handleNextPage, option);
    if (elementRef && elementRef.current) observer.observe(elementRef.current);
  }, [handleNextPage]);
  const handleOnCreateDone = async () => {
    setError("");
    setLoading(true);
    setPage(1);
    const resp = await fetch(`/api/posts?limit=${LIMIT}&page=${1}`);
    if (resp.status >= 200 && resp.status < 300) {
      const respData: ResData = await resp.json();
      setData(respData);
    } else {
      setError("Error fetching posts");
    }
    setLoading(false);
  };
  return (
    <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8">
      <CreateVideo onCreateDone={handleOnCreateDone} />
      <div className="mx-auto grid grid-cols-1 gap-y-16 gap-x-8 pt-10 lg:grid-cols-3">
        {data && data.posts && data.posts.map((post, i, posts) =>
          i === posts.length - 1 && !loading
            ? (<div ref={elementRef} key={post.id}><Post key={post.id} post={post} /></div>)
            : (<Post key={post.id} post={post} />))}
      </div>
      {loading && <div className="flex justify-center mt-4">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status">
          <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >Loading...</span>
        </div>
      </div>}
    </div>
  );
}

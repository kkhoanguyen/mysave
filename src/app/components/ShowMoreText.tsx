"use client";
import React, { useState } from 'react';

export interface Props {
  text: string,
  length?: number,
  initState?: boolean,
}
export default function ShowMoreText({
  text,
  initState = false,
  length = 100
}: Props) {
  const [showMore, setShowMore] = useState(false);
  return (
    <>
      <p className="mt-1 text-gray-500">{
        showMore ? text : `${text.substring(0, length)}...`
      }</p>
      <button onClick={() => setShowMore(!showMore)} > {showMore ? "show less" : 'show more'}</button></>
  );
}

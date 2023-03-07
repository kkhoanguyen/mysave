import { createClient } from "@supabase/supabase-js";
import { Post } from "@/types/post";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default supabase;

export async function getPosts(limit = 10, page = 1) {
  const start = limit * page - limit;
  const end = start + limit - 1;
  const {
    data: posts,
    count,
    error,
  } = await supabase
    .from("posts")
    .select("*", { count: "exact" })
    .range(start, end)
    .order("created_at", { ascending: false });
  if (error) {
    console.log(error);
    throw error;
  }
  return {
    posts: posts || [],
    total: count,
  };
}

export async function getPostById(id: number) {
  const { data, error } = await supabase.from("posts").select("*").eq("id", id);
  if (data && data[0]) {
    return data[0] as Post;
  } else {
    throw new Error("post not found");
  }
}
export async function insertPost(post: Post) {
  return await supabase.from("posts").insert(post).select("*");
}

export async function deletePost(id: number) {
  const { data, error } = await supabase.from("posts").delete().eq("id", id);
  if (error) {
    throw error;
  }
  return data;
}
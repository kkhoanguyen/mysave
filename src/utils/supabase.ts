import { createClient } from "@supabase/supabase-js";
import { Post } from "@/types/post";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default supabase;

export async function getPosts() {
  const { data: posts, error } = await supabase.from("posts").select("*");
  if (error) {
    throw error;
  }
  return posts as Post[];
}

export async function getPostById(id: number) {
  return await supabase.from("posts").select("*").eq("id", id);
}
export async function insertPost(post: Post) {
  return await supabase.from("posts").insert(post).select("*");
}

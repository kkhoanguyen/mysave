import supabase from "@/utils/supabase";

export async function GET(request: Request, res: Response) {
  const { data, error } = await supabase.from("videos").select("*");
  return new Response(JSON.stringify(data));
}

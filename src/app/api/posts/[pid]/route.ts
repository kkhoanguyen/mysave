import { deletePost } from "@/utils/supabase";

export async function DELETE(request: Request, { params }: any) {
  console.log(params);
  let resOption = {};
  const id = Number(params["pid"]);
  if (id) {
    const resp = await deletePost(id);
  }

  return new Response(
    null,
    resOption || {
      status: 400,
      statusText: "invalid youtube url",
    },
  );
}

import Markdown from "react-markdown";
import { unstable_cache } from "next/cache";
import prisma from "@/lib/prisma";
import remarkGfm from "remark-gfm";

const getPost = unstable_cache(
  async (id: string) => {
    return await prisma.post.findUnique({
      where: {
        id,
      },
    });
  },
  ["posts"],
  { tags: ["posts"] },
);

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const postId = (await params).slug.split(".")[0].split("-").pop();
  if (!postId) {
    return null;
  }
  const post = await getPost(postId);

  if (!post) {
    return (
      <main>
        <h2>404</h2>
      </main>
    );
  }
  return (
    <main className="flex justify-center">
      <div className="max-w-screen-lg w-full p-2">
        <h2>{post.title}</h2>
        <i>{new Date(post.createdAt).toLocaleString()}</i>
        <Markdown remarkPlugins={[[remarkGfm, { singleTilde: false }]]}>
          {post.content}
        </Markdown>
      </div>
    </main>
  );
}
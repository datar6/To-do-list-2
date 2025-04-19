export async function fetchPost(postId: string, url: string) {
  const response = await fetch(`${url}${postId}`).then((res) => res.json());
  return response;
}

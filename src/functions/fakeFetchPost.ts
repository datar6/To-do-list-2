export async function fakeFetchPost(postId: string) {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          title: `Post ${postId}`,
          content: `Содержимое поста ${postId}`,
        }),
      3000
    );
  });
}

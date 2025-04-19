export async function fakeFetchPost(postId: string) {
  return new Promise((resolve, reject) => {
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

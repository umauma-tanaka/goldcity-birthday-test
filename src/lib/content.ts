import { getCollection, type CollectionEntry } from "astro:content";

type AuthorEntry = CollectionEntry<"authors">;
type PostEntry = CollectionEntry<"posts">;

export function splitPostId(postId: string) {
  const [authorId, slug] = postId.split("/");

  if (!authorId || !slug) {
    throw new Error(`Unexpected post id: ${postId}`);
  }

  return { authorId, slug };
}

export function sortAuthors(authors: AuthorEntry[]) {
  return [...authors].sort((left, right) => {
    const orderGap = left.data.sortOrder - right.data.sortOrder;
    if (orderGap !== 0) {
      return orderGap;
    }

    return left.data.reading.localeCompare(right.data.reading, "ja");
  });
}

export function sortPostsNewestFirst(posts: PostEntry[]) {
  return [...posts].sort((left, right) => {
    const rightDate =
      right.data.updatedAt?.getTime() ?? right.data.publishedAt.getTime();
    const leftDate =
      left.data.updatedAt?.getTime() ?? left.data.publishedAt.getTime();

    return rightDate - leftDate;
  });
}

export async function getAuthors() {
  return sortAuthors(await getCollection("authors"));
}

export async function getPosts() {
  return sortPostsNewestFirst(await getCollection("posts"));
}

export async function getAuthorById(authorId: string) {
  const authors = await getAuthors();
  return authors.find((entry) => entry.id === authorId);
}

export async function getPostsByAuthor(authorId: string) {
  const posts = await getPosts();
  return posts.filter((entry) => splitPostId(entry.id).authorId === authorId);
}

export async function getAuthorPostMap() {
  const authors = await getAuthors();
  const posts = await getPosts();
  const entries = authors.map((author) => {
    const authoredPosts = posts.filter(
      (post) => splitPostId(post.id).authorId === author.id,
    );

    return {
      author,
      posts: authoredPosts,
      latestPost: authoredPosts[0],
    };
  });

  return entries;
}


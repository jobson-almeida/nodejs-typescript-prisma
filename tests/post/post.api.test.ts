import { randomUUID } from "crypto";
import axios from 'axios';
import { describe, test, expect } from "vitest"

const dataGenerate = (): string => {
  return randomUUID()
}


describe.skip('api tests', () => {
  let id = ""

  test('Should create post using axios', async () => {
    const createdPost = await axios({
      method: "post",
      url: "http://localhost:3000/posts",
      data: {
        text: "text",
        authorId: "baf67b95-6345-4a40-bd4d-70402e8e6c4f"
      },
      validateStatus: function (status) {
        return status >= 200 && status <= 404;
      },
    })
    expect(createdPost.status).toBe(201)
  })

  test('Should not create post with invalid author using axios', async () => {
    const createdPost = await axios({
      method: "post",
      url: "http://localhost:3000/posts",
      data: {
        text: "text",
        authorId: "-baf67b95-6345-4a40-bd4d-70402e8e6c4f"
      },
      validateStatus: function (status) {
        return status >= 200 && status <= 404;
      },
    })
    expect(createdPost.status).toBe(404)
  })

  test('Should get posts using axios', async () => {
    const posts = await axios({
      method: "get",
      url: `http://localhost:3000/posts`,
      responseType: "json",
      validateStatus: function (status) {
        return status >= 200 && status <= 404;
      },
    })
    const [post] = posts.data
    id = post.id

    expect(posts.status).toBe(200)
  })

  test('Should get post using axios', async () => {
    const post = await axios({
      method: "get",
      url: `http://localhost:3000/posts/${id}`,
      responseType: "json",
      validateStatus: function (status) {
        return status >= 200 && status <= 404;
      },
    })

    expect(post.status).toBe(200)
  })

  test('Should not get post with invalid id using axios', async () => {
    const post = await axios({
      method: "get",
      url: "http://localhost:3000/posts/1",
      responseType: "json",
      validateStatus: function (status) {
        return status >= 200 && status <= 404;
      },
    })

    expect(post.status).toBe(404)
  })

  test('Should update post using axios', async () => {
    const post = await axios({
      method: "get",
      url: `http://localhost:3000/posts/${id}`,
      responseType: "json"
    })

    const updatedPost = await axios({
      method: "put",
      url: `http://localhost:3000/posts/${id}`,
      data: {
        text: "other-text",
        authorId: "baf67b95-6345-4a40-bd4d-70402e8e6c4f"
      },
      validateStatus: function (status) {
        return status >= 200 && status <= 404;
      },
    })
    expect(updatedPost.status).toBe(204)
    expect(post.data?.text).not.toBe(updatedPost.data.text)
  })

  test('Should not update post with invalid id using axios', async () => {
    const updatedPost = await axios({
      method: "put",
      url: `http://localhost:3000/posts/1`,
      data: {
        text: "other-text",
        authorId: "-baf67b95-6345-4a40-bd4d-70402e8e6c4f"
      },
      validateStatus: function (status) {
        return status >= 200 && status <= 404;
      },
    })
    expect(updatedPost.status).toBe(404)
  })

  test('Should not delete post with invalid id using axios', async () => {
    const deleted = await axios({
      method: 'delete',
      url: `http://localhost:3000/posts/1`,
      validateStatus: function (status) {
        return status >= 200 && status <= 404;
      },
    })

    expect(deleted.status).toBe(404)
  });

  test('Should delete post using axios', async () => {
    const deleted = await axios({
      method: 'delete',
      url: `http://localhost:3000/posts/${id}`,
      validateStatus: function (status) {
        return status >= 200 && status <= 404;
      },
    })

    expect(deleted.status).toBe(204)
  });

});
import profileReducer, { addPostActionCreator, deletePost } from "./profileReducer";

let state = {
  posts: [
    { id: 1, likesCount: 12, message: "Hello, BRO" },
    { id: 2, likesCount: 4, message: "Hello, B" },
    { id: 3, likesCount: 51, message: "Hell Oy" },
    { id: 4, likesCount: 614, message: "airuqp ppq uqweh b" },
    { id: 5, likesCount: 111, message: "It`s my first post!" }],
};

test('it must add post', () => {
  let action = addPostActionCreator('Test text!')
  
  let newState = profileReducer(state, action)
  expect(newState.posts.length).toBe(6)
});

test('message should be test text', () => {
  let action = addPostActionCreator('Test text!')
  let newState = profileReducer(state, action)
  expect(newState.posts[5].message).toBe('Test text!')
});

test('length of state.posts decrement', () => {
  let action = deletePost(1)
  let newState = profileReducer(state, action)
 expect(newState.posts.length).toBe(4)
});

test('del with incorrect id', () => {
  let action = deletePost(80)
  let newState = profileReducer(state, action)
 expect(newState.posts.length).toBe(5)
});
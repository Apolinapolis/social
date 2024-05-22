import profileReducer, { actions } from "./profileReducer";

let state = {
  posts: [
    { id: 1, likesCount: 12, message: "Hello, BRO" },
    { id: 2, likesCount: 4, message: "Hello, B" },
    { id: 3, likesCount: 51, message: "Hell Oy" },
    { id: 4, likesCount: 614, message: "I love you" },
    { id: 5, likesCount: 111, message: "It`s my first post!" }],
  profile: null,
  status: "it is status in profileReducer",
  newPostText: ''
};

test('it must add post', () => {

  let action = actions.addPostActionCreator('Test text!')
  let newState = profileReducer(state, action)

  expect(newState.posts.length).toBe(6)
});

test('message should be test text', () => {
  let action = actions.addPostActionCreator('Test text!')
  let newState = profileReducer(state, action)
  expect(newState.posts[5].message).toBe('Test text!')
});

test('length of state.posts decrement', () => {
  let action = actions.deletePost(1)
  let newState = profileReducer(state, action)
 expect(newState.posts.length).toBe(4)
});

test('del with incorrect id', () => {
  let action = actions.deletePost(80)
  let newState = profileReducer(state, action)
 expect(newState.posts.length).toBe(5)
});
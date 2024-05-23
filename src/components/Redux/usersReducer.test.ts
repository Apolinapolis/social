import usersReducer, { actions, initialStateType } from "./usersReducer"

let initState: initialStateType;

beforeEach(() => {
  initState = {
    users: [
      { id: 0, name: "Dimasik", status: "developer", photos: { small: null, large: null }, followed: true },
      { id: 1, name: "Romam", status: "sellersman", photos: { small: null, large: null }, followed: false },
      { id: 2, name: "Sergey", status: "marcetolog", photos: { small: null, large: null }, followed: false },
      { id: 3, name: "Agent.04", status: "builder", photos: { small: null, large: null }, followed: true },
    ],
    pageSize: 10,
    totalItemsCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
  }
})



test("follow success", () => {

  const newState = usersReducer(initState, actions.followSuccess(1))

  expect(newState.users[0].followed).toBeTruthy()
  expect(newState.users[2].followed).toBeFalsy()
  expect(newState.users[1].followed).toBeTruthy()
})

test("unfollow success", () => {

  const newState = usersReducer(initState, actions.unfollowSuccess(3))

  expect(newState.users[0].followed).toBeTruthy()
  expect(newState.users[1].followed).toBeFalsy()
  expect(newState.users[3].followed).toBeFalsy()
})



export interface UsersApi {
  getAllUsers: () => Promise<any>

  postUser: (payload: any) => Promise<any>
}

// export interface User {

// }

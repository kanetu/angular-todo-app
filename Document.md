## Folder structure

```
  app
    |--auth (authentication)
      |--components
        |--login
      |--guards (guardian for checking permission when routing to some path such as `/home`, `/about`)
    |--constants (store constants)
    |--pages (store page modules like: home, about)
      |--about
      |--home
        |--todo-item
        |--todo-list
    |--shared (store things could be shared throughout the application)
      |--components (reuse components)
        |--header
        |--layout
      |--models
        |--requests
        |--responses
      |--services (handle request from server)
    |--assets (store assets for showing images, fonts)
    |--fonts

```

## Resources

### Guide

https://jsonplaceholder.typicode.com/guide/

### Todos

Base API: https://jsonplaceholder.typicode.com

`[GET]`: /users/{userId}/todos
`[POST]`: /todos
`[PATCH]`: /todos/{todoId}
`[DELETE]`: /todos/{todoId}

### Users

Base API: https://jsonplaceholder.typicode.com
`[GET]`: /users

Please read link Guide above to learn how to use those methods.

## Technical approaches

### Login

- Get the inputed email from user
- Fetch list users from `https://jsonplaceholder.typicode.com/users`
- Check whether the inputed email is existed in the list user from the server or not
- If yes, redirect the user to home page and store the user info to `localStorage`
- If no, show error "Your email is not existed in the system, please try again!"

### Permission handling

- Implement `canActivate` guard
- Get the user infor from `localStorage`
- Check whether the user infor is existed or not
- If yes, return `true` to bypass the route
- If no, return `false` to prevent the access and redirect to login page

### Create todo

- Get the inputed todo
- Check if the value is valid or not.
- If it is not, show the errors (required, maxlength)
- If it is valid, create todo following the inputed todo and clear input field.

### Update todo

- Click button pencil to edit the todo
- There is editMode is perform
- Input the edited title
- Check if the value is valid or not.
- If it is not, show the errors (required, maxlength)
- If it is valid, fetch update todo following the inputed data

### Complete todo

- Click checkbox on the todo
- Fetch update service with the field `completed` base on the logic of checkbox onChange

### Delete todo

- Click trash icon button on the todo
- Showing the confirm modal to ask the user confirm or not
- If the user confirm, the todo will be removed
- If the users cancel, the todo will continue remain

## Notes

- The JSON Server is not saving what we're putting to, hence, if you create a todo and mark it as checked, it will cause bug because the server is not response the whole todo, it's only `completed` field in the response.
- The UI is supported responsive
- **_Clear `localStorage` to test `Login` feature_**

## UI libraries

- Tailwind CSS
- NG-ZORRO

Please read `package.json` to find their version

<div align="center">
        <a href="#" title="React Starter Authentication">
            <img src="https://github.com/akosidencio/react-starter-auth/blob/main/react-starter-auth.png" alt="React Starter Authentication" />
        </a>
</div>


### Features

Authentication library built for react token based authentication with JWT
- Easy to implement
- Works with next js
- Secured client authentication

### Installation
```jsx
  npm install react-starter-auth

  #or 

  yarn react-starter-auth
```

### Setup

```jsx
import { AuthProvider } from 'react-starter-auth';

<AuthProvider>
  <App>
</AuthProvider>

```
### Signin

```jsx
import { useAuth } from 'react-starter-auth'

const { signIn } = useAuth()

const access_token = 'jsjdjdjsxxfd' // response from api
const user {
    name: 'john doe',
    email: 'example@example.com',
    phone: '',
    role: ''
}

const authuser = {
  token: access_token,
  user: user
}
signIn(authuser)

```

### Private route page

```jsx
import { ProtectedRoute, withAuthentication } from 'react-starter-auth'

```

### User 

```jsx

import { useAuth } from 'react-starter-auth'

const { isAuthenticated, user } = useAuth()

```



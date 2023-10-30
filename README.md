<div align="center">
        <a href="#" title="React Starter Authentication">
            <img src="https://github.com/akosidencio/react-starter-auth/blob/main/react-starter-auth.png" alt="React Starter Authentication" />
        </a>
</div>


### Features

- JWT based authentication
- Protect route 

### Install

    npm install react-jwt-auth

### Quickstart

```jsx
import { useAuth } from 'react-starter-auth';

const { setAuthUser } = useAuth()

const jwt_token = 'jsjdjdjsxxfd'

const authuser = {
  token: 'xxxxx',
  user: {
    name: 'john doe',
    email: 'example@example.com'
  }
}
setAuthUser(authuser)

```

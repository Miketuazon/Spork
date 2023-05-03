# Database Schema
---
<br>

## <span style="background-color:#3D3D3D">users</span>


| column name | data type | details               |
|-------------|-----------|-----------------------|
| id          | integer   | not null, primary key |
| email       | string    | not null, unique      |
| password    | string    | not null              |
| birthday    | datetime  | not null              |
| blogname    | string    | not null, unique      |
| created_at  | datetime  | not null              |
| updated_at  | datetime  | not null              |

<br>

## <span style="background-color:#3D3D3D">posts</span>

| column name | data type | details               |
|-------------|-----------|-----------------------|
| id          | integer   | not null, primary key |
| content     | string    | not null              |
| userId      | integer   | not null, foreign key |
| created_at  | datetime  | not null              |
| updated_at  | datetime  | not null              |

- userId references users table

<br>

## <span style="background-color:#3D3D3D">likes</span>

| column name | data type | details               |
|-------------|-----------|-----------------------|
| id          | integer   | not null, primary key |
| userId      | integer   | not null, foreign key |
| postId      | integer   | foreign key           |
| commentId   | integer   | foreign key           |
| created_at  | datetime  | not null              |
| updated_at  | datetime  | not null              |

- <span style="background-color:#3D3D3D">userId</span> references <span style="background-color:#3D3D3D">users</span> table
- <span style="background-color:#3D3D3D">postId</span> references <span style="background-color:#3D3D3D">posts</span> table
- <span style="background-color:#3D3D3D">commentId</span> references <span style="background-color:#3D3D3D">comments</span> table

<br>

## <span style="background-color:#3D3D3D">comments</span>

| column name | data type | details               |
|-------------|-----------|-----------------------|
| id          | integer   | not null, primary key |
| userId      | integer   | not null, foreign key |
| postId      | integer   | not null, foreign key |
| content     | string    | not null              |
| created_at  | datetime  | not null              |
| updated_at  | datetime  | not null              |

- <span style="background-color:#3D3D3D">userId</span> references <span style="background-color:#3D3D3D">users</span> table
- <span style="background-color:#3D3D3D">postId</span> references <span style="background-color:#3D3D3D">posts</span> table

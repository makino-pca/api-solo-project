# api-solo-project
API Solo Project

## API
北海道日本ハムファイターズの選手を CRUD する API です

### GET /players?limit=n
登録されている選手一覧の配列を返します

limit が指定された場合は指定された数だけ返します

### GET /players/:id
指定された ID の選手を返します

### POST /players
リクエストボディで指定された選手を登録します

リクエストボディは以下の形です:
```
{
    "name": player_name,
    "numnber": player_number,
    "high_school": high_school
}
```

### PUT /players/:id
指定された ID の選手をリクエストボディの内容で更新します

リクエストボディは以下の形です:
```
{
    "name": player_name,
    "numnber": player_number,
    "high_school": high_school
}
```

### DELETE /players/:id
指定された ID の選手を削除します

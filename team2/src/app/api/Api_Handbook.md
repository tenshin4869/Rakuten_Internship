# ユーザー関連

## 新規ユーザー登録
### api/register
### [POST]
### 引数
{
    "ID": string,
    "Pw": string,
    "Name": string,
    "Email": string,
    "Profile": string
}
#### 例
{
    "ID": "Test_yyy",
    "Pw": "12345678",
    "Name": "Test114",
    "Email": "kusa@514.com",
    "Profile": "いいよ"
}
### 戻り値
#### 成功の場合
{
    "User registered successfully."
}
#### 失敗の場合
{
    "Failed to register user information."
}

## ログイン
### api/login
### [POST]
### 引数
{
    "ID": string,
    "Pw": string
}
#### 例
{
    "ID": "Test_yyy",
    "Pw": "12345678"
}
### 戻り値
#### 成功の場合
{
    "UID": string(ユーザーのUID)
}
#### 失敗の場合
{
    ""
}

## UIDからユーザー情報取得
### api/userinfo
### [POST]
### 引数
{
    "UID": string(ユーザーのUID)
}
#### 例
{
    "UID": "IIcilSeZc17f2KnbIFgF"
}
### 戻り値
{
    "Email": string(メールアドレス),
    "Profile": string(プロフィール),
    "Name": string(ユーザー名)
}
#### 例
{
    "Email": "kusa@514.com",
    "Profile": "いいよ",
    "Name": "Test114"
}

## UIDからおすすめ商品情報取得
### api/recommend
### [POST]
### 引数
{
    "UID": string(ユーザーのUID)
}
#### 例
{
    "UID": "IIcilSeZc17f2KnbIFgF"
}
### 戻り値
楽天APIから取得した商品情報と同じ形式のJSONで1件の商品を返す


# グループ関連

## 新規グループ作成
### api/newgroup
### [POST]
### 引数
{
    "Name": string(グループ名),
    "Owner": string(所有者のUID)
}
#### 例
{
    "Name": "TestGroup",
    "Owner": "IIcilSeZc17f2KnbIFgF"
}
### 戻り値
#### 成功の場合
{
    "Group created successfully."
}
#### 失敗の場合
{
    "Failed to create group."
}

## グループ参加
### api/joingroup
### [POST]
### 引数
{
    "GID": string(グループID),
    "UID": string(ユーザーのUID)
}
#### 例
{
    "GID": "NeGl4LlKsDFSAFmRXb4N",
    "UID": "SVTk48l2r7FxnUsLOS43"
}
### 戻り値
#### 成功の場合
{
    "Group joined successfully."
}
#### 失敗の場合
作っていない

## 全グループの情報取得
### api/groupinfo
### [GET]
### 引数
getのため引数なし
### 戻り値
[
    {
        "GID": string(グループID),
        "Name": string(グループ名),
        "Owner": string(所有者のUID)
    },
    ...
]
#### 例
[
  {
    "GID": "NeGl4LlKsDFSAFmRXb4N",
    "Name": "TestGroup",
    "Owner": "IIcilSeZc17f2KnbIFgF"
  },
  {
    "GID": "f4FLDiCU7xkkXV3iR1lS",
    "Name": "TestGroup2",
    "Owner": "IIcilSeZc17f2KnbIFgF"
  }
]

## 特定グループの情報取得
### api/groupinfo
### [POST]
### 引数
{
    "GID": string(グループID)
}
#### 例
{
    "GID": "NeGl4LlKsDFSAFmRXb4N"
}
### 戻り値
{
    "Name": string(グループ名),
    "Owner": string(所有者のUID)
}

## GIDからグループメンバーリスト情報取得
### api/memberinfo
### [POST]
### 引数
{
    "GID": string(グループID)
}
#### 例
{
    "GID": "NeGl4LlKsDFSAFmRXb4N"
}
### 戻り値
[
    {
        "UID": string(ユーザーのUID),
        "Role": string(役職)
    },
    ...
]
#### 例
[
    {
    "UID": "SVTk48l2r7FxnUsLOS43",
    "Role": "Member"
    },
    {
    "UID": "IIcilSeZc17f2KnbIFgF",
    "Role": "Owner"
    }
]
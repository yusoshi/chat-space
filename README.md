
# Database setting



## アソシエーション設定

user  
    has_many :messages  
    has_many :groups_users  
    has_many :groups, through: :groups_users  

group  
    has_many :massages  
    has_many :groups_users  
    has_many: users, through: :groups_users  

groups_users  
    belongs_to :user  
    belongs_to :group  


## index設定
    インデックス設定は  
    add_index :user, :name  
    (グループ作成時に追加するユーザーの検索速度向上)  

    add_index :users, [:name, :email, :password]  
    (usersテーブルの作成はDeviseで行うため、不要でしょうか)  


## テーブル設計

### messages table
|columns|type|option|
|:-:|:-:|:-:|
|body|text|-|
|images|text|-|
|group_id|references|外部キー制約|
|user_id|references|外部キー制約|


### groups table
|columns|type|option|
|:-:|:-:|:-:|
|name|string|NOT NULL, UNIQUE|


### groups_users table
|columns|type|option|
|:-:|:-:|:-:|
|group_id|references|外部キー制約|
|user_id|references|外部キー制約|


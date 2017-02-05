
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



## テーブル設計
### messages table
|columns|type|option|index|
|:-:|:-:|:-:|:-:|
|body|text|-|-|
|images|string|-|-|
|group_id|references|外部キー制約|◯|
|user_id|references|外部キー制約|◯|


### groups table
|columns|type|option|index|
|:-:|:-:|:-:|:-:|
|name|string|NOT NULL, UNIQUE|◯|

### users table
|columns|type|option|index|
|:-:|:-:|:-:|:-:|
|name|string|NOT NULL, UNIQUE|◯|



### groups_users table
|columns|type|option|index|
|:-:|:-:|:-:|:-:|
|group_id|references|外部キー制約|◯|
|user_id|references|外部キー制約|◯|


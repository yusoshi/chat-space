
* Database setting
## messages table
|columns|type|option|
|:-:|:-:|:-:|
|body|text|-|
|images|text|-|
|group_id|integer|外部キー制約|
|user_id|integer|外部キー制約|


## groups table
|columns|type|option|
|:-:|:-:|:-:|
|name|string|NOT NULL|


## belongs_of_users table
|columns|type|option|
|:-:|:-:|:-:|
|group_id|integer|外部キー制約|
|user_id|integer|外部キー制約|


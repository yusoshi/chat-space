== README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database setting
## messages table
|columns|type|option|
|:-:|:-:|:-:|
|body|text|-|
|images|text|-|
|group_id|integer|外部キー制約|
|user_id|integer|外部キー制約|

## userss table
|columns|type|option|
|:-:|:-:|:-:|
|name|string|NOT NULL|
|email|text|一意性制約|
|password|text|NOT_NULL|
|confirmation_password|text|NOT_NULL|


## groups table
|columns|type|option|
|:-:|:-:|:-:|
|name|text|NOT NULL|


## belongs_of_users table
|columns|type|option|
|:-:|:-:|:-:|
|group_id|integer|外部キー制約|
|user_id|integer|外部キー制約|


* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...


Please feel free to use a different markup language if you do not plan to run
<tt>rake doc:app</tt>.

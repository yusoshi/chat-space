# config valid only for current version of Capistrano
lock "3.8.0"

set :application, "chat-space"
set :repo_url, "git@github.com:yusoshi/chat-space.git"

set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system', 'public/uploads')

set :rbenv_type, :user
set :rbenv_ruby, '2.3.1'

set :ssh_options, auth_methods: ['publickey'],
                  keys: ['~/.ssh/genkey.pem']

set :unicorn_pid, -> { "#{shared_path}/tmp/pids/unicorn.pid" }
set :unicorn_config_path, -> { "#{current_path}/config/unicorn.rb" }

after 'deploy:publishing', 'deploy:restart'
namespace :deploy do
  task :restart do
    invoke 'unicorn:restart'
  end

set :default_env, {
  rbenv_root: "/usr/local/rbenv",
  path: "~/.rbenv/shims:~/.rbenv/bin:$PATH",
  AWS_REGION: 'ap-northeast-1',
  AWS_ACCESS_KEY_ID: ENV["AWS_ACCESS_KEY_ID"],
  AWS_SECRET_ACCESS_KEY: ENV["AWS_SECRET_ACCESS_KEY"]
}
set :whenever_identifier, ->{ "#{fetch(:application)}_#{fetch(:stage)}" }
set :sidekiq_queue, :carrierwave
end

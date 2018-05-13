application = ENV['app'] || "etm-frontend"
server = ENV['server_app'] || "root@192.168.1.106"
set :application, application
set :stage, :staging
set :branch, :staging
role :app, server
set :deploy_to, "/react_apps/#{fetch(:application)}"

$LOAD_PATH.unshift(File.expand_path('.'))

require 'config/main'

get '/' do
  erb :index
end

get '/:room/signup' do
  erb :signup
end

get '/:room/admin' do
	erb :admin
end
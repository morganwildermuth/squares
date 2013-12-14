$LOAD_PATH.unshift(File.expand_path('.'))

require 'sinatra'

set :root, File.dirname(File.dirname(__FILE__))
set :views, Proc.new { File.join(root, "app/views") }
set :public_folder, Proc.new { File.join(root, "app/assets") }
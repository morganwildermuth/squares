$LOAD_PATH.unshift(File.expand_path('.'))

require 'config/main'
require 'rest_client'
require 'net/http'
require 'nokogiri'

get '/' do
  erb :index
end

get '/game/:year/:nfl_season/:nfl_season_week/:away_team/:home_team/update' do 
  uri = URI("http://api.sportsdatallc.org/nfl-t1/#{params[:year]}/#{params[:nfl_season]}/#{params[:nfl_season_week]}/#{params[:away_team]}/#{params[:home_team]}/boxscore.xml?api_key=6fdgfuajja6rke3gbkcrwjgh")
  data_net = Net::HTTP.get(uri)
  xml_doc  = Nokogiri::XML::Document.parse(data_net)
  solution = xml_doc.xpath(".//team")
  xml_doc.remove_namespaces!
  p xml_doc.xpath(".//team")
end
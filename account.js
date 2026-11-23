(function(){
  'use strict';
  const STORAGE_KEY='thegameswhoise.account.v1';
  function read(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY))||{profile:null,games:{}}}catch(error){return {profile:null,games:{}}}}
  function write(data){localStorage.setItem(STORAGE_KEY,JSON.stringify(data))}
  window.TheGamesWhoiseAccount={
    get:read,
    saveProfile:function(name){const data=read();data.profile={name:name.trim(),createdAt:data.profile?.createdAt||new Date().toISOString()};write(data);return data},
    recordGame:function(id,title,url){const data=read();if(!data.profile)return false;const previous=data.games[id]||{plays:0};data.games[id]={title:title,url:url,plays:previous.plays+1,lastPlayed:new Date().toISOString()};write(data);return true},
    clear:function(){localStorage.removeItem(STORAGE_KEY)},
    storageKey:STORAGE_KEY
  };
})();

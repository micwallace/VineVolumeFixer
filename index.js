var pageMod = require("sdk/page-mod");
var data = require("sdk/self").data;
var prefs = require("sdk/simple-prefs").prefs;

var defaultvolume = prefs.defaultvolume;
defaultvolume = defaultvolume>100?100:(defaultvolume<0?0:defaultvolume);
defaultvolume = Number((defaultvolume/100).toFixed(2));
var showui = prefs.showui;

pageMod.PageMod({
    include: [/.*vine\.co.*/],
    attachTo: ["top","frame"],
    contentScriptFile: [data.url("pagemod.js")],
    contentScriptOptions: {
      defaultvolume: 	defaultvolume,
      showui:		showui
    }
});
var pageMod = require("sdk/page-mod");
var data = require("sdk/self").data;
var defaultvolume = require("sdk/simple-prefs").prefs.defaultvolume;
defaultvolume = defaultvolume>100?100:(defaultvolume<0?0:defaultvolume);
defaultvolume = Number((defaultvolume/100).toFixed(2));
pageMod.PageMod({
  include: [/.*vine\.co.*/],
  attachTo: ["top","frame"],
  contentScriptFile: [data.url("pagemod.js")],
  contentScriptOptions: {
	defaultvolume: defaultvolume
  }
});

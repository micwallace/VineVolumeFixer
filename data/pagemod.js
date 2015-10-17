function setVolume(e){
	e.volume = self.options.defaultvolume;
	console.log("volume adjusted: "+e.volume);
}
document.addEventListener('loadstart', function(e){
    console.log("onloadstart");
    setVolume(e.target);
}, true);
document.addEventListener('volumechange', function(e){
    console.log("onvolumechange");
    setVolume(e.target);
}, true);

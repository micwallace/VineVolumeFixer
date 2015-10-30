var currentVolume = self.options.defaultvolume;

function setCurrentVolume(video){
    video.volume = currentVolume;
    console.log("volume adjusted: "+video.volume);
}

function addVolumeControl(video){
    if (!self.options.showui)
        return;

    var target = video.parentElement.parentElement;
    if (target.querySelector(".vine_volume_fix_control")!==null)
        return;

    var div = document.createElement('div');
    div.innerHTML = '<input class="vine_volume_fix_control" type="range" id="volume-bar" min="0" max="1" step="0.01" value="' + self.options.defaultvolume + '">';
    var volumeBar = div.childNodes[0];

    volumeBar.addEventListener("change", function() {
        currentVolume = volumeBar.value;
        setCurrentVolume(video);
    });

    volumeBar.style.position = "absolute";
    volumeBar.style.top = "6px";
    volumeBar.style.left = "30px";
    volumeBar.style.width = "80px";
    volumeBar.style.zIndex = 3;
    volumeBar.style.opacity = 0;
    volumeBar.style.transition = "opacity 0.1s ease 0s";
    volumeBar.style.background = "none";
    volumeBar.style.cursor = "pointer";

    var style = document.createElement('style');
    var css = '.vine-player:hover .vine_volume_fix_control{ opacity:1 !important; }';
    style.appendChild(document.createTextNode(css));
    document.getElementsByTagName('head')[0].appendChild(style);

    target.appendChild(volumeBar);
    console.log("Volume Meter added");
}

document.addEventListener('loadstart', function(e){
    console.log("onloadstart");
    setCurrentVolume(e.target);
    addVolumeControl(e.target);
}, true);

document.addEventListener('volumechange', function(e){
    console.log("onvolumechange");
    setCurrentVolume(e.target);
}, true);

if (self.options.showui) {
    var videos = document.getElementsByTagName("video");
    for (var i in videos) {
        if (videos.hasOwnProperty(i))
            addVolumeControl(videos[i]);
    }
}
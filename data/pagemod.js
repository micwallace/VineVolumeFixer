var currentVolume = self.options.defaultvolume;
var isEmbed = document.getElementsByClassName("embed").length>0;

function setCurrentVolume(video){
    video.volume = currentVolume;
    //console.log("VineVolumeFixer: volume adjusted: "+video.volume);
}

function unmuteVideo(video){
    video.muted = false;
    // unmute ui, only needed for embedded player
    if (isEmbed){
        document.getElementsByClassName("mute-button")[1].classList.remove("muted");
    }
}

function addVolumeControl(video){
    if (!self.options.showui)
        return;

    // element to attach volume control to
    var target = isEmbed?document.getElementsByClassName("actions")[0]:video.parentElement.parentElement;

    if (target.querySelector(".vine_volume_fix_control")!==null) // prevent multiple controls
        return;

    var volumeBar = document.createElement("input");
    volumeBar.className = "vine_volume_fix_control";
    volumeBar.type = "range";
    volumeBar.min = 0;
    volumeBar.max = 1;
    volumeBar.step = 0.01;
    volumeBar.value = self.options.defaultvolume;

    volumeBar.addEventListener("change", function(e) {
        currentVolume = volumeBar.value;
        setCurrentVolume(video);
        unmuteVideo(video);
        e.stopPropagation();
    });

    volumeBar.style.width = "80px";
    volumeBar.style.zIndex = 3;
    volumeBar.style.background = "none";
    volumeBar.style.cursor = "pointer";

    // embedded vine player controls are positioned differently
    if (isEmbed){
        volumeBar.style.opacity = 1;
        volumeBar.style.bottom = "2px";
    } else {
        volumeBar.style.position = "absolute";
        volumeBar.style.top = "6px";
        volumeBar.style.left = "30px";
        volumeBar.style.opacity = 0;
        volumeBar.style.transition = "opacity 0.1s ease 0s";
        // hover for vine website player
        var style = document.createElement('style');
        var css = '.vine-player:hover .vine_volume_fix_control{ opacity:1 !important; }';
        style.appendChild(document.createTextNode(css));
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    target.appendChild(volumeBar);
    //console.log("VineVolumeFixer: volume meter added");
}

document.addEventListener('loadeddata', function(e){
    //console.log("VineVolumeFixer: onloadeddata");
    setCurrentVolume(e.target);
    addVolumeControl(e.target);
    if (self.options.unmute) {
        if (isEmbed){
            setTimeout(function(){ unmuteVideo(e.target); }, 500);
        } else {
            unmuteVideo(e.target);
        }
    }
}, true);

// embedded player mutes on each play
if (isEmbed)
    document.addEventListener('play', function(e){
        //console.log("VineVolumeFixer: onplay");
        if (self.options.unmute) {
            setTimeout(function(){ unmuteVideo(e.target); }, 500);
        }
    }, true);

document.addEventListener('volumechange', function(e){
    //console.log("VineVolumeFixer: onvolumechange");
    setCurrentVolume(e.target);
}, true);

var videos = document.getElementsByTagName("video");
for (var i in videos) {
    if (videos.hasOwnProperty(i)) {
        if (self.options.showui)
            addVolumeControl(videos[i]);
        if (self.options.unmute)
            unmuteVideo(videos[i]);
    }
}
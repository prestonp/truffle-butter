var clipboard = require('clipboard');

var holder = document.getElementById('holder');

holder.ondragover = function () {
  return false;
};

holder.ondragleave = holder.ondragend = function () {
  return false;
};

holder.ondrop = function (e) {
  e.preventDefault();
  var file = e.dataTransfer.files[0];
  convertImgToBase64(file.path, function(data) {
    clipboard.writeText(data);
    holder.textContent = 'Copied to clipboard!';
    setTimeout(function() {
      holder.textContent = 'Drag image here';
    }, 3000);
  }); 
  return false;
};

// http://stackoverflow.com/a/20285053
function convertImgToBase64(url, callback, outputFormat){
  var canvas = document.createElement('CANVAS');
  var ctx = canvas.getContext('2d');
  var img = new Image;
  img.crossOrigin = 'Anonymous';
  img.onload = function(){
    canvas.height = img.height;
    canvas.width = img.width;
      ctx.drawImage(img,0,0);
      var dataURL = canvas.toDataURL(outputFormat || 'image/png');
      callback.call(this, dataURL);
      canvas = null; 
  };
  img.src = url;
}


var maxWidth = 400

$(function(){
  var canvas = new fabric.Canvas('canvas');

  $('input[type=file]').on('change', function(e){
    var imageReader = new FileReader;

    imageReader.onload = function(e){
      var image = new Image;

      image.onload = function(){
        var fabricImage = new fabric.Image(image);
        var aspect = fabricImage.width / fabricImage.height;
        var width = Math.min(image.width, maxWidth)

        fabricImage.set({
          selectable: false,
          width:  width,
          height: width / aspect
        });

        canvas.setWidth(fabricImage.width);
        canvas.setHeight(fabricImage.height);

        canvas.clear()
        canvas.add(fabricImage);
      };
      image.src = e.target.result;
    };

    imageReader.readAsDataURL(e.target.files[0]);
  });
});

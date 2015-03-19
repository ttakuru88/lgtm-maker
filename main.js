var maxWidth = 400

$(function(){
  var canvas = new fabric.Canvas('canvas');
  var $download = $('#download');

  $('input[type=file]').on('change', function(e){
    if(!e.target.files[0]) { return; }

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

        var lgtm = new fabric.Text('LGTM');
        lgtm.set({
          fontSize: 64,
          fontFamily: 'Impact',
          stroke: '#000',
          strokeWidth: 2,
          fill: '#fff',
          left: (fabricImage.width - lgtm.width) / 2,
          top:  (fabricImage.height - lgtm.height) / 2
        });

        canvas.clear()
        canvas.add(fabricImage);
        canvas.add(lgtm);
      };
      image.src = e.target.result;
    };

    imageReader.readAsDataURL(e.target.files[0]);

    $download.attr('download', 'LGTM-' + e.target.files[0].name);
  });

  $download.on('click', function(){
    canvas.deactivateAll().renderAll()
    $download.attr('href', canvas.getElement().toDataURL());
  });
});

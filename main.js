var maxWidth = 400

$(function(){
  var canvas = new fabric.Canvas('canvas');
  var $download = $('#download');
  var $text = $('#text');
  var $strokeColor=  $('#stroke-color');
  var $fillColor=  $('#fill-color');
  var lgtmText = null;
  var $file = $('input[type=file]');
  var $fontFamilies = $('#font-families');
  var $fontFamily = $('#font-family');
  var $bold = $('#bold');
  var $italic = $('#italic');

  $(document).on('dragover', function(e){
    e.preventDefault()
  }).on('drop', function(e){
    e.preventDefault()
    setImage(e.originalEvent.dataTransfer.files[0]);
  });

  $file.on('change', function(e){
    setImage(e.target.files[0]);
  });

  $download.on('click', function(){
    canvas.deactivateAll().renderAll()
    $download.attr('href', canvas.getElement().toDataURL());
  });

  $text.on('change', function(){
    if(!lgtmText) { return; }

    lgtmText.setText($text.val());
    canvas.renderAll();
  });

  $strokeColor.on('change', function(){
    if(!lgtmText) { return; }

    lgtmText.setStroke($strokeColor.val());
    canvas.renderAll();
  });

  $fillColor.on('change', function(){
    if(!lgtmText) { return; }

    lgtmText.setFill($fillColor.val());
    canvas.renderAll();
  });

  $fontFamilies.on('change', function(){
    $fontFamily.val($fontFamilies.val());
    if(!lgtmText) { return; }

    lgtmText.setFontFamily($fontFamilies.val());
    canvas.renderAll();
  });

  $fontFamily.on('change', function(){
    if(!lgtmText) { return; }

    lgtmText.setFontFamily($fontFamily.val());
    canvas.renderAll();
  });

  $bold.on('change', function(){
    if(!lgtmText) { return; }

    lgtmText.setFontWeight($bold.is(':checked') ? 'bold' : null);
    canvas.renderAll();
  });

  $italic.on('change', function(){
    if(!lgtmText) { return; }

    lgtmText.setFontStyle($italic.is(':checked') ? 'italic' : null);
    canvas.renderAll();
  });


  var setImage = function(file){
    if(!file) { return; }

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

        lgtmText = new fabric.Text($text.val());
        lgtmText.set({
          fontSize: 64,
          fontFamily: $fontFamily.val(),
          stroke: '#000',
          strokeWidth: 2,
          fill: '#fff',
          left: (fabricImage.width - lgtmText.width) / 2,
          top:  (fabricImage.height - lgtmText.height) / 2,
          cornerSize: 6,
          cornerColor: '#6699ff',
          transparentCorners: false,
          fontWeight: ($bold.is(':checked') ? 'bold' : null),
          fontStyle: ($italic.is(':checked') ? 'italic' : null)
        });

        canvas.clear()
        canvas.add(fabricImage);
        canvas.add(lgtmText);
      };
      image.src = e.target.result;
    };

    imageReader.readAsDataURL(file);

    $download.attr('download', 'LGTM-' + file.name);
  };
});

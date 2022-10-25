
$(function () {
  const DEFAULT_COLOR = 'rgb(92, 185, 235)';
  let rgbaColor;
  $(" #demo-input").val(DEFAULT_COLOR); $('.preview-div').css('background-color', DEFAULT_COLOR);

  $('.demo').colorpicker({
    inline: true,
    horizontal: true, 
    extensions: [{
    name: 'swatches', 
    options: {
        colors:
        {
          'tetrad1': '#aaacd6', 'tetrad2': '#8bbef0', 'tetrad3': '#8ebf99', 'tetrad4': '#e38fd6', 'tetrad5'
            : '#fcfa70', 'tetrad6': '#6fbbfc', 'tetrad7': '#f56452', 'tetrad8': '#e38fd6',
        }, namesAsValues: false
      }
    }]
  }); 

    $('.demo').on('colorpickerChange', function (event) {
      console.log('eeee',event)
      $('.preview-div').css('background-color', event.color.toString());
    });
  
  //eye dropper
  document.querySelector('.pick-color-btn').addEventListener('click', () => {
    if (!window.EyeDropper) {
      resultElement.textContent = 'Your browser does not support the EyeDropper API';
      return;
    }
    const eyeDropper = new EyeDropper();
    eyeDropper.open().then((result) => {
    rgbaColor = hexToRgbA(result.sRGBHex);
      //preview 부분
      $(" #demo-input").val(rgbaColor); $('.preview-div').css('background-color', rgbaColor)
    }).catch((e) => {
      resultElement.textContent = e;
    });
  });

  // document.querySelector('.pick-color-btn').addEventListener('click', () => {
  //   if (!window.EyeDropper) {
  //     resultElement.textContent = 'Your browser does not support the EyeDropper API';
  //     return;
  //   }
  // //colorpicker-alpha-color
  // //background: linear-gradient(to right, rgb(92, 185, 235) 0%, transparent 100%);
  //   const eyeDropper = new EyeDropper();
  //   eyeDropper.open().then((result) => {
  //     let rgbaColor = hexToRgbA(result.sRGBHex);
  //     console.log(rgbaColor)
  //     //preview 부분
  //     $(" #demo-input").val(rgbaColor);
  //     $('.preview-div').css('background-color',rgbaColor);
  //     // $('.colorpicker-saturation').css('background-color',rgbaColor)
  //     // $('.colorpicker-alpha-color').css( "background-image", 
  //     // `linear-gradient( to right, ${rgbaColor} 0%, transparent 100% )` )
  //   }).catch((e) => {
  //     resultElement.textContent = e;
  //   });
  // });

  function hexToRgbA(hex){
    let c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',1)';
    }
    throw new Error('Bad Hex');
  }

  //  //click 시 마우스가 확대하면서 컬러를 인식하는것으로 변경한다.
  // $('.pick-color-btn').click(() => {
  //   console.log('fkfk')
  // })

  // $(".wrap")
  //   .on('mousemove', magnify)
  //   .prepend("<div class='magnifier'></div>")
  //   .children('.magnifier').css({
  //     "background": "url('" + $(".target").attr("src") + "') no-repeat"
  //   });

  // var target = $('.target');
  // var magnifier = $('.magnifier');

  // function magnify(e) {
  //   //div.magnifier가 마우스 우측하단부터 자리하게 되므로 마우스 한가운데 위치시키기 위해 돋보기 너비,높이의 절반을 각각 빼주는것!.
  //   // 실제 마우스 좌표에서 컨테이너(div.wrap) offset 위치를 차감해 컨테이너 안쪽에서의 마우스 좌표얻는다
  //   // 현재 컨테이너를 500px로 고정해놨으니 왼쪽상단 모서리가 (0 , 0), 오른쪽상단 모서리가 (500, 0) 가 됨.

  //   // console.log('ee?', e)
  //   var mouseX = e.pageX - $(this).offset().left;
  //   var mouseY = e.pageY - $(this).offset().top;

  //   // 컨테이너 안에 마우스가 있으면 div.magnifier를 드러나게 하고, 벗어나면 감추기
  //   if (mouseX < $(this).width() && mouseY < $(this).height() && mouseX > 0 && mouseY > 0) {
  //     magnifier.fadeIn(100);
  //   } else {
  //     magnifier.fadeOut(100);
  //   }
  //   if (magnifier.is(":visible")) {
  //     // img.target 위에 위치한 마우스 위치를 기준으로 하여 본래 이미지 크기에 대한 마우스 좌표::mouseX 를 얻기.
  //     // target.width: 현재 확대하려고 하는 타겟이미지의 너비
  //     // mouseX, mouseY는 (250, 250) 가 됨.
  //     var rx = -(mouseX / target.width() * target[0].naturalWidth - magnifier.width() / 2);
  //     var ry = -(mouseY / target.height() * target[0].naturalHeight - magnifier.height() / 2);

  //     // div.magnifier를 마우스 가운데 위치시키기 위해 width, height 절반깎기
  //     var px = mouseX - magnifier.width() / 2;
  //     var py = mouseY - magnifier.height() / 2;

  //     //css return 한 후 마우스무브에 따라오게 하기.
  //     magnifier.css({
  //       left: px,
  //       top: py,
  //       backgroundPosition: rx + "px " + ry + "px"
  //     });
  //   }
  // }

});

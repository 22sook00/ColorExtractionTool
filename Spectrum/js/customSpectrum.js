$(function () {
  $("#triggerSet").spectrum({
    // type: "flat",
    togglePaletteOnly: true,
    showInput: true,
    showInitial: true,
    showButtons: true,
    replacerClassName: 'test',
    // chooseText: "선택", 
    // togglePaletteMoreText: 'Show more',
    // togglePaletteLessText: 'Hide',
    //저장하지 않은 상태에서 외부를 클릭했을 때 자동 저장이 됨.
    clickoutFiresChange: true,
    maxSelectionSize: 10,
    palette: [["#f4cccc", "#fce5cd", "#fff2cc","#d9ead3","#d0e0e3","#cfe2f3","#d9d2e9","#ead1dc"]],
    move: function(color) { 
      color.toHexString();
    },
  });

  $("#triggerSet").show();
  $("#triggerSet").on('move.spectrum', function(e, color) { 
    $('.preview-div').css('background-color',color.toHexString())
  });

  
  document.querySelector('.sp-clear').addEventListener('click',()=>{
    $('.preview-div').css('background-color','#fffff');
  })

  const eyeDropperButton = `<button class="pick-color-btn">
  <span class="material-symbols-outlined">
    colorize
  </span>
  Pick Color</button>`

  $('.sp-palette-container').append(eyeDropperButton);

  document.querySelector('.pick-color-btn').addEventListener('click', () => {
    const eyeDropper = new EyeDropper();
    if (!window.EyeDropper) {
      console.dir('Your browser does not support the EyeDropper API!')
      return;
    }
    eyeDropper.open().then((result) => {
    rgbaColor = result.sRGBHex;
    //preview 부분
    $("#triggerSet").spectrum("set",rgbaColor);
    $('.preview-div').css('background-color',rgbaColor);
    }).catch((e) => {
      console.dir('err!')
    });
  });

  // function hexToRgbA(hex){
  //   let c;
  //   if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
  //     console.log('hehe',hex,hex.substring(1))
  //       c= hex.substring(1).split('');
  //       if(c.length== 3){
  //           c= [c[0], c[0], c[1], c[1], c[2], c[2]];
  //       }
  //       c= '0x'+c.join('');
  //       return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',1)';
  //   }
  //   throw new Error('Bad Hex');
  // }
});

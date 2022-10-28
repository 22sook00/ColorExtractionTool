function showColorPicker(selectedTrigger){
  if(!selectedTrigger) return ;
  $(selectedTrigger).spectrum({
    showInput: true,
    showInitial: true,
    showButtons: true,
    clickoutFiresChange: true,
    maxSelectionSize: 10,
    palette: [["#f4cccc", "#fce5cd", "#fff2cc","#d9ead3","#d0e0e3","#cfe2f3","#d9d2e9","#ead1dc"]],
    move: function(color) { 
      color.toHexString();
    },
    beforeShow: function (color) {
      color && color.toHexString();
  },
  });

  $(selectedTrigger).show();
  $(selectedTrigger).on('move.spectrum', function(e, color) {
      const targetID = e.target.id
      getTriggerColorByID(targetID,color.toRgbString())
  });


  function customColorModule(){
    const triggerLength = $('.trigger').length;
    for(let i= 1 ; i<=triggerLength; i++){

      let palette = $('.sp-palette')[i-1];
      let cancel = $('.sp-cancel')[i-1];
      let clear = $('.sp-clear')[i-1];
      let input = $('.sp-input')[i-1];
      let triggerIDX = $('.trigger')[i-1];
      $(clear).addClass(`sp-clear-${i}`)
      $(cancel).addClass(`sp-cancel-${i}`)
      $(input).addClass(`sp-input-${i}`)
      
      //흰색으로 돌아가기
      document.querySelector(`.sp-clear-${i}`).addEventListener('click',()=>{
      
        getTriggerColorByID(triggerIDX.id,'transparent')
      })
      //이전으로 돌아가기
      $(selectedTrigger).on('beforeShow.spectrum', function (e, color) {
        document.querySelector(`.sp-cancel-${i}`).addEventListener('click', () => {
          getTriggerColorByID(triggerIDX.id,color.toRgbString())
        })
       
      });

      document.getElementById(triggerIDX.id).addEventListener('keyup', function(e){handleKeyUpSearch(e,triggerIDX.id)});
      document.querySelector(`.sp-input-${i}`).addEventListener('keyup', function(e){handleKeyUpSearch(e,triggerIDX.id)} ); 
      
      //각각 버튼에 아이드로퍼 추가
      $(palette).after(`<button class="pick-color-trigger pick-color-trigger-${i}">
      <span class="material-symbols-outlined">
        colorize
      </span>
      Pick Color</button>`);
      document.querySelector(`.pick-color-trigger-${i}`).addEventListener('click', () => {
        const eyeDropper = new EyeDropper();
        if (!window.EyeDropper) {
          console.dir('Your browser does not support the EyeDropper API!')
          return;
        }
        eyeDropper.open().then((result) => {
        let eyeDropperCOLOR = result.sRGBHex;
        $(triggerIDX).spectrum("set",eyeDropperCOLOR);
        getTriggerColorByID(triggerIDX.id,eyeDropperCOLOR);
    
        }).catch((e) => {
          console.dir('err!')
        });
      });
    }
  }
  customColorModule();

function handleKeyUpSearch(e,triggerID) {
  const keyupCOLOR = e.target.value;
    if(keyupCOLOR[0]==='#'){
      if(keyupCOLOR.length ===7){
        $(`#${triggerID}`).spectrum("set",keyupCOLOR);
        getTriggerColorByID(triggerID,keyupCOLOR);
      }else{
        return;
      }
    } 
    else{
      if(keyupCOLOR.length ===6){
        $(`#${triggerID}`).spectrum("set", `#${keyupCOLOR}`);
        getTriggerColorByID(triggerID,`#${keyupCOLOR}`);
      }else{
        return;
      }
    }
  }

  //!trigger id 구하기 함수
  function getTriggerColorByID(targetID,color){

    //triggerID 는 #제외한 순수 아이디만 전달해준다.
    //color 는 스트링값으로 보내준다.
    const targetIDwithSHARP = $(`#${targetID}`);
    let targetCOLOR = targetIDwithSHARP.parents('.color-trigger-section').find('.applied-color');
    targetCOLOR.addClass(`${targetID}-applied-color`);
    targetCOLOR.css('background',color)

    // let originBgCOLOR = document.querySelector('.applied-color')?.style.backgroundColor
    // let originBorderCOLOR = $('.22triggerSet-applied-color')[0].style.borderColor
    let originBgCOLOR; 
    if(targetID === '33triggerSet' ){
      $('.preview-div').css('background', color);
    }else if(targetID === '22triggerSet') {
      $('.preview-div').css('border-color', color);
    }else{
      $('.preview-div').hover(function(){
        originBgCOLOR = $('.33triggerSet-applied-color') && $('.33triggerSet-applied-color')[0].style.background
        $(this).css('background',color)},
        function(){$(this).css('background',originBgCOLOR);
      });
    }
  }
}
showColorPicker();
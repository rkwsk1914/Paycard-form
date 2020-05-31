const reverseCard =  () => {
  let cardFront = $('#cardFront');
  let cardBack = $('#cardBack');
  
  if (cardFront.hasClass('flip') === true){
    cardBack.addClass('flip');
    cardFront.removeClass('flip');
  }
  else {
    cardFront.addClass('flip');
    cardBack.removeClass('flip');
  }
};

const forcusRepos = (element) => {
  let forcusFrame = $('#forcusFrame');
  let cardWrapper = $('.cardWrapper'); 
  let classname = '.' + element;
  let item = $(classname);
  let cardpos = cardWrapper.offset();
  let pos = item.offset();
  let widthVal = item.outerWidth();
  let heightVal = item.outerHeight();
  let topVal;
  
  topVal = cardpos.top + (cardpos.top + cardWrapper.outerHeight()) - (pos.top + heightVal);
  
  forcusFrame.offset({ top: topVal, left: pos.left });
  forcusFrame.css({
    'opacity': 0.7,
    'width': widthVal,
    'height': heightVal 
  });
};

const forcusPos = (element) => {
  let forcusFrame = $('#forcusFrame');
  let classname = '.' + element;
  let item = $(classname);
  let pos = item.offset();
  let widthVal = item.outerWidth();
  let heightVal = item.outerHeight();
  
  forcusFrame.offset({ top: pos.top, left: pos.left });
  forcusFrame.css({
    'opacity': 0.7,
    'width': widthVal,
    'height': heightVal 
  });
};

const removeForcusFrame = () => {
  let item = $('.cardWrapper');
  let pos = item.offset();
  let forcusFrame = $('#forcusFrame');
    
  forcusFrame.offset({ top: pos.top, left: pos.left });
  forcusFrame.css({
    'opacity': 0,
    'width': '100%',
    'height': '100%' 
  });
};

const app = new Vue({
  el: '#app',
  data() {
    return {
      cardName: "",
      cardNumber: "",
      cardMonth: "",
      cardYear: "",
      cardCvv: "",
      minCardYear: new Date().getFullYear(), //リアルタイムのDateインスタンスを生成し、年を取得
      amexCardMask: "#### ###### #####",
      otherCardMask: "#### #### #### ####",
      cardNumberTemp: "",
      cardStatus: 1,
      cardImage:"",
      picuters:[
        { id: 1, url: 'image/sample01.jpg' },
        { id: 2, url: 'image/sample02.jpg' },
        { id: 3, url: 'image/sample03.jpg' }  
      ]
    };
  },
  computed: {
    //入力されたカードナンバーからカードタイプをチェンジ：デフォルトはvisa
    getCardType () {
      let number = this.cardNumber;
      let re = new RegExp("^4");
      if (number.match(re) != null) return "visa";

      re = new RegExp("^(34|37)");
      if (number.match(re) != null) return "amex";

      re = new RegExp("^5[1-5]");
      if (number.match(re) != null) return "mastercard";

      re = new RegExp("^6011");
      if (number.match(re) != null) return "discover";
      
      re = new RegExp('^9792');
      if (number.match(re) != null) return 'troy';

      return "visa"; // default type
    },
    //カードタイプがamexなら、amxCardMaskを返し、それ以外はotherCardMaskを返す
    generateCardNumberMask () {
      return this.getCardType === "amex" ? this.amexCardMask : this.otherCardMask;
    },
    //
    minCardMonth () {
      if (this.cardYear === this.minCardYear) return new Date().getMonth() + 1;
      return 1;
    }
  },
  mounted() {
    this.cardNumberTemp = this.otherCardMask;
    document.getElementById("cardNumber").focus(); 
  },
  watch: {
    cardYear () {
      if (this.cardMonth < this.minCardMonth) {
        this.cardMonth = "";
      }
    }
  },
  methods: {
    reversetoFront(element) {
      forcusPos(element);
      if(this.cardStatus === 0){
        reverseCard();
        forcusRepos(element);
        this.cardStatus = 1;
      }
    },
    removeForcus() {
      removeForcusFrame();
    },
    reversetoBack() {
      if(this.cardStatus === 1){
        reverseCard();
        this.cardStatus = 0;
      }
    },
    changeCardImage(picuter) {
      let card = $('.cardWrapper');
      
      card.css({
        'background-image':'url(' + picuter + ')'
      });
    },
  }
});
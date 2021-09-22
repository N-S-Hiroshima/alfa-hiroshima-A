/**********************************************************************************************************
 * 解答入力欄のコンポーネントです。入力欄・送信ボタン・エラーメッセージを表示します。
 * <answer-input v-bind:correct="解答" v-on:answer-input="answerInput(event, stage, number, final)"></answer-input>
 * 解答：correctAnswer['stage1']['q1']
 * answerInput(event, stage, number, final)：
 *          event ：$event
 *          stage ：STAGE名 'stage1'
 *          number：問題番号（数字） 1
 *          final ：最終ステージの場合 'final'
 *********************************************************************************************************/
let finals="off",music,BGM;
 const app = Vue.createApp({
  data() {
    bgm("loop",2);
    bgm("bgm");
    /* 初期値を設定します */
    return {
      /* 解答
      *  ex. 問題2-3を追加する場合はstage2の配列に解答を追加します。
      *    q3: 'おおお',
      */
      correctAnswer: {
        stage1: {
          q1: ''//'くすりゆび'
        },
        stage2: {
          q1: ''//'クレヨン'
        },
        stage3: {
          q1: ''//'いえ'
        },
        stage4:{
          q1:''//'ふね'
        },
        stage5:{
          q1:''//'バイオリン'
        },
        stage6:{
          q1:'メッセージ'
        },
        stage7:{
          q1:'ゆくえふめい'//
        }
      },

      /* それぞれの問題が正解かどうか
      *  ex. 問題2-3を追加する場合は配列にfalseを追加します。
      */
      answer: {
        stage1: [
          false,
        ],
        stage2: [
          false, 
        ],
        stage3: [
          false, 
        ],
        stage4: [
          false,
        ],
        stage5: [
          false,
        ],
        stage6: [
          false,
        ],
        stage7: [
          false
        ]
      },

      /* ステージの問題が全て正解かどうか */
      clear: {
        stage1: false,
        stage2: false,
        stage3: false,
        stage4: false,
        stage5: false,
        stage6: false,
        stage7: false
      },

      /* 次のステージを表示するかどうか
      *  最終ステージはページを遷移するので設定不要です。
      */
      next: {
        stage1: false,
        stage2: false,
        stage3: false,
        stage4: false,
        stage5: false,
        stage6: false,
        stage7: false
      },
    }
  },
  methods: {
    /* 「送信」ボタンをクリックした場合の動作です。 */
    answerInput(event, stage, number, final) {
      /* answerをtrueまたはfalseにします。 */
      this.answer[stage][number-1] = event;
      /* STAGEのすべての問題がtrueか調べてclearの値を変更します。*/
      const result = this.answer[stage].every((element) => {
        return element;
      });
      this.clear[stage] = result;
      /* 最終ステージの入力を判定します。 */
      if ( this.clear[stage] === true && final === 'final' ) {
        finals = "on";
        
      }
    },
    /* クリア画面「次のステージへ」ボタンをクリックした時の動作を設定します
    *  clearをfalseにしてクリア画面を非表示にします。
    *  nextをtrueにして次のステージを表示します。
    */
    nextStage(stage) {
      this.clear[stage] = false;
      this.next[stage] = true;
      
    if(stage=="stage1"){
      bgm("bgm");
      bgm("loop",4);
      }else if(stage=="stage2"){
        bgm("bgm");
      }else if(stage=="stage3"){
        bgm("bgm");
        bgm("loop",5);
      }else if(stage=="stage4"){
        bgm("start",0);
      }else if(stage=="stage5"){
        bgm("bgm");
      }else if(stage=="stage6"){
        bgm("bgm");
      }else if(stage=="stage7"){
        bgm("bgm");
      }
    },
  }
})

/* 解答入力欄のコンポーネント */
app.component('answer-input', {
  props: ['correct'],
  data: function () {
    return {
      /* 送信ボタン上下に表示されるメッセージ */
      okMessage: '合っていたようだ......',
      ngMessage: 'どうやら違うらしい。もう一度考えてみよう。',
      loopMessage: '3階のトイレにヒントがあるかもしれない。カケルの手もありがたく借りよう。',//ゆくえふめい入力時に送信ボタン上に表示させる文章
      message: '',
      inputAnswer: '',
    }
  },
  template: `
    <div class="answer__container">
      <div class="answer">
        <input type="text" v-model="inputAnswer" placeholder="ここに答えを入力しよう">
      </div>
      <p v-if="message === ngMessage" class="err-message">{{ message }}</p>
      <p v-if="message === loopMessage" class="err-message">{{ message }}</p>
      <button v-on:click="judgement(inputAnswer)">答える</button>
      <p v-if="message === okMessage" class="err-message">{{ message }}</p>
    </div>`,
  methods: {
    judgement(answer) {
      console.log(finals)
      if(answer=== "ゆくえふめい"){//ゆくえふめいと入力した時の処理
        this.message = this.loopMessage;
        this.$emit('answerInput', true);
        bgm("bgmstop");
        bgm("stop");
        bgm("start",6)

      }else if(answer==="りんねてんせい"){//りんねてんせいと入力した時の処理
        window.location.href = 'final.html';
        
      }else if(answer === this.correct) { // 入力値が解答と一致する場合
        this.message = this.okMessage;
        this.$emit('answerInput', true);
        bgm("bgmstop");
        bgm("stop");
        bgm("start",3)
      }else { // 一致しない場合
        this.message = this.ngMessage; 
        this.$emit('answerInput', false);
      }
    },
  }
})

app.mount('#stage')


function bgm(playmode,track){
  switch(track){
    case 0:
      music = new Audio("https://n-s-hiroshima.github.io/beta-hiroshima-A/assets/audio/0.mp3");
      music.volume = .2      
      break;
    case 1:
      music = new Audio("https://n-s-hiroshima.github.io/beta-hiroshima-A/assets/audio/1.mp3");
      music.volume = .2
      break;
    case 2:
      music = new Audio("https://n-s-hiroshima.github.io/beta-hiroshima-A/assets/audio/2.mp3");
      music.volume = .9
      break;
    case 3:
      music = new Audio("https://n-s-hiroshima.github.io/beta-hiroshima-A/assets/audio/3.mp3");
      music.volume = .3
      break
    case 4:
      music = new Audio("https://n-s-hiroshima.github.io/beta-hiroshima-A/assets/audio/4.mp3");
      music.volume = .3
      break;
    case 5:
      music = new Audio("https://n-s-hiroshima.github.io/beta-hiroshima-A/assets/audio/5.mp3");
      music.volume = .1
      break;
    case 6:
      music = new Audio("https://n-s-hiroshima.github.io/beta-hiroshima-A/assets/audio/6.mp3");
      music.volume = .3
      break;
    case 7:
      music = new Audio("https://n-s-hiroshima.github.io/beta-hiroshima-A/assets/audio/7.mp3");
      music.volume = .3
      break;
    case 8:
      music = new Audio("https://n-s-hiroshima.github.io/beta-hiroshima-A/assets/audio/8.mp3");
      music.volume = .3
      break;
    case 9:
      music = new Audio("https://n-s-hiroshima.github.io/beta-hiroshima-A/assets/audio/9.mp3");
      music.volume = .3
      break;
    default:
      break;
  }

  if(playmode=="start"){
    music.loop = false;
    music.play();
  }else if(playmode=="loop"){
    music.loop = true;
    music.play();
  }else if(playmode=="bgm"){
    BGM = new Audio("https://n-s-hiroshima.github.io/beta-hiroshima-A/assets/audio/BGM.mp3");
    BGM.volume = .3
    BGM.loop = true;
    BGM.play();
  }else if(playmode=="bgmstop"){
    while (BGM.volume>0.1) {
      BGM.volume = BGM.volume - .00001
    }
    BGM.pause();

  }else{
    while (music.volume>0.1) {
      music.volume = music.volume - .01
    }
    music.pause();
  }  
};

function sleep(waitMsec) {//sleep(ミリ秒)で遅延を作れる
  var startMsec = new Date();
 
  // 指定ミリ秒間だけループさせる（CPUは常にビジー状態）
  while (new Date() - startMsec < waitMsec);
}
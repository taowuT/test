<template>
  <div class="card">
      <transition name="obverse">
        <div class="card-wrap" v-show="!isBack">
          <div class="card-card">
            <svg width="100" height="76" viewBox="0 0 100 76" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><defs><linearGradient x1="100%" y1="0%" x2="0%" y2="100%" id="a"><stop stop-color="#F3D08F" offset="0%"/><stop stop-color="#FAD766" offset="100%"/></linearGradient></defs><path d="M92.727 75.455h-85.455c-4 0-7.273-3.273-7.273-7.273v-60.909c0-4 3.273-7.273 7.273-7.273h85.455c4 0 7.273 3.273 7.273 7.273v60.909c0 4-3.273 7.273-7.273 7.273" fill="url(#a)"/><path d="M72.123 28.485h27.878v-1.818h-29.648c-.965 0-1.832.601-2.172 1.504-2.287 6.072-2.433 12.594-.438 19.842.455 1.654.435 3.4-.1 5.03-2.036 6.195-7.779 19.988-18.551 19.988-11.008 0-16.096-15.699-17.334-21.952-.155-.784-.122-1.592.107-2.357 1.695-5.648 2.094-10.64-.016-19.59-.205-.87-.182-1.783.048-2.646 4.48-16.755 12.882-20.147 12.965-20.179.356-.132.593-.472.593-.852v-5.455h-1.818v3.776c0 .65-.332 1.252-.884 1.596-2.803 1.742-8.904 6.936-12.557 20.456-.18.668-.781 1.136-1.473 1.133l-28.722-.139v1.818l27.416.133c1.468.007 2.735 1.041 3.037 2.478 1.416 6.741 1.219 11.039.082 15.458-.316 1.23-1.42 2.096-2.69 2.109l-27.844.27v1.819l28.605-.278c.693-.007 1.296.473 1.435 1.152 1.442 7.041 6.887 23.07 19.05 23.07 6.368 0 12.062-4.25 16.467-12.29 2.644-4.828 4.067-9.591 4.541-11.346h29.901v-1.818h-28.016c-1.158 0-2.183-.772-2.489-1.889-1.692-6.164-1.761-11.755-.2-16.959.371-1.235 1.538-2.061 2.827-2.061zm-17.15-21.914c.045.022 4.519 2.322 9.253 10.041.172.28.47.434.776.434.198 0 .399-.064.571-.202.365-.292.416-.837.172-1.235-3.57-5.805-7.024-8.71-8.775-9.931-.43-.299-.68-.792-.68-1.315v-4.363h-1.818v5.758c0 .345.195.659.502.813z" fill="#0C0200"/></svg>
          </div>
          <div class="card-logo">
            <img src="">
          </div>
          <div class="card-num" :class="{active: isNumFocus}">
            {{changeCardId}}
          </div>
          <div class="card-bottom-wrap">
            <div class="card-name" :class="{active: isNameFocus}">
              {{changeCardName}}
            </div>
            <div class="card-vc" :class="{active: isVcFocus}">
              <div class="card-vt">
                valid thru
              </div>
              <div class="card-cv">
                {{changeCv}}
              </div>
            </div>
          </div>
          
          <transition name="slide">
            <mask-block :color="color" v-show="isTrue"></mask-block>
          </transition>

        </div>
      </transition>

      <transition name="back">
        <div class="card-back-wrap" :style="{background: color}" v-show="isBack">
          <div class="back-black"></div>
          <div class="back-line">
            {{cvc}}
          </div>
        </div>
      </transition>

    <form action="">
      <div class="form-id">
        <input type="text" 
               ref="inputNum" 
               placeholder="Card Number" 
               oninput="this.value = this.value.replace(/[^\d]/g,'').replace(/(\d{4})(?=\d)/g,'$1 ')"
               maxlength="19" 
               v-model="cardId" 
               @focus="isNumFocus = !isNumFocus"
               @blur="isNumFocus = !isNumFocus">
        <p>E.g.: 49..., 51..., 36..., 37...</p>
      </div>
      <div class="form-name">
        <input type="text" 
               placeholder="name" 
               maxlength="8" 
               v-model="cardName" 
               @focus="isNameFocus = !isNameFocus"
               @blur="isNameFocus = !isNameFocus"
               oninput="this.value = this.value.replace(/[\d\s\.]/g,'')">
      </div>
      <div class="form-vc">
        <input class="vt" 
               type="text" 
               placeholder="Valid Thru" 
               maxlength="5" 
               v-model="valid" 
               @focus="isVcFocus = !isVcFocus" 
               @blur="isVcFocus = !isVcFocus" 
               oninput="this.value = this.value.replace(/[^\d]/g,'').replace(/(\d{2})(?=\d)/g,'$1/')">
        <input class="cvc" 
               type="text" 
               placeholder="CVC" 
               onkeyup="this.value = this.value.replace(/\D+/g, '')" 
               v-model="cvc" 
               maxlength="4"
               @focus="isBack = !isBack" 
               @blur="isBack = !isBack">
      </div>
      <button class="form-btn" @click="clickBtn">PAY</button>

      <tip :isTip="isTip" :tipText="tipText"></tip>
    </form>

    <transition name="result">
      <div class="result-wrap" v-show="isResult">
        <p>银行卡号为：{{cardId}}</p>
        <p>姓名为：{{cardName}}</p>
        <p>Valid Thru为：{{valid}}</p>
        <p>CVC为：{{cvc}}</p>
      </div>
    </transition>
  </div>
</template>

<script>
import MaskBlock from "@/components/MaskBlock"
import Tip from '@/components/Tip'
import {changeStr} from "@/common/js/common"

export default {
  data () {
    return {
      cardId: '',
      cardName: '',
      valid: '',
      cvc: '',
      color: '',
      isTrue: false,
      isBack: false,
      num: 0,
      tipText: '',
      isTip: false,
      isResult: false,
      isNumFocus: false,
      isNameFocus: false,
      isVcFocus: false
    }
  },
  computed: {
    changeCardId() {
      return this.cardId.length < 1 ? '•••• •••• •••• ••••' : changeStr('•••• •••• •••• ••••', this.cardId)
    },
    changeCv() {
      return this.valid.length < 1 ? '••/••' : changeStr('••/••', this.valid)
    },
    changeCardName() {
      return this.cardName.length < 1 ? 'YOUR NAME HERE' : this.cardName
    }
  },
  methods: {
    clickBtn() {
      this.isTip = true
      if(this.cardId.length < 19) {
        this.tipText = "银行卡号不全"
      } else if(this.cardName.length < 2) {
        this.tipText = "输入的姓名有误"
      } else if(this.valid.length < 5) {
        this.tipText = "Valid Thru输入有误"
      } else if(this.cvc.length < 4) {
        this.tipText = "cvc输入不全"
      } else {
        this.tipText = "支付成功"
        this.isResult = true
      }

      setTimeout(() => {
        this.isTip = false
      }, 1500)
    }
  },
  watch: {
    cardId(newVal) {
      if(newVal.length > 1) {
        let firstNum = parseInt(newVal.slice(0, 2))
        switch(firstNum) {
          case 49:
            this.color = "linear-gradient(25deg, #0f509e, #1399cd)"
            break
          case 51:
            this.color = "linear-gradient(25deg, #f37b26, #fdb731)"
            break
          case 36:
            this.color = "linear-gradient(25deg, #fff, #eee)"
            break
          case 37:
            this.color = "linear-gradient(25deg, #308c67, #a3f2cf)"
            break
          default:
            this.color = "linear-gradient(25deg, #999, #999)"
            break
        }
        this.isTrue = true
      } else {
        this.color = "linear-gradient(25deg, #999, #999)"
        this.isTrue = false
      }
    }
  },
  components: {
      MaskBlock,
      Tip
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.card 
  position: relative
  padding: 30px
  transform-style: preserve-3d
  .card-wrap, .card-back-wrap
    position: absolute
    top: 30px
    left: 50%
    margin-left: -145px
    padding: 20px
    box-sizing: border-box
    width: 290px
    height: 183px
    background-color #999
    border-radius: 14.5px
    transition-timing-function: linear
    overflow: hidden
    .card-card
      position: relative
      width: 20%
      z-index: 100
      svg
        width: 100%
        height: 100%
    .card-bottom-wrap
      position: absolute
      bottom: 10%
      width: 250px
      display: flex
      align-items: center
      z-index: 100
    .card-num
      position: absolute
      bottom: 38%
      width: 250px
      color: #c6c6c6
      font: 400 20px "Consolas, Courier, monospace"
      text-align: left
      text-indent: 20px
      z-index: 100
    .card-name
      flex: 3
      text-align: left
      font: 400 16px "Consolas, Courier, monospace"
      color: #c6c6c6
    .card-vc
      flex: 1
      color: #c6c6c6
      font: 400 12px "Consolas, Courier, monospace"
    .active
      color: #fff
    .back-black
      position: absolute
      top: 9%
      left: 0
      width: 100%
      height: 22%
      background-color: #2a1d16
    .back-line
      position: absolute
      top: 35%
      left: 5%
      box-sizing: border-box
      padding-right: 5px
      width: 75%
      height: 18%
      background-image: repeating-linear-gradient(0.1deg, #fff 20%, #fff 40%, #fea 40%, #fea 44%, #fff 44%)
      text-align: right
      line-height: 2.1

  form
    margin: 0 auto 
    padding-top: 210px
    max-width: 400px
    .form-id 
      p
        text-align: left
        font-weight: 400 
        font-size: 80%
    input
      display: block
      width: 100%
      margin: .5rem 0
      padding: .5rem .75rem
      box-sizing: border-box
      font: 400 1rem Arial
      color: #495057
      border: 1px solid rgba(0,0,0,.15)
      border-radius: .25rem
      &:focus
        border-color: #007bff
    .form-vc
      display: flex 
      .vt, .cvc
        display: inline-block
        flex: 1
      .cvc
        margin-left: 1rem
  .form-btn
    display: block
    padding: .5rem
    width: 100%
    color: #fff
    background-color: #007bff
    border: 1px solid transparent
    border-radius: .25rem
    cursor: pointer
  .result-wrap
    margin: 30px auto 
    text-algin: center 
    p 
      padding: 20px


.obverse-enter-active
  transition: all .3s .3s
.obverse-leave-active
  transition: all .3s 
.obverse-enter,
.obverse-leave-active
  transform: rotateY(90deg)
  
.back-enter-active
  transition: all .3s .3s
.back-leave-active
  transition: all .3s 
.back-enter,
.back-leave-active
  transform: rotateY(-90deg)

.slide-enter-active,
.slide-leave-active
  transition: all .3s
.slide-enter
  transform: translate3d(-100%, -80%, 0)
.slide-leave-active
  transform: translate3d(0, 0, 0)

.result-enter-active,
.result-leave-active
  transition: all .5s

.result-enter, .result-leave-active
  transform: translate3d(0, 100%, 0)


</style>

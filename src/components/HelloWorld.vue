<template>
  <div class="card">
      <obverse 
        :isFocus="isFocus" 
        :changeColor="changeColor" 
        :isBack="isBack"
        :changeCardId="changeCardId"
        :changeCardName="changeCardName"
        :changeCv="changeCv"></obverse>

      <back
        :changeColor="changeColor" 
        :isBack="isBack"
        :cvc="cvc"></back>

    <form>
      <div class="form-id">
        <input type="text" 
               ref="inputNum" 
               placeholder="Card Number" 
               oninput="this.value = this.value.replace(/[^\d]/g,'').replace(/(\d{4})(?=\d)/g,'$1 ')"
               maxlength="19" 
               v-model="cardId" 
               @focus="isFocus = 1"
               @blur="isFocus = 0">
        <p>E.g.: 49..., 51..., 36..., 37...</p>
      </div>
      <div class="form-name">
        <input type="text" 
               placeholder="name" 
               maxlength="8" 
               v-model="cardName" 
               @focus="isFocus = 2"
               @blur="isFocus = 0"
               oninput="this.value = this.value.replace(/[\d\s]/g,'')">
      </div>
      <div class="form-vc">
        <input class="vt" 
               type="text" 
               placeholder="Valid Thru" 
               maxlength="5" 
               v-model="valid" 
               @focus="isFocus = 3" 
               @blur="isFocus = 0" 
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
import Obverse from '@/components/Obverse'
import Back from '@/components/Back'
import Tip from '@/components/Tip'
import {changeStr} from "common/js/common"

export default {
  data () {
    return {
      cardId: '',
      cardName: '',
      valid: '',
      cvc: '',
      isBack: false,
      num: 0,
      tipText: '',
      isTip: false,
      isResult: false,
      isFocus: null
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
    },
    changeColor() {
      let newVal = this.cardId
      let color = ''
      let isTrue = false
      if(newVal.length > 1) {
        let firstNum = parseInt(newVal.substr(0, 2))
        switch(firstNum) {
          case 49:
            color = "linear-gradient(25deg, #0f509e, #1399cd)"
            break
          case 51:
            color = "linear-gradient(25deg, #f37b26, #fdb731)"
            break
          case 36:
            color = "linear-gradient(25deg, #fff, #eee)"
            break
          case 37:
            color = "linear-gradient(25deg, #308c67, #a3f2cf)"
            break
          default:
            color = "linear-gradient(25deg, #999, #999)"
            break
        }
        isTrue = true
      } else {
        color = "linear-gradient(25deg, #999, #999)"
        isTrue = false
      }
      return {isTrue, color}
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
  components: {
    Obverse,
    Back,
    Tip
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.card 
  position: relative
  padding: 30px
  transform-style: preserve-3d  
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
    p 
      padding: 10px

.result-enter-active,
.result-leave-active
  transition: all .5s

.result-enter, 
.result-leave-active
  transform: translate3d(0, 100%, 0)


</style>

<template>
  <transition name="loading">
    <div v-show="isShow" class="loading-wrap">
      <div class="loading">
        <div class="loading-icon"></div>
        <div class="loading-text">{{text}}</div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    data() {
      return {
        text: '加载中...',
        isShow: false
      }
    },
  }
</script>

<style lang="less" scoped>
.loading-enter-active, .loading-leave-active{
  transition: all .3s ease;
}
.loading-enter, .loading-leave-to{
  opacity: 0;
}
.loading-wrap{
  position: absolute;
  z-index: 999;
  top: 0;
  left: 0;
}
.loading{
  position: fixed;
  z-index: 1000;
  top: 50%;
  left: 0;
  right: 0;
  margin: auto;
  width: 300px;
  height: 300px;
  transform: translateY(-50%);
  border-radius: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, .6);
  color: #fff;
  font-size: 36px;
}
.loading-icon{
  width: 40px;
  height: 40px;
  margin-bottom: 40px;
  border-radius: 50%;
  border-top:6px solid #c7f7e8;
  border-right:6px solid #c6ffed;
  border-bottom:6px solid #b4f8e3;
  border-left:6px solid #a0fadd;
  animation:turn 1s linear infinite;
}
@keyframes turn {
  0%{transform: rotate(0deg);}
  25%{transform: rotate(90deg);}
  50%{transform: rotate(18deg);}
  75%{transform: rotate(27deg);}
  100%{transform: rotate(360deg);}
}
</style>
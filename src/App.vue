<template>
  <div id="app">
    <div class="color-list">
      <div
        class="color-item" :style="{background: color.color}"
        v-for="color in colors" v-dragging="{ item: color, list: colors, group: 'color' }"
        :key="color.text"
      ><div>{{color.text}}</div><div class="close-btn" @click="color.isInGroup=!color.isInGroup">{{color.isInGroup?'x':''}}</div></div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: 'app',
    data() {
      return {
        groupArr: [],
        colors: [
          {text: "1Aquamarine"},
          {text: "2Hotpink"},
          {text: "3Gold"},
          {text: "4Crimson"},
          {text: "5Blueviolet"},
          {text: "6Lightblue"},
          {text: "7Cornflowerblue"},
          {text: "8Skyblue"},
          {text: "9Burlywood"},
        ],
      }
    },
    mounted() {
      this.colors.forEach((item) => {
        Vue.set(item, 'isInGroup', false) // 是否选中
        Vue.set(item, 'color', '#' + (Math.random() * 0xffffff << 0).toString(16)) // 随机背景色
      })

      this.$dragging.$on('dragged', (obj) => {
        if (!this.groupArr.length) {
          this.groupArr = this.colors.filter(function (item) {
            return item.isInGroup
          })
        }
        this.groupArr.forEach((item) => {
          if (item != obj.draged) {
            let oldIndex = this.colors.indexOf(item)
            this.colors.splice(oldIndex, 1)
          }
        })

        let targetIndex = this.colors.indexOf(obj.draged)
        if (this.groupArr.length) {
          this.colors.splice(targetIndex, 1, ...this.groupArr)
        }
      })

      this.$dragging.$on('dragend', () => { // 用户松手，整个拖拽步骤完成，重置变量
        this.colors.forEach((item) => {
          item.isInGroup = false
        })
        this.groupArr.splice(0)
      })
    },
  }
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }

  .color-item {
    display: inline-block;
    border: 1px solid #000;
    margin: 5px;
    padding: 10px 15px;
    position: relative;
  }

  .color-item .close-btn {
    position: absolute;
    left: 0;
    top: 0;
    border: 1px solid #000;
    width: 12px;
    height: 12px;
  }
</style>

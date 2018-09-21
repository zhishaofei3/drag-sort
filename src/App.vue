<template>
  <div id="app">
    <div class="color-list">
      <div
        class="color-item"
        v-for="color in colors" v-dragging="{ item: color, list: colors, group: 'color' }"
        :key="color.text"
      ><div>{{color.text}}</div><div class="close-btn" @click="onClickGroupBtn(color)">{{color.isInGroup?'x':''}}</div></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        dragObj: null,
        groupArr: [],
        colors: [{
          text: "1Aquamarine",
          isInGroup: false,
        }, {
          text: "2Hotpink",
          isInGroup: false,
        }, {
          text: "3Gold",
          isInGroup: false,
        }, {
          text: "4Crimson",
          isInGroup: false,
        }, {
          text: "5Blueviolet",
          isInGroup: false,
        }, {
          text: "6Lightblue",
          isInGroup: false,
        }, {
          text: "7Cornflowerblue",
          isInGroup: false,
        }, {
          text: "8Skyblue",
          isInGroup: false,
        }, {
          text: "9Burlywood",
          isInGroup: false,
        }]
      }
    },
    mounted() {
      this.$dragging.$on('dragged', (obj) => {
        if (!this.groupArr.length) {
          this.groupArr = this.colors.filter(function (item) {
            return item.isInGroup
          })
        }
        this.dragObj = obj.draged

        this.groupArr.forEach((item) => {
          if (item != this.dragObj) {
            let oldIndex = this.colors.indexOf(item)
            this.colors.splice(oldIndex, 1)
          }
        })

        let targetIndex = this.colors.indexOf(this.dragObj)
        if (this.groupArr.length) {
          this.colors.splice(targetIndex, 1, ...this.groupArr)
        }
      })

      this.$dragging.$on('dragend', (obj) => {
        this.colors.forEach((item) => {
          item.isInGroup = false
        })
        this.groupArr.splice(0)
      })
    },
    methods: {
      onClickGroupBtn(item) {
        item.isInGroup = !item.isInGroup
      }
    }
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

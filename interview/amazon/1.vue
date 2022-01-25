<template>
  <div class="slider-wraper">
    <div class="slider-content" ref="content">
      <div class="slider-box" ref="box" :style="style">
        <slot :data="{  }"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'slider',
  props: {
    direction: { // vertical | horizontal
      default: 'vertical',
    },
    speed: {
      default: 5,
    },
    type: { // duration|pps
      default: 'duration',
    },
    hasArrow: {
      default: true,
    },
  },
  data() {
    return {
      itemX: 0,
      itemY: 0,
      contentLen: 0,
      boxLen: 0,
      timer: null,
      move: 0,
      ableAnimate: true,
    };
  },
  computed: {
    style() {
      return {
        transform: `translateX(${this.move}px)`,
        transition: this.ableAnimate ? 'xxx' : 'none',
      };
    },
  },
  methods: {
    initContainer() {
      this.contentLen = this.$refs.content.offsetWidth;
      this.boxLen = this.$refs.box.offsetWidth;
    },
    initItemRect() {
      const $item = this.$el.querySelector('.slider-content').childNodes[0];
      this.itemX = $item.offsetWidth;
      this.itemY = $item.offsetHeight;
    },
    initAuto
  },
  mounted() {
    this.initItemRect();
    this.initContainer();
  }
}
</script>
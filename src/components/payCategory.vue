<template>
  <div class="payCategory-container">
    <van-field
      :value="value"
      clearable
      clickable
      label="文本"
      left-icon="music-o"
      right-icon="gold-coin-o"
      placeholder="显示清除图标"
      @touchstart.native.stop="show = true"
    />
    <van-grid :column-num="5">
      <van-grid-item
        v-for="(item, index) in payCategory"
        :key="index"
        :icon="item.icon"
        :text="item.name"
      />
      <van-grid-item icon="setting-o" text="设置" />
    </van-grid>
    <van-number-keyboard
      v-model="value"
      :show="payshow"
      extra-key="."
      :maxlength="6"
      @blur="show = false"
    />
  </div>
</template>

<script>
export default {
  name: "payCategoryContainer",
  components: {},
  props: {},
  data() {
    return {
      payshow: true,
      value: "",
      payCategory: [
        {
          icon: "photo-o",
          name: "其他",
        },
        {
          icon: "photo-o",
          name: "薪资",
        },
        {
          icon: "photo-o",
          name: "奖金",
        },
        {
          icon: "photo-o",
          name: "借入",
        },
        {
          icon: "photo-o",
          name: "收债",
        },
        {
          icon: "photo-o",
          name: "利息收入",
        },
        {
          icon: "photo-o",
          name: "投资回收",
        },
        {
          icon: "photo-o",
          name: "投资收益",
        },
        {
          icon: "photo-o",
          name: "意外所得",
        },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang='less'>
.payCategory-container {
  height: calc(100% - 54px);
}
</style>

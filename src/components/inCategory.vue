<template>
  <div class="inCategory-container">
    <!-- <van-field readonly clickable /> -->
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
        v-for="(item, index) in inCategory"
        :key="index"
        :icon="item.icon"
        :text="item.name"
      />
      <van-grid-item icon="setting-o" text="设置" />
    </van-grid>
    <van-number-keyboard
      v-model="value"
      :show="inshow"
      extra-key="."
      :maxlength="6"
      @blur="show = false"
    />
  </div>
</template>

<script>
export default {
  name: "inCategoryContainer",
  components: {},
  props: {},
  data() {
    return {
      inshow: true,
      value: "",
      inCategory: [
        {
          icon: "photo-o",
          name: "其他",
        },
        {
          icon: "photo-o",
          name: "餐饮",
        },
        {
          icon: "photo-o",
          name: "交通",
        },
        {
          icon: "photo-o",
          name: "购物",
        },
        {
          icon: "photo-o",
          name: "服饰",
        },
        {
          icon: "photo-o",
          name: "日用品",
        },
        {
          icon: "photo-o",
          name: "娱乐",
        },
        {
          icon: "photo-o",
          name: "烟酒茶",
        },
        {
          icon: "photo-o",
          name: "学习",
        },
        {
          icon: "photo-o",
          name: "医疗",
        },
        {
          icon: "photo-o",
          name: "住房",
        },
        {
          icon: "photo-o",
          name: "水电煤",
        },
        {
          icon: "photo-o",
          name: "通讯",
        },
        {
          icon: "photo-o",
          name: "人情往来",
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
// .inCategory-container {
//   // height: calc(100% - 54px);
// }
</style>

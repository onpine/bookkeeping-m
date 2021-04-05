<template>
  <div class="note-container">
    <van-tabs v-model="active" swipeable>
      <van-button to="/" icon="arrow-left" class="nav-btn"></van-button>
      <van-tab title="收入">
        <in-category />
      </van-tab>
      <van-tab title="支出">
        <pay-category />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import PayCategory from "@/components/payCategory.vue";
import InCategory from "@/components/inCategory.vue";

export default {
  name: "noteContainer",
  components: { PayCategory, InCategory },
  props: {},
  data() {
    return {
      active: 0,
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
.note-container {
  background-color: #eee;
  height: 100vh;
}
.nav-btn {
  position: fixed;
  top: 0;
  font-size: 18px;
}
/deep/.nav-btn {
  background-color: #fff;
  border: 0;
  font-weight: bold;
}
/deep/.van-tabs__wrap {
  margin-bottom: 10px;
  background-color: #fff;
}
/deep/.van-tabs__nav {
  width: 100px;
  margin: auto;
}
/deep/.van-tab__text {
  font-weight: bold;
}
/deep/.van-tab__pane {
  background-color: #fff;
}
</style>

axios.get('').then()
this.$http.get('http://www.ceiwei.top/personal/music.php?what=defaultList&musicID=3778678').then((res) => {
  // 将数据保存到 Vuex 的 state 中去
  if (res.data.length > 0) {
//          state.arr = res.data
    console.log(res.data);
  }
});

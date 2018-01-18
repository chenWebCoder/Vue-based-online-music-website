<template>
  <div class="musicfind">
    <transition name="silde-top">
      <div class="search_content" v-show="showSearch">
        <input class="search_input" @click.stop ref="searchVal" type="text" @keyup.enter="searchMusic" @keyup.esc="back">
        <div class="search-btn" @click.stop="searchMusic">搜索</div>
      </div>
    </transition>
    <transition name="silde-bottom">
      <div class="search_select" v-show="showSearch" ref="searchSelect">
        <div>
          <div class="select_type">
            <p class="select_title">热门歌手</p>
            <span class="select_span" @click.stop="clickSearchMusic($event)">周杰伦</span>
            <span class="select_span" @click.stop="clickSearchMusic($event)">林俊杰</span>
            <span class="select_span" @click.stop="clickSearchMusic($event)">李荣浩</span>
            <span class="select_span" @click.stop="clickSearchMusic($event)">薛之谦</span>
            <span class="select_span" @click.stop="clickSearchMusic($event)">陈奕迅</span>
            <span class="select_span" @click.stop="clickSearchMusic($event)">Taylor Swift</span>
            <span class="select_span" @click.stop="clickSearchMusic($event)">许嵩</span>
            <span class="select_span" @click.stop="clickSearchMusic($event)">Owl City</span>
            <span class="select_span" @click.stop="clickSearchMusic($event)">王若琳</span>
          </div>
          <div class="select_type">
            <p class="select_title">热门歌曲</p>
            <span class="select_span" @click.stop="clickSearchMusic($event)">那些你很冒险的梦</span>
            <span class="select_span" @click.stop="clickSearchMusic($event)">说散就散</span>
            <span class="select_span" @click.stop="clickSearchMusic($event)">Sugar</span>
            <span class="select_span" @click.stop="clickSearchMusic($event)">追光者</span>
            <span class="select_span" @click.stop="clickSearchMusic($event)">Faded</span>
            <span class="select_span" @click.stop="clickSearchMusic($event)">我们不一样</span>
            <span class="select_span" @click.stop="clickSearchMusic($event)">远走高飞</span>
            <span class="select_span" @click.stop="clickSearchMusic($event)">Dream It Possible</span>
            <span class="select_span" @click.stop="clickSearchMusic($event)">See You agina</span>
            <span class="select_span" @click.stop="clickSearchMusic($event)">夜空中最亮的星</span>
            <span class="select_span" @click.stop="clickSearchMusic($event)">凉凉</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import state from '../../store/state';
  import ceiwei from '../../common/js/functions';
//  import BScroll from 'better-scroll';
  export default{
    data () {
      return {
        showSearch: false
      };
    },
    methods: {
      searchMusic () {
        // 初始化
        state.keyWord = '';
        state.getPages = 1;
        state.clearMusicList = true;
        // 获取用户输入的值
        const val = this.$refs.searchVal.value;
        if (val !== '') {
          state.keyWord = val;
          ceiwei.searchMusic(val, state.getPages);
          state.firstLoad = false;
          this.$router.push({name: 'Mymusic'});
        }
      },
      clickSearchMusic (e) {
        // 初始化
        state.keyWord = '';
        state.hasMore = true;
        state.getPages = 1;
        state.clearMusicList = true;
        state.keyWord = e.target.innerHTML;
        ceiwei.searchMusic(state.keyWord, state.getPages);
        state.firstLoad = false;
        this.$router.push({name: 'Mymusic'});
      }
    },
    mounted () {
      this.showSearch = true;
      this.$nextTick(() => {
        this.$refs.searchVal.focus();
      });
    }
    // 手机端进行滚动，适配
//    created () {
//      this.$nextTick(() => {
//        let box = this.$refs.searchSelect;
//        this.$refs.searchVal.focus();
//        this.musicListWrapper = new BScroll(box, {
//          scrollY: true,            // 允许进行竖直方向的滚动
//          scrollX: false,          // 不允许进行垂直方向的滚动
//          click: true,              //  可以触发点击事件
//          // wheel: true,          //  是否监听鼠标滚轮事件
//          scrollbar: {fade: true}   // 设置滚动条不滑动时进行影藏
//        });
//      });
//    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
.musicfind
  width: 100%
  height: 100%
  padding-top: 30px
  box-sizing : border-box
  font-family: 'comic sana ms', sans-serif, "Microsoft YaHei"
  .search_content
    width:500px
    min-width: 300px
    max-width:100%
    margin: 0 auto
    position:relative
    line-height: 40px
    box-sizing : border-box
    &.silde-top-enter-to,&.silde-top-leave-to
      transition: all 0.6s
    &.silde-top-enter,&.silde-top-leave-to
      opacity:0
      transform:translate3d(0,-50px,0)
    .search_input
      display:block
      width:100%
      height:40px
      text-indent:4px
      font-size:14px
      margin:0
      padding: 0 10px
      box-sizing: border-box
      background: transparent
      color: #FFF
      border: 1px solid hsla(0,0%,60%,.8)
      outline:none
      border-radius : 5px
    .search-btn
      position:absolute
      right:0
      top:0
      width:60px
      height:100%
      border-left: 1px solid hsla(0,0%,60%,.8)
      text-align:center
      cursor:pointer
  .search_select
    width:500px
    max-width:100%
    margin:0 auto
    position:relative
    margin-top:45px
    font-size:0
    height: calc(100% - 130px)
    overflow : auto
    &.silde-bottom-enter-to,&.silde-bottom-leave-to
      transition: all 0.6s
    &.silde-bottom-enter,&.silde-bottom-leave-to
      opacity:0
      transform:translate3d(0,50px,0)
    .select_type
      width:100%
      height:auto
      margin-bottom:20px
      .select_title
        width:100%
        height:50px
        line-height:50px
        margin:0
        font-size:18px
        color: rgba(230,230,230,0.8)
        text-indent:5px
        border-bottom:1px solid rgba(230,230,230,0.2)
        margin-bottom:10px
      .select_span
        display:inline-block
        width:auto
        padding: 2px 10px
        height: 25px
        line-height: 25px
        border-radius: 5px
        cursor: pointer
        margin: 15px 8px
        font-size: 14px
        color: rgba(230,230,230,0.8)
        border:1px solid rgba(230,230,230,0.8)
        &:hover
          color: #FFF
          border:1px solid #FFF
</style>

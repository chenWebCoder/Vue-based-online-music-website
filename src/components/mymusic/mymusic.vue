<template>
  <transition name="silde-top">
    <div v-show="showOrHide" class="mymusic">
      <div class="music-left">
        <div class="music-header">
          <ul>
            <li class="list-item" v-for="(item, index) in state.musicHeader" :class="item.name">{{item.content}}</li>
          </ul>
        </div>
        <div class="music-content">
          <div class="loading" v-show="false"></div>
          <div class="content-wrapper" ref="musicList">
            <ul>
              <li class="item" v-for="(item, index) in state.musicDefaultList" @click="clickItem({index: index})">
              <span class="music-index">
                <span>{{index+1}}</span>
                <span style="display:none;"><img :src=state.playImg alt=""></span>
              </span>
                <span class="music-name">{{item.name}}</span>
                <span class="music-songer">{{item.artist[0]}}</span>
                <span class="music-zhuanji">{{item.album}}</span>
              </li>
            </ul>
            <ul>
              <li class="item more" v-if="!state.firstLoad && state.hasMore" @click="getMore">获取更多</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </transition>

</template>

<script type="text/ecmascript-6">
  import {mapActions} from 'vuex';
  // 引入数据
  import state from '../../store/state.js';
  import ceiwei from '../../common/js/functions';

  export default {
    data () {
      return {
        state,
        showOrHide: false
      };
    },
    methods: mapActions([
      'clickItem', 'getMore'
    ]),
    mounted () {
      state.musicList = this.$refs.musicList;
      this.showOrHide = true;
    },
    created () {
      if (state.firstLoad) {
        // 获取音乐播放列表
        ceiwei.getDefaultMusic(state.musicTypes[state.currentMusicType].id);
      }
    }
  };

//
//      this.$nextTick(function () {
//        this.musicListWrapper = new BScroll(this.$refs.musicList, {
//          scrollY: true,     // 允许进行竖直方向的滚动
//          scrollX: false,    // 不允许进行垂直方向的滚动
//          click: true,       //  可以触发点击事件
//          scrollbar: {fade: true}   // 设置滚动条不滑动时进行影藏
//        });
//      });
//    }
</script>

<style lang="stylus">
  @import '../../common/stylus/index.styl';
.mymusic
  width: 100%
  height: 100%
  font-size: 0
  font-family: 'comic sans ms', sans-serif
  &.silde-top-enter-to,&.silde-top-leave-to
    transition: all 0.6s
  &.silde-top-enter,&.silde-top-leave-to
    opacity:0
    transform:translate3d(0,-50px,0)
  .music-left
    height: 100%
    width: 100%
    .mymusic-header
      height: 40px
      width: 100%
    .list-item
      display: inline-block
      line-height: 40px
      font-size: 14px
      text-align : center
    .music-index
      width: 50px
      height: 40px
      vertical-align: top
      text-align: center
    .music-content
      position : relative
      width: 100%
      height: calc(100% - 40px)
      .loading
        position :absolute
        let: 0px
        right: 0
        width: 100%
        height: 100%
        background-color : rgba(0,0,0,0.5)
      .content-wrapper
        width: 100%
        height: 100%
        font-size: 0
        .item
          width: 100%
          height: 50px
          line-height : 50px
          border-1px('bottom', hsla(0,0%,10%,0.1))
          &:hover
            background-color : rgba(100,100,100,0.2)
          span
            display: inline-block
            font-size: 14px
            text-align : center
            overflow : hidden
            text-overflow : ellipsis
            white-space : nowrap
          .music-index
            display: inline-block
            width: 50px
            height: 50px
        .more
          font-size: 14px
          text-align : center
          cursor: pointer
</style>

<template>
  <div id="app">
    <img class="bg-image" :src="state.currentMusic.musicPic" />
    <div class="bg"></div>
    <div class="header">
      <ul>
        <li class="header-item" v-for="(headerdesc, index) in headerList">
          <router-link :to=routerPath[index]>{{headerdesc}}</router-link>
        </li>
      </ul>
    </div>
    <div class="content">
      <!-- 播放器 -->
      <audio class="medio" src="" autoplay controls ref="myMdeio"></audio>
      <!-- 左侧显示区 -->
      <div class="vue-router">
        <div class="change">
          <router-view></router-view>
        </div>
        <div class="music-bottom">
          <div class="control-process">
            <div class="music-desc">
              <div class="name overflow-other">{{state.currentMusic.playName}} / {{state.currentMusic.playSonger}}</div>
              <div class="time" ref="time">{{state.currentMusic.currentTime}}  / {{state.currentMusic.totleTime}}</div>
            </div>
            <div class="process" ref="process">
              <div class="has-play" ref="hasPlay"></div>
              <div class="buffer-play" ref="bufferPlay"></div>
              <div class="move-dot" ref="moveDot"></div>
            </div>
          </div>
          <div class="control-btn">
            <span class="btn icon icon-pervious" @click="playPrevious"></span>
            <span class="btn" :class="{'icon-play': !state.play, 'icon-suspend': state.play}" @click="playOrStop"></span>
            <span class="btn icon-next" @click="playNext"></span>
          </div>
        </div>
      </div>
      <!-- 歌词显示区 -->
      <div class="lrc">
        <div class="music-right">
          <div class="music-pic">
            <img :src="state.currentMusic.musicPic" ref="audioPic" width="176" height="176" alt="">
          </div>
          <div class="music-lircy" ref="lrc">
            <div v-if="state.nolrc" class="noLrc">抱歉，暂无歌词！</div>
            <ul ref="lrcUL"></ul>
          </div>
          <div class="music-play-type">
            <div class="type" @click="playTypesChange">{{state.musicPlayTypes[state.currentPlayType]}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import state from './store/state.js';

export default {
  name: 'app',
  data () {
    return {
      state,
      routerPath: [],
      headerList: []
    };
  },
  methods: mapActions([
    'playTypesChange', 'playPrevious', 'playOrStop', 'playNext'
  ]),
  mounted () {
    // 获取歌词显示区
    state.audioLyric = this.$refs.lrc;
    state.lrcItem = this.$refs.lrcUL;

    // 获取专辑图片显示区域
    state.audioPic = this.$refs.audioPic;

    // 获取 audio 元素，并进行赋值
    state.audioMedio = this.$refs.myMdeio;

    // 获取进度条相关元素
    state.process = this.$refs.process;
    state.hasPlay = this.$refs.hasPlay;
    state.bufferPlay = this.$refs.bufferPlay;
    state.moveDot = this.$refs.moveDot;
    state.musicTime = this.$refs.time;
  },
  created () {
    this.headerList = ['我的', '音乐馆', '发现'];
    this.routerPath = ['/mymusic', '/musichall', '/musicfind'];
//    console.info('欢迎使用 MKOnlinePlayer!\n当前版本： \n作者：mengkun(http://mkblog.cn)\n歌曲来源于各大音乐平台\nGithub：https://github.com/mengkunsoft/MKOnlineMusicPlayer');
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import './common/stylus/index.styl';

#app
  position: fixed
  left: 0
  top: 0
  width: 100%
  height: 100%
  background : -webkit-radial-gradient(50% 50%, ellipse closest-corner, rgba(0, 0, 0, 0) 1%, rgb(0, 0, 0) 80%)
  color: hsla(0,0%,100%,0.9)
  font-size: 0
  .bg-image
    position: absolute
    width: 100%
    height: 100%
    background-repeat : no-repeat
    background-size : cover
    filter: blur(10px)
    background-position : center center
    z-index: -1
  .bg
    position : absolute
    width: 100%
    height: 100%
    background-color: rgba(0,0,0,0.5)
    z-index: -1
  .header
    height: 40px
    width: 100%
    min-width: 400px
    text-align: center
    background-color: rgba(0,0,0,0.3)
    .header-item
      display: inline-block
      width: 100px
      height: 100%
      line-height: 40px
      margin-right: 10px
      font-size: 14px
      &:last-child
        margin-right: 0
      a
        display: inline-block
        width: 100%
        height: 100%
        color: hsla(0,0%,90%,0.8)
        text-decoration: none
  .content
    width: 100%
    height: calc(100% - 40px)
    padding: 10px
    box-sizing: border-box
    font-size: 14px
    .vue-router
      float: left
      min-width: 200px
      height: 100%
      .chang
        width: 100%
        background-color : chartreuse
      .music-bottom
        width: 100%
        min-width: 200px
        background-color: rgba(0,0,0,.2)
        border-radius: 15px
        font-size: 0
        .control-btn
          float: left
          display: inline-block
          text-align : center
          .btn
            display: inline-block
            width: 33%
            height: 100%
            padding-top: 14px
            box-sizing : border-box
            vertical-align : bottom
            font-size: 30px
            cursor : pointer

        .control-process
          float: right
          display: inline-block
          box-sizing : border-box
          position : relative
          .name
            float: left
            height: 20px
            line-height : 20px
            width: 50%
            font-size: 14px
          .time
            float: left
            height: 20px
            width: 50%
            text-align : right
            line-height : 20px
            font-size: 14px
          .process
            position : relative
            width: 100%
            height: 4px
            border-radius : 2px
            cursor: pointer
            background-color : rgba(100,100,100,0.6)
            .has-play
              position : absolute
              width: 0
              height: 100%
              border-radius : 10px
              background-color: rgba(0, 180, 0, 0.8)
              z-index: 10
            .buffer-play
              position : absolute
              width: 0
              height: 100%
              border-radius : 2px
              background-color rgba(255,255,255,0.3)
              z-index: 5
            .move-dot
              width: 10px
              height: 10px
              background-color : rgba(0, 180, 0, 0.8)
              position : absolute
              top: 50%
              left: 0
              margin-top: -5px
              margin-left: -5px
              border-radius : 999px
              z-index: 100
              box-shadow : 0 0 10px rgba(255, 255, 255, 0.9)
    .lrc
      float: left
      width: 300px
      height: 100%
      .music-right
        width: 300px
        height: 100%
        vertical-align : top
        .music-pic
          width: 176px
          height: 176px
          margin: 10px auto
          border-radius : 50%
          overflow: hidden
        .music-lircy
          width: 100%
          height: calc(100% - 258px)
          font-size: 12px
          overflow: hidden
          .noLrc
            text-align : center
            margin-top: 80px
          li
            line-height : 26px
            text-align : center
            &.on
              color: rgba(0,200,0,0.9)
          .nolrc
            line-height : 240px
            text-align : center
        .music-play-type
          position : relative
          width: 100%
          height: 60px
          .type
            position : absolute
            left: 50%
            top: 50%
            width: 100px
            height: 30px
            margin-left: -50px
            margin-top: -15px
            cursor: pointer
            line-height : 30px
            font-size: 14px
            text-align : center
            border: 1px solid rgba(200,200,200,0.6)
            border-radius : 5px
  .medio
    position : absolute
    display: none
</style>

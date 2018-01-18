<template>
  <div class="musicchall container">
    <div class="musicchall-wrapper">
      <transition name="silde-top">
        <p v-show="showorHide" class="toplist_title">网易音乐排行榜</p>
      </transition>
      <transition name="silde-bottom">
        <div v-show="showorHide" class="toplist_content">
          <div class="tolist-item" @click.stop="getMusic($event)">
            <img  data-id="3779629" class="sheet-cover" src="https://p3.music.126.net//N2HO5xfYEqyQ8q6oxCw8IQ==//18713687906568048.jpg?param=250y250" alt="云音乐新歌榜">
            <p class="desc">云音乐新歌榜</p>
          </div>

          <div class="tolist-item" @click.stop="getMusic($event)">
            <img data-id="19723756" class="sheet-cover" src="http://p1.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg?param=250y250" alt="云音乐飙升榜">
            <p class="desc">云音乐热歌榜</p>
          </div>

          <div class="tolist-item" @click.stop="getMusic($event)">
            <img data-id="3778678" class="sheet-cover" src="https:\/\/p3.music.126.net\/GhhuF6Ep5Tq9IEvLsyCN7w==\/18708190348409091.jpg?param=250y250" alt="云音乐热歌榜">
            <p class="desc">云音乐热歌榜</p>
          </div>

          <div class="tolist-item" @click.stop="getMusic($event)">
            <img data-id="10520166" class="sheet-cover" src="http://p1.music.126.net/4mh2HWH-bd5sRufQb-61bg==/3302932937414659.jpg?param=250y250" alt="云音乐电音榜">
            <p class="desc">云音乐电音榜</p>
          </div>

          <div class="tolist-item" @click.stop="getMusic($event)">
            <img data-id="180106" class="sheet-cover" src="https:\/\/p3.music.126.net\/VQOMRRix9_omZbg4t-pVpw==\/18930291695438269.jpg?param=250y250" alt="UK排行榜周榜">
            <p class="desc">UK排行榜周榜</p>
          </div>

          <div class="tolist-item" @click.stop="getMusic($event)">
            <img data-id="71385702" class="sheet-cover" src="http://p1.music.126.net/vttjtRjL75Q4DEnjRsO8-A==/18752170813539664.jpg?param=250y250" alt="云音乐ACG音乐榜">
            <p class="desc">云音乐ACG音乐榜</p>
          </div>

          <div class="tolist-item" @click.stop="getMusic($event)">
            <img data-id="60198" class="sheet-cover" src="http://p1.music.126.net/EBRqPmY8k8qyVHyF8AyjdQ==/18641120139148117.jpg?param=250y250" alt="美国Billboard周榜">
            <p class="desc">美国Billboard周榜</p>
          </div>

          <div class="tolist-item" @click.stop="getMusic($event)">
            <img data-id="60131" class="sheet-cover" src="http://p1.music.126.net/Rgqbqsf4b3gNOzZKxOMxuw==/19029247741938160.jpg?param=250y250" alt="日本Oricon周榜">
            <p class="desc">日本Oricon周榜</p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import ceiwei from '../../common/js/functions';
import state from '../../store/state';
export default{
  data () {
    return {
      showorHide: false
    };
  },
  methods: {
    getMusic (e) {
      const id = e.target.getAttribute('data-id');
      ceiwei.getDefaultMusic(id);
      // 跳转页面
      state.firstLoad = false;
      this.$router.push({name: 'Mymusic'});
    }
  },
  mounted () {
    this.showorHide = true;
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .musicchall
    width: 100%
    height: 100%
    .musicchall-wrapper
      width: 100%
      height: 100%
      .toplist_title
        padding: 30px 18px
        font-size: 18px
        color: rgba(230,230,230,0.8)
        &.silde-top-enter-to,&.silde-top-leave-to
          transition: all 0.6s
        &.silde-top-enter,&.silde-top-leave-to
          opacity:0
          transform:translate3d(0,-50px,0)
      .toplist_content
        width: 100%
        min-width: 300px
        height: calc(100% - 38px)
        font-size: 0
        text-align : center
        &.silde-bottom-enter-to,&.silde-bottom-leave-to
          transition: all 0.6s
        &.silde-bottom-enter,&.silde-bottom-leave-to
          opacity:0
          transform:translate3d(0,50px,0)
        .tolist-item
          position: relative
          display: block
          float: left
          text-align: center
          .sheet-cover
            display: block
            width: 100px
            height: 100px
            margin: 10px auto
            cursor: pointer
          .desc
            padding: 0 5px
            display: inline-block
            max-width: 120px
            white-space: nowrap
            text-overflow: ellipsis
            -o-text-overflow: ellipsis
            overflow: hidden
            margin-bottom: 10px
            color: #fff
            cursor: pointer
            font-size: 14px


  @media screen and (max-width: 1550px)
    .tolist-item
      width: 25%
  @media screen and (max-width: 768px)
    .tolist-item
      width: 33%

</style>

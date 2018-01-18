import state from '../../store/state.js';
import axios from 'axios';
import $ from 'jquery';

let ceiwei = {
  liItem: null,              // 用于保存歌词的 ul
  index: 0,                 // 当前音乐播放的时间
  playIndex: 0,          // 当前播放的第几句
  totleTime: 0,          // 保存当前播放的音乐的总时间
  flag: true,
  moreFlage: true,
  oldTime: 0,
  timer: null,
  lrcObj: null,             // 用于保存整理之后的歌词
  updataFlag: true,     // 用于歌曲资源加载完毕后的标志位
  span: null,    // 用于保存歌曲前的序号和播放标志的
  animateTime: 400,     // 进度条初始化是的动画时长
  // 歌曲的初始化
  playInit () {
    // 对显示时间，歌名，进度条进行初始化
    state.currentMusic.currentTime = '00:00';
    state.currentMusic.totleTime = '00:00';
    state.currentMusic.playName = 'CeirWei';
    state.currentMusic.playSonger = 'CeirWei';

    // 播放按钮初始化为暂停状态
    state.play = false;
    // 歌词默认为没有歌词
    state.nolrc = true;
    // 歌曲的歌曲源清空
    state.audioMedio.src = '';

    // 对进度条等进行初始化处理
    const POSITION_0 = '0px';
    $(state.hasPlay).animate({'width': POSITION_0}, this.animateTime);
    $(state.bufferPlay).animate({'width': POSITION_0}, this.animateTime);
    $(state.moveDot).animate({'left': POSITION_0}, this.animateTime);

    // 将歌曲的相关参数进行初始化
    this.index = 0;
    this.playIndex = 0;
    this.totleTime = 0;

    // 标志位复位
    this.flag = true;
    this.updataFlag = true;

    // 将原有的歌词进行清空
    $(state.audioLyric).html('');

    // 停止播放音乐
    if (!state.audioMedio.paused) {
      state.audioMedio.pause();
    }
  },
  // 时间格式化函数，参数： 要格式化的时间（时间为秒为单位）
  formatTime (time) {
    if (parseInt(time)) {
      let m = parseInt(time / 60);
      (m <= 9) && (m = '0' + m);
      let s = parseInt(time - (m * 60));
      (s <= 9) && (s = '0' + s);
      return m + ':' + s;
    }
  },
  // 歌此进行格式化处理， 参数： 歌词字符串
  formatLyric (lrc) {
    // 用于保存处理后的歌词，返回一个数组
    let lrcObj = [];
    // 得到切割后的歌词数组，每一个元素是一个包含时间个歌词的字符串
    let lyrics = lrc.split('\n');
    for (let i = 0; i < lyrics.length; i++) {
      // 歌词进行转码
      const lyric = decodeURIComponent(lyrics[i]);
      // 匹配时间，获取到时间
      const timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
      const timeRegExpArr = lyric.match(timeReg);
      // 如果没有匹配到时间，直接进入到下一次循环
      if (!timeRegExpArr) continue;
      // 从字符串中去除掉匹配到的时间部分
      const clause = lyric.replace(timeReg, '');
      // 处理匹配到的歌词时间数组
      for (let k = 0, h = timeRegExpArr.length; k < h; k++) {
        let t = timeRegExpArr[k];
        // 去除掉空句，去掉歌词的开始以及结尾信息
        if (clause[k]) {
          if ((clause.indexOf('：') === -1) && (clause.indexOf(':') === -1)) {
            let min = Number(String(t.match(/\[\d*/i)).slice(1));
            let sec = Number(String(t.match(/\:\d*/i)).slice(1));
            let time = min * 60 + sec;
            lrcObj[time + ' '] = clause;
          }
        }
      }
    }
    // 参数是处理后的歌词关联数组，每一个元素是一个对象，键为歌词显示时间，值为显示的歌词
    this.showLrc(lrcObj, state.audioLyric, state.lrcItem);
  },
  // 将歌词显示在指定区域  参数： 歌词数组      eg: 8: "抱一抱就当作从没有在一起"
  // 参数2： 用于放置歌词的区域      参数3： 用于放置歌词 li 外部的 ul元素
  showLrc (lrcObj, box, ul) {
    this.lrcObj = lrcObj;
    // 将显示歌词的外层 ul 中的内容致为空
    $(ul).html('');
    for (let k in lrcObj) {
      let new_elm = '<li>' + lrcObj[k] + '</li>';
      $(ul).append($(new_elm).attr('index', k));
    }
    this.liItem = ul;
    // 将第一句设置为高亮显示
    $(this.liItem).find('li:first-child').addClass('on');
    $(box).html($(ul));
  },
  // 当时间改变时，更改歌词的显示
  upDataLrc (currentTime) {
    if (currentTime === this.index) {
      // 获取到当前播放的秒数
      this.index++;
      let t = this.index - 1;     // 当前时间
      // 获取到下一次需要播放的时间
      let nextTime = parseInt($(this.liItem).find('li:nth-child(' + (this.playIndex + 1) + ')').attr('index'));
      (!nextTime) && (nextTime = 0);
      // 如果当前时间等于下一次要播放的时间，就滚动歌词
      if (t === nextTime) {
        this.playIndex++;       // 当前播放的是第几句
        $(this.liItem).find('li').removeClass('on');
        $(this.liItem).find('li:nth-child(' + this.playIndex + ')').addClass('on');
        // 判断歌词滚动时机，刚开始几句不用滚动
        if (this.playIndex >= 6) {
          let scroll = (this.playIndex - 6) * 26;
          $(state.audioLyric).stop().animate({scrollTop: scroll}, 1000);
        }
      }
    }
  },
  // 改变进度条的实时位置
  // 参数1： 以加载的长度的进度条
  // 参数2： 已播放的长度的进度条
  // 参数3： 播放时的大圆圈
  processMove (bufferPlay, hasPlay, moveDot) {
    // 获取当前播放的时间占总时间的比例
    let proportion = Math.floor(state.audioMedio.currentTime) / Math.floor(this.totleTime);
    // 获取到整个进度条的总宽度（不要写在外边，动态计算）
    let totleWidth = state.process.offsetWidth;
    // 时间开始了
    if (proportion) {
      // 获取到进度条需要移动的距离
      let left = totleWidth * proportion + 'px';
      $(hasPlay).css('width', left);
      $(moveDot).css('left', left);
      // 设置已经加载部分的进度条
      let buffer = state.audioMedio.buffered;
      if (buffer) {
        let timeBuffered = parseInt(buffer.end(buffer.length - 1));
        let bufferWidth = (timeBuffered / state.audioMedio.duration) * totleWidth + 'px';
        $(bufferPlay).css('width', bufferWidth);
      }
    }
  },
  // 点击进度条后
  clickProcess (that) {
    // 获取事件对象
    let e = window.event || event;

    // 将进度条移动到点击处
    let move = e.offsetX + 'px';
    $(state.hasPlay).css('width', move);
    $(state.moveDot).css('left', move);

    // 将播放歌曲当前时间设置为点击后计算出来的时间
    let currenT = Math.floor(e.offsetX / state.process.offsetWidth * that.totleTime);
    state.audioMedio.currentTime = currenT;
    that.index = currenT;

    // 计算出点击进度条后应该播放那一句
    let currentLrc = $(this.liItem).find('li');
    for (let i = 0; i < currentLrc.length; i++) {
      if ($(currentLrc[i]).attr('index') <= currenT) {
        that.playIndex = i + 1;
      }
    }
    // 当前句设置为高亮
    $(that.liItem).find('li').removeClass('on');
    $(that.liItem).find('li:nth-child(' + that.playIndex + ')').addClass('on');
    let scroll = (this.playIndex - 6) * 26;
    $(state.audioLyric).stop().animate({scrollTop: scroll}, 1000);
  },
  getMusic (musicIndex) {
    const that = this;
    // 请求新的音乐资源，一个 axios 同时发送多个请求
    axios.all([
      // 获取歌曲播放那个地址的请求
      axios.get('http://www.ceiwei.top/personal/music.php?what=getMusic&id=' + state.musicDefaultList[musicIndex].id),
      // 获取歌曲专辑封面图片的请求
      axios.get('http://www.ceiwei.top/personal/music.php?what=getPic&getPic=' + state.musicDefaultList[musicIndex].pic_id),
      // 获取歌曲歌词的请求
      axios.get('http://www.ceiwei.top/personal/music.php?what=getLyric&lyricId=' + state.musicDefaultList[musicIndex].lyric_id)
    ]).then(axios.spread(function (musicinfoResp, picResp, lyricResp) {
      // 当所有的请求都完成后，会收到一个数组，包含着响应对象，其中的顺序和请求发送的顺序相同，可以使用 axios.spread 分割成多个单独的响应对象
      // 保存歌曲的播放地址
      if (musicinfoResp.data.data) {
        if (musicinfoResp.data.data[0].url) {
          state.currentMusic.playURL = musicinfoResp.data.data[0].url;
        }
      }

      // 保存歌曲的专辑图片
      if (picResp.data.url) {
        state.currentMusic.musicPic = picResp.data.url;
      }

      // 保存歌曲的歌词
      if (lyricResp.data.lrc) {
        state.nolrc = false;
        state.currentMusic.playLyric = lyricResp.data.lrc.lyric;
      } else {
        state.nolrc = true;
        state.currentMusic.playLyric = undefined;
      }
      // 播放前进行歌曲初始化
      that.playInit();

      // 播放音乐
      state.audioMedio.src = state.currentMusic.playURL;

      // 如果播放失败，自动播放下一曲
      let num = 0;
      (that.timer) && (clearInterval(that.timer));
      that.timer = setInterval(function () {
        if (state.audioMedio.readyState === 0) {
          num++;
          if (num >= 10) {
            console.log('播放失败');
            clearInterval(that.timer);
            that.playNext();
          }
        } else if (state.audioMedio.readyState === 4) {
          // 歌曲记载成功
          clearInterval(that.timer);
        }
      }, 500);

      // 歌曲加载完毕之后
      state.audioMedio.addEventListener('loadedmetadata', function () {
        if (that.updataFlag) {
          // 设置时间
          state.currentMusic.totleTime = that.formatTime(state.audioMedio.duration);
          that.totleTime = state.audioMedio.duration;
          state.currentMusic.playName = state.musicDefaultList[state.currentMusic.playIndex].name;
          state.currentMusic.playSonger = state.musicDefaultList[state.currentMusic.playIndex].artist[0];

          // 对歌词进行格式化处理
          if (state.currentMusic.playLyric) {
            that.formatLyric(state.currentMusic.playLyric);
          }
          that.updataFlag = false;

          //  给进度条添加点击事件
          state.process.addEventListener('click', function () {
            that.clickProcess(that);
          }, false);

          //  播放歌曲
          state.audioMedio.play();
          state.play = true;
        }
      }, false);

      // 时间改变就调用一次
      state.audioMedio.addEventListener('timeupdate', function () {
        // 获取当前播放时间
        state.currentMusic.currentTime = that.formatTime(state.audioMedio.currentTime);
        // 进度条实时改变
        that.processMove(state.bufferPlay, state.hasPlay, state.moveDot);
        // 实时更新歌词
        that.upDataLrc(parseInt(state.audioMedio.currentTime));
      }, false);
      // 歌词加载完毕之后
      state.audioMedio.addEventListener('ended', function () {
        if (that.flag) {
          // 默认播放完毕自动播放下一曲, 要根据不同的播放模式进行不同的播放
          that.playNext();
          that.flag = false;
        }
      }, false);    // 歌曲播放完毕
    }));
  },
  // 显示或隐藏播放标志的 gif 图片
  showOrHiddenWave () {
    if (state.currentMusic.prePlayIndex >= 0) {
      let span = $(state.musicList).find('li:nth-child(' + (state.currentMusic.prePlayIndex + 1) + ') .music-index span');
      span[0].style.display = 'block';
      span[1].style.display = 'none';
    }
    this.span = $(state.musicList).find('li:nth-child(' + (state.currentMusic.playIndex + 1) + ') .music-index span');
    this.span[0].style.display = 'none';
    this.span[1].style.display = 'block';
  },
  // 播放上一首歌曲
  playPrevious () {
    if (state.currentMusic.playIndex === -1) return;
    if (state.currentMusic.playIndex === 0) return;
    this.playInit();
    state.currentMusic.prePlayIndex = state.currentMusic.playIndex;
    if (state.currentPlayType === 0) {
      // 当前是顺序播放
      this.playMusic(--state.currentMusic.playIndex);
    } else if (state.currentPlayType === 1) {
      //  当前是单曲播放
      this.playMusic(state.currentMusic.playIndex);
    } else if (state.currentPlayType === 2) {
      //  随机播放
      // 获取到当前歌单中后有的歌曲
      let totleMusic = state.musicDefaultList.length;
      state.currentMusic.playIndex = parseInt(Math.random() * (totleMusic + 1));
      this.playMusic(state.currentMusic.playIndex);
    }
  },
  // 播放下一曲
  playNext () {
    if (state.currentMusic.playIndex === -1) return;
    if (state.currentMusic.playIndex === (state.musicDefaultList.length - 1)) return;
    this.playInit();
    state.currentMusic.prePlayIndex = state.currentMusic.playIndex;
    if (state.currentPlayType === 0) {
      // 当前是顺序播放
      this.playMusic(++state.currentMusic.playIndex);
    } else if (state.currentPlayType === 1) {
      //  当前是单曲播放
      this.playMusic(state.currentMusic.playIndex);
    } else if (state.currentPlayType === 2) {
      //  随机播放
      // 获取到当前歌单中后有的歌曲
      let totleMusic = state.musicDefaultList.length;
      state.currentMusic.playIndex = parseInt(Math.random() * (totleMusic + 1));
      this.playMusic(state.currentMusic.playIndex);
    }
  },
  // 点击了播放或暂停按钮
  playOrStop () {
    // 还没有选择歌曲时点击了该按钮
    if (state.currentMusic.playIndex === -1) return;
    if (state.audioMedio.paused) {
      // 当前处于暂停状态
      state.play = true;
      state.audioMedio.play();
    } else {
      // 当前处于播放状态
      state.play = false;
      state.audioMedio.pause();
    }
  },
  // 歌曲播放类型改变了
  playTypesChange () {
    state.currentPlayType++;
    (state.currentPlayType >= 3) && (state.currentPlayType = 0);
  },
  // 搜索音乐
  searchMusic (keyword, pages) {
    axios.get('http://www.ceiwei.top/personal/music.php?what=sraech&k=' + keyword + '&pages=' + pages).then((res) => {
      if (res.data.result.songs.length < 50) {
        state.hasMore = false;
      }
      if (res.data.result.songs.length > 0) {
        // 获取到了数据
        //  不能每次都要清空
        if (state.clearMusicList) {
          state.musicDefaultList = [];
          state.clearMusicList = false;
        }
        for (let i = 0, len = res.data.result.songs.length; i < len; i++) {
          let obj = {};
          obj.album = res.data.result.songs[i].al.name;         // 设置专辑名称
          obj.artist = [res.data.result.songs[i].ar[0].name];    // 设置歌手
          obj.id = res.data.result.songs[i].id;                           // 设置id
          obj.lyric_id = res.data.result.songs[i].id;
          obj.name = res.data.result.songs[i].name;
          obj.pic_id = res.data.result.songs[i].al.pic_str || res.data.result.songs[i].al.pic;
          obj.source = 'netease';
          obj.url_id = res.data.result.songs[i].id;
          state.musicDefaultList.push(obj);
        }
      }
    });
  },
  // 获取更多音乐
  getMore () {
    state.getPages++;
    // console.log(state.getPages);
    // console.log(state.keyWord);
    this.searchMusic(state.keyWord, state.getPages);
  },
  getDefaultMusic (id) {
    state.hasMore = false;
    state.musicDefaultList = '';
    axios.get('http://www.ceiwei.top/personal/music.php?what=defaultList&musicID=' + id).then((res) => {
      if (res.data.length > 0) {
        state.musicDefaultList = res.data;
      }
    });
  },
  // 播放音乐
  playMusic (musicIndex) {
    this.getMusic(musicIndex);
    this.showOrHiddenWave();
  }
};

export default ceiwei;

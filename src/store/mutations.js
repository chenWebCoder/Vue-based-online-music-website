import ceiwei from '../common/js/functions.js';

export default {
  // 点击某一首歌曲
  'clickItem': (state, argc) => {
    // 当前点击的序号设置为当前播放的歌曲序号
    state.currentMusic.prePlayIndex = state.currentMusic.playIndex;
    state.currentMusic.playIndex = argc.index;
    state.play = true;
    // 请求数据
    ceiwei.playMusic(argc.index);
  },
  // 点击了上一曲按钮
  'playPrevious': () => {
    ceiwei.playPrevious();
  },
  // 点击了暂停或播放按钮
  'playOrStop': () => {
    ceiwei.playOrStop();
  },
  // 点击了下一曲按钮
  'playNext': () => {
    ceiwei.playNext();
  },
  'playTypesChange': () => {
    ceiwei.playTypesChange();
  },
  'getMore': () => {
    ceiwei.getMore();
  }
};

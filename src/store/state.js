export default {
  musicTypes: [       // 获取音乐不同类型的数据
    {id: 3778678},    // 云音乐热歌榜
    {id: 3779629},    // 云音乐新歌榜
    {id: 4395559},    // 华语金曲榜
    {id: 64016},        // 中国TOP排行榜（内地榜）
    {id: 112504},      // 中国TOP排行榜（港台榜）
    {id: 19723756},  // 云音乐飙升榜
    {id: 2884035}    // "网易原创歌曲榜"
  ],
  currentMusicType: 0,    // 表示当前选择的上述音乐类型
  musicHeader: [   // 显示区头部部分
    {name: 'music-index', content: ''},
    {name: 'music-name', content: '歌曲'},
    {name: 'music-songer', content: '歌手'},
    {name: 'music-zhuanji', content: '专辑'}],
  musicDefaultList: [],         // 用来保存获取到的歌曲列表的信息
  currentMusic: {                // 用来保存当前播放的歌曲信息
    prePlayIndex: -1,            // 用来保存上次播放的歌曲序号
    playIndex: -1,                 // 当前播放的歌曲序号
    playURL: '',                     // 当前播放歌曲的URL地址
    musicPic: 'http://www.ceiwei.top/images/bgimg.jpg',    // 歌曲的专辑图片
    playLyric: '',                    // 当前歌曲的歌词*************
    playName: 'CeirWei',       // 当前播放歌曲的歌名
    playSonger: 'CeiWei',      // 当前播放歌曲的歌手
    currentTime: '00:00',       // 当前播放歌曲的播放时间
    totleTime: '00:00'           // 当前播放歌曲的总时间
  },
  audioMedio: null,             // 用来保存播放器中的 audio 元素
  audioPic: null,                   // 用来保存播放的专辑封面图片的元素
  audioLyric: null,                // 用来保存歌词显示区的元素
  nolrc: true,                       // 表示当前是否有歌词
  lrcItem: null,                     // 保存歌词的 ul 元素
  musicList: null,                  // 保存歌曲列表的元素
  musicTime: null,                // 显示歌曲时间的元素
  process: null,                     // 整个进度条
  hasPlay: null,                     // 已经播放的进度条元素
  bufferPlay: null,                 // 已经缓存的进度条元素
  moveDot: null,                  // 小圆点元素
  playImg: '../static/wave.gif',    // 播放的小标志
  showWave: false,               // 是否显示播放歌曲的小标志
  play: false,                         // 表示当前是否播放
  firstLoad: true,                   // 表示是否是第一次加载
  hasMore: true,                   // 表示是否还有更多歌曲
  getPages: 1,                      //  表示当前获取的是第几页的数据
  keyWord: '',                       // 搜索的关键字
  clearMusicList: true,           // 是否清空歌曲列表的标志位
  musicPlayTypes: ['顺序播放', '单曲播放', '随机播放'],   // 用来保存当前的播放模式
  currentPlayType: 0
};

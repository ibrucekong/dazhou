// 默认是本地
let pre = location.origin
let jsUrlArr = [pre + '/js/vue/index.min.js',pre + '/js/element-ui/index.min.js',pre + '/js/pinyin/index.min.js']
let styleUrl = pre + '/js/element-ui/theme-chalk/index.min.css'
//判断调用哪个js
if (location.host === 'notion.brucekong.com') {
  // 使用在线的
  jsUrlArr = ['https://cdn.jsdelivr.net/npm/vue@2.7.14', 'https://unpkg.com/element-ui/lib/index.js', 'https://unpkg.com/pinyin-pro']
  styleUrl = 'https://unpkg.com/element-ui/lib/theme-chalk/index.css'
}

loadScript(jsUrlArr,function(){
  initial()
})
loadStyle(styleUrl)
function initial() {
  let pinyin = pinyinPro.pinyin
  // JS 压缩：http://www.jshaman.com/#free
  new Vue({
    el: '#app',
    data: function() {
      return {
        search: '',
        // 组件清单
        defaultComponents: [{
          id: 0,
          name: '达州创新大赛地址',
          url: '/dazhou/address/'
        }, {
          id: 1,
          name: '达州创新大赛酒店',
          url: '/dazhou/hotel/'
        }],
        components: []
      }
    },
    created() {
      this.defaultComponents.forEach(com => {
        com.pinyin = (pinyin(com.name, { toneType: 'none' }))
        com.pinyinTrim = (pinyin(com.name, { toneType: 'none' })).replace(/\s*/g,"")
      })
    },
    mounted() {
      // 执行初始化
      this.handlerSearch()
      // 渲染时间
      this.renderTime()
    },
    methods: {
      // 执行查询
      handlerSearch() {
        // 如果 this.search 为空
        if (this.search === '') {
          this.components = JSON.parse(JSON.stringify(this.defaultComponents))
        } else {
          if (this.search.trim() === '') return
          // 去除 this.search 前面的空格
          // ( 1 ) replace正则匹配方法
          // 　　去除字符串内所有的空格：str = str.replace(/\s*/g,"");
          // 　　去除字符串内两头的空格：str = str.replace(/^\s*|\s*$/g,"");
          // 　　去除字符串内左侧的空格：str = str.replace(/^\s*/,"");
          // 　　去除字符串内右侧的空格：str = str.replace(/(\s*$)/g,"");
          this.search = this.search.replace(/^\s*/,"")
          this.components = []
          JSON.parse(JSON.stringify(this.defaultComponents)).forEach(com => {
            if (com.name.includes(this.search) || com.pinyin.includes(this.search) || com.pinyinTrim.includes(this.search)) {
              this.components.push(com)
            }
          })
        }
      },
      setUrl(url) {
        location.href = url
      },
      renderTime() {
        let cr = new ClockRender('time', 100, 145)
        cr.render()
        let inter = setInterval(e => {
          cr.setColor(this.getRandomColor())
        }, 1000)
      },
      getRandomColor(){
        return  '#' + (function(color){
          return (color +=  '0123456789abcdef'[Math.floor(Math.random()*16)])
          && (color.length === 6) ?  color : arguments.callee(color)
        })('')
      },
      // 时间格式化，this.dateFormat(new Date(date), 'YYYY-MM-DD HH:mm:ss')
      dateFormat(time, fmt) {
        let that = null
        if (!time) {
          throw '时间格式化必须传时间对象或时间字符串'
        }
        if (time instanceof Date) {
          that = time
        }
        // time 既可以是时间戳，也可以是时间字符串
        that = new Date(time)
        let o = {
          'M+': that.getMonth() + 1,                      //月份
          'D+': that.getDate(),                           //日
          'd+': that.getDate(),                           //日
          'H+': that.getHours(),                          //小时
          'h+': that.getHours(),                          //小时
          'm+': that.getMinutes(),                        //分
          's+': that.getSeconds(),                        //秒
          'q+': Math.floor((that.getMonth() + 3) / 3), //季度
          'S': that.getMilliseconds()                     //毫秒
        }
        if (/(y+)/.test(fmt) || /(Y+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (that.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        for (let k in o) {
          if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
          }
        }
        return fmt
      }
    }
  })

}
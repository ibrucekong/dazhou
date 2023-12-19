/**
 * 时间动画
 * @param id DOM容器的ID
 * @param width 容器的宽度，默认280
 * @param height 容器的高度，默认145
 * @param color 时间颜色，默认蓝色
 * @constructor
 */
function ClockRender(id, width, height, color) {
  this.id = id
  this.color = color

  if (width < 260 || height < 130) {
    alert('时间宽度不能小于300px，高度不能小于130px')
    return
  }
  let winWidth = document.body.clientWidth
  let winHeight = window.innerHeight
  // 如果传的宽高大于窗口，则按照窗口的
  if (window.orientation === 180 || window.orientation === 0) {
    // 竖屏状态！
    // 一般为手机端查看，以宽为准(适当减少一点)，高度自适应
    if (width > winWidth) {
      width = winWidth - 20
    }
  }
  if (window.orientation === 90 || window.orientation === -90) {
    // 横屏状态！
    // 常规页面，以高为准(适当减少一点)，宽度自适应
    if (height > winHeight) {
      height = winHeight - 20
    }
  }
  // 如果width/height > 2 或 width/height < 1.9，则提醒并自动优化
  if (width / height > 2 || width / height < 1.9) {
    let radio = 1.93
    if (width / height > 2) {
      width = height * 1.93
    } else if (width / height < 1.9) {
      height = width / 1.93
    }
    // console.log(`宽高比不在1.9-2之间，会产生变形，已自动优化`)
  }
  this.width = width
  this.height = height

  this.digit = [[[0, 0, 1, 1, 1, 0, 0], [0, 1, 1, 0, 1, 1, 0], [1, 1, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1], [0, 1, 1, 0, 1, 1, 0], [0, 0, 1, 1, 1, 0, 0]], [[0, 0, 0, 1, 1, 0, 0], [0, 1, 1, 1, 1, 0, 0], [0, 0, 0, 1, 1, 0, 0], [0, 0, 0, 1, 1, 0, 0], [0, 0, 0, 1, 1, 0, 0], [0, 0, 0, 1, 1, 0, 0], [0, 0, 0, 1, 1, 0, 0], [0, 0, 0, 1, 1, 0, 0], [0, 0, 0, 1, 1, 0, 0], [1, 1, 1, 1, 1, 1, 1]], [[0, 1, 1, 1, 1, 1, 0], [1, 1, 0, 0, 0, 1, 1], [0, 0, 0, 0, 0, 1, 1], [0, 0, 0, 0, 1, 1, 0], [0, 0, 0, 1, 1, 0, 0], [0, 0, 1, 1, 0, 0, 0], [0, 1, 1, 0, 0, 0, 0], [1, 1, 0, 0, 0, 0, 0], [1, 1, 0, 0, 0, 1, 1], [1, 1, 1, 1, 1, 1, 1]], [[1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 0, 0, 1, 1], [0, 0, 0, 0, 1, 1, 0], [0, 0, 0, 1, 1, 0, 0], [0, 0, 1, 1, 1, 0, 0], [0, 0, 0, 0, 1, 1, 0], [0, 0, 0, 0, 0, 1, 1], [0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1], [0, 1, 1, 1, 1, 1, 0]], [[0, 0, 0, 0, 1, 1, 0], [0, 0, 0, 1, 1, 1, 0], [0, 0, 1, 1, 1, 1, 0], [0, 1, 1, 0, 1, 1, 0], [1, 1, 0, 0, 1, 1, 0], [1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 0, 1, 1, 0], [0, 0, 0, 0, 1, 1, 0], [0, 0, 0, 0, 1, 1, 0], [0, 0, 0, 1, 1, 1, 1]], [[1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 0, 0, 0, 0], [1, 1, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1, 0], [0, 0, 0, 0, 0, 1, 1], [0, 0, 0, 0, 0, 1, 1], [0, 0, 0, 0, 0, 1, 1], [0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1], [0, 1, 1, 1, 1, 1, 0]], [[0, 0, 0, 0, 1, 1, 0], [0, 0, 1, 1, 0, 0, 0], [0, 1, 1, 0, 0, 0, 0], [1, 1, 0, 0, 0, 0, 0], [1, 1, 0, 1, 1, 1, 0], [1, 1, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1], [0, 1, 1, 1, 1, 1, 0]], [[1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 0, 0, 1, 1], [0, 0, 0, 0, 1, 1, 0], [0, 0, 0, 0, 1, 1, 0], [0, 0, 0, 1, 1, 0, 0], [0, 0, 0, 1, 1, 0, 0], [0, 0, 1, 1, 0, 0, 0], [0, 0, 1, 1, 0, 0, 0], [0, 0, 1, 1, 0, 0, 0], [0, 0, 1, 1, 0, 0, 0]], [[0, 1, 1, 1, 1, 1, 0], [1, 1, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1], [0, 1, 1, 1, 1, 1, 0], [1, 1, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1], [0, 1, 1, 1, 1, 1, 0]], [[0, 1, 1, 1, 1, 1, 0], [1, 1, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1], [0, 1, 1, 1, 0, 1, 1], [0, 0, 0, 0, 0, 1, 1], [0, 0, 0, 0, 0, 1, 1], [0, 0, 0, 0, 1, 1, 0], [0, 0, 0, 1, 1, 0, 0], [0, 1, 1, 0, 0, 0, 0]], [[0, 0, 0, 0], [0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]]]
  this.curShowTimeSeconds = 0
  this.balls = []
  this.colors = ['#ffcc00', '#ff00cc', '#ccff00', '#cc00ff', '#00ffcc', '#00ccff', '#5a5ea8']
}
ClockRender.prototype.render = function () {
  let id = this.id
  let width = this.width || 280
  let height = this.height || 145
  let themeColor = this.color || '#409EFF'

  let ctn = document.querySelector(`#${id}`)
  if (!ctn) return
  ctn.style.width = `${width}px`
  ctn.style.height = `${height}px`

  let digit = this.digit
  let curShowTimeSeconds = this.curShowTimeSeconds
  let balls = this.balls
  let colors = this.colors
  let WINDOW_WIDTH = width, WINDOW_HEIGHT = height, MARGIN_LEFT, MARGIN_TOP, RADIUS

  if (document.readyState === 'complete') {
    _init()
  } else {
    document.onreadystatechange = () => {
      if (document.readyState === 'complete') {
        _init()
      }
    }
  }

  function _init() {
    MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10)
    MARGIN_TOP = Math.round(WINDOW_HEIGHT / 5)
    RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108) - 1

    if (document.querySelector(`#${id} canvas`)) {
      let c = document.querySelector(`#${id} canvas`)
      let ctx = c.getContext('2d')
      ctx.customColor = themeColor
      _timeRender(ctx)
      _timeUpdate()
    } else {
      _render()
    }
  }

  function _render() {
    let ctx = document.createElement('canvas')
    ctx.style.width = '100%'
    ctx.style.height = '100%'
    ctx.innerHTML = '当前浏览器不支持时钟模块,请更换浏览器再试'
    document.getElementById(id).appendChild(ctx)
    ctx.width = WINDOW_WIDTH
    ctx.height = WINDOW_HEIGHT
    ctx.customColor = themeColor

    let context = ctx.getContext('2d')
    curShowTimeSeconds = _timeGetCurrentShowTimeSeconds()
    setInterval(function () {
      _timeRender(context)
      _timeUpdate()
    }, 50)
  }

  function _timeUpdate() {
    let nextShowTimeSeconds = _timeGetCurrentShowTimeSeconds()
    let nextHour = parseInt(nextShowTimeSeconds / 3600)
    let nextMinute = parseInt((nextShowTimeSeconds - nextHour * 3600) / 60)
    let nextSecond = nextShowTimeSeconds % 60
    let curHour = parseInt(curShowTimeSeconds / 3600)
    let curMinute = parseInt((curShowTimeSeconds - curHour * 3600) / 60)
    let curSecond = curShowTimeSeconds % 60
    if (nextSecond !== curSecond) {
      if (parseInt(curHour / 10) !== parseInt(nextHour / 10)) {
        _timeAddBalls(MARGIN_LEFT, MARGIN_TOP, parseInt(curHour / 10))
      }
      if (parseInt(curHour % 10) !== parseInt(nextHour % 10)) {
        _timeAddBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(curHour % 10))
      }
      if (parseInt(curMinute / 10) !== parseInt(nextMinute / 10)) {
        _timeAddBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinute / 10))
      }
      if (parseInt(curMinute % 10) !== parseInt(nextMinute % 10)) {
        _timeAddBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinute % 10))
      }
      if (parseInt(curSecond / 10) !== parseInt(nextSecond / 10)) {
        _timeAddBalls(MARGIN_LEFT + 79 * (RADIUS + 1), MARGIN_TOP, parseInt(curSecond / 10))
      }
      if (parseInt(curSecond % 10) !== parseInt(nextSecond % 10)) {
        _timeAddBalls(MARGIN_LEFT + 94 * (RADIUS + 1), MARGIN_TOP, parseInt(nextSecond % 10))
      }
      curShowTimeSeconds = nextShowTimeSeconds
    }
    _timeUpdateBalls()
  }

  function _timeUpdateBalls() {
    for (let i = 0; i < balls.length; i++) {
      balls[i].x += balls[i].vx
      balls[i].y += balls[i].vy
      balls[i].vy += balls[i].g

      if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
        balls[i].y = WINDOW_HEIGHT - RADIUS
        balls[i].vy = -balls[i].vy * 0.75
      }
    }

    let count = 0
    for (let i = 0; i < balls.length; i++) {
      if (balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH) {
        balls[count++] = balls[i]
      }
    }
    while (balls.length > count) {
      balls.pop()
    }
  }

  function _timeAddBalls(x, y, num) {
    for (let i = 0; i < digit[num].length; i++) {
      for (let j = 0; j < digit[num][i].length; j++) {
        if (digit[num][i][j] === 1) {
          let aBall = {
            x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
            y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
            g: 1.5 + Math.random(),
            vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,//取4或者-4
            vy: -5,
            color: colors[Math.floor(Math.random() * colors.length)]
          }
          balls.push(aBall)
        }
      }
    }
  }

  function _timeGetCurrentShowTimeSeconds() {
    let curTime = new Date()
    let ret = curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds()
    return ret
  }

  function _timeRender(ctx) {
    ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT)
    let hour = parseInt(curShowTimeSeconds / 3600)
    let minute = parseInt((curShowTimeSeconds - hour * 3600) / 60)
    let second = curShowTimeSeconds % 60

    _timeRenderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hour / 10), ctx)
    _timeRenderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hour % 10), ctx)
    _timeRenderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, ctx)
    _timeRenderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minute / 10), ctx)
    _timeRenderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minute % 10), ctx)
    _timeRenderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, ctx)
    _timeRenderDigit(MARGIN_LEFT + 79 * (RADIUS + 1), MARGIN_TOP, parseInt(second / 10), ctx)
    _timeRenderDigit(MARGIN_LEFT + 94 * (RADIUS + 1), MARGIN_TOP, parseInt(second % 10), ctx)
    for (let i = 0; i < balls.length; i++) {
      ctx.fillStyle = balls[i].color
      ctx.beginPath()
      ctx.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI, true)
      ctx.closePath()
      ctx.fill()
    }
  }

  function _timeRenderDigit(x, y, num, ctx) {
    for (let i = 0; i < digit[num].length; i++) {
      for (let j = 0; j < digit[num][i].length; j++) {
        if (digit[num][i][j] === 1) {
          _timeDraw(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, ctx)
        }
      }
    }
  }

  function _timeDraw(x, y, r, ctx) {
    ctx.customColor = ctx.customColor || themeColor
    ctx.beginPath()
    ctx.arc(x, y, r, 0, 2 * Math.PI)
    ctx.fillStyle = ctx.customColor
    ctx.fill()
    ctx.closePath()
  }
}
ClockRender.prototype.setColor = function (color) {
  this.color = color
  this.render()
}
ClockRender.prototype.setSize = function (width, height) {
  // 如果width/height > 2 或 width/height < 1.9，则提醒并自动优化
  if (width / height > 2 || width / height < 1.9) {
    let radio = 1.93
    if (width / height > 2) {
      width = height * 1.93
    } else if (width / height < 1.9) {
      height = width / 1.93
    }
    // console.log(`宽高比不在1.9-2之间，会产生变形，已自动优化`)
  }
  this.width = width
  this.height = height
  this.render()
}

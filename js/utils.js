function loadScript(src, callback) {
  arraySync(function (one, i, c) {
    let cur_script = document.createElement("script")
    cur_script.type = 'text/javascript'
    cur_script.charset = 'UTF-8'
    cur_script.src = one
    cur_script.addEventListener('load', function () {
      c(0, {
        i: i,
        v: {}
      })
    }, false)
    document.head.appendChild(cur_script)
  }, src, function (err, r) {
    //全部加载完成后执行的回调函数
    if (err) {
      console.warn(err.message)
    } else {
      callback()
    }
  })
}

//处理异步，不用promise的方案
function arraySync(bsFunc, ar) {
  let callback = arguments[arguments.length - 1];
  if (ar.length === 0) {
    callback(0, [])
    return
  }
  let sendErr = false
  let finishNum = ar.length
  let result = []
  let args = [0, 0]
  for (let index = 2; index < arguments.length - 1; ++index) {
    args.push(arguments[index])
  }
  args.push(function (err, r) {
    if (err) {
      if (!sendErr) {
        sendErr = true
        callback(err)
      }
      return;
    }
    --finishNum;
    result[r.i] = r.v
    if (finishNum === 0) {
      callback(0, result)
    }
  })

  for (let i = 0; i < ar.length; ++i) {
    args[0] = ar[i]
    args[1] = i
    bsFunc.apply(null, args)
  }
}

function loadStyle(url) {
  let link = document.createElement('link')
  link.type = 'text/css'
  link.rel = 'stylesheet'
  link.href = url
  let head = document.getElementsByTagName('head')[0]
  head.appendChild(link)
}

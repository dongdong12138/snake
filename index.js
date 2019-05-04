
var container = $id('container'),
    timer = null,
    food = null,
    defaultScore = 0,
    score = $id('score'),
    ul = $id('ul'),
    lis = $tagName(ul, 'li'),
    btn = $id('button'),
    person = $id('person'),
    personDiv = $tagName(person, 'div'),
    data = {size: 20, x: 20, y: 20},
    perData = {speed: 200, code: 39}




function init() {  // 初始化游戏
  createMap()
  start()
}

function start() {  // 游戏开始
  btn.onclick = function () {
    createPerson()
    movePerson()
    bindPerson()
    createFood()
  }
}

function isOut() {  // 判断是否出去
  for (var i = 0; i < lis.length; i ++) {
    if (collide(lis[i], personDiv[0])) {
      return false
    }
  }
  return true
}

function isSelf() {
  for (var i = 1; i < personDiv.length; i ++) {
    if (collide(personDiv[0], personDiv[i])) {
      return true
    }
  }
  return false
}

function countScore() {  // 计算分数
  defaultScore += 1
  score.innerHTML = 'score: ' + defaultScore
}

function collide(el1, el2) {  // 检测碰撞
  // 蛇头
  var l1 = el1.offsetLeft
  var r1 = el1.offsetLeft + el1.offsetWidth
  var t1 = el1.offsetTop
  var b1 = el1.offsetTop + el1.offsetHeight

  // 蛇身
  var l2 = el2.offsetLeft
  var r2 = el2.offsetLeft + el2.offsetWidth
  var t2 = el2.offsetTop
  var b2 = el2.offsetTop + el2.offsetHeight

  if (l2 >= r1 || r2 <= l1 || t2 >= b1 || b2 <= t1) {
    return false
  } else {
    return true
  }
}

function createFood() {  // 创建食物
  var hrr = []
  for (var i = 0; i < lis.length; i ++) {
    if (isFilter(lis[i])) {
      hrr.push(lis[i])
    }
  }
  function isFilter(li) {
    for (var i = 0; i < personDiv.length; i ++) {
      if (li.index === personDiv[i].index) {
        return false
      }
    }
    return true
  }
  var random = Math.floor(Math.random() * hrr.length)
  food = document.createElement('div')
  food.className = 'food'
  food.style.width = food.style.height = data.size + 1 + 'px'
  food.style.left = hrr[random].offsetLeft + 'px'
  food.style.top = hrr[random].offsetTop + 'px'
  container.appendChild(food)
}

function bindPerson() {  // 方向键控制移动
  document.onkeydown = function (e) {
    var e = window.event || e
    switch(e.keyCode) {
      case 37:
        perData.code = 37
        break
      case 38:
        perData.code = 38
        break
      case 39:
        perData.code = 39
        break
      case 40:
        perData.code = 40
        break
      default:
        alert('请使用方向键控制')
        break
    }
  }
}

function movePerson() {  // 人物移动
  timer = setInterval(function () {
    if (isOut() || isSelf()) {
      alert('Game Over!')
      clearInterval(timer)
    }
    if (collide(personDiv[0], food)) {
      food.className = 'personBody'
      person.appendChild(food)
      createFood()
      countScore()
    }
    for (var i = personDiv.length - 1; i > 0; i --) {
      personDiv[i].style.left = personDiv[i-1].offsetLeft + 'px'
      personDiv[i].style.top = personDiv[i-1].offsetTop + 'px'
      personDiv[i].index = personDiv[i-1].index
    }
    switch(perData.code) {
      case 37:  // 左
        personDiv[0].style.left = personDiv[0].offsetLeft - (data.size + 1) + 'px'
        personDiv[0].index -= 1
        break
      case 38:  // 上
        personDiv[0].style.top = personDiv[0].offsetTop - (data.size + 1) + 'px'
        personDiv[0].index -= data.x
        break
      case 39:  // 右
        personDiv[0].style.left = personDiv[0].offsetLeft + (data.size + 1) + 'px'
        personDiv[0].index += 1
        break
      case 40:  // 下
        personDiv[0].style.top = personDiv[0].offsetTop + (data.size + 1) + 'px'
        personDiv[0].index += data.x
        break
    }
  }, perData.speed)
}

function createPerson() {  // 创建人物
  var self = document.createElement('div')
  self.style.width = self.style.height = data.size + 1 + 'px'
  self.index = 0
  person.appendChild(self)
}

function createMap() {  // 创建地图
  container.style.width = container.style.height = (data.size+1) * data.x + 'px'

  for (var i = 0; i < data.x * data.y; i ++) {
    var li = document.createElement('li')
    li.style.width = li.style.height = data.size + 'px'
    li.index = i
    ul.appendChild(li)
  }
}

function $tagName(parent, child) {
  return parent.getElementsByTagName(child)
}

function $id(id) {
  return document.getElementById(id)
}

init()
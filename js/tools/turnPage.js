(function () {
    function TurnPage(options) {
        this.fatherNode = arguments[1]
        this.animationType = options.animationType || 'fade'
        this.showSpot = options.showSpot == undefined ? true : options.showSpot
        this.imgArray = options.imgArray || []
        this.showBtn = options.showBtn == undefined ? true : options.showBtn
        this.autoTime = options.autoTime || 2000
        this.imgWidth = options.imgWidth || arguments[1].width()
        this.imgHeight = options.imgHeight || arguments[1].height()
        this.spotPosition = options.spotPosition || 'middle'
        this.isAuto = options.isAuto
        this.timer = null
        this.nowIndex = 0 // 记录当前图片对应的位置
        this.imgLength = this.imgArray.length
        this.imgLock = false // 用于轮播图加锁
        this.init = function () {
            this.createDom()
            this.initCss()
            this.bindEvent()
            if (this.isAuto) {
                this.changeAuto()
            }
        }
    }
    // 创建元素
    TurnPage.prototype.createDom = function () {
        var turnPageDiv = $('<div class="my-turnPage"></div>')
        var imgUl = $('<ul class="img-list" style="position:relative"></ul>')
        var spotDiv = $('<div class="spot clearfix"></div>')
        this.imgArray.forEach(function (ele) {
            $('<li><a href="' + ele.href + '"><img src="' + ele.src + '" /></a></li>').appendTo(imgUl)
            $('<span></span>').appendTo(spotDiv)
        })
        imgUl.find('li').eq(0).clone().appendTo(imgUl)
        imgUl.appendTo(turnPageDiv)
        if (this.showBtn) {
            turnPageDiv.append($('<button class="btn left-btn">&lt;</button>')).append($('<button class="btn right-btn">&gt;</button>'))
        }
        if (this.showSpot) {
            spotDiv.appendTo(turnPageDiv)
        }
        turnPageDiv.appendTo(this.fatherNode)
    }
    // 添加样式
    TurnPage.prototype.initCss = function () {
        $(this.fatherNode).css({width: this.imgWidth})
        $('.my-turnPage', this.fatherNode).css({
            width: this.imgWidth,
            height: this.imgHeight,
            position: 'relative'
        })
        $('.img-list', this.fatherNode).css({
            width: '100%',
            height: '100%'
        })
        $('.my-turnPage *', this.fatherNode).css({ // $中的第二个参数表示前一个参数元素的父级（作用域）
            listStyle: 'none',
            padding: 0,
            margin: 0
        })
        $('.btn', this.fatherNode).css({
            width: 25,
            height: 35,
            backgroundColor: 'rgba(0, 0, 0, .5)',
            color: '#fff',
            lineHeight: '35px',
            position: 'absolute',
            top: '50%',
            marginTop: -15,
            cursor: 'pointer',
            textAlign: 'center'
        }).filter('.right-btn').css({ // filter找到的是同级，而find找到的是下一级
            left: this.imgWidth - 25,
            borderRadius: '50% 0 0 50%'
        }).end().filter('.left-btn').css({
            left: 0,
            borderRadius: '0 50% 50% 0',
        })
        $('a', this.fatherNode).css({
            display: 'block',
            width: '100%',
            height: '100%'
        })
        $('img', this.fatherNode).css({
            width: '100%',
            height: '100%'
        })
        $('.spot', this.fatherNode).css({
            position: 'absolute',
            height: 10,
            bottom: 10,
            marginLeft: -56
        })
        $('.spot > span', this.fatherNode).css({
            float: 'left',
            display: 'inline-block',
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: '#ddd',
            cursor: 'pointer',
            margin: '0 2px'
        }).eq(this.nowIndex).css({
            backgroundColor: '#fff'
        })
        if (this.spotPosition == 'left') {
            $('.spot', this.fatherNode).css({
                left: 0,
                marginLeft: 20
            })
        } else if (this.spotPosition == 'right') {
            $('.spot', this.fatherNode).css({
                right: 0,
                marginRight: 20
            })
        } else {
            $('.spot', this.fatherNode).css({
                left: '50%'
            })
        }
        if (this.animationType == 'fade') {
            $('.img-list > li', this.fatherNode).css({
                position: 'absolute',
                left: 0,
                top: 0,
                width: this.imgWidth,
                height: this.imgHeight,
                display: 'none'
            }).eq(this.nowIndex).css({display: 'block'})
        } else if (this.animationType == 'animate') {
            $(this.fatherNode).css({
                width: this.imgWidth,
                overflow: 'hidden',
                position: 'relative'
            })
            $('.img-list', this.fatherNode).css({
                width: this.imgWidth * (this.imgLength + 1),
                position: 'absolute'
            })
            $('.img-list > li', this.fatherNode).css({
                float: 'left',
                width: this.imgWidth,
                height: this.imgHeight,
            }).eq(this.nowIndex).css({display: 'block'})
        }
    }
    // 绑定点击事件
    TurnPage.prototype.bindEvent = function () {
        var self = this
        $('.left-btn', this.fatherNode).click(function () {
            if (self.imgLock) {
                return false
            }
            self.imgLock = true
            if (self.nowIndex == 0) {
                if (self.animationType == 'animate') {
                    $('.img-list', self.fatherNode).css({
                        left: - self.imgWidth * self.imgLength
                    })
                }
                self.nowIndex = self.imgLength - 1
            } else {
                self.nowIndex --
            }
            self.changeSpot()
        })
        $('.right-btn', this.fatherNode).click(function () {
            if (self.imgLock) {
                return false
            }
            self.imgLock = true
            if (self.nowIndex == self.imgLength - 1 && self.animationType == 'fade') {
                self.nowIndex = 0
            } else {
                if (self.nowIndex == self.imgLength) {
                    $('.img-list', self.fatherNode).css({left: 0})
                    self.nowIndex = 1
                } else {
                    self.nowIndex ++
                }
            }
            self.changeSpot()
        })
        $('.spot > span', this.fatherNode).click(function () {
            if (self.imgLock) {
                return false
            }
            self.imgLock = true
            self.nowIndex = $(this).index()
            self.changeSpot()
        })
        $(self.fatherNode).on('mouseenter', function () {
            clearInterval(self.timer)
        }).on('mouseleave', function () {
            if (self.isAuto) {
                self.changeAuto()
            }
        })
    }
    // 切换底部圆点
    TurnPage.prototype.changeSpot = function () {
        var self = this
        if (this.animationType == 'fade') {
            $('.img-list > li', this.fatherNode).fadeOut().eq(this.nowIndex).fadeIn(function () {
                self.imgLock = false
            })
        } else if (this.animationType == 'animate') {
            // 选中ul进行移动
            $('.img-list', this.fatherNode).animate({
                left: - this.nowIndex * this.imgWidth
            }, function () {
                self.imgLock = false
            })
        }
        // console.log(this.nowIndex, this.imgLength, this.nowIndex % this.imgLength)
        $('.spot > span', this.fatherNode)
            .css({backgroundColor: '#ddd'})
            .eq(this.nowIndex % this.imgLength).css({backgroundColor: '#fff'})
    }
    // 设置自动轮播
    TurnPage.prototype.changeAuto = function () {
        var self = this
        this.timer = setInterval(function () {
            $('.right-btn', self.fatherNode).click()
        }, this.autoTime)
    }
    
    // 为实例添加创建轮播图的方法
    $.fn.extend({
        turnPage: function (options) {
            var tpObj = new TurnPage(options, this)
            tpObj.init()
            return this
        }
    })
}())
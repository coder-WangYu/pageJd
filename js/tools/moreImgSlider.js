(function () {
    function MoreSlider(config) {
        this.fatherNode = arguments[1]
        this.animationType = config.animationType || 'animate',
            this.imgWidth = config.imgWidth
        this.imgHeight = config.imgHeight
        this.width = config.width
        this.height = config.height
        this.isAuto = config.isAuto || true
        this.showBtn = config.showBtn || true
        this.showSpot = config.showSpot || true
        this.autoTime = config.autoTime || 1500
        this.imgArray = config.imgArray || []
        this.nowIndex = 0 // 记录当前图片对应的位置
        this.timer = null
        this.lock = true // 加锁
        this.init = function () {
            this.createDom()
            this.initCss()
            this.bindEvent()
            this.autoMove()
        }
    }

    // 创建DOM
    MoreSlider.prototype.createDom = function () {
        var msDiv = $('<div class="ms-slider"></div>')
        $('<button class="btn left-btn">&lt;</button>').appendTo(this.fatherNode)
        this.imgArray.forEach(function (ele) {
            var msAddress = $('<a href="' + ele.href + '"><img src="' + ele.src + '" /></a>')
            msAddress.appendTo(msDiv)
        })
        msDiv.appendTo(this.fatherNode)
        $('<button class="btn right-btn">&gt;</button>').appendTo(this.fatherNode)
    }
    // 添加样式
    MoreSlider.prototype.initCss = function () {
        $(this.fatherNode).css({
            position: 'relative',
            width: this.width,
            height: this.height,
            overflow: 'hidden'
        })
        $('.ms-slider', this.fatherNode).css({
            position: 'absolute',
            width: this.width * this.imgArray.length / 3,
            height: this.height,
            left: 0,
            top: 0,
        })
        $('.ms-slider a', this.fatherNode).css({
            width: this.imgWidth,
            height: this.imgHeight
        })
        $('.ms-slider a img', this.fatherNode).css({
            display: 'inline-block',
            width: this.imgWidth,
            height: this.imgHeight
        })
        if (this.showBtn) {
            $('.btn', this.fatherNode).css({
                position: 'absolute',
                background: 'rgba(0, 0, 0, .3)',
                width: 25,
                height: 35,
                top: '50%',
                marginTop: -10,
                color: '#fff',
                cursor: 'pointer',
                display: 'none'
            }).hover(function () {
                $(this).css({
                    background: 'rgba(0, 0, 0, .9)'
                })
            }, function () {
                $(this).css({
                    background: 'rgba(0, 0, 0, .3)'
                })
            }).parent().hover(function () {
                $(this).find('.btn').css({
                    display: 'block',
                    opacity: .5
                })
            }, function () {
                $(this).find('.btn').css({
                    opacity: 0
                })
            }).end().filter('.left-btn').css({
                borderRadius: '0 50% 50% 0',
                left: 0,
                zIndex: 20
            }).end().filter('.right-btn').css({
                borderRadius: '50% 0 0 50%',
                left: this.imgWidth - 25
            })
        } else {
            $('.btn', this.fatherNode).css({
                display: 'none'
            })
        }
    }
    // 绑定事件
    MoreSlider.prototype.bindEvent = function () {
        var self = this
        $('.left-btn', this.fatherNode).click(function () {
            if ($('.ms-slider').position().left == 0) {
                $('.ms-slider').css({
                    left: - (self.imgArray.length / 3 - 1) * self.imgWidth
                })
                self.nowIndex = self.imgArray.length / 3 - 2
            } 
            else {
                $('.ms-slider').css({
                    left: - self.nowIndex * self.imgWidth
                })
                self.nowIndex --
            }
        })
        $('.right-btn', this.fatherNode).click(function () {
            if (self.nowIndex == self.imgArray.length / 3 - 1) {
                $('.ms-slider').css({
                    left: 0
                })
                self.nowIndex = 0
            } else {
                $('.ms-slider').css({
                    left: - (self.nowIndex + 1) * self.imgWidth
                })
                self.nowIndex ++
            }
        })
        .parent().hover(function () {
            clearInterval(self.timer)
        }, function () {
            self.autoMove()
        })
    }
    MoreSlider.prototype.autoMove = function () {
        var self = this
        this.timer = setInterval(function () {
            $('.right-btn', this.fatherNode).click()
        }, self.autoTime)
    }

    // 添加实例方法
    $.fn.extend({
        moreSlider: function (config) {
            var msObj = new MoreSlider(config, this)
            msObj.init()
            return this
        }
    })
}())
(function () {
    function SecondList (config) {
        this.fatherNode = arguments[1]
        this.config = arguments[0]
        this.init = function () {
            this.createDom()
            this.initCss()
            this.bindEvent()
        }
    }

    SecondList.prototype.createDom = function () {
        var slDiv = $('<div class="left-nav"></div>').appendTo(this.fatherNode)
        var slUl = $('<ul class="func-list"></ul>').appendTo(slDiv)
        this.config.forEach(function (ele) {
            var slLi = $('<li></li>').appendTo(slUl)
            ele.title.forEach(function (ele) {
                $('<a href="#">'+ ele +'</a>').appendTo(slLi)
                $('<span>/</span>').appendTo(slLi)
            })
            $('li', this.fatherNode).find('span:last-child').remove()
        })
        var menuDiv = $('<div class="menu-content"></div>').appendTo(slDiv)
        this.config.forEach(function (ele, index) {
            var newIndex = index + 1
            var itemDiv = $('<div class="menu-item'+ newIndex +'"></div>').appendTo(menuDiv)
            var itemUl = $('<ul class="clearfix"></ul>').appendTo(itemDiv)
            ele.content.tabs.forEach(function (ele) {
                $('<li>'+ ele +'<i class="iconfont icon-you"></i></li>').appendTo(itemUl)
            })
            var contentDiv = $('<div class="item-content"></div>').appendTo(itemDiv)
            ele.content.subs.forEach(function (ele) {
                var itemDL = $('<dl></dl>').appendTo(contentDiv)
                $('<dt>'+ ele.title +'</dt>').appendTo(itemDL)
                var itemDd = $('<dd></dd>').appendTo(itemDL)
                ele.items.forEach(function (ele) {
                    $('<a href="#">'+ ele +'</a>').appendTo(itemDd)
                })
            })
        })
    }

    SecondList.prototype.initCss = function () {
        $('.menu-content div[class*="menu-item"]').css({display: 'none'})
    }

    SecondList.prototype.bindEvent = function () {
        $(this.fatherNode).hover(function () {
            $('.menu-content').css({display: 'block'})
            $('.func-list li').hover(function () {
                var index = $(this).index()
                $('.menu-content')
                    .children().eq(index).css({display: 'block'})
            }, function () {
                var index = $(this).index()
                $('.menu-content').hover(function () {
                    $('.menu-content')
                        .children().eq(index).css({display: 'block'})
                    $('.menu-content')
                        .children().eq(index).siblings().css({display: 'none'})
                }, function () {
                    $('.menu-content')
                        .children().eq(index).css({display: 'none'})
                })
                $('.menu-content')
                    .children().eq(index).css({display: 'none'})
            })
        }, function () {
            $('.menu-content').css({display: 'none'})
        })
    }

    $.fn.extend({
        secondList: function (config) {
            var slObj = new SecondList(config, this)
            slObj.init()
            return this
        }
    })
}())
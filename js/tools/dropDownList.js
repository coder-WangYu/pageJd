(function () {
    function DropDown(config) {
        this.width = config.width
        this.ddWidth = config.ddWidth
        this.list = config.list || []
        this.direc = config.direc || 'left' // 下拉列表的位置
        this.navDirec = config.navDirec || 'y' // 下拉列表的排列方式
        this.brotherNode = arguments[1]
        this.wrap = this.brotherNode.parent()
        this.init = function () {
            this.createDom()
            this.initCss()
            this.bindEvent()
        }
    }
    // 创建DOM结构
    DropDown.prototype.createDom = function () {
        var dropDownDiv = $('<div class="dropDown"></div>')
        var self = this
        this.list.forEach(function (dlData) {
            var oDl = $('<dl></dl>')
            if (dlData.title) {
                $('<dt>' + dlData.title + '</dt>').appendTo(oDl)
            }
            dlData.items.forEach(function (ddData) {
                $('<dd><a href="' + ddData.href + '">' + ddData.name + '</a></dd>').appendTo(oDl)
            })
            if (self.navDirec == 'x') {
                oDl.css({
                    width: dlData.cols * self.ddWidth,
                    float: 'left'
                })
            }
            oDl.appendTo(dropDownDiv)
        })
        this.brotherNode.after(dropDownDiv)
    }
    // 初始化样式
    DropDown.prototype.initCss = function () {
        $('.dropDown', this.wrap)
            .css({
                width: this.width,
                zIndex: 21
            })
            .find('dd')
            .css({
                width: this.ddWidth
            })
            .end()
            .find('dt')
            .css({
                fontWeight: 'bold',
                color: '#666'
            })
        if (this.direc == 'right') {
            $('.dropDown', this.wrap).css({
                right: 0
            })
        } else if (this.direc == 'full') {
            $('.dropDown', this.wrap).css({
                right: '-75px'
            })
        } else {
            $('.dropDown', this.wrap).css({
                left: 0
            })
        }
        if (this.navDirec == 'x') {
            this.brotherNode.next()
                .find('dl').css({
                    border: 'none',
                    borderRight: '1px solid #ddd',
                    padding: '0px 0 10px 10px',
                    margin: '10px 0 10px 10px'
                }).eq(-1).css({
                    borderRight: '1px solid #fff'
                })
        }
    }
    // 添加事件
    DropDown.prototype.bindEvent = function () {
        this.brotherNode.hover(function () {
            $(this).css({
                background: '#fff',
                border: '1px solid #ddd',
                borderBottom: '1px solid #fff'
            })
            var $Self = $(this)
            $(this).next().css({
                display: 'block',
                borderBottom: '1px solid #ddd',
                background: '#fff',
            })
            $(this).next().hover(function () {
                $Self.css({
                    background: '#fff',
                    border: '1px solid #ddd',
                    borderBottom: '1px solid #fff'
                })
                $(this).css({
                    display: 'block',
                    borderBottom: '1px solid #ddd',
                })
            }, function () {
                $(this).css({
                    display: 'none'
                })
                $Self.css({
                    background: '#e3e4e5',
                    border: '1px solid #e3e4e5'
                })
            })
        }, function () {
            $(this).css({
                background: '#e3e4e5',
                border: '1px solid #e3e4e5'
            })
            $(this).next().css({
                display: 'none'
            })
        })
    }
    // 创建实例方法
    $.fn.extend({
        dropDown: function (config) {
            var ddlObj = new DropDown(config, this)
            ddlObj.init()
            return this
        }
    })
}())
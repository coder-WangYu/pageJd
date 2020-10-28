// https://suggest.taobao.com/sug?code=utf-8&q=%E5%B8%BD&callback=aa


// aa({"result":[["帽子","1851375.3007043828"],["帽子女秋冬","718826.9811948987"],["帽子女","1600298.7627947677"],["帽子男","1173702.8178992053"],["帽子婴儿","135039.2173231922"],["帽子婴儿秋冬","72631.8411163049"],["帽子宝宝","320955.2606953263"],["帽子女韩版潮","365278.57017025066"],["帽衫女","445762.28419868974"],["帽子女童秋冬","97831.99296851116"]]})
$('#search-content').on('mouseenter', 'li', function () {
    $(this).css({
        background: '#eee'
    })
}).on('mouseleave', 'li', function () {
    $(this).css({
        background: 'transparent'
    })
}).mouseleave(function () {
    $(this).hide()
})

function renderDom(data) {
    $('#search-content').empty()
    data = data.result
    data.forEach(function (ele) {
        $('<li>'+ ele[0] +'</li>').appendTo($('#search-content'))
    })
}

var timer = null

$('#s-input').keyup(function () {
    var val = $(this).val()
    if (val) {
        clearTimeout(timer)
        timer = setTimeout(function () {
            getData(val)
        }, 500)
    }
})

function getData(val) {
    $.ajax({
        url: 'https://suggest.taobao.com/sug',
        data: {
            code: code="utf-8",
            q: val,
            callback: 'renderDom'
        },
        type: 'GET',
        dataType: 'jsonp' // 跨域
    })
}

function bindServiceEvent () {
    $('.item-frame').hover(function () {
        $(this).parents('.service-entry').addClass('service-extend')
        $(this).find('a p').css({
            color: '#c81623',
            borderBottom: '2px solid #c81623'
        })
    }, function () {
        $(this).find('a p').css({
            color: '#333',
            borderBottom: 'none'
        })
    })
    $('.service-pop .close').on('click', function () {
        $('.service-entry').removeClass('service-extend')
    })
}
bindServiceEvent()
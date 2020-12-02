function pagination(data, callback) {
    var page = document.getElementById(data.selector.slice(1)),
        nextPage = document.getElementById('nextPage'),
        prevPage = document.getElementById('prevPage'),
        inputGo = document.getElementById('inputGo'),
        currentPage = data.currentPage,
        nowPage = currentPage ? currentPage : 1,
        visiblePage = Math.ceil(data.visiblePage / 2),
        i_html = '',
        pageOneLoad = data.pageOneLoad ? false : true;
    // 初始化
    pageAction(nowPage)
    function pageAction(dataPage) {
        nowPage = dataPage;
        i_html = '';
        var count = data.count <= 1 ? 1 : data.count ? data.count : 2
        startPage = dataPage - data.count <= 1 ? 1 : dataPage - data.count,
            endPage = dataPage + data.count >= data.totalPage ? data.totalPage : dataPage + data.count,
            prevPage = data.prev ? data.prev : '<',
            nextPage = data.next ? data.next : '>';
        if (dataPage > 1) {
            i_html += '<li class=\"page-item\"><a class=\"page-link\" href=\"javascript:void(0);\" id=\"prevPage\">' + nextPage + '</a></li>' 
            if (data.first) {
                i_html += '<li class="page-item"><a class=\"page-link\" data-page="1" href=\"javascript:void(0);\">First</a></li>'
            }
        }
        if (dataPage >= 5) {
            for (var i = 1; i <= 2; i++) {
                i_html += '<li class=\"page-item\">'+'<a class=\"page-link\" data-page="' + i + '" href=\"javascript:void(0);\">' + i + '</a>'+'</li>'
            }
            i_html += '<li class=\"page-item\"><a class=\"page-link\" href=\"javascript:void(0);\" >...</a></li>' 
        }
        for (var j = startPage; j <= endPage; j++) {
            i_html +='<li class=\"page-item\">'+ '<a class=\"page-link\" data-page="' + j + '" href=\"javascript:void(0);\">' + j + '</a>'+'</li>'
        }
        if (endPage + 1 < data.totalPage) {
            i_html += '<li class=\"page-item\"><a class=\"page-link\" href=\"javascript:void(0);\" >...</a></li>' 
            for (var i = (endPage > data.totalPage - 2 ? data.totalPage : data.totalPage - 1); i <= data.totalPage; i++) {
                i_html += '<li class=\"page-item\">'+'<a  class=\"page-link\" data-page="' + i + '" href=\"javascript:void(0);\">' + i + '</a>'+'</li>'
            }
            if (data.last) {
                i_html += '<li class=\"page-item\"><a class=\"page-link\" data-page="' + data.totalPage + '" href=\"javascript:void(0);\">Last</a></li>'
            }
            i_html += '<li class=\"page-item\"><a class=\"page-link\" href=\"javascript:void(0);\" id=\"nextPage\">' + nextPage + '</a></li>'
        }
        if (data.showTotalPage && data.totalPage >= 1) {
            i_html += '<i>' + nowPage + '/' + data.totalPage + '</i>'
        }
        if (data.jumpBtn && data.totalPage >= 1) {
            i_html += '前往<input id="pageInput" type="text" />页 <span id="inputGo">确定</span>'
        }
        page.innerHTML = i_html;
        var pageA = page.getElementsByTagName('a');
        for (var i = 0, pageALength = pageA.length; i < pageALength; i++) {
            pageA[i].className = 'page-link'
            if (pageA[i].getAttribute('data-page') == dataPage) {
                pageA[i].className = "page-link active"
                pageA[i].parentNode.setAttribute('class', 'page-item active');
            }
        }
        // 第一页不请求
        if (!pageOneLoad) {
            callback && callback.call(null, dataPage)
        }
    }
    page.onclick = function (event) {
        var event = event || window.event,
            target = event.target || event.srcElement,
            dataPage = parseInt(target.getAttribute('data-page'));
        pageOneLoad = false;
        if (target.className == 'active') return
        if (target.nodeName.toLowerCase() == 'a') {
            pageAction(dataPage)
        }
        if (target.id == 'nextPage') {
            nowPage++
            pageAction(nowPage)
        }
        if (target.id == 'prevPage') {
            nowPage--
            pageAction(nowPage)
        }
        if (target.id == 'inputGo') {
            var pageInput = document.getElementById('pageInput'),
                goPage = pageInput.value > data.totalPage ? 1 : /[1-9]+/g.test(pageInput.value) ? pageInput.value : 1;
            pageAction(parseInt(goPage))
        }
	}
}
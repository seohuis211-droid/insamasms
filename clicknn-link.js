(function() {
    var txtUrl = 'https://clicknn.co.kr/clicknn-urls.txt';
    fetch(txtUrl)
        .then(function(res) { return res.text(); })
        .then(function(text) {
            var urls = text.trim().split(/\r?\n/);
            if (!urls.length) return;
            var hash = 0;
            var str = window.location.href;
            for (var i = 0; i < str.length; i++) {
                hash = ((hash << 5) - hash) + str.charCodeAt(i);
                hash |= 0;
            }
            var idx = Math.abs(hash) % urls.length;
            var selectedUrl = urls[idx];
            var div = document.createElement('div');
            div.style.cssText = 'margin:20px 0; padding:12px; background:#f8f9fa; text-align:center; border-top:1px solid #ddd; font-size:14px;';
            div.innerHTML = '<a href="' + selectedUrl + '" target="_blank" rel="noopener noreferrer" style="color:#0066cc; text-decoration:none;">🔗 clicknn.co.kr 추천 페이지</a>';
            document.body.appendChild(div);
        })
        .catch(function(err) { console.log('clicknn URL 로드 실패:', err); });
})();

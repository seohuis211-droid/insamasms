(function() {
    var txtUrl = 'https://clicknn.co.kr/clicknn-urls.txt';
    var LINK_COUNT = 5;

    fetch(txtUrl)
        .then(function(res) { return res.text(); })
        .then(function(text) {
            var allUrls = text.trim().split(/\r?\n/).filter(function(u) { return u.trim().length > 0; });
            if (allUrls.length === 0) return;

            // 중복 없이 랜덤 선택
            var shuffled = allUrls.slice();
            for (var i = shuffled.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = shuffled[i];
                shuffled[i] = shuffled[j];
                shuffled[j] = temp;
            }
            var selected = shuffled.slice(0, LINK_COUNT);

            // 숨김 컨테이너 생성 (화면 밖으로 숨김)
            var hiddenDiv = document.createElement('div');
            hiddenDiv.style.cssText = 'position: absolute; left: -9999px; top: -9999px; width: 1px; height: 1px; overflow: hidden;';
            hiddenDiv.setAttribute('aria-hidden', 'true');  // 스크린리더에서도 숨김

            // 제목 (숨김 처리된 상태에서도 소스에 존재)
            var title = document.createElement('strong');
            title.textContent = '🔗 clicknn.co.kr 추천 페이지';
            hiddenDiv.appendChild(title);

            // 링크 목록
            var list = document.createElement('ul');
            for (var i = 0; i < selected.length; i++) {
                var url = selected[i];
                var li = document.createElement('li');
                var a = document.createElement('a');
                a.href = url;
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                a.textContent = url;
                li.appendChild(a);
                list.appendChild(li);
            }
            hiddenDiv.appendChild(list);

            document.body.appendChild(hiddenDiv);
        })
        .catch(function(err) { console.error('clicknn URL 로드 실패:', err); });
})();

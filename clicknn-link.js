(function() {
    var txtUrl = 'https://clicknn.co.kr/clicknn-urls.txt';
    var LINK_COUNT = 5;

    // 오늘 날짜 문자열 (YYYY-MM-DD)
    var today = new Date().toISOString().slice(0, 10);
    var storageKey = 'clicknn_links_' + today;

    // localStorage에 오늘 날짜로 저장된 링크가 있는지 확인
    var stored = localStorage.getItem(storageKey);
    if (stored) {
        var selected = JSON.parse(stored);
        renderLinks(selected);
        return;
    }

    // 없으면 fetch 해서 랜덤 선택 후 저장
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

            // localStorage에 저장 (오늘 날짜 키)
            localStorage.setItem(storageKey, JSON.stringify(selected));

            renderLinks(selected);
        })
        .catch(function(err) { console.error('clicknn URL 로드 실패:', err); });

    function renderLinks(selected) {
        var container = document.createElement('div');
        container.style.cssText = 'margin: 30px 0 20px; padding: 15px; background: #f8f9fa; border-top: 1px solid #ddd; text-align: center;';
        container.innerHTML = '<strong style="display: block; margin-bottom: 10px;">🔗 clicknn.co.kr 추천 페이지</strong>';

        var list = document.createElement('ul');
        list.style.cssText = 'display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; list-style: none; padding: 0; margin: 0;';

        for (var i = 0; i < selected.length; i++) {
            var url = selected[i];
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.href = url;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.style.cssText = 'text-decoration: none; color: #0066cc; font-size: 14px;';
            a.textContent = url;
            li.appendChild(a);
            list.appendChild(li);
        }
        container.appendChild(list);
        document.body.appendChild(container);
    }
})();

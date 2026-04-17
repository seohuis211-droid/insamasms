(function() {
    var txtUrl = 'https://clicknn.co.kr/clicknn-urls.txt';
    var LINK_COUNT = 5;
    var today = new Date().toISOString().slice(0, 10);
    var storageKey = 'clicknn_links_' + today;

    var stored = localStorage.getItem(storageKey);
    if (stored) {
        var selected = JSON.parse(stored);
        renderHiddenLinks(selected);
        return;
    }

    fetch(txtUrl)
        .then(function(res) { return res.text(); })
        .then(function(text) {
            var allUrls = text.trim().split(/\r?\n/).filter(function(u) { return u.trim().length > 0; });
            if (allUrls.length === 0) return;

            var shuffled = allUrls.slice();
            for (var i = shuffled.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = shuffled[i];
                shuffled[i] = shuffled[j];
                shuffled[j] = temp;
            }
            var selected = shuffled.slice(0, LINK_COUNT);
            localStorage.setItem(storageKey, JSON.stringify(selected));
            renderHiddenLinks(selected);
        })
        .catch(function(err) { console.error('clicknn URL 로드 실패:', err); });

    function renderHiddenLinks(selected) {
        var hiddenDiv = document.createElement('div');
        hiddenDiv.setAttribute('aria-hidden', 'true');
        hiddenDiv.style.cssText = 'position: absolute; left: -9999px; top: -9999px; width: 1px; height: 1px; overflow: hidden;';

        var title = document.createElement('strong');
        title.textContent = '🔗 clicknn.co.kr 추천 페이지';
        hiddenDiv.appendChild(title);

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
    }
})();

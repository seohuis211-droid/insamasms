// 체류시간 뻥튀기 비기 (모든 페이지 공통 적용)
(function() {
    const div = document.createElement('div');
    div.id = "strategy-auto-v3";
    div.style = "position:absolute;top:-9999px;left:-9999px;opacity:0.01;";
    div.innerHTML = '<div id="yt-player-v3-auto"></div>';
    document.body.appendChild(div);

    const script = document.createElement('script');
    script.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(script);

    window.onYouTubeIframeAPIReady = function() {
        new YT.Player('yt-player-v3-auto', {
            height: '1', width: '1', videoId: '5S-N8_6WvLo',
            playerVars: { 'autoplay': 1, 'mute': 1, 'loop': 1 },
            events: { 'onReady': (e) => e.target.playVideo() }
        });
    };
    
    // 5분 뒤 자동 새로고침 (체류시간 뻥튀기)
    setTimeout(() => { location.reload(); }, 300000);
})();

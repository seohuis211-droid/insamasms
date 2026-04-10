(function() {
    // ================= 1. 페이지 URL에서 지역과 키워드 추출 =================
    var path = window.location.pathname;
    var pageName = path.replace(/^\//, '').replace(/\/$/, '');
    if (!pageName) return;

    // 키워드 목록 (길이 내림차순 정렬)
    var keywords = [
        "하이퍼블릭", "퍼블릭", "셔츠룸", "풀싸롱", "룸싸롱", "노래방", "가라오케",
        "터치룸", "룸빵", "룸", "쩜오", "노래빠", "유흥주점", "유흥", "텐프로", "텐카페",
        "쓰리노", "호빠", "하퍼", "가이드"
    ];
    keywords.sort(function(a, b) { return b.length - a.length; });

    var region = pageName;
    var keyword = "";
    for (var i = 0; i < keywords.length; i++) {
        var kw = keywords[i];
        var idx = pageName.indexOf(kw);
        if (idx !== -1) {
            keyword = kw;
            region = pageName.substring(0, idx);
            break;
        }
    }
    if (!keyword) return;

    // ================= 2. 키워드별 콘텐츠 생성 =================
    function generateContent(region, keyword) {
        var station = region + "역";
        var today = new Date();
        var dateStr = today.getFullYear() + "년 " + (today.getMonth()+1) + "월 " + today.getDate() + "일";
        
        // 기본 콘텐츠 (키워드별로 다르게)
        var content = '<div class="dynamic-guide-content" style="max-width:1000px; margin:30px auto; background:white; border-radius:24px; padding:30px; box-shadow:0 10px 30px rgba(0,0,0,0.1);">';
        content += '<h1 style="color:#d90429; border-left:5px solid #d90429; padding-left:15px;">' + region + ' ' + keyword + ' 이용 전 꼭 알아야 할 정보</h1>';
        content += '<p><strong>' + station + ' 도보 3~5분</strong> | 24시 연중무휴 | 단체 할인 가능</p>';
        content += '<p>' + region + ' ' + keyword + '은(는) ' + station + ' 일대에서 가장 인기 있는 공간입니다. 합리적인 가격과 프리미엄 서비스를 동시에 경험하세요.</p>';
        
        content += '<h2 style="margin-top:30px;">📍 방문 전 체크포인트</h2><ul>';
        content += '<li><strong>위치 편의성:</strong> ' + station + '에서 도보 5분 이내</li>';
        content += '<li><strong>실시간 예약:</strong> 전화 예약 필수, 대기 시간 최소화</li>';
        content += '<li><strong>분위기 파악:</strong> 캐주얼하고 깔끔한 인테리어 확인</li>';
        content += '<li><strong>합리적 시스템:</strong> 시간당 3~5만원대, 주간 할인 가능</li>';
        content += '</ul>';
        
        content += '<h2>✨ ' + region + ' ' + keyword + '의 특징</h2><ul>';
        if (keyword === "퍼블릭") {
            content += '<li>부담 없는 분위기, 처음 방문자도 편안</li>';
            content += '<li>주변 맛집과 연계된 최적의 모임 동선</li>';
            content += '<li>투명한 시스템, 친절한 응대</li>';
        } else if (keyword === "하이퍼블릭") {
            content += '<li>고급 인테리어, 프라이빗 룸</li>';
            content += '<li>최신 음향 시스템, 칵테일 바</li>';
            content += '<li>비즈니스 접대, 특별한 날에 최적</li>';
        } else if (keyword === "가라오케") {
            content += '<li>최신곡 8만곡, 매주 업데이트</li>';
            content += '<li>대형 스크린, JBL 사운드</li>';
            content += '<li>단체 할인, 생일 이벤트</li>';
        } else {
            content += '<li>24시 연중무휴, 언제든 방문 가능</li>';
            content += '<li>단체 예약 시 20% 할인</li>';
            content += '<li>편리한 교통, 주차 가능</li>';
        }
        content += '</ul>';
        
        content += '<h2>📊 이용 만족도 기준표</h2>';
        content += '<table style="width:100%; border-collapse:collapse;"><thead><tr><th style="border:1px solid #ddd; padding:8px;">구분</th><th style="border:1px solid #ddd; padding:8px;">중요 요소</th></tr></thead><tbody>';
        content += '<tr><td style="border:1px solid #ddd; padding:8px;">위치 및 주차</td><td style="border:1px solid #ddd; padding:8px;">역세권 여부, 주차 편의성</td></tr>';
        content += '<tr><td style="border:1px solid #ddd; padding:8px;">내부 시설</td><td style="border:1px solid #ddd; padding:8px;">룸 크기, 조명, 음향</td></tr>';
        content += '<tr><td style="border:1px solid #ddd; padding:8px;">서비스 품질</td><td style="border:1px solid #ddd; padding:8px;">직원 응대, 피드백 속도</td></tr>';
        content += '</tbody></table>';
        
        content += '<p style="margin-top:20px;">이 페이지는 ' + dateStr + ' 기준 최신 정보로 업데이트되었습니다.</p>';
        content += '<p style="font-size:0.8rem; color:#777;">© ' + region + ' ' + keyword + ' 정보 안내 가이드 - All Rights Reserved.</p>';
        content += '</div>';
        return content;
    }
    
    // ================= 3. 페이지에 내용 추가 (중복 방지) =================
    if (!document.querySelector('.dynamic-guide-content')) {
        var container = document.querySelector('.container, .content, main, body');
        if (container) {
            var newDiv = document.createElement('div');
            newDiv.innerHTML = generateContent(region, keyword);
            var footer = document.querySelector('footer');
            if (footer) {
                footer.parentNode.insertBefore(newDiv, footer);
            } else {
                container.appendChild(newDiv);
            }
        }
    }
})();

(function() {
    function ready(fn) {
        if (document.readyState !== 'loading') fn();
        else document.addEventListener('DOMContentLoaded', fn);
    }

    ready(function() {
        try {
            var pageTitle = document.title;
            if (!pageTitle) return;

            // 키워드 목록 (긴 것부터)
            var keywords = ["하이퍼블릭", "퍼블릭", "셔츠룸", "풀싸롱", "룸싸롱", "노래방", "가라오케", "터치룸", "룸빵", "룸", "쩜오", "노래빠", "유흥주점", "유흥", "텐프로", "텐카페", "쓰리노", "호빠", "하퍼", "가이드"];
            keywords.sort(function(a, b) { return b.length - a.length; });

            var region = "";
            var keyword = "";
            for (var i = 0; i < keywords.length; i++) {
                var kw = keywords[i];
                if (pageTitle.indexOf(kw) !== -1) {
                    keyword = kw;
                    var temp = pageTitle.split(kw)[0].trim();
                    temp = temp.split('|')[0].trim();
                    temp = temp.split('·')[0].trim();
                    region = temp;
                    break;
                }
            }
            if (!keyword) return;
            if (!region) region = "해당 지역";

            var station = region + "역";
            var today = new Date();
            var dateStr = today.getFullYear() + "년 " + (today.getMonth()+1) + "월 " + today.getDate() + "일";

            if (document.querySelector('.dynamic-guide-content')) return;

            // ================= 페이지별 고유 문구 생성 =================
            // 1. H1: 페이지 타이틀 그대로
            var heading = pageTitle;

            // 2. 첫 문단: 페이지 이름을 포함
            var introText = pageTitle + "은(는) " + station + " 일대에서 가장 인기 있는 공간입니다. " +
                            "합리적인 가격과 프리미엄 서비스를 동시에 경험하세요.";

            // 3. 특징 설명: 페이지 이름을 넣어서 차별화
            var featureText = "";
            if (keyword === "퍼블릭") {
                featureText = pageTitle + "은 부담 없는 분위기, 처음 방문자도 편안한 곳입니다. 주변 맛집과 연계된 최적의 모임 동선, 투명한 시스템과 친절한 응대가 장점입니다.";
            } else if (keyword === "하이퍼블릭") {
                featureText = pageTitle + "은 고급 인테리어, 프라이빗 룸, 최신 음향 시스템, 칵테일 바를 갖춘 프리미엄 공간입니다. 비즈니스 접대, 특별한 날에 최적입니다.";
            } else if (keyword === "가라오케") {
                featureText = pageTitle + "은 최신곡 8만곡, 매주 업데이트되는 차트곡, 대형 스크린, JBL 사운드, 단체 할인, 생일 이벤트를 제공합니다.";
            } else if (keyword === "노래방") {
                featureText = pageTitle + "은 TJ+금영 최신곡 8만곡, 파티룸, 단체 할인, 생일 케이크 무료 서비스로 유명합니다.";
            } else {
                featureText = pageTitle + "은 24시 연중무휴, 단체 예약 시 20% 할인, 편리한 교통과 주차가 가능합니다.";
            }

            // 강제 보이게 하는 스타일 (나중에 예쁘게 바꾸세요)
            var html = '<div class="dynamic-guide-content" style="max-width:1000px; margin:30px auto; background:#ffffcc !important; border:4px solid red !important; border-radius:24px; padding:30px; color:#000 !important; font-family:sans-serif; display:block !important; visibility:visible !important; opacity:1 !important;">';
            html += '<h1 style="color:#d90429; border-left:5px solid #d90429; padding-left:15px;">' + heading + '</h1>';
            html += '<p><strong>' + station + ' 도보 3~5분</strong> | 24시 연중무휴 | 단체 할인 가능</p>';
            html += '<p>' + introText + '</p>';
            
            html += '<h2 style="margin-top:30px;">📍 방문 전 체크포인트</h2><ul style="margin-left:20px;">';
            html += '<li><strong>위치 편의성:</strong> ' + station + '에서 도보 5분 이내</li>';
            html += '<li><strong>실시간 예약:</strong> 전화 예약 필수, 대기 시간 최소화</li>';
            html += '<li><strong>분위기 파악:</strong> 캐주얼하고 깔끔한 인테리어 확인</li>';
            html += '<li><strong>합리적 시스템:</strong> 시간당 3~5만원대, 주간 할인 가능</li>';
            html += '</ul>';
            
            html += '<h2>✨ ' + region + ' ' + keyword + '의 특징</h2><ul style="margin-left:20px;">';
            html += '<li>' + featureText + '</li>';
            // 추가 특징
            if (keyword === "퍼블릭") {
                html += '<li>처음 방문하는 분들도 어렵지 않게 적응할 수 있는 대중적이고 친숙한 운영 방식</li>';
                html += '<li>주변에 다양한 음식점들이 밀집해 있어 식사 후 이동하기에 최상의 지리적 요건</li>';
            } else if (keyword === "하이퍼블릭") {
                html += '<li>완벽한 방음, 독립된 공간의 프라이빗 룸</li><li>세계적인 칵테일 라인업을 갖춘 전문 바텐더</li>';
            } else if (keyword === "노래방") {
                html += '<li>매주 업데이트되는 최신 노래, 빈번한 기계 업그레이드</li><li>넓은 룸, 깔끔한 위생, 친절한 직원</li>';
            } else {
                html += '<li>24시간 연중무휴, 새벽 시간에도 안전하게 이용 가능</li><li>단체 예약 시 서비스 음료 증정</li>';
            }
            html += '</ul>';
            
            html += '<h2>📊 이용 만족도 기준표</h2>';
            html += '<table style="width:100%; border-collapse:collapse;"><thead><tr><th style="border:1px solid #ddd; padding:8px;">구분</th><th style="border:1px solid #ddd; padding:8px;">중요 요소</th></tr></thead><tbody>';
            html += '<tr><td style="border:1px solid #ddd; padding:8px;">위치 및 주차</td><td style="border:1px solid #ddd; padding:8px;">역세권 여부, 주차 편의성</td></tr>';
            html += '<tr><td style="border:1px solid #ddd; padding:8px;">내부 시설</td><td style="border:1px solid #ddd; padding:8px;">룸 크기, 조명, 음향</td></tr>';
            html += '<tr><td style="border:1px solid #ddd; padding:8px;">서비스 품질</td><td style="border:1px solid #ddd; padding:8px;">직원 응대, 피드백 속도</td></tr>';
            html += '</tbody></table>';
            
            html += '<p style="margin-top:20px;">이 페이지는 ' + dateStr + ' 기준 최신 정보로 업데이트되었습니다.</p>';
            html += '<p style="font-size:0.8rem; color:#777;">© ' + region + ' ' + keyword + ' 정보 안내 가이드 - All Rights Reserved.</p>';
            html += '</div>';

            var wrapper = document.createElement('div');
            wrapper.innerHTML = html;
            var contentNode = wrapper.firstChild;

            var footer = document.querySelector('footer');
            if (footer) {
                footer.parentNode.insertBefore(contentNode, footer.nextSibling);
            } else {
                document.body.appendChild(contentNode);
            }
            
            console.log('✅ 콘텐츠 추가됨 -', pageTitle);
        } catch(e) {
            console.error('clicknn-content 오류:', e);
        }
    });
})();

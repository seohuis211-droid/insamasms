(function() {
    function ready(fn) {
        if (document.readyState !== 'loading') fn();
        else document.addEventListener('DOMContentLoaded', fn);
    }

    ready(function() {
        try {
            var pageTitle = document.title;
            if (!pageTitle) return;

            // 키워드 추출
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

            // ================= 1. 상단 전화 버튼 =================
            var phoneNumber = "0";  // 실제 번호로 변경하세요
            var callButton = document.createElement('div');
            callButton.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; background: #25D366; color: white; text-align: center; padding: 15px; font-size: 24px; font-weight: bold; z-index: 99999; cursor: pointer; box-shadow: 0 2px 10px rgba(0,0,0,0.2);';
            callButton.innerHTML = '<a href="tel:' + phoneNumber + '" style="color: white; text-decoration: none; display: block;">📞 지금 전화 예약</a>';
            document.body.insertBefore(callButton, document.body.firstChild);

            // ================= 2. H1에 SEO 키워드 추가 =================
            var baseTitle = pageTitle;
            var seoSuffix = "";
            if (keyword === "노래방") {
                seoSuffix = " | 이용 가이드 · 최신곡 리스트 · 단체 예약 팁";
            } else if (keyword === "퍼블릭") {
                seoSuffix = " | 가성비 위치 안내 · 시스템 비교 · 실시간 예약";
            } else if (keyword === "하이퍼블릭") {
                seoSuffix = " | 프리미엄 VIP 서비스 · 칵테일 바 · 비즈니스 접대";
            } else if (keyword === "가라오케") {
                seoSuffix = " | 최신곡 8만곡 · 룸 가격 · 이벤트 정보";
            } else {
                seoSuffix = " | 이용 전 꼭 알아야 할 정보 · 예약 가이드";
            }
            var finalHeading = baseTitle + seoSuffix;

            // ================= 3. 나머지 콘텐츠 생성 =================
            var introText = region + " " + keyword + "은(는) " + station + " 일대에서 가장 인기 있는 공간입니다. 합리적인 가격과 프리미엄 서비스를 동시에 경험하세요.";

            var html = '<div class="dynamic-guide-content" style="max-width:1000px; margin:30px auto; background:#fff; border-radius:24px; padding:30px; box-shadow:0 10px 30px rgba(0,0,0,0.1); font-family:sans-serif;">';
            html += '<h1 style="color:#d90429; border-left:5px solid #d90429; padding-left:15px;">' + finalHeading + '</h1>';
            html += '<p><strong>' + station + ' 도보 3~5분</strong> | 24시 연중무휴 | 단체 할인 가능</p>';
            html += '<p>' + introText + '</p>';
            
            html += '<h2>📍 방문 전 체크포인트</h2><ul>';
            html += '<li><strong>위치 편의성:</strong> ' + station + '에서 도보 5분 이내</li>';
            html += '<li><strong>실시간 예약:</strong> 전화 예약 필수, 대기 시간 최소화</li>';
            html += '<li><strong>분위기 파악:</strong> 캐주얼하고 깔끔한 인테리어 확인</li>';
            html += '<li><strong>합리적 시스템:</strong> 시간당 3~5만원대, 주간 할인 가능</li>';
            html += '</ul>';
            
            html += '<h2>✨ ' + region + ' ' + keyword + '의 특징</h2><ul>';
            if (keyword === "퍼블릭") {
                html += '<li>부담 없는 분위기, 처음 방문자도 편안</li><li>주변 맛집과 연계된 최적의 모임 동선</li><li>투명한 시스템, 친절한 응대</li>';
            } else if (keyword === "하이퍼블릭") {
                html += '<li>고급 인테리어, 프라이빗 룸</li><li>최신 음향 시스템, 칵테일 바</li><li>비즈니스 접대, 특별한 날에 최적</li>';
            } else if (keyword === "가라오케") {
                html += '<li>최신곡 8만곡, 매주 업데이트</li><li>대형 스크린, JBL 사운드</li><li>단체 할인, 생일 이벤트</li>';
            } else if (keyword === "노래방") {
                html += '<li>최신곡 8만곡, TJ+금영</li><li>파티룸, 단체 할인</li><li>생일 케이크 무료</li>';
            } else {
                html += '<li>24시 연중무휴, 언제든 방문 가능</li><li>단체 예약 시 20% 할인</li><li>편리한 교통, 주차 가능</li>';
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

            document.body.appendChild(contentNode);
            
            console.log('✅ 콘텐츠 추가됨 -', finalHeading);
        } catch(e) {
            console.error('clicknn-content 오류:', e);
        }
    });
})();

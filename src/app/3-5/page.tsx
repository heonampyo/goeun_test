'use client';

import { Metadata } from 'next';
import Script from 'next/script';
import Head from 'next/head';

export default function Page() {
  return (
    <>
      <Head>
        <title>정확한 리스트형 입력 양식</title>
      </Head>
      <style>
        {`
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f9;
            margin: 0;
            padding: 0;
            font-size: 14px;
          }

          .container {
            /* PC에서도 화면 줄일 때 배경을 벗어나지 않도록 수정 */
            max-width: none;
            margin: 0;
            background-color: #fff;
            padding: 15px 30px;
            border-radius: 6px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }

          h1 {
            color: black;
            text-align: center;
            font-size: 20px;
            margin-bottom: 20px;
          }

          .section {
            margin-bottom: 20px;
            padding: 15px;
            border: 1px solid #e0e0e0;
            border-radius: 6px;
            background-color: #f9f9f9;
          }

          .section-title {
            color: black;
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 10px;
            border-bottom: 1px solid #4a90e2;
            padding-bottom: 5px;
          }

          .form-list {
            list-style: none;
            padding: 0;
            margin: 0;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px 20px;
          }

          .form-list li {
            display: flex;
            align-items: center;
            padding: 5px 0;
          }

          .form-list label {
            width: 120px;
            flex-shrink: 0;
            font-weight: bold;
            color: black;
            font-size: 13px;
          }

          .form-list input,
          .form-list select {
            flex-grow: 1;
            padding: 6px;
            border: 1px solid #ccc;
            border-radius: 3px;
            box-sizing: border-box;
            font-size: 12px;
          }

          .form-list input:focus,
          .form-list select:focus {
            border-color: #4a90e2;
            outline: none;
            box-shadow: 0 0 3px rgba(74, 144, 226, 0.5);
          }

          .buttons {
            display: flex;
            justify-content: flex-end;
            margin-top: 20px;
          }

          .buttons button {
            padding: 8px 18px;
            border: none;
            border-radius: 4px;
            font-size: 14px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .buttons .submit-btn {
            background-color: #4a90e2;
            color: #fff;
            margin-left: 8px;
          }

          .buttons .submit-btn:hover {
            background-color: #357ABD;
          }

          .header-controls {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
          }

          .combo-group {
            display: flex;
            gap: 20px;
          }

          .combo-box label,
          .combo-box select {
            font-size: 13px;
          }

          .combo-box {
            display: flex;
            align-items: center;
            gap: 5px;
          }

          /* 미디어 쿼리: 768px 이하 화면에 적용 */
          @media (max-width: 768px) {
            .container {
              padding: 10px;
            }

            .header-controls {
              flex-direction: column;
              align-items: stretch;
              gap: 15px;
            }

            .combo-group {
              flex-direction: column;
              gap: 15px;
            }

            .buttons {
              justify-content: center;
            }

            .form-list {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>
      <div className="container">
        <h1>입력 화면</h1>

        <form>
          <div className="header-controls">
            <div className="combo-group">
              <div className="combo-box">
                <label htmlFor="user-type">사용자 유형:</label>
                <select id="user-type" name="user-type">
                  <option value="corporate-ceo">법인사업자-대표자</option>
                  <option value="corporate-agent">법인사업자-대리인</option>
                  <option value="individual-ceo">개인-대표자</option>
                </select>
              </div>
              <div className="combo-box">
                <label htmlFor="contact-method">상담 방식:</label>
                <select id="contact-method" name="contact-method">
                  <option value="non-face-to-face">비대면</option>
                  <option value="in-person">대면</option>
                </select>
              </div>
            </div>
            <div className="buttons">
              <button type="submit" className="submit-w">완료문서다운로드</button>
              <button type="submit" className="submit-btn">전자문서 작성시작</button>
            </div>
          </div>

          <div className="section">
            <div className="section-title">견적서 생성</div>
            <ul className="form-list">
              <li><label htmlFor="견적 유형">견적 유형</label><input type="text" id="견적 유형" name="견적 유형" defaultValue="ZAG1" /></li>
              <li><label htmlFor="시스템 설정 코드">시스템 설정 코드</label><input type="text" id="시스템 설정 코드" name="시스템 설정 코드" defaultValue="RAM" />
              </li>
            </ul>
          </div>

          <div className="section">
            <div className="section-title">고객 정보</div>
            <ul className="form-list">
              <li><label htmlFor="고객명">고객명</label><input type="text" id="고객명" name="고객명" defaultValue="포시에스" /></li>
              <li><label htmlFor="고객코드">고객코드</label><input type="text" id="고객코드" name="고객코드" defaultValue="108-81-85184" /></li>
              <li><label htmlFor="우편번호">우편번호</label><input type="text" id="우편번호" name="우편번호" defaultValue="06106" /></li>
              <li><label htmlFor="고객주소1">고객주소1</label><input type="text" id="고객주소1" name="고객주소1" defaultValue="서울특별시 강남구" /></li>
              <li><label htmlFor="고객주소2">고객주소2</label><input type="text" id="고객주소2" name="고객주소2" defaultValue="논현로 646" /></li>
              <li><label htmlFor="고객주소3">고객주소3</label><input type="text" id="고객주소3" name="고객주소3" defaultValue="포시에스빌딩" /></li>
            </ul>
          </div>

          <div className="section">
            <div className="section-title">서비스제공처</div>
            <ul className="form-list">
              <li><label htmlFor="서비스제공처명">서비스제공처명</label><input type="text" id="서비스제공처명" name="서비스제공처명" defaultValue="포시에스빌딩" /></li>
              <li><label htmlFor="서비스제공처 형태">서비스제공처 형태</label><input type="text" id="서비스제공처 형태" name="서비스제공처 형태"
                  defaultValue="응용 소프트웨어 개발 및 공급업" /></li>
              <li><label htmlFor="이름(마스터)">이름(마스터)</label><input type="text" id="이름(마스터)" name="이름(마스터)" defaultValue="홍길동" /></li>
              <li><label htmlFor="휴대전화번호(마스터)">휴대전화번호(마스터)</label><input type="text" id="휴대전화번호(마스터)" name="휴대전화번호(마스터)"
                  defaultValue="01012345678" /></li>
              <li><label htmlFor="서비스제공처우편번호">서비스제공처우편번호</label><input type="text" id="서비스제공처우편번호" name="서비스제공처우편번호"
                  defaultValue="06106" /></li>
              <li><label htmlFor="서비스제공처주소1">서비스제공처주소1</label><input type="text" id="서비스제공처주소1" name="서비스제공처주소1"
                  defaultValue="서울특별시 강남구" /></li>
              <li><label htmlFor="서비스제공처주소2">서비스제공처주소2</label><input type="text" id="서비스제공처주소2" name="서비스제공처주소2"
                  defaultValue="논현로 646" /></li>
              <li><label htmlFor="서비스제공처주소3">서비스제공처주소3</label><input type="text" id="서비스제공처주소3" name="서비스제공처주소3" defaultValue="포시에스빌딩" />
              </li>
            </ul>
          </div>

          <div className="section">
            <div className="section-title">판매 정보</div>
            <ul className="form-list">
              <li><label htmlFor="견적번호">견적번호</label><input type="text" id="견적번호" name="견적번호" defaultValue="6008230012" /></li>
              <li><label htmlFor="견적구분">견적구분</label><input type="text" id="견적구분" name="견적구분" defaultValue="신규" /></li>
              <li><label htmlFor="견적상태">견적상태</label><input type="text" id="견적상태" name="견적상태" defaultValue="견적" /></li>
              <li><label htmlFor="주장치코드">주장치코드</label><input type="text" id="주장치코드" name="주장치코드" defaultValue="CNT10006" /></li>
              <li><label htmlFor="오퍼링">오퍼링</label><input type="text" id="오퍼링" name="오퍼링" defaultValue="영상 > 영상_일반 > -" /></li>
              <li><label htmlFor="카드매수">카드매수</label><input type="text" id="카드매수" name="카드매수" defaultValue="0" /></li>
              <li><label htmlFor="계약서종류">계약서종류</label><input type="text" id="계약서종류" name="계약서종류" defaultValue="표준" /></li>
              <li><label htmlFor="계약기간">계약기간</label><input type="text" id="계약기간" name="계약기간" defaultValue="36개월" /></li>
              <li><label htmlFor="출동료">출동료</label><input type="text" id="출동료" name="출동료" defaultValue="0" /></li>
            </ul>
          </div>


          <div className="section">
            <div className="section-title">견적 금액</div>
            <ul className="form-list">
              <li><label htmlFor="월 서비스료">월 서비스료</label><input type="number" id="월 서비스료" name="월 서비스료" defaultValue="40000" /></li>
              <li><label htmlFor="견적 설치비용">견적 설치비용</label><input type="number" id="견적 설치비용" name="견적 설치비용" defaultValue="400000" /></li>
              <li><label htmlFor="계약 설치비용">계약 설치비용</label><input type="number" id="계약 설치비용" name="계약 설치비용" defaultValue="0" /></li>
              <li><label htmlFor="할인된 설치비용">할인된 설치비용</label><input type="number" id="할인된 설치비용" name="할인된 설치비용" defaultValue="400000" />
              </li>
              <li><label htmlFor="기존 계약의 할인된 설치비용">기존 계약의 할인된 설치비용</label><input type="number" id="기존 계약의 할인된 설치비용"
                  name="기존 계약의 할인된 설치비용" defaultValue="0" /></li>
              <li><label htmlFor="설치 착수 예정일">설치 착수 예정일</label><input type="date" id="설치 착수 예정일" name="설치 착수 예정일"
                  defaultValue="2025-09-10" /></li>
              <li><label htmlFor="서비스 개시 예정일">서비스 개시 예정일</label><input type="date" id="서비스 개시 예정일" name="서비스 개시 예정일"
                  defaultValue="2025-09-10" /></li>
              <li><label htmlFor="대금 총액">대금 총액</label><input type="number" id="대금 총액" name="대금 총액" defaultValue="450000" /></li>
              <li><label htmlFor="판매비">판매비</label><input type="number" id="판매비" name="판매비" defaultValue="450000" /></li>
              <li><label htmlFor="설치비">설치비</label><input type="number" id="설치비" name="설치비" defaultValue="0" /></li>
              <li><label htmlFor="설치 완료 예정일">설치 완료 예정일</label><input type="date" id="설치 완료 예정일" name="설치 완료 예정일"
                  defaultValue="2025-09-10" /></li>
            </ul>
          </div>

          <div className="section">
            <div className="section-title">자재</div>
            <ul className="form-list">
              <li><label htmlFor="안전 상품명">안전 상품명</label><input type="text" id="안전 상품명" name="안전 상품명" defaultValue="안전금고(47L)" /></li>
              <li><label htmlFor="수량">수량</label><input type="number" id="수량" name="수량" defaultValue="1" /></li>
              <li><label htmlFor="비고">비고</label><input type="text" id="비고" name="비고" defaultValue="SFS0100S" /></li>
            </ul>
          </div>

          <div className="section">
            <div className="section-title">정보 동의</div>
            <ul className="form-list">
              <li><label htmlFor="개인정보 수집 동의 (필수 항목)">개인정보 수집 동의 (필수 항목)</label><input type="text" id="개인정보 수집 동의 (필수 항목)"
                  name="개인정보 수집 동의 (필수 항목)" defaultValue="Y" /></li>
              <li><label htmlFor="마케팅 활용 동의">마케팅 활용 동의</label><input type="text" id="마케팅 활용 동의" name="마케팅 활용 동의" defaultValue="N" /></li>
              <li><label htmlFor="광고성 정보 수신 동의">광고정보 수신 동의</label><input type="text" id="광고정보 수신 동의" name="광고정보 수신 동의"
                  defaultValue="N" /></li>
              <li><label htmlFor="제3자 제공 동의 (삼성화재)">제3자 제공 동의 (삼성화재)</label><input type="text" id="제3자 제공 동의 (삼성화재)"
                  name="제3자 제공 동의 (삼성화재)" defaultValue="Y" /></li>
              <li><label htmlFor="제3자 제공 동의 (엘지유플러스)">제3자 제공 동의 (엘지유플러스)</label><input type="text" id="제3자 제공 동의 (엘지유플러스)"
                  name="제3자 제공 동의 (엘지유플러스)" defaultValue="N" /></li>
              <li><label htmlFor="제3자 제공 동의 확인">제3자 제공 동의 확인</label><input type="text" id="제3자 제공 동의 확인" name="제3자 제공 동의 확인"
                  defaultValue="N" /></li>
            </ul>
          </div>

          <div className="section">
            <div className="section-title">청구 정보</div>
            <ul className="form-list">
              <li><label htmlFor="청구방식(카드결제)">청구방식(카드결제)</label><input type="text" id="청구방식(카드결제)" name="청구방식(카드결제)" defaultValue="-" />
              </li>
              <li><label htmlFor="청구방식(자동이체)">청구방식(자동이체)</label><input type="text" id="청구방식(자동이체)" name="청구방식(자동이체)"
                  defaultValue="자동이체" /></li>
              <li><label htmlFor="은행명(카드사)">은행명(카드사)</label><input type="text" id="은행명(카드사)" name="은행명(카드사)" defaultValue="국민은행" /></li>
              <li><label htmlFor="예금주(카드주)">예금주(카드주)</label><input type="text" id="예금주(카드주)" name="예금주(카드주)" defaultValue="주식회사 포시에스" />
              </li>
              <li><label htmlFor="계좌(카드)번호">계좌(카드)번호</label><input type="text" id="계좌(카드)번호" name="계좌(카드)번호"
                  defaultValue="980511-00-122455" /></li>
              <li><label htmlFor="생년월일(사업자번호)">생년월일(사업자번호)</label><input type="text" id="생년월일(사업자번호)" name="생년월일(사업자번호)"
                  defaultValue="108-81-85184" /></li>
              <li><label htmlFor="카드유효기간">카드유효기간</label><input type="text" id="카드유효기간" name="카드유효기간" defaultValue="-" /></li>
              <li><label htmlFor="자동(카드)이체일">자동(카드)이체일</label><input type="text" id="자동(카드)이체일" name="자동(카드)이체일" defaultValue="15일" />
              </li>
              <li><label htmlFor="청구서 수령 방법">청구서 수령 방법</label><input type="text" id="청구서 수령 방법" name="청구서 수령 방법" defaultValue="E-Mail" />
              </li>
              <li><label htmlFor="E-mail 주소">E-mail 주소</label><input type="email" id="E-mail 주소" name="E-mail 주소"
                  defaultValue="mail@forcs.com" /></li>
              <li><label htmlFor="전자 세금계산서 Site">전자 세금계산서 Site</label><input type="text" id="전자 세금계산서 Site" name="전자 세금계산서 Site"
                  defaultValue="www.smartbill.co.kr" /></li>
              <li><label htmlFor="세금계산서 E-mail">세금계산서 E-mail</label><input type="email" id="세금계산서 E-mail" name="세금계산서 E-mail"
                  defaultValue="bill@forcs.com" /></li>
            </ul>
          </div>
        </form>
      </div>
      <Script id="form-script-4">
        {`
          (() => {
            // ====== 환경 ======
            if (!("BASE_API" in window)) window.BASE_API = "http://localhost:8000";
            const ALLOWED_ORIGIN = window.location.origin;
            const POPUP_URL = "/embed.html"; // 동일 오리진 권장(이미 사용 중)

            // ====== 템플릿 매핑 ======
            // key: { form:"APW|ART|RAM|MSA", biz:"법인사업자-대표자|법인사업자-대리인|개인-대표자|개인사업자-대표자", contact:"비대면|대면" }
            // value: { template_id, page: "3-1|3-3|3-5|3-7" }
            const TEMPLATE_MAP = [
              // 2. 시스템경비신청서(APW)
              { form: "APW", biz: "법인사업자-대표자", contact: "비대면", template_id: "6e0bfaf7b13d4f4ca8565f93ece4d49d", page: "3-1" },
              { form: "APW", biz: "법인사업자-대리인", contact: "비대면", template_id: "52f5ccd079d745598636176ca3edaf42", page: "3-1" },

              // 4~5. 계약변경신청서(ART)
              { form: "ART", biz: "개인-대표자", contact: "비대면", template_id: "0ab7e9521f834f74a4dbfe936315cc19", page: "3-3" },
              { form: "ART", biz: "개인-대표자", contact: "대면", template_id: "4c49689673784b75844a383a97795e02", page: "3-3" },

              // 6. RAM/MSA (연구소 멀티템플릿 예정 → 우선 3-5에서 각각 단일 전송)
              { form: "RAM", biz: "개인사업자-대표자", contact: "비대면", template_id: "741fcdd232bc4871a29f0e89452e3fad", page: "3-5" },
              { form: "MSA", biz: "개인사업자-대표자", contact: "비대면", template_id: "9bac570e8ad84818b3f35be7fc30c274", page: "3-5" },

              // 7. 승계합의서(APW) → 3-7
              { form: "APW", biz: "개인-대표자", contact: "비대면", template_id: "558bd69ab88548b4a4b043b694c7afaa", page: "3-7" },
            ];

            // ====== 인증/알림 정책(샘플) ======
            // eformsign 계정별 실제 설정값/코드에 맞춰 바꿔야 함.
            // - use_mail/use_sms/use_alimtalk: 채널 플래그
            // - auth: { method: "CORP_CERT|PASS|NONE", valid: { day, hour } } 등
            function buildStepSettings(scenario, customer) {
              const base = {
                recipient: { id: customer.email || "", name: customer.name || "수신자" },
                auth: { valid: { day: "7", hour: "0" } }
              };

              // 시나리오 매핑
              // 2) APW 법인대표: 이메일 + 법인공동인증서
              if (scenario.form === "APW" && scenario.biz === "법인사업자-대표자") {
                return [{
                  step_type: "05", step_name: "대표자",
                  use_mail: true, use_sms: false, use_alimtalk: false,
                  ...base, auth: { ...base.auth, method: "CORP_CERT" }
                }];
              }

              // 3) APW 법인대리인: 이메일 + PASS 인증 (→ 이후 내부 프로세스: 법인 인감/위임장/영업지원팀)
              if (scenario.form === "APW" && scenario.biz === "법인사업자-대리인") {
                return [{
                  step_type: "05", step_name: "대리인",
                  use_mail: true, use_sms: true, use_alimtalk: false,
                  ...base, auth: { ...base.auth, method: "PASS" }
                }];
              }

              // 4) ART 개인대표 비대면: SMS + PASS → 모바일 서명 → 알림톡
              if (scenario.form === "ART" && scenario.biz === "개인-대표자" && scenario.contact === "비대면") {
                return [{
                  step_type: "05", step_name: "대표자",
                  use_mail: false, use_sms: true, use_alimtalk: true,
                  ...base, auth: { ...base.auth, method: "PASS" }
                }];
              }

              // 5) ART 개인대표 대면: 노트북 현장 서명(알림톡)
              if (scenario.form === "ART" && scenario.biz === "개인-대표자" && scenario.contact === "대면") {
                return [{
                  step_type: "05", step_name: "대표자",
                  use_mail: false, use_sms: false, use_alimtalk: true,
                  ...base, auth: { ...base.auth, method: "NONE" } // 현장 본인확인 절차(영업사원)
                }];
              }

              // 6) RAM/MSA: SMS + PASS → 모바일 서명 → 알림톡
              if ((scenario.form === "RAM" || scenario.form === "MSA")) {
                return [{
                  step_type: "05", step_name: "대표자",
                  use_mail: false, use_sms: true, use_alimtalk: true,
                  ...base, auth: { ...base.auth, method: "PASS" }
                }];
              }

              // 7) 승계합의서(APW 개인대표): 이메일 + PASS, 병렬(양수/양도) 예시
              if (scenario.form === "APW" && scenario.biz === "개인-대표자" && scenario.page === "3-7") {
                // 병렬 날인(예: 동일 step_order), 권한별 필드 보임/숨김은 템플릿 내 “권한/역할”에 맞춰 구성 필요
                return [
                  {
                    step_type: "05", step_name: "양수자", use_mail: true, use_sms: true, use_alimtalk: true,
                    ...base, recipient: { id: customer.email_buyer || "", name: customer.name_buyer || "양수자" },
                    auth: { ...base.auth, method: "PASS" }, step_order: "1"
                  },
                  {
                    step_type: "05", step_name: "양도자", use_mail: true, use_sms: true, use_alimtalk: true,
                    ...base, recipient: { id: customer.email_seller || "", name: customer.name_seller || "양도자" },
                    auth: { ...base.auth, method: "PASS" }, step_order: "1"
                  },
                ];
              }

              // 기본값(안정)
              return [{ step_type: "05", step_name: "서명자", use_mail: true, ...base, auth: { ...base.auth, method: "NONE" } }];
            }

            // ====== 유틸 ======
            async function fetchJSON(url, opt) {
              const r = await fetch(url, opt);
              if (!r.ok) throw new Error(\`Load failed: \${r.status}\`);
              return r.json();
            }
            function collectInputs() {
              const fields = [];
              document.querySelectorAll("#main-content input[id]").forEach(el => {
                fields.push({ id: el.id, value: (el.value ?? "").trim(), enabled: true, required: false });
              });
              return fields;
            }
            function pickInput(id) {
              return document.querySelector(\`#main-content input[id="\${id}"]\`)?.value?.trim() || "";
            }

            // ====== 임베딩 팝업 통신 ======
            let popupRef = null, ready = false, payload = null, pingTimer = null, pingCount = 0;

            window.addEventListener("message", (event) => {
              if (event.origin !== ALLOWED_ORIGIN) return;
              let data = event.data;
              try { if (typeof data === "string") data = JSON.parse(data); } catch { }
              if (!data || typeof data !== "object") return;

              if (data.type === "READY_TEMPLATE") {
                ready = true;
                if (popupRef && payload) {
                  popupRef.postMessage(JSON.stringify({ type: "OPEN_TEMPLATE", ...payload }), ALLOWED_ORIGIN);
                }
                if (pingTimer) { clearInterval(pingTimer); pingTimer = null; }
              }

              // 팝업 → 부모 : 작성 완료/저장 시 주소 등 필드 반환(가이드에 따라 onAction/onSuccess에서 보내줌)
              if (data.type === "DOC_RESULT") {
                // CRM 로직: 주소계열 반영 예시
                const addr1 = data.fields?.find(f => f.id === "고객주소1")?.value || "";
                const addr2 = data.fields?.find(f => f.id === "고객주소2")?.value || "";
                const addr3 = data.fields?.find(f => f.id === "고객주소3")?.value || "";
                console.log("[CRM] 주소반영:", addr1, addr2, addr3);
                // TODO: CRM 상태 업데이트(필요시 백엔드로 전달)
              }
            });

            function openPopup() {
              const w = 1200, h = 900;
              const left = Math.max(0, ((screen.width - w) / 2) | 0);
              const top = Math.max(0, ((screen.height - h) / 2) | 0);
              return window.open(POPUP_URL, "efs_template",
                \`width=\${w},height=\${h},left=\${left},top=\${top}\`);
            }

            // ====== 템플릿 선택 ======
            function resolveTemplate({ form, biz, contact, pageHint }) {
              return TEMPLATE_MAP.find(x =>
                x.form === form && x.biz === biz && x.contact === contact &&
                (!pageHint || x.page === pageHint)
              )?.template_id || null;
            }

            // ====== “전자문서 작성 시작” ======
            async function onClickStart(e) {
              e.preventDefault(); e.stopPropagation();

              // CRM에서 세팅된 값(화면의 드롭다운/히든 값으로 전달받는다는 가정)
              const form = document.querySelector('#crm-form-code')?.value ||  // "APW"|"ART"|"RAM"|"MSA"
                document.querySelector('#form-code')?.value || "APW";
              const biz = document.querySelector('#user-type')?.selectedOptions?.[0]?.textContent?.trim()
                || "법인사업자-대표자";
              const contactSel = document.querySelector('#contact-method')?.selectedOptions?.[0]?.textContent?.trim()
                || "비대면";
              // 현재 페이지 힌트(3-1/3-3/3-5/3-7 등) - 필요 시 data-page 속성으로 제공
              const pageHint = document.body.getAttribute("data-page") || null;

              const template_id = resolveTemplate({ form, biz, contact: contactSel, pageHint });
              if (!template_id) {
                alert(\`템플릿 매핑 실패: (\${form}/\${biz}/\${contactSel})에 해당하는 템플릿이 없습니다.\`);
                return;
              }

              // 팝업 먼저
              popupRef = openPopup();
              if (!popupRef) { alert("팝업이 차단되었습니다. 허용해 주세요."); return; }

              try {
                const [{ company_id, country_code }, token] = await Promise.all([
                  fetchJSON(\`\${BASE_API}/api/eform/config\`),
                  fetchJSON(\`\${BASE_API}/api/eform/token\`, { method: "POST" })
                ]);

                // 입력값 수집 → 프리필
                const fields = collectInputs();

                // 고객(대표자/대리인) 정보(이메일/이름 등)
                const customer = {
                  email: pickInput("E-mail 주소") || pickInput("세금계산서 E-mail") || "",
                  name: pickInput("고객명") || "고객"
                };

                // 인증/알림/스텝 설정
                const scenario = { form, biz, contact: contactSel, page: pageHint };
                const step_settings = buildStepSettings(scenario, customer);

                // 반환 받을 필드(주소 인터페이스)
                const return_fields = ["고객주소1", "고객주소2", "고객주소3", "우편번호"];

                payload = {
                  account: { company_id, country_code: country_code || "kr" },
                  token, // {access_token}
                  prefill: {
                    template_id,
                    document_name: \`\${form}_문서_\${new Date().toISOString().slice(0, 10)}\`,
                    fields,
                    step_settings
                  },
                  return_fields
                };

                // READY_TEMPLATE 대기(PING)
                ready = false; let count = 0;
                pingTimer = setInterval(() => {
                  if (!popupRef || popupRef.closed) { clearInterval(pingTimer); pingTimer = null; return; }
                  if (ready) { clearInterval(pingTimer); pingTimer = null; return; }
                  try { popupRef.postMessage(JSON.stringify({ type: "PING_PARENT" }), ALLOWED_ORIGIN); } catch { }
                  if (++count >= 20) { clearInterval(pingTimer); pingTimer = null; alert("임베딩 준비 신호 미수신. 팝업 새로고침 해보세요."); }
                }, 500);

              } catch (err) {
                console.error(err);
                alert("문서 작성 준비 실패: " + (err?.message || err));
              }
            }

            // ====== “전자문서관리(완료문서 조회)” ======
            async function onClickManage(e) {
              e.preventDefault(); e.stopPropagation();
              try {
                // 완료문서 조회(예: 최신 20건)
                const res = await fetchJSON(\`\${BASE_API}/api/eform/documents/list\`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ type: "03", limit: 20, skip: 0 })
                });
                console.log("[문서관리] 완료문서:", res);
                alert(\`완료문서 \${res?.items?.length || 0}건 조회됨(콘솔 확인)\`);
                // 필요 시, 별도 관리 화면으로 이동/표시
              } catch (err) {
                console.error(err);
                alert("완료문서 조회 실패: " + (err?.message || err));
              }
            }

            // 버튼 연결
            document.querySelector(".submit-btn")?.addEventListener("click", onClickStart);
            document.querySelector(".submit-w")?.addEventListener("click", onClickManage);
          })();
        `}
      </Script>
    </>
  );
}

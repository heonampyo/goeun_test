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

          .buttons .submit-w {
            background-color: #f0f0f0;
            color: #000;
            border: 1px solid #ccc;
          }

          .buttons .submit-w:hover {
            background-color: #e0e0e0;
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
        <h1>입력 화면(바로전송)</h1>
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
              <button type="button" className="submit-w">완료문서다운로드</button>
              <button type="button" className="submit-btn">전자문서 작성시작</button>
            </div>
          </div>

          <div className="section">
            <div className="section-title">견적서 생성</div>
            <ul className="form-list">
              <li><label htmlFor="견적 유형">견적 유형</label><input type="text" id="견적 유형" name="견적 유형" defaultValue="ZAG1" /></li>
              <li><label htmlFor="시스템 설정 코드">시스템 설정 코드</label><input type="text" id="시스템 설정 코드" name="시스템 설정 코드" defaultValue="APW" />
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
              <li><label htmlFor="고객주소3">고객주소3</label><input type="text" id="고객주소3" name="고객주소3" defaultValue="102호" /></li>
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
                  defaultValue="논현로 6446" /></li>
              <li><label htmlFor="서비스제공처주소3">서비스제공처주소3</label><input type="text" id="서비스제공처주소3" name="서비스제공처주소3" defaultValue="포시에스빌딩" />
              </li>
            </ul>
          </div>

          <div className="section">
            <div className="section-title">판매 정보</div>
            <ul className="form-list">
              <li><label htmlFor="견적번호">견적번호</label><input type="text" id="견적번호" name="견적번호" defaultValue="6008198616" /></li>
              <li><label htmlFor="견적구분">견적구분</label><input type="text" id="견적구분" name="견적구분" defaultValue="신규" /></li>
              <li><label htmlFor="견적상태">견적상태</label><input type="text" id="견적상태" name="견적상태" defaultValue="견적" /></li>
              <li><label htmlFor="주장치코드">주장치코드</label><input type="text" id="주장치코드" name="주장치코드" defaultValue="CNT10006" /></li>
              <li><label htmlFor="오퍼링">오퍼링</label><input type="text" id="오퍼링" name="오퍼링" defaultValue="방범" /></li>
              <li><label htmlFor="오퍼링_2">오퍼링</label><input type="text" id="오퍼링_2" name="오퍼링_2" defaultValue="-" /></li>
              <li><label htmlFor="오퍼링_3">오퍼링</label><input type="text" id="오퍼링_3" name="오퍼링_3" defaultValue="영상" /></li>
              <li><label htmlFor="오퍼링_4">오퍼링</label><input type="text" id="오퍼링_4" name="오퍼링_4" defaultValue="-" /></li>
              <li><label htmlFor="오퍼링_5">오퍼링</label><input type="text" id="오퍼링_5" name="오퍼링_5" defaultValue="출입" /></li>
              <li><label htmlFor="카드 매수">카드 매수</label><input type="text" id="카드 매수" name="카드 매수" defaultValue="5" /></li>
              <li><label htmlFor="계약서종류">계약서종류</label><input type="text" id="계약서종류" name="계약서종류" defaultValue="표준" /></li>
              <li><label htmlFor="계약기간">계약기간</label><input type="text" id="계약기간" name="계약기간" defaultValue="36개월" /></li>
              <li><label htmlFor="통신회선">통신회선</label><input type="text" id="통신회선" name="통신회선" defaultValue="S1NET(무선망)" /></li>
              <li><label htmlFor="출동료">출동료</label><input type="text" id="출동료" name="출동료" defaultValue="5,000원" /></li>
            </ul>
          </div>

          <div className="section">
            <div className="section-title">손해보상 한도액</div>
            <ul className="form-list">
              <li><label htmlFor="방범서비스(대인)">방범서비스(대인)</label><input type="text" id="방범서비스(대인)" name="방범서비스(대인)" defaultValue="2억원" />
              </li>
              <li><label htmlFor="방범서비스(대물)">방범서비스(대물)</label><input type="text" id="방범서비스(대물)" name="방범서비스(대물)" defaultValue="1억원" />
              </li>
            </ul>
          </div>

          <div className="section">
            <div className="section-title">배보상 정보</div>
            <ul className="form-list">
              <li><label htmlFor="스페셜보험">스페셜보험</label><input type="text" id="스페셜보험" name="스페셜보험" defaultValue="1.5천만원" /></li>
              <li><label htmlFor="정전안심">정전안심</label><input type="text" id="정전안심" name="정전안심" defaultValue="-" /></li>
              <li><label htmlFor="화재안심">화재안심</label><input type="text" id="화재안심" name="화재안심" defaultValue="-" /></li>
              <li><label htmlFor="이웃배상">이웃배상</label><input type="text" id="이웃배상" name="이웃배상" defaultValue="-" /></li>
              <li><label htmlFor="매출안심">매출안심</label><input type="text" id="매출안심" name="매출안심" defaultValue="-" /></li>
              <li><label htmlFor="영상도난손해">영상도난손해</label><input type="text" id="영상도난손해" name="영상도난손해" defaultValue="-" /></li>
              <li><label htmlFor="풍수재보험">풍수재보험</label><input type="text" id="풍수재보험" name="풍수재보험" defaultValue="-" /></li>
            </ul>
          </div>


          <div className="section">
            <div className="section-title">견적 금액</div>
            <ul className="form-list">
              <li><label htmlFor="신청금">신청금</label><input type="number" id="신청금" name="신청금" defaultValue="0" /></li>
              <li><label htmlFor="월 서비스료">월 서비스료</label><input type="number" id="월 서비스료" name="월 서비스료" defaultValue="110000" /></li>
              <li><label htmlFor="견적 설치비용">견적 설치비용</label><input type="number" id="견적 설치비용" name="견적 설치비용" defaultValue="400000" /></li>
              <li><label htmlFor="계약 설치비용">계약 설치비용</label><input type="number" id="계약 설치비용" name="계약 설치비용" defaultValue="220000" /></li>
              <li><label htmlFor="할인된 설치비용">할인된 설치비용</label><input type="number" id="할인된 설치비용" name="할인된 설치비용" defaultValue="180000" />
              </li>
              <li><label htmlFor="기존 계약의 할인된 설치비용">기존 계약의 할인된 설치비용</label><input type="number" id="기존 계약의 할인된 설치비용"
                  name="기존 계약의 할인된 설치비용" defaultValue="0" /></li>
              <li><label htmlFor="설치 착수 예정일">설치 착수 예정일</label><input type="date" id="설치 착수 예정일" name="설치 착수 예정일"
                  defaultValue="2025-09-03" /></li>
              <li><label htmlFor="서비스 개시 예정일">서비스 개시 예정일</label><input type="date" id="서비스 개시 예정일" name="서비스 개시 예정일"
                  defaultValue="2025-09-03" /></li>
            </ul>
          </div>

          <div className="section">
            <div className="section-title">정보 동의</div>
            <ul className="form-list">
              <li><label htmlFor="개인정보 수집 동의 (필수 항목)">개인정보 수집 동의 (필수 항목)</label><input type="text" id="개인정보 수집 동의 (필수 항목)"
                  name="개인정보 수집 동의 (필수 항목)" defaultValue="N" /></li>
              <li><label htmlFor="마케팅 활용 동의">마케팅 활용 동의</label><input type="text" id="마케팅 활용 동의" name="마케팅 활용 동의" defaultValue="N" /></li>
              <li><label htmlFor="광고성 정보 수신 동의">광고정보 수신 동의</label><input type="text" id="광고정보 수신 동의" name="광고정보 수신 동의"
                  defaultValue="N" /></li>
              <li><label htmlFor="제3자 제공 동의 (삼성화재)">제3자 제공 동의 (삼성화재)</label><input type="text" id="제3자 제공 동의 (삼성화재)"
                  name="제3자 제공 동의 (삼성화재)" defaultValue="N" /></li>
              <li><label htmlFor="제3자 제공 동의 (엘지유플러스)">제3자 제공 동의 (엘지유플러스)</label><input type="text" id="제3자 제공 동의 (엘지유플러스)"
                  name="제3자 제공 동의 (엘지유플러스)" defaultValue="N" /></li>
              <li><label htmlFor="제3자 제공 동의 확인">제3자 제공 동의 확인</label><input type="text" id="제3자 제공 동의 확인" name="제3자 제공 동의 확인"
                  defaultValue="N" /></li>
            </ul>
          </div>

          <div className="section">
            <div className="section-title">청구 정보</div>
            <ul className="form-list">
              <li><label htmlFor="청구방식(카드결제)">청구방식(카드결제)</label><input type="text" id="청구방식(카드결제)" name="청구방식(카드결제)"
                  defaultValue="카드결제" /></li>
              <li><label htmlFor="청구방식(자동이체)">청구방식(자동이체)</label><input type="text" id="청구방식(자동이체)" name="청구방식(자동이체)" defaultValue="-" />
              </li>
              <li><label htmlFor="은행명(카드사)">은행명(카드사)</label><input type="text" id="은행명(카드사)" name="은행명(카드사)" defaultValue="삼성카드" /></li>
              <li><label htmlFor="예금주(카드주)">예금주(카드주)</label><input type="text" id="예금주(카드주)" name="예금주(카드주)" defaultValue="주식회사 포시에스" />
              </li>
              <li><label htmlFor="계좌(카드)번호">계좌(카드)번호</label><input type="text" id="계좌(카드)번호" name="계좌(카드)번호"
                  defaultValue="4045770013456487" /></li>
              <li><label htmlFor="생년월일(사업자번호)">생년월일(사업자번호)</label><input type="text" id="생년월일(사업자번호)" name="생년월일(사업자번호)"
                  defaultValue="108-81-85184" /></li>
              <li><label htmlFor="카드유효기간">카드유효기간</label><input type="text" id="카드유효기간" name="카드유효기간" defaultValue="09월 30년" /></li>
              <li><label htmlFor="자동(카드)이체일">자동(카드)이체일</label><input type="text" id="자동(카드)이체일" name="자동(카드)이체일" defaultValue="21일" />
              </li>
              <li><label htmlFor="청구서 수령 방법">청구서 수령 방법</label><input type="text" id="청구서 수령 방법" name="청구서 수령 방법" defaultValue="E-Mail" />
              </li>
              <li><label htmlFor="E-mail 주소">E-mail 주소</label><input type="email" id="E-mail 주소" name="E-mail 주소"
                  defaultValue="eformsign@forcs.com" /></li>
              <li><label htmlFor="전자 세금계산서 Site">전자 세금계산서 Site</label><input type="text" id="전자 세금계산서 Site" name="전자 세금계산서 Site"
                  defaultValue="www.smartbill.co.kr" /></li>
              <li><label htmlFor="세금계산서 E-mail">세금계산서 E-mail</label><input type="email" id="세금계산서 E-mail" name="세금계산서 E-mail"
                  defaultValue="bill@forcs.com" /></li>
            </ul>
          </div>

        </form>
      </div>
      <Script id="form-script">
        {`
          (function () {
            const BASE_API = "http://localhost:8000";
            const TEMPLATE_ID = "6e0bfaf7b13d4f4ca8565f93ece4d49d"; // APW 법인사업자-대표자(비대면)
            let lastDocumentId = null;

            // ===== 화면 디버그 패널 =====
            function ensureDebugPanel() {
              if (document.getElementById("debug")) return;
              const box = document.createElement("div");
              box.id = "debug";
              box.style.cssText = "position:fixed;right:12px;bottom:12px;width:420px;max-height:45vh;background:#0b1020;color:#dfe6ff;border:1px solid #2e3a75;border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,.25);font:12px/1.4 ui-monospace,Menlo,Consolas,monospace;z-index:99999;display:flex;flex-direction:column;";
              box.innerHTML = \`
            <div style="padding:6px 10px;background:#1a2250;border-bottom:1px solid #2e3a75;display:flex;justify-content:space-between;align-items:center;">
              <strong>DEBUG</strong>
              <button id="dbgClear" style="background:#2a3478;border:0;color:#dfe6ff;padding:3px 6px;border-radius:4px;cursor:pointer">clear</button>
            </div>
            <div id="dbgBody" style="padding:8px 10px;overflow:auto;white-space:pre-wrap;word-break:break-all;flex:1;"></div>
          \`;
              document.body.appendChild(box);
              document.getElementById("dbgClear").onclick = () => (document.getElementById("dbgBody").textContent = "");
            }
            function log(...args) {
              console.log(...args);
              ensureDebugPanel();
              const line = \`[\${new Date().toLocaleTimeString()}] \` + args.map(a => {
                try { return typeof a === "string" ? a : JSON.stringify(a, null, 2); }
                catch { return String(a); }
              }).join(" ");
              const el = document.getElementById("dbgBody");
              if (el) {
                el.textContent += line + "\\n";
                el.scrollTop = el.scrollHeight;
              }
            }

            // ===== 유틸 =====
            function getById(id) { return document.getElementById(id); }
            function normalizeNumeric(v) {
              if (v == null) return "";
              return String(v).replace(/[^\\d.-]/g, "");
            }
            function isEmail(s) {
              return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s).trim());
            }

            // 모든 input[id]를 {id,value}로 수집(숫자 정규화)
            function collectFields() {
              const fields = [];
              document.querySelectorAll("input[id]").forEach((el) => {
                if (!el.id) return;
                let val = el.value ?? "";

                // 오직 number 타입에만 숫자 정규화
                if (el.type === "number") {
                  val = String(val).replace(/[^\\d.-]/g, "");
                }

                // checkbox 등도 필요하면 여기서 처리
                if (el.type === "checkbox") {
                  val = el.checked ? (el.value || "Y") : "";
                }

                if (val !== "") fields.push({ id: el.id, value: val });
              });

              log("수집된 필드(정규화 후)", fields);
              return fields;
            }

            // ===== 동작핵심: 문서 생성 =====
            async function startDocument() {
              log("전자문서 작성 버튼 클릭");

              const sysCode = getById("시스템 설정 코드")?.value;
              const userType = getById("user-type")?.value;
              const contact = getById("contact-method")?.value;

              if (sysCode !== "APW") {
                alert("시스템 설정 코드가 APW가 아닙니다.");
                log("조건불일치: 시스템설정코드", sysCode);
                return;
              }
              if (!(userType === "corporate-ceo" && contact === "non-face-to-face")) {
                alert("이 화면은 법인사업자-대표자(비대면) 전용입니다.");
                log("조건불일치: userType/contact", { userType, contact });
                return;
              }

              const email = getById("E-mail 주소")?.value || "";
              if (!isEmail(email)) {
                alert("E-mail 주소가 올바르지 않습니다.");
                log("잘못된 이메일", email);
                return;
              }

              const fields = collectFields();
              const docName = \`APW_대표자_\${getById("고객명")?.value || ""}_\${new Date().toISOString().slice(0, 10)}\`;

              const payload = {
                template_id: TEMPLATE_ID,
                document: {
                  document_name: docName,
                  fields,
                  recipients: [
                    {
                      step_type: "05",
                      step_name: "대표자",
                      use_mail: true,
                      use_sms: false,
                      use_alimtalk: false,
                      recipients: [{ id: email }]
                    }
                  ]
                }
              };

              log("요청 payload", payload);

              let res, text;
              try {
                res = await fetch(\`\${BASE_API}/api/eform/documents/start\`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(payload)
                });
                text = await res.text();
                log("응답 raw", { status: res.status, text });
                let data;
                try { data = JSON.parse(text); } catch { data = { raw: text }; }

                if (!res.ok) {
                  alert(\`문서 생성 실패 (HTTP \${res.status})\`);
                  return;
                }

                lastDocumentId = data.document_id || data.id || data?.document?.id;
                if (!lastDocumentId) {
                  alert("문서 생성은 성공했으나 문서ID를 찾지 못했습니다.");
                  log("문서ID 누락 응답", data);
                  return;
                }
                alert("전자문서 생성 완료! 문서ID: " + lastDocumentId);
              } catch (err) {
                log("fetch 오류", err);
                alert("문서 생성 실패: " + (err?.message || err));
              }
            }

            // ===== 완료문서 다운로드 =====
            function downloadDocument() {
              log("완료문서다운로드 클릭, lastDocumentId=", lastDocumentId);
              if (!lastDocumentId) {
                alert("먼저 전자문서를 생성하세요.");
                return;
              }
              const url = \`\${BASE_API}/api/eform/documents/\${encodeURIComponent(lastDocumentId)}/files?type=document\`;
              window.open(url, "_blank");
            }

            // ===== 핸들러 바인딩(조각 HTML로 삽입된 경우까지 대비) =====
            function bindHandlers() {
              ensureDebugPanel();
              log("bindHandlers 호출");

              const btnStart = document.querySelector(".submit-btn");
              const btnDown = document.querySelector(".submit-w");
              const form = document.querySelector("form");

              if (!btnStart || !btnDown || !form) {
                log("버튼/폼 엘리먼트 아직 없음. 200ms 후 재시도");
                setTimeout(bindHandlers, 200);
                return;
              }

              // 중복 바인딩 방지
              if (!btnStart._bound) {
                btnStart.addEventListener("click", startDocument);
                btnStart._bound = true;
                log(".submit-btn 바인딩 완료");
              }
              if (!btnDown._bound) {
                btnDown.addEventListener("click", downloadDocument);
                btnDown._bound = true;
                log(".submit-w 바인딩 완료");
              }
              if (!form._bound) {
                form.addEventListener("submit", (e) => e.preventDefault());
                form._bound = true;
                log("form submit 방지 바인딩 완료");
              }
            }

            // 즉시 바인딩 + DOMContentLoaded 이중 보강
            bindHandlers();
            if (document.readyState === "loading") {
              document.addEventListener("DOMContentLoaded", () => {
                log("DOMContentLoaded");
                bindHandlers();
              });
            } else {
              log("DOM 이미 준비됨");
            }

            // 전역 에러 캐치
            window.addEventListener("error", (e) => {
              log("window.onerror", e?.message || e);
            });
            window.addEventListener("unhandledrejection", (e) => {
              log("unhandledrejection", e?.reason || e);
            });
          })();
        `}
      </Script>
    </>
  );
}

"use client";

import { useState, useEffect } from 'react';

// ... (이전에 page.tsx에 있던 FormSection, FormItem 컴포넌트 정의) ...
interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}
const FormSection: React.FC<FormSectionProps> = ({ title, children }) => (
  <div className="mb-5 p-4 border border-gray-200 rounded-md bg-gray-50">
    <h2 className="text-lg font-bold text-blue-600 mb-3 pb-2 border-b border-blue-600">{title}</h2>
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3">
      {children}
    </ul>
  </div>
);
interface FormItemProps {
  label: string;
  id: string;
  value: string | number;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}
const FormItem: React.FC<FormItemProps & { isUpdated?: boolean }> = ({ label, id, value, type = "text", onChange, isUpdated }) => (
  <li className="flex items-center">
    <label htmlFor={id} className="w-32 flex-shrink-0 font-bold text-black text-sm">{label}</label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      className={`flex-grow p-1.5 border border-gray-300 rounded-sm text-xs focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-black ${isUpdated ? 'bg-yellow-200' : ''}`}
    />
  </li>
);


export default function EformPage() {
  const [updatedFields, setUpdatedFields] = useState<Set<string>>(new Set());
  const [formData, setFormData] = useState({
    '견적 유형': 'ZAG1',
    '시스템 설정 코드': 'APW',
    '고객명': '포시에스',
    '고객코드': '108-81-85184',
    '우편번호': '06106',
    '고객주소1': '서울특별시 강남구',
    '고객주소2': '논현로 646',
    '고객주소3': '102호',
    '서비스제공처명': '포시에스빌딩',
    '서비스제공처 형태': '응용 소프트웨어 개발 및 공급업',
    '이름(마스터)': '홍길동',
    '휴대전화번호(마스터)': '01012345678',
    '서비스제공처우편번호': '06106',
    '서비스제공처주소1': '서울특별시 강남구',
    '서비스제공처주소2': '논현로 6446',
    '서비스제공처주소3': '포시에스빌딩',
    '견적번호': '6008198616',
    '견적구분': '신규',
    '견적상태': '견적',
    '주장치코드': 'CNT10006',
    '오퍼링': '방범',
    '오퍼링_2': '-',
    '오퍼링_3': '영상',
    '오퍼링_4': '-',
    '오퍼링_5': '출입',
    '카드 매수': '5',
    '계약서종류': '표준',
    '계약기간': '36개월',
    '통신회선': 'S1NET(무선망)',
    '출동료': '5,000원',
    '방범서비스(대인)': '2억원',
    '방범서비스(대물)': '1억원',
    '스페셜보험': '1.5천만원',
    '정전안심': '-',
    '화재안심': '-',
    '이웃배상': '-',
    '매출안심': '-',
    '영상도난손해': '-',
    '풍수재보험': '-',
    '신청금': 0,
    '월 서비스료': 110000,
    '견적 설치비용': 400000,
    '계약 설치비용': 220000,
    '할인된 설치비용': 180000,
    '기존 계약의 할인된 설치비용': 0,
    '설치 착수 예정일': '2025-09-03',
    '서비스 개시 예정일': '2025-09-03',
    '개인정보 수집 동의 (필수 항목)': 'N',
    '마케팅 활용 동의': 'N',
    '광고정보 수신 동의': 'N',
    '제3자 제공 동의 (삼성화재)': 'N',
    '제3자 제공 동의 (엘지유플러스)': 'N',
    '제3자 제공 동의 확인': 'N',
    '청구방식(카드결제)': '카드결제',
    '청구방식(자동이체)': '-',
    '은행명(카드사)': '삼성카드',
    '예금주(카드주)': '주식회사 포시에스',
    '계좌(카드)번호': '4045770013456487',
    '생년월일(사업자번호)': '108-81-85184',
    '카드유효기간': '09월 30년',
    '자동(카드)이체일': '21일',
    '청구서 수령 방법': 'E-Mail',
    'E-mail 주소': 'eformsign@forcs.com',
    '전자 세금계산서 Site': 'www.smartbill.co.kr',
    '세금계산서 E-mail': 'bill@forcs.com',
  });
  const [userType, setUserType] = useState('corporate-ceo');
  const [contactMethod, setContactMethod] = useState('non-face-to-face');
  const [lastDocumentId, setLastDocumentId] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    const type = (e.target as HTMLInputElement).type;
    setFormData(prev => ({ ...prev, [id]: type === 'number' ? Number(value) : value }));
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      let data;
      try {
        if (typeof event.data === "string") data = JSON.parse(event.data);
      } catch {}
      if (!data || typeof data !== "object" || event.origin !== window.location.origin) return;

      if (data.type === "DOC_RESULT" && data.document_id) {
        console.log('[CRM] DOC_RESULT 수신:', data.document_id);
        setLastDocumentId(data.document_id);
        pollWebhookData(data.document_id);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleStartDocument = async () => {
    const TEMPLATE_MAP = [
        { form: "APW", biz: "법인사업자-대표자", contact: "비대면", template_id: "6e0bfaf7b13d4f4ca8565f93ece4d49d" },
        { form: "APW", biz: "법인사업자-대리인", contact: "비대면", template_id: "52f5ccd079d745598636176ca3edaf42" },
        { form: "ART", biz: "개인-대표자", contact: "비대면", template_id: "0ab7e9521f834f74a4dbfe936315cc19" },
        { form: "ART", biz: "개인-대표자", contact: "대면", template_id: "4c49689673784b75844a383a97795e02" },
        { form: "RAM", biz: "개인사업자-대표자", contact: "비대면", template_id: "741fcdd232bc4871a29f0e89452e3fad" },
        { form: "MSA", biz: "개인사업자-대표자", contact: "비대면", template_id: "9bac570e8ad84818b3f35be7fc30c274" },
        { form: "APW", biz: "개인-대표자", contact: "비대면", template_id: "558bd69ab88548b4a4b043b694c7afaa" },
      ];

    const biz = userType === 'corporate-ceo' ? '법인사업자-대표자' : userType === 'corporate-agent' ? '법인사업자-대리인' : '개인-대표자';
    const contact = contactMethod === 'non-face-to-face' ? '비대면' : '대면';
    
    const mapping = TEMPLATE_MAP.find(m => m.biz === biz && m.contact === contact);
    if (!mapping) {
      alert(`템플릿 매핑 실패: (${biz}/${contact})`);
      return;
    }
    const template_id = mapping.template_id;

    const popup = window.open('/embed.html', 'efs_template', 'width=1200,height=900');
    if (!popup) {
      alert("팝업이 차단되었습니다. 허용해주세요.");
      return;
    }

    try {
      const [configRes, tokenRes] = await Promise.all([
        fetch('/api/eform/config'),
        fetch('/api/eform/token', { method: 'POST' })
      ]);

      if (!configRes.ok || !tokenRes.ok) {
        throw new Error('설정 또는 토큰 API 호출에 실패했습니다.');
      }

      const config = await configRes.json();
      const token = await tokenRes.json();

      const fields = Object.entries(formData).map(([id, value]) => ({ id, value: String(value) }));
      const docName = `APW_대표자_${formData['고객명']}_${new Date().toISOString().slice(0, 10)}`;
      
      const payload = {
        type: "OPEN_TEMPLATE",
        account: { company_id: config.company_id, country_code: config.country_code || "kr" },
        token,
        prefill: {
          template_id,
          document_name: docName,
          fields,
          recipients: [
             {
                step_type: "05",
                step_name: "대표자",
                use_mail: true,
                recipients: [{ id: formData['E-mail 주소'] }]
              }
          ]
        },
        return_fields: ["고객주소1", "고객주소2", "고객주소3", "우편번호"]
      };

      setTimeout(() => {
        popup.postMessage(JSON.stringify(payload), window.location.origin);
      }, 1000);

    } catch (err) {
      const error = err as Error;
      console.error("문서 작성 준비 실패:", error);
      alert("문서 작성 준비 실패: " + error.message);
    }
  };

  const pollWebhookData = async (documentId: string) => {
    const MAX_POLLS = 10;
    const POLL_INTERVAL = 2000; // 2초

    for (let i = 0; i < MAX_POLLS; i++) {
      try {
        await new Promise(resolve => setTimeout(resolve, POLL_INTERVAL));
        console.log(`[Polling] Attempt ${i + 1} for document ${documentId}`);
        const res = await fetch(`/api/eform/documents/${documentId}/status`);
        const result = await res.json();

        if (result.ready) {
          console.log('[Polling] Webhook data received:', result.data);
          
          // 1. JSON 스트링으로 alert
          alert(JSON.stringify(result.data, null, 2));

          // 2. 데이터 분석 및 화면 업데이트
          const newUpdatedFields = new Set<string>();
          if (result.data && result.data.document && result.data.document.fields) {
            const fields = result.data.document.fields;
            const newFormData = { ...formData };
            fields.forEach((field: { id: string, value: string }) => {
              if (field.id in newFormData) {
                (newFormData as any)[field.id] = field.value;
                newUpdatedFields.add(field.id);
              }
            });
            setFormData(newFormData);
          }
          
          // 3. 업데이트된 필드 추적
          setUpdatedFields(newUpdatedFields);
          
          return;
        }
      } catch (error) {
        console.error('[Polling] Error fetching webhook status:', error);
      }
    }
    alert('Webhook 데이터를 가져오는데 실패했습니다.');
  };

  const handleDownloadDocument = () => {
    if (!lastDocumentId) {
      alert("먼저 전자문서를 생성하세요.");
      return;
    }
    const url = `/api/eform/documents/${encodeURIComponent(lastDocumentId)}/files?type=document`;
    window.open(url, "_blank");
  };

  return (
    <div className="container mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-5">입력 화면(바로전송)</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col md:flex-row justify-between items-center mb-5">
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex items-center gap-2">
              <label htmlFor="user-type" className="text-sm">사용자 유형:</label>
              <select id="user-type" value={userType} onChange={(e) => setUserType(e.target.value)} className="p-1.5 border border-gray-300 rounded-sm text-xs">
                <option value="corporate-ceo">법인사업자-대표자</option>
                <option value="corporate-agent">법인사업자-대리인</option>
                <option value="individual-ceo">개인-대표자</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="contact-method" className="text-sm">상담 방식:</label>
              <select id="contact-method" value={contactMethod} onChange={(e) => setContactMethod(e.target.value)} className="p-1.5 border border-gray-300 rounded-sm text-xs">
                <option value="non-face-to-face">비대면</option>
                <option value="in-person">대면</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <button type="button" onClick={handleDownloadDocument} className="px-4 py-2 text-sm bg-gray-800 text-white rounded-md hover:bg-black">완료문서다운로드</button>
            <button type="button" onClick={handleStartDocument} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">전자문서 작성시작</button>
          </div>
        </div>

        {Object.entries({
          "견적서 생성": ['견적 유형', '시스템 설정 코드'],
          "고객 정보": ['고객명', '고객코드', '우편번호', '고객주소1', '고객주소2', '고객주소3'],
          "서비스제공처": ['서비스제공처명', '서비스제공처 형태', '이름(마스터)', '휴대전화번호(마스터)', '서비스제공처우편번호', '서비스제공처주소1', '서비스제공처주소2', '서비스제공처주소3'],
          "판매 정보": ['견적번호', '견적구분', '견적상태', '주장치코드', '오퍼링', '오퍼링_2', '오퍼링_3', '오퍼링_4', '오퍼링_5', '카드 매수', '계약서종류', '계약기간', '통신회선', '출동료'],
          "손해보상 한도액": ['방범서비스(대인)', '방범서비스(대물)'],
          "배보상 정보": ['스페셜보험', '정전안심', '화재안심', '이웃배상', '매출안심', '영상도난손해', '풍수재보험'],
          "견적 금액": ['신청금', '월 서비스료', '견적 설치비용', '계약 설치비용', '할인된 설치비용', '기존 계약의 할인된 설치비용', '설치 착수 예정일', '서비스 개시 예정일'],
          "정보 동의": ['개인정보 수집 동의 (필수 항목)', '마케팅 활용 동의', '광고정보 수신 동의', '제3자 제공 동의 (삼성화재)', '제3자 제공 동의 (엘지유플러스)', '제3자 제공 동의 확인'],
          "청구 정보": ['청구방식(카드결제)', '청구방식(자동이체)', '은행명(카드사)', '예금주(카드주)', '계좌(카드)번호', '생년월일(사업자번호)', '카드유효기간', '자동(카드)이체일', '청구서 수령 방법', 'E-mail 주소', '전자 세금계산서 Site', '세금계산서 E-mail'],
        }).map(([sectionTitle, fields]) => (
          <FormSection key={sectionTitle} title={sectionTitle}>
            {fields.map(field => (
              <FormItem
                key={field}
                label={field}
                id={field}
                value={formData[field as keyof typeof formData]}
                type={typeof formData[field as keyof typeof formData] === 'number' ? 'number' : 'text'}
                onChange={handleInputChange}
                isUpdated={updatedFields.has(field)}
              />
            ))}
          </FormSection>
        ))}
      </form>
    </div>
  );
}

"use client";

import { useState, useEffect, useCallback } from 'react';
import { FormConfig } from '@/lib/form-data';

// Define interfaces for props
interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

interface FormItemProps {
  label: string;
  id: string;
  value: string | number;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  isUpdated?: boolean;
}

interface NewEformPageProps {
  config: FormConfig;
}

// FormSection Component
const FormSection: React.FC<FormSectionProps> = ({ title, children }) => (
  <div className="mb-5 p-4 border border-gray-200 rounded-md bg-gray-50">
    <h2 className="text-lg font-bold text-blue-600 mb-3 pb-2 border-b border-blue-600">{title}</h2>
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3">
      {children}
    </ul>
  </div>
);

// FormItem Component
const FormItem: React.FC<FormItemProps> = ({ label, id, value, type = "text", onChange, isUpdated }) => (
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

export default function NewEformPage({ config }: NewEformPageProps) {
  const [updatedFields, setUpdatedFields] = useState<Set<string>>(new Set());
  const [formData, setFormData] = useState(config.initialValues);
  const [userType, setUserType] = useState(config.defaultUserType);
  const [contactMethod, setContactMethod] = useState(config.defaultContactMethod);
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
        console.log('[CRM] DOC_RESULT 수신:', data);
        alert(`문서 작성이 완료되었습니다. 문서 ID: ${data.document_id}\n\n전체 데이터:\n${JSON.stringify(data, null, 2)}`);
        setLastDocumentId(data.document_id);

        const newUpdatedFields = new Set<string>();
        if (data.fields) {
          const newFormData: { [key: string]: string | number } = { ...formData };
          data.fields.forEach((field: { id: string, value: string }) => {
            if (field.id in newFormData) {
              newFormData[field.id] = field.value;
              newUpdatedFields.add(field.id);
            }
          });
          setFormData(newFormData);
        }
        setUpdatedFields(newUpdatedFields);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [formData]);

  const handleStartDocument = async () => {
    const TEMPLATE_MAP = {
      "APW:법인사업자-대표자:비대면": "6e0bfaf7b13d4f4ca8565f93ece4d49d",
      "APW:법인사업자-대리인:비대면": "52f5ccd079d745598636176ca3edaf42",
      "ART:개인-대표자:비대면": "0ab7e9521f834f74a4dbfe936315cc19",
      "ART:개인-대표자:대면": "4c49689673784b75844a383a97795e02",
      "RAM:개인사업자-대표자:비대면": "741fcdd232bc4871a29f0e89452e3fad",
      "MSA:개인사업자-대표자:비대면": "9bac570e8ad84818b3f35be7fc30c274",
      "APW:개인-대표자:비대면": "558bd69ab88548b4a4b043b694c7afaa",
    };

    const formCode = String(formData["시스템 설정 코드"]);
    const biz = userType === 'corporate-ceo' ? '법인사업자-대표자' : userType === 'corporate-agent' ? '법인사업자-대리인' : userType === 'private-business-owner' ? '개인사업자-대표자' : '개인-대표자';
    const contact = contactMethod === 'non-face-to-face' ? '비대면' : '대면';

    const key = `${formCode}:${biz}:${contact}`;
    const template_id = TEMPLATE_MAP[key as keyof typeof TEMPLATE_MAP];

    if (!template_id) {
      alert(`템플릿 매핑 실패: ${key}`);
      return;
    }

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
      const formCode = String(formData["시스템 설정 코드"]);
      const biz = userType === 'corporate-ceo' ? '법인사업자-대표자' : userType === 'corporate-agent' ? '법인사업자-대리인' : userType === 'private-business-owner' ? '개인사업자-대표자' : '개인-대표자';
      const contact = contactMethod === 'non-face-to-face' ? '비대면' : '대면';
      const customerName = String(formData['고객명']);
      const docName = `${formCode}_${biz}_${contact}_${customerName}_${new Date().toISOString().slice(0, 10)}`;
      
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
        const payloadString = JSON.stringify(payload, null, 2);
        alert(`[Debug] Sending payload to popup:\n${payloadString}`);
        popup.postMessage(payloadString, window.location.origin);
      }, 1000);

    } catch (err) {
      const error = err as Error;
      console.error("문서 작성 준비 실패:", error);
      alert("문서 작성 준비 실패: " + error.message);
    }
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
      <h1 className="text-2xl font-bold text-center mb-5">{config.title}</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col md:flex-row justify-between items-center mb-5">
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex items-center gap-2">
              <label htmlFor="user-type" className="text-sm">사용자 유형:</label>
              <select id="user-type" value={userType} onChange={(e) => setUserType(e.target.value)} className="p-1.5 border border-gray-300 rounded-sm text-xs">
                <option value="corporate-ceo">법인사업자-대표자</option>
                <option value="corporate-agent">법인사업자-대리인</option>
                <option value="individual-ceo">개인-대표자</option>
                <option value="private-business-owner">개인사업자-대표자</option>
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
            <button type="button" onClick={handleDownloadDocument} className="px-4 py-2 text-sm bg-gray-200 text-black rounded-md hover:bg-gray-300">완료문서다운로드</button>
            <button type="button" onClick={handleStartDocument} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">전자문서 작성시작</button>
          </div>
        </div>

        {config.sections.map((section) => (
          <FormSection key={section.title} title={section.title}>
            {section.fields.map(field => (
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

"use client";

import { useState, useEffect } from 'react';

interface Document {
  id: string;
  title: string;
  completedAt: number;
}

export default function CompletedDocsPage() {
  const [docs, setDocs] = useState<Document[]>([]);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [title, setTitle] = useState('');
  const [templateId, setTemplateId] = useState('');
  const limit = 20;

  const fetchDocs = async () => {
    try {
      const body: { type: string; limit: number; skip: number; title?: string; template_id?: string } = {
        type: "03",
        limit,
        skip,
      };
      if (title) body.title = title;
      if (templateId) body.template_id = templateId;

      const res = await fetch(`/api/eform/documents/list`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status} ${await res.text()}`);
      }

      const data = await res.json();
      const docList = data?.documents || [];
      const mappedDocs = docList.map((doc: { id: string; document_id: string; document_name: string; title: string; updated_date: number; completed_date: number; }) => ({
        id: doc.id || doc.document_id,
        title: doc.document_name || doc.title,
        completedAt: doc.updated_date || doc.completed_date,
      }));
      setDocs(mappedDocs);
      setTotal(data.total_rows || data.total || 0);
    } catch (err) {
      console.error(err);
      alert('완료 문서 목록 불러오기 오류');
    }
  };

  useEffect(() => {
    fetchDocs();
  }, [skip]);

  const handleSearch = () => {
    setSkip(0);
    fetchDocs();
  };

  const page = Math.floor(skip / limit) + 1;

  return (
    <div className="container mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-5">완료 문서함</h1>
      <div className="flex flex-col md:flex-row gap-2 items-center mb-4">
        <input
          id="q_title"
          placeholder="제목 검색(옵션)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-grow p-1.5 border border-gray-300 rounded-sm text-xs w-full"
        />
        <select 
          id="q_template" 
          value={templateId}
          onChange={(e) => setTemplateId(e.target.value)}
          className="p-1.5 border border-gray-300 rounded-sm text-xs w-full md:w-64"
        >
          <option value="">템플릿 선택</option>
          <option value="6e0bfaf7b13d4f4ca8565f93ece4d49d">APW - 법인 대표자</option>
          <option value="52f5ccd079d745598636176ca3edaf42">APW - 법인 대리인</option>
          {/* ... other options */}
        </select>
        <button id="btnSearch" onClick={handleSearch} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full md:w-auto">검색</button>
      </div>
      <table className="w-full text-sm text-left text-black">
        <thead className="text-xs text-black uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">문서ID</th>
            <th scope="col" className="px-6 py-3">제목</th>
            <th scope="col" className="px-6 py-3">완료일</th>
            <th scope="col" className="px-6 py-3">다운로드</th>
          </tr>
        </thead>
        <tbody>
          {docs.map(doc => (
            <tr key={doc.id} className="bg-white border-b">
              <td className="px-6 py-4">{doc.id}</td>
              <td className="px-6 py-4">{doc.title}</td>
              <td className="px-6 py-4">{new Date(doc.completedAt).toLocaleString()}</td>
              <td className="px-6 py-4">
                <a href={`/api/eform/documents/${doc.id}/files?type=document`} target="_blank" className="text-blue-600 hover:underline">문서</a> |
                <a href={`/api/eform/documents/${doc.id}/files?type=document,audit_trail`} target="_blank" className="text-blue-600 hover:underline ml-2">문서+감사</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center items-center gap-4 mt-4">
        <button onClick={() => setSkip(Math.max(0, skip - limit))} disabled={skip === 0} className="px-4 py-2 text-sm bg-gray-800 text-white rounded-md disabled:opacity-50 hover:bg-black">이전</button>
        <span className="text-black">페이지 {page} / 총 ~{total}건</span>
        <button onClick={() => setSkip(skip + limit)} disabled={(skip + limit) >= total} className="px-4 py-2 text-sm bg-gray-800 text-white rounded-md disabled:opacity-50 hover:bg-black">다음</button>
      </div>
    </div>
  );
}

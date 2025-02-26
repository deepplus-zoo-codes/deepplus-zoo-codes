import React, { useState, useRef, useEffect } from 'react';
import { Search, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';

const SearchQueryGenerator = () => {
  // State for search input
  const [searchInput, setSearchInput] = useState('');
  
  // State for dropdown selections
  const [purpose, setPurpose] = useState('');
  const [sources, setSources] = useState([]);
  const [format, setFormat] = useState('');
  
  // State for dropdown open/close
  const [purposeOpen, setPurposeOpen] = useState(false);
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const [formatOpen, setFormatOpen] = useState(false);
  
  // State for generated query
  const [generatedQuery, setGeneratedQuery] = useState('');
  
  // State for copy feedback
  const [copied, setCopied] = useState(false);
  
  // Refs for detecting clicks outside dropdowns
  const purposeRef = useRef(null);
  const sourcesRef = useRef(null);
  const formatRef = useRef(null);
  
  // Options for dropdowns
  const purposeOptions = [
    '학술 연구',
    '일반 정보 수집',
    '비교 분석',
    '트렌드 파악',
    '문제 해결책 찾기',
    '장단점 분석',
    '역사적 변천 과정',
    '미래 예측',
    '원인 및 결과 분석',
    '사례 연구',
    '최신 발전 현황',
    '대안 탐색',
    '효과성 평가'
  ];
  
  const sourceOptions = [
    '학술 논문',
    '뉴스 기사',
    '커뮤니티 의견',
    '공공기관 자료',
    '통계 데이터',
    '전문가 인터뷰',
    '연구 보고서',
    '서적 및 출판물',
    '산업 백서',
    '사례 연구',
    '회의록 및 토론',
    '소셜 미디어 동향'
  ];
  
  const formatOptions = [
    '요약 정리',
    '글머리 기호 목록',
    '비교표',
    '시간순 정리',
    '상세 분석',
    '원인-결과 체인',
    '주제별 분류',
    'SWOT 분석',
    '인포그래픽 스타일',
    '질문-답변 형식',
    '장단점 대비',
    '단계별 가이드',
    '핵심 요약 + 상세 설명'
  ];
  
  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (purposeRef.current && !purposeRef.current.contains(event.target)) {
        setPurposeOpen(false);
      }
      if (sourcesRef.current && !sourcesRef.current.contains(event.target)) {
        setSourcesOpen(false);
      }
      if (formatRef.current && !formatRef.current.contains(event.target)) {
        setFormatOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Toggle source selection (multiple)
  const toggleSource = (source) => {
    if (sources.includes(source)) {
      setSources(sources.filter(s => s !== source));
    } else {
      setSources([...sources, source]);
    }
  };
  
  // Generate query based on selections
  const generateQuery = () => {
    if (!searchInput.trim()) {
      setGeneratedQuery('검색어를 입력해주세요.');
      return;
    }
    
    // 선택한 옵션에 따라 자연스러운 문장 형태의 쿼리 생성
    let purposeText = '정보 수집';
    if (purpose) {
      purposeText = purpose;
    }
    
    let sourcesText = '모든 출처';
    if (sources.length > 0) {
      sourcesText = sources.join(', ');
    }
    
    let formatText = '요약 정리';
    if (format) {
      formatText = format;
    }
    
    // 문장 생성 다양화를 위한 템플릿 랜덤 선택
    const templates = [
      `"${searchInput}"에 대한 ${purposeText}을 ${sourcesText}을 기반으로 ${formatText} 형태로 제공해주세요.`,
      `"${searchInput}" 주제로 ${purposeText}을 진행하고 싶습니다. ${sourcesText}에서 관련 정보를 찾아 ${formatText} 형식으로 정리해주세요.`,
      `"${searchInput}"에 관한 ${purposeText}이 필요합니다. ${sourcesText}의 정보를 참고하여 ${formatText} 방식으로 알려주세요.`,
      `${sourcesText}을 참고하여 "${searchInput}"에 대한 ${purposeText}을 ${formatText} 스타일로 작성해주세요.`,
      `"${searchInput}"에 대해 ${purposeText}을 위한 ${formatText}을 만들어주세요. ${sourcesText}에서 나온 정보를 활용해주세요.`
    ];
    
    // 랜덤 템플릿 선택
    const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
    
    // 자연어 프롬프트 형식으로 쿼리 생성
    setGeneratedQuery(randomTemplate);
    
    // 추가 컨텍스트 제공
    if (purpose === '비교 분석' || purpose === '장단점 분석' || purpose === 'SWOT 분석') {
      setGeneratedQuery(prev => prev + ` 서로 다른 관점과 주장을 균형있게 다루어주세요.`);
    }
    
    if (purpose === '미래 예측' || purpose === '트렌드 파악') {
      setGeneratedQuery(prev => prev + ` 현재 데이터를 기반으로 향후 발전 방향도 포함해주세요.`);
    }
    
    if (format === '상세 분석' || format === '핵심 요약 + 상세 설명') {
      setGeneratedQuery(prev => prev + ` 주요 개념에 대한 정의와 구체적인 사례를 함께 설명해주세요.`);
    }
  };
  
  // Handle copy to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedQuery);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Handle search form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    generateQuery();
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50">
      {/* Logo */}
      <div className="mb-6">
        <h1 className="text-5xl font-bold">
          <span className="text-blue-500">S</span>
          <span className="text-red-500">e</span>
          <span className="text-yellow-500">a</span>
          <span className="text-blue-500">r</span>
          <span className="text-green-500">c</span>
          <span className="text-red-500">h</span>
          <span className="text-blue-500">Q</span>
        </h1>
      </div>
      
      {/* Search input */}
      <div className="w-full max-w-2xl mb-4">
        <div className="relative flex items-center">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full p-4 text-lg border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="검색어를 입력하세요"
          />
        </div>
      </div>
      
      {/* Combo boxes */}
      <div className="flex flex-wrap justify-center gap-3 mb-8 w-full max-w-2xl">
        {/* Purpose dropdown */}
        <div ref={purposeRef} className="relative">
          <button
            onClick={() => setPurposeOpen(!purposeOpen)}
            className="flex items-center px-4 py-2 bg-white border rounded-full shadow-sm hover:bg-gray-50"
          >
            {purpose || '목적 선택'}
            {purposeOpen ? <ChevronUp size={16} className="ml-2" /> : <ChevronDown size={16} className="ml-2" />}
          </button>
          
          {purposeOpen && (
            <div className="absolute z-10 mt-1 w-48 bg-white border rounded-lg shadow-lg">
              {purposeOptions.map((option) => (
                <div
                  key={option}
                  onClick={() => {
                    setPurpose(option);
                    setPurposeOpen(false);
                  }}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {option === purpose && <Check size={16} className="inline mr-2 text-blue-500" />}
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Sources dropdown (multi-select) */}
        <div ref={sourcesRef} className="relative">
          <button
            onClick={() => setSourcesOpen(!sourcesOpen)}
            className="flex items-center px-4 py-2 bg-white border rounded-full shadow-sm hover:bg-gray-50"
          >
            {sources.length > 0 ? `출처 ${sources.length}개 선택됨` : '출처 선택'}
            {sourcesOpen ? <ChevronUp size={16} className="ml-2" /> : <ChevronDown size={16} className="ml-2" />}
          </button>
          
          {sourcesOpen && (
            <div className="absolute z-10 mt-1 w-48 bg-white border rounded-lg shadow-lg">
              {sourceOptions.map((option) => (
                <div
                  key={option}
                  onClick={() => toggleSource(option)}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {sources.includes(option) ? (
                    <Check size={16} className="inline mr-2 text-blue-500" />
                  ) : (
                    <span className="inline-block w-4 mr-2"></span>
                  )}
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Format dropdown */}
        <div ref={formatRef} className="relative">
          <button
            onClick={() => setFormatOpen(!formatOpen)}
            className="flex items-center px-4 py-2 bg-white border rounded-full shadow-sm hover:bg-gray-50"
          >
            {format || '결과 형식 선택'}
            {formatOpen ? <ChevronUp size={16} className="ml-2" /> : <ChevronDown size={16} className="ml-2" />}
          </button>
          
          {formatOpen && (
            <div className="absolute z-10 mt-1 w-48 bg-white border rounded-lg shadow-lg">
              {formatOptions.map((option) => (
                <div
                  key={option}
                  onClick={() => {
                    setFormat(option);
                    setFormatOpen(false);
                  }}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {option === format && <Check size={16} className="inline mr-2 text-blue-500" />}
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* 출발 버튼 */}
      <button
        onClick={generateQuery}
        className="px-8 py-3 mb-6 text-white bg-blue-500 rounded-full shadow-md hover:bg-blue-600 flex items-center justify-center font-bold text-lg"
      >
        출발
        <Search size={20} className="ml-2" />
      </button>
      
      {/* Generated query */}
      {generatedQuery && (
        <div className="w-full max-w-2xl p-4 bg-white border rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">생성된 프롬프트:</h2>
            <button
              onClick={copyToClipboard}
              className="flex items-center px-3 py-1 text-sm text-white bg-blue-500 rounded-full hover:bg-blue-600"
            >
              {copied ? (
                <>
                  <Check size={16} className="mr-1" />
                  복사됨
                </>
              ) : (
                <>
                  <Copy size={16} className="mr-1" />
                  복사
                </>
              )}
            </button>
          </div>
          <p className="p-4 bg-gray-50 rounded-lg break-words text-gray-800">{generatedQuery}</p>
        </div>
      )}
    </div>
  );
};

export default SearchQueryGenerator;
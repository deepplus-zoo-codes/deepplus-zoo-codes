import React, { useState, useRef, useEffect } from 'react';
import { Search, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';
import './SearchQueryGenerator.css';

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
      `"${searchInput}"에 대한 <span class="highlight-purpose">${purposeText}</span>을 <span class="highlight-source">${sourcesText}</span>을 기반으로 <span class="highlight-format">${formatText}</span> 형태로 제공해주세요.`,
      `"${searchInput}" 주제로 <span class="highlight-purpose">${purposeText}</span>을 진행하고 싶습니다. <span class="highlight-source">${sourcesText}</span>에서 관련 정보를 찾아 <span class="highlight-format">${formatText}</span> 형식으로 정리해주세요.`,
      `"${searchInput}"에 관한 <span class="highlight-purpose">${purposeText}</span>이 필요합니다. <span class="highlight-source">${sourcesText}</span>의 정보를 참고하여 <span class="highlight-format">${formatText}</span> 방식으로 알려주세요.`,
      `<span class="highlight-source">${sourcesText}</span>을 참고하여 "${searchInput}"에 대한 <span class="highlight-purpose">${purposeText}</span>을 <span class="highlight-format">${formatText}</span> 스타일로 작성해주세요.`,
      `"${searchInput}"에 대해 <span class="highlight-purpose">${purposeText}</span>을 위한 <span class="highlight-format">${formatText}</span>을 만들어주세요. <span class="highlight-source">${sourcesText}</span>에서 나온 정보를 활용해주세요.`
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
    // HTML 태그를 제거하고 순수 텍스트만 복사
    const tempElement = document.createElement('div');
    tempElement.innerHTML = generatedQuery;
    const plainText = tempElement.textContent || tempElement.innerText;
    
    navigator.clipboard.writeText(plainText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="search-container">
      <div className="logo">
        <h1 className="logo-text">
          <span className="logo-gradient">DeepPlus</span>
          <span className="logo-subtitle">Search Query Generator</span>
        </h1>
      </div>
      
      <div className="search-input-container">
        <div className="search-input-wrapper">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="search-input"
            placeholder="검색어를 입력하세요"
          />
        </div>
      </div>
      
      {/* Combo boxes */}
      <div className="dropdowns-container">
        {/* Purpose dropdown */}
        <div ref={purposeRef} className="dropdown">
          <button
            onClick={() => setPurposeOpen(!purposeOpen)}
            className={`dropdown-button ${purpose ? 'dropdown-selected' : ''}`}
          >
            <span className="dropdown-label">목적:</span>
            <span className="dropdown-value">{purpose || '선택하기'}</span>
            {purposeOpen ? 
              <ChevronUp size={16} className="dropdown-icon" /> : 
              <ChevronDown size={16} className="dropdown-icon" />
            }
          </button>
          
          {purposeOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-menu-header">목적 선택</div>
              <div className="dropdown-menu-items">
                {purposeOptions.map((option) => (
                  <div
                    key={option}
                    onClick={() => {
                      setPurpose(option);
                      setPurposeOpen(false);
                    }}
                    className={`dropdown-item ${option === purpose ? 'dropdown-item-selected' : ''}`}
                  >
                    {option === purpose ? 
                      <Check size={16} className="dropdown-check" /> : 
                      <span className="dropdown-spacer"></span>
                    }
                    {option}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Sources dropdown (multi-select) */}
        <div ref={sourcesRef} className="dropdown">
          <button
            onClick={() => setSourcesOpen(!sourcesOpen)}
            className={`dropdown-button ${sources.length > 0 ? 'dropdown-selected' : ''}`}
          >
            <span className="dropdown-label">출처:</span>
            <span className="dropdown-value">{sources.length > 0 ? `${sources.length}개 선택됨` : '선택하기'}</span>
            {sourcesOpen ? 
              <ChevronUp size={16} className="dropdown-icon" /> : 
              <ChevronDown size={16} className="dropdown-icon" />
            }
          </button>
          
          {sourcesOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-menu-header">출처 선택 (다중 선택 가능)</div>
              <div className="dropdown-menu-items">
                {sourceOptions.map((option) => (
                  <div
                    key={option}
                    onClick={() => toggleSource(option)}
                    className={`dropdown-item ${sources.includes(option) ? 'dropdown-item-selected' : ''}`}
                  >
                    {sources.includes(option) ? 
                      <Check size={16} className="dropdown-check" /> : 
                      <span className="dropdown-spacer"></span>
                    }
                    {option}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Format dropdown */}
        <div ref={formatRef} className="dropdown">
          <button
            onClick={() => setFormatOpen(!formatOpen)}
            className={`dropdown-button ${format ? 'dropdown-selected' : ''}`}
          >
            <span className="dropdown-label">결과 형식:</span>
            <span className="dropdown-value">{format || '선택하기'}</span>
            {formatOpen ? 
              <ChevronUp size={16} className="dropdown-icon" /> : 
              <ChevronDown size={16} className="dropdown-icon" />
            }
          </button>
          
          {formatOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-menu-header">결과 형식 선택</div>
              <div className="dropdown-menu-items">
                {formatOptions.map((option) => (
                  <div
                    key={option}
                    onClick={() => {
                      setFormat(option);
                      setFormatOpen(false);
                    }}
                    className={`dropdown-item ${option === format ? 'dropdown-item-selected' : ''}`}
                  >
                    {option === format ? 
                      <Check size={16} className="dropdown-check" /> : 
                      <span className="dropdown-spacer"></span>
                    }
                    {option}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* 출발 버튼 */}
      <button
        onClick={generateQuery}
        className="start-button"
      >
        출발
        <Search size={20} className="start-icon" />
      </button>
      
      {/* Generated query */}
      {generatedQuery && (
        <div className="query-container">
          <div className="query-header">
            <h2 className="query-title">생성된 프롬프트:</h2>
            <button
              onClick={copyToClipboard}
              className="copy-button"
            >
              {copied ? (
                <>
                  <Check size={16} className="copy-icon" />
                  복사됨
                </>
              ) : (
                <>
                  <Copy size={16} className="copy-icon" />
                  복사
                </>
              )}
            </button>
          </div>
          <p className="query-text" dangerouslySetInnerHTML={{ __html: generatedQuery }}></p>
          
          <div className="query-legend">
            <div className="legend-title">하이라이트 범례:</div>
            <div className="legend-items">
              <div className="legend-item">
                <span className="legend-color purpose-color"></span>
                <span className="legend-label">목적</span>
              </div>
              <div className="legend-item">
                <span className="legend-color source-color"></span>
                <span className="legend-label">출처</span>
              </div>
              <div className="legend-item">
                <span className="legend-color format-color"></span>
                <span className="legend-label">결과 형식</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchQueryGenerator; 
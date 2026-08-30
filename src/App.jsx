import React, { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { crops, naturalMethods, pests, schemes, sourceNotice, ui, videoSlots } from './data/content';

const languageKey = 'agri-sahayak-language';
const favoritesKey = 'agri-sahayak-favorites';

function localized(item, field, language) {
  return item[`${field}${language === 'te' ? 'Te' : 'En'}`] ?? item[field];
}

function label(item, language) {
  return localized(item, 'title', language);
}

function useSpeech() {
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  function stop() {
    window.speechSynthesis?.cancel();
    setSpeaking(false);
  }

  function speak(text, language) {
    if (!('speechSynthesis' in window)) return false;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'te' ? 'te-IN' : 'en-IN';
    utterance.rate = 0.9;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
    return true;
  }

  return { speaking, speak, stop };
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

function PageMeta({ title }) {
  useEffect(() => {
    document.title = `${title} | AgriSahayak`;
  }, [title]);
  return null;
}

function Logo() {
  return <Link className="brand" to="/" aria-label="AgriSahayak home"><span className="brand-mark">✦</span><span>Agri<span>Sahayak</span><small>అగ్రి సహాయక్</small></span></Link>;
}

function LanguageSwitcher({ language, setLanguage, compact = false }) {
  return <div className={`language-switcher ${compact ? 'compact' : ''}`} aria-label="Language selection">
    <button className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')} aria-pressed={language === 'en'}>EN</button>
    <button className={language === 'te' ? 'active' : ''} onClick={() => setLanguage('te')} aria-pressed={language === 'te'}>తెలుగు</button>
  </div>;
}

function Header({ language, setLanguage, setSearchOpen }) {
  const words = ui[language];
  const navItems = [
    ['/', words.home], ['/crops', words.crops], ['/natural-farming', words.natural], ['/pest-guide', words.pests], ['/schemes', words.schemes],
  ];

  return <header className="site-header">
    <div className="top-note"><span>🌤</span><span>{language === 'te' ? 'మీ పొలానికి ఉపయోగపడే సమాచారం, సులభమైన భాషలో.' : 'Practical guidance for your field, in a language you use.'}</span><span className="top-note-right">{language === 'te' ? 'విశ్వసనీయ మూలాలతో' : 'Built around trusted sources'}</span></div>
    <div className="header-main shell">
      <Logo />
      <nav className="desktop-nav" aria-label="Main navigation">
        {navItems.map(([path, text]) => <NavLink key={path} to={path} end={path === '/'}>{text}</NavLink>)}
      </nav>
      <div className="header-actions">
        <button className="icon-button search-trigger" onClick={() => setSearchOpen(true)} aria-label={words.search}><span>⌕</span><span className="search-trigger-copy">{language === 'te' ? 'వెతకండి' : 'Search'}</span></button>
        <LanguageSwitcher language={language} setLanguage={setLanguage} compact />
      </div>
    </div>
  </header>;
}

function MobileBottomNav({ language }) {
  const words = ui[language];
  const entries = [['/', '⌂', words.home], ['/crops', '🌾', words.crops], ['/natural-farming', '🌿', words.natural], ['/schemes', '▦', words.schemes]];
  return <nav className="mobile-nav" aria-label="Mobile navigation">{entries.map(([path, icon, text]) => <NavLink key={path} to={path} end={path === '/'}><span>{icon}</span><small>{text}</small></NavLink>)}</nav>;
}

function ListenButton({ text, language, className = '' }) {
  const { speaking, speak, stop } = useSpeech();
  const words = ui[language];
  const supported = 'speechSynthesis' in window;
  return <button className={`listen-button ${className}`} onClick={() => speaking ? stop() : speak(text, language)} disabled={!supported} title={supported ? '' : 'Text-to-speech is not available in this browser'}>
    <span>{speaking ? '■' : '🔊'}</span>{speaking ? words.stop : words.listen}
  </button>;
}

function SafetyNotice({ language, compact = false }) {
  return <aside className={`safety-notice ${compact ? 'compact-notice' : ''}`}>
    <span className="safety-icon">!</span>
    <div><strong>{ui[language].safety}</strong><p>{sourceNotice[language]}</p></div>
  </aside>;
}

function SectionHeading({ eyebrow, title, copy, action }) {
  return <div className="section-heading">
    <div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{copy && <p className="section-copy">{copy}</p>}</div>{action}
  </div>;
}

function CropVisual({ crop, large = false }) {
  return <div className={`crop-visual crop-${crop.id} ${large ? 'crop-visual-large' : ''}`} aria-hidden="true"><span>{crop.emoji}</span><i></i><i></i><i></i></div>;
}

function CropCard({ crop, language, saved, onToggleFavorite }) {
  const words = ui[language];
  return <article className="crop-card">
    <CropVisual crop={crop} />
    <div className="crop-card-content">
      <div className="card-topline"><span>{crop.group}</span><button className="favorite-button" onClick={() => onToggleFavorite(crop.id)} aria-label={saved ? 'Remove saved guide' : words.favorite}>{saved ? '♥' : '♡'}</button></div>
      <h3>{label(crop, language)}</h3><p className="translation">{language === 'te' ? crop.titleEn : crop.titleTe}</p>
      <div className="crop-stat"><span>◷</span>{localized(crop, 'duration', language)}</div>
      <Link to={`/crops/${crop.id}`} className="text-link">{words.details} <span>→</span></Link>
    </div>
  </article>;
}

function QuickActions({ language }) {
  const actions = [
    ['/crops', '🌱', 'Crop guide', 'పంటల గైడ్', 'Explore crop stages, soil and care'],
    ['/pest-guide', '🐛', 'Pest & disease', 'పురుగు & తెగులు', 'Spot symptoms and safer next steps'],
    ['/tools', '💧', 'Irrigation tools', 'నీటి ఉపకరణాలు', 'Plan water with local conditions'],
    ['/natural-farming', '🌿', 'Natural farming', 'ప్రకృతి వ్యవసాయం', 'Farm-made practices, explained safely'],
    ['/pest-guide', '🧤', 'Crop protection', 'పంట రక్షణ', 'Safety-first pest management'],
    ['/schemes', '🏛', 'Government schemes', 'ప్రభుత్వ పథకాలు', 'Find official programme information'],
  ];
  return <div className="quick-grid">{actions.map(([path, icon, titleEn, titleTe, description]) => <Link key={titleEn} to={path} className="quick-card"><span className="quick-icon">{icon}</span><strong>{language === 'te' ? titleTe : titleEn}</strong><small>{language === 'te' ? titleEn : titleTe}</small><span className="quick-arrow">→</span><em>{description}</em></Link>)}</div>;
}

function Home({ language, saved, onToggleFavorite, setSearchOpen }) {
  const words = ui[language];
  const heroTitle = language === 'te' ? 'స్మార్ట్ వ్యవసాయం. మంచి నిర్ణయాలు. మెరుగైన దిగుబడి.' : 'Smart farming. Better decisions. Better yields.';
  const heroCopy = language === 'te' ? 'పంటల గైడ్లు, ప్రకృతి వ్యవసాయం, పురుగు నిర్వహణ, ప్రభుత్వ పథకాలు — అన్నీ ఒకే చోట.' : 'Crop guidance, natural farming, pest management and government schemes — all in one place.';
  return <><PageMeta title="Smart farming guidance" />
    <main>
      <section className="hero"><div className="shell hero-grid"><div className="hero-copy"><p className="eyebrow light">{language === 'te' ? 'మీ డిజిటల్ వ్యవసాయ సహాయకుడు' : 'Your digital farming companion'}</p><h1>{heroTitle}</h1><p className="hero-summary">{heroCopy}</p><div className="hero-search"><button onClick={() => setSearchOpen(true)}><span>⌕</span>{words.search}<kbd>/</kbd></button><p>{words.searchHint}</p></div><div className="hero-actions"><Link className="primary-button" to="/crops">{words.explore} <span>→</span></Link><Link className="quiet-button" to="/natural-farming">🌿 {language === 'te' ? 'ప్రకృతి వ్యవసాయం' : 'Natural farming'}</Link></div></div><div className="hero-art" aria-label="Illustration of a cultivated field"><div className="sun">☀</div><div className="cloud cloud-one"></div><div className="cloud cloud-two"></div><div className="field-lines"><span></span><span></span><span></span><span></span></div><div className="hero-plant plant-one">🌾</div><div className="hero-plant plant-two">🌿</div><div className="hero-badge"><span>✓</span><div><strong>{language === 'te' ? 'సులభంగా అర్థమవుతుంది' : 'Made to be understood'}</strong><small>{language === 'te' ? 'తెలుగు & English' : 'Telugu & English'}</small></div></div></div></div></section>
      <section className="shell section quick-section"><SectionHeading eyebrow={language === 'te' ? 'మొదట ఏమి కావాలి?' : 'START WHERE YOU ARE'} title={language === 'te' ? 'పొలంలో అవసరమైన సహాయం ఎంచుకోండి' : 'Choose the help you need in the field'} copy={language === 'te' ? 'పెద్ద బటన్లు, సులభమైన పదాలు, ఉపయోగకరమైన తదుపరి దశలు.' : 'Large tap targets, plain language and practical next steps.'} /><QuickActions language={language} /></section>
      <section className="shell section"><SectionHeading eyebrow={language === 'te' ? 'పంటల లైబ్రరీ' : 'CROP LIBRARY'} title={language === 'te' ? 'మీ పంటకు సరైన మార్గదర్శకం' : 'A better starting point for your crop'} action={<Link to="/crops" className="outline-button">{words.seeAll} <span>→</span></Link>} /><div className="crop-grid">{crops.slice(0, 3).map((crop) => <CropCard key={crop.id} crop={crop} language={language} saved={saved.includes(crop.id)} onToggleFavorite={onToggleFavorite} />)}</div></section>
      <section className="shell section home-highlight"><div className="natural-promo"><div><p className="eyebrow">{language === 'te' ? 'ప్రకృతి ఆధారిత పద్ధతులు' : 'NATURE-BASED PRACTICES'}</p><h2>{language === 'te' ? 'సంప్రదాయ పద్ధతులు, స్పష్టమైన జాగ్రత్తలు.' : 'Traditional practices, with clear precautions.'}</h2><p>{language === 'te' ? 'ఏది ఉపయోగించాలో, ఎప్పుడు స్థానిక సలహా తీసుకోవాలో సులభంగా తెలుసుకోండి.' : 'Learn what a practice is, how it is used, and when local advice matters.'}</p><Link to="/natural-farming" className="primary-button">{language === 'te' ? 'ప్రకృతి వ్యవసాయం చూడండి' : 'Explore natural farming'} <span>→</span></Link></div><div className="method-stack">{naturalMethods.slice(0, 3).map((method) => <div key={method.id}><span>{method.emoji}</span><strong>{label(method, language)}</strong><small>{language === 'te' ? method.titleEn : method.titleTe}</small></div>)}</div></div></section>
      <section className="shell section trust-row"><div><span>⌁</span><strong>{language === 'te' ? 'సమాచారాన్ని చర్యలుగా మార్చుకోండి' : 'Turn information into field-ready actions'}</strong></div><div><span>◌</span><strong>{language === 'te' ? 'సంక్లిష్ట విషయాలు సులభంగా' : 'Complex topics, explained simply'}</strong></div><div><span>♢</span><strong>{language === 'te' ? 'ముందు భద్రత, ఎల్లప్పుడూ' : 'Safety first, always'}</strong></div></section>
    </main>
  </>;
}

function CropsPage({ language, saved, onToggleFavorite }) {
  const [filter, setFilter] = useState('All');
  const groups = ['All', ...new Set(crops.map((crop) => crop.group))];
  const visibleCrops = filter === 'All' ? crops : crops.filter((crop) => crop.group === filter);
  return <><PageMeta title={language === 'te' ? 'పంటల గైడ్లు' : 'Crop guides'} /><main className="page shell"><div className="page-intro"><p className="eyebrow">{language === 'te' ? 'పంటల లైబ్రరీ' : 'CROP LIBRARY'}</p><h1>{language === 'te' ? 'ప్రతి పంటకు, పనికి వచ్చే తదుపరి దశ.' : 'For every crop, a useful next step.'}</h1><p>{language === 'te' ? 'విత్తనం నుంచి కోత వరకు సులభమైన గైడ్లతో మీ నిర్ణయాలను ప్లాన్ చేసుకోండి.' : 'Plan decisions from seed to harvest with short, practical guides.'}</p></div><div className="filter-row" aria-label="Crop categories">{groups.map((group) => <button key={group} className={filter === group ? 'active' : ''} onClick={() => setFilter(group)}>{group}</button>)}</div><div className="crop-grid full-grid">{visibleCrops.map((crop) => <CropCard key={crop.id} crop={crop} language={language} saved={saved.includes(crop.id)} onToggleFavorite={onToggleFavorite} />)}</div></main></>;
}

function StepGuide({ crop, language }) {
  const [openStep, setOpenStep] = useState(0);
  return <section className="detail-section guide-section"><SectionHeading eyebrow={language === 'te' ? 'దశల వారీ గైడ్' : 'STEP-BY-STEP GUIDE'} title={language === 'te' ? `${crop.titleTe} సాగు పద్ధతి` : `${crop.titleEn} cultivation guide`} copy={language === 'te' ? 'స్థానిక సిఫార్సులతో కలిపి ఈ గైడ్‌ను ఉపయోగించండి.' : 'Use this guide together with current local recommendations.'} /><div className="step-guide">{crop.steps.map(([stepTitle, stepEn, stepTe], index) => <article key={stepTitle} className={`step-card ${openStep === index ? 'open' : ''}`}><button onClick={() => setOpenStep(openStep === index ? -1 : index)} aria-expanded={openStep === index}><span className="step-number">{String(index + 1).padStart(2, '0')}</span><span><strong>{language === 'te' ? stepTe.split(' ').slice(0, 5).join(' ') : stepTitle}</strong><small>{language === 'te' ? stepTitle : stepTe}</small></span><span className="step-toggle">{openStep === index ? '−' : '+'}</span></button>{openStep === index && <div className="step-body"><p>{language === 'te' ? stepTe : stepEn}</p><ListenButton text={language === 'te' ? stepTe : stepEn} language={language} /><div className="step-safety"><span>i</span>{language === 'te' ? 'మోతాదు లేదా పంట రక్షణ చర్యలకు ప్రస్తుత స్థానిక సలహా తప్పనిసరి.' : 'For doses or crop protection actions, current local advice is essential.'}</div></div>}</article>)}</div></section>;
}

function CropDetail({ language, saved, onToggleFavorite }) {
  const { id } = useParams();
  const crop = crops.find((entry) => entry.id === id);
  const navigate = useNavigate();
  if (!crop) return <NotFound language={language} />;
  const overview = localized(crop, 'overview', language);
  const facts = [['⌛', language === 'te' ? 'పంట కాలం' : 'Crop duration', localized(crop, 'duration', language)], ['💧', language === 'te' ? 'నీరు' : 'Water', localized(crop, 'water', language)], ['◒', language === 'te' ? 'నేల' : 'Soil', localized(crop, 'soil', language)], ['▣', language === 'te' ? 'విత్తే కాలం' : 'Sowing window', localized(crop, 'sowing', language)]];
  const cropPests = pests.filter((pest) => crop.pests.includes(pest.id));
  return <><PageMeta title={`${label(crop, language)} guide`} /><main className="page crop-detail"><div className="detail-hero"><div className="shell detail-hero-grid"><div className="detail-copy"><button className="back-button" onClick={() => navigate('/crops')}>← {language === 'te' ? 'పంటల లైబ్రరీకి తిరిగి' : 'Back to crop library'}</button><p className="eyebrow light">{crop.group}</p><h1>{label(crop, language)}</h1><p className="detail-translation">{language === 'te' ? crop.titleEn : crop.titleTe}</p><p>{overview}</p><div className="detail-buttons"><ListenButton text={overview} language={language} className="on-dark" /><button className="save-button" onClick={() => onToggleFavorite(crop.id)}>{saved ? '♥' : '♡'} {saved ? ui[language].saved : ui[language].favorite}</button></div></div><CropVisual crop={crop} large /></div></div><div className="shell detail-content"><section className="crop-timeline" aria-label="Crop journey"><div><span>1</span><strong>{language === 'te' ? 'విత్తనం' : 'Seed'}</strong></div><i></i><div><span>2</span><strong>{language === 'te' ? 'నేల' : 'Soil'}</strong></div><i></i><div><span>3</span><strong>{language === 'te' ? 'సాగు' : 'Sowing'}</strong></div><i></i><div><span>4</span><strong>{language === 'te' ? 'ఎదుగుదల' : 'Growth'}</strong></div><i></i><div><span>5</span><strong>{language === 'te' ? 'రక్షణ' : 'Protection'}</strong></div><i></i><div><span>6</span><strong>{language === 'te' ? 'కోత' : 'Harvest'}</strong></div></section><section className="facts-grid">{facts.map(([icon, factTitle, factCopy]) => <article key={factTitle}><span>{icon}</span><div><small>{factTitle}</small><p>{factCopy}</p></div></article>)}</section><section className="detail-section simple-panel"><div><p className="eyebrow">{language === 'te' ? 'సులభంగా చెప్పాలంటే' : 'EXPLAIN SIMPLY'}</p><h2>{language === 'te' ? `${crop.titleTe} సాగు ఎలా ప్రారంభించాలి?` : `How do I begin with ${crop.titleEn}?`}</h2><p>{language === 'te' ? 'మొదట స్థానికంగా సరిపోయే విత్తనం, నేల పరీక్ష, నీటి ప్రణాళికను నిర్ణయించండి. తర్వాత ప్రతి వారం పొలాన్ని చూడండి. లక్షణం కనిపిస్తే మోతాదు ఊహించకుండా స్థానిక వ్యవసాయ సలహా తీసుకోండి.' : 'Start with locally suitable seed, a soil-test plan and a water plan. Then walk the field each week. If you spot a problem, seek local agricultural advice instead of guessing a dose.'}</p></div><ListenButton text={language === 'te' ? 'మొదట స్థానికంగా సరిపోయే విత్తనం, నేల పరీక్ష, నీటి ప్రణాళికను నిర్ణయించండి. తర్వాత ప్రతి వారం పొలాన్ని చూడండి.' : 'Start with locally suitable seed, a soil-test plan and a water plan. Then walk the field each week.'} language={language} /></section><StepGuide crop={crop} language={language} />{cropPests.length > 0 && <section className="detail-section"><SectionHeading eyebrow={language === 'te' ? 'పర్యవేక్షణ' : 'FIELD MONITORING'} title={language === 'te' ? 'గమనించాల్సిన పురుగులు, తెగుళ్లు' : 'Pests and diseases to watch'} /><div className="pest-grid">{cropPests.map((pest) => <PestCard key={pest.id} pest={pest} language={language} compact />)}</div></section>}<SafetyNotice language={language} /></div></main></>;
}

function AudioGuide({ title, transcript, language }) {
  const [showTranscript, setShowTranscript] = useState(false);
  const { speaking, speak, stop } = useSpeech();
  const unavailable = !('speechSynthesis' in window);
  return <div className="audio-guide"><div><span className="audio-icon">♫</span><strong>{language === 'te' ? 'వినండి' : 'Listen in'} {language === 'te' ? 'తెలుగు' : 'English'}</strong><small>{language === 'te' ? 'రికార్డ్ చేసిన ఆడియో అందుబాటులో లేదు — బ్రౌజర్ వాయిస్ ఉపయోగించండి.' : 'No recorded audio is loaded — use your browser voice.'}</small></div><button className="audio-play" disabled={unavailable} onClick={() => speaking ? stop() : speak(transcript, language)}>{speaking ? '■' : '▶'} <span>{speaking ? ui[language].stop : ui[language].listen}</span></button><button className="transcript-toggle" onClick={() => setShowTranscript(!showTranscript)}>{showTranscript ? '−' : '+'} {language === 'te' ? 'ట్రాన్స్క్రిప్ట్' : 'Transcript'}</button>{showTranscript && <p className="transcript">{transcript}</p>}{unavailable && <small className="audio-message">{language === 'te' ? 'ఈ బ్రౌజర్‌లో వాయిస్ సౌకర్యం అందుబాటులో లేదు.' : 'Text-to-speech is unavailable in this browser.'}</small>}</div>;
}

function NaturalPage({ language }) {
  const [selected, setSelected] = useState(naturalMethods[0].id);
  const method = naturalMethods.find((entry) => entry.id === selected);
  const transcript = `${label(method, language)}. ${localized(method, 'what', language)} ${localized(method, 'why', language)}`;
  return <><PageMeta title={language === 'te' ? 'ప్రకృతి వ్యవసాయం' : 'Natural farming'} /><main className="page shell"><div className="page-intro centered-intro"><p className="eyebrow">{language === 'te' ? 'ప్రకృతి ఆధారిత పద్ధతులు' : 'NATURE-BASED PRACTICES'}</p><h1>{language === 'te' ? 'సంప్రదాయ జ్ఞానం, జాగ్రత్తలతో.' : 'Traditional knowledge, grounded in care.'}</h1><p>{language === 'te' ? 'ఈ పద్ధతులను స్థానిక నేల, పంట, వాతావరణం మరియు నిపుణుల సలహాతో కలిపి ఉపయోగించండి.' : 'Use these practices with local soil, crop and weather conditions — and with expert advice.'}</p></div><div className="natural-layout"><aside className="method-list" aria-label="Natural farming methods">{naturalMethods.map((entry) => <button key={entry.id} className={entry.id === selected ? 'active' : ''} onClick={() => setSelected(entry.id)}><span>{entry.emoji}</span><div><strong>{label(entry, language)}</strong><small>{language === 'te' ? entry.titleEn : entry.titleTe}</small></div><b>→</b></button>)}</aside><article className="method-detail"><div className="method-heading"><span>{method.emoji}</span><div><p className="eyebrow">{language === 'te' ? 'పద్ధతి వివరాలు' : 'PRACTICE GUIDE'}</p><h2>{label(method, language)}</h2><p>{localized(method, 'what', language)}</p></div></div><div className="method-columns"><div><small>{language === 'te' ? 'ఎందుకు ఉపయోగిస్తారు?' : 'WHY USE IT?'}</small><p>{localized(method, 'why', language)}</p></div><div><small>{language === 'te' ? 'అవసరమైనవి' : 'MATERIALS'}</small><p>{localized(method, 'materials', language)}</p></div></div><div className="prep-list"><small>{language === 'te' ? 'సురక్షిత తయారీ, వినియోగ దశలు' : 'SAFE PREPARATION & USE'}</small><ol>{localized(method, 'steps', language).map((step) => <li key={step}>{step}</li>)}</ol></div><AudioGuide title={label(method, language)} transcript={transcript} language={language} /><SafetyNotice language={language} compact /></article></div></main></>;
}

function PestCard({ pest, language, compact = false }) {
  return <article className={`pest-card ${compact ? 'compact-pest' : ''}`}><div className="pest-card-head"><span>{pest.emoji}</span><div><small>{pest.crop}</small><h3>{label(pest, language)}</h3><p>{language === 'te' ? pest.titleEn : pest.titleTe}</p></div></div><div className="pest-info"><strong>{language === 'te' ? 'గుర్తింపు' : 'IDENTIFY'}</strong><p>{localized(pest, 'symptoms', language)}</p></div>{!compact && <><div className="pest-info"><strong>{language === 'te' ? 'నివారణ' : 'PREVENT'}</strong><p>{localized(pest, 'prevention', language)}</p></div><div className="natural-tip"><span>🌿</span>{localized(pest, 'natural', language)}</div></>}<ListenButton text={`${label(pest, language)}. ${localized(pest, 'symptoms', language)}`} language={language} /></article>;
}

function PestPage({ language }) {
  const [filter, setFilter] = useState('All');
  const options = ['All', ...new Set(pests.map((pest) => pest.crop))];
  const visiblePests = filter === 'All' ? pests : pests.filter((pest) => pest.crop === filter);
  return <><PageMeta title={language === 'te' ? 'పురుగు & తెగులు మార్గదర్శిని' : 'Pest & disease guide'} /><main className="page shell"><div className="page-intro"><p className="eyebrow">{language === 'te' ? 'పంట రక్షణ' : 'CROP PROTECTION'}</p><h1>{language === 'te' ? 'చూడండి. నిర్ధారించండి. సురక్షితంగా చర్య తీసుకోండి.' : 'Observe. Confirm. Act safely.'}</h1><p>{language === 'te' ? 'లక్షణాలను ముందే గుర్తించండి, కారణాన్ని నిర్ధారించండి, ప్రస్తుత స్థానిక సిఫార్సు తీసుకోండి.' : 'Spot symptoms early, confirm the cause, then use current local recommendations.'}</p></div><SafetyNotice language={language} /><div className="filter-row" aria-label="Pest crop filter">{options.map((option) => <button key={option} className={filter === option ? 'active' : ''} onClick={() => setFilter(option)}>{option}</button>)}</div><div className="pest-grid">{visiblePests.map((pest) => <PestCard key={pest.id} pest={pest} language={language} />)}</div><section className="protection-checklist"><div><p className="eyebrow">{language === 'te' ? 'సురక్షిత స్ప్రేయింగ్' : 'SAFE SPRAYING'}</p><h2>{language === 'te' ? 'లేబుల్ మరియు స్థానిక సలహానే ముందుగా.' : 'The label and local advice come first.'}</h2></div><ul><li>🧤 {language === 'te' ? 'లేబుల్ చెప్పినట్లు గ్లౌవ్స్, రక్షణ దుస్తులు ధరించండి.' : 'Wear gloves and protective clothing as the label requires.'}</li><li>◉ {language === 'te' ? 'పిల్లలు, జంతువులు, ఆహారం నుంచి దూరంగా నిల్వ చేయండి.' : 'Store away from children, animals and food.'}</li><li>♲ {language === 'te' ? 'ఖాళీ కంటైనర్లను సూచనల ప్రకారం పారవేయండి.' : 'Dispose of empty containers as directed.'}</li><li>✚ {language === 'te' ? 'అనారోగ్యం లేదా విష ప్రభావం అనుమానం ఉంటే వెంటనే వైద్య సహాయం పొందండి.' : 'Seek medical help immediately for suspected poisoning or exposure.'}</li></ul></section></main></>;
}

function SchemeCard({ scheme, language }) {
  return <article className="scheme-card"><div className="scheme-symbol">{scheme.icon}</div><div className="scheme-copy"><div className="card-topline"><span>{language === 'te' ? 'ప్రభుత్వ పథకం' : 'GOVERNMENT SCHEME'}</span><span className="reviewed">● {ui[language].verified}: {scheme.lastVerified}</span></div><h3>{label(scheme, language)}</h3><p className="translation">{language === 'te' ? scheme.titleEn : scheme.titleTe}</p><p>{localized(scheme, 'purpose', language)}</p><div className="scheme-details"><div><small>📄 {language === 'te' ? 'పత్రాలు' : 'DOCUMENTS'}</small><p>{localized(scheme, 'documents', language)}</p></div></div><div className="scheme-footer"><a href={scheme.url} target="_blank" rel="noreferrer">↗ {language === 'te' ? 'అధికారిక వెబ్‌సైట్' : 'Official website'}</a><small>{ui[language].source}: {scheme.sourceName}</small></div></div></article>;
}

function EligibilityFinder({ language }) {
  const [form, setForm] = useState({ state: 'Andhra Pradesh', irrigation: false, insurance: false, natural: false, fpo: false });
  const [submitted, setSubmitted] = useState(false);
  const candidates = schemes.filter((scheme) => (form.insurance && scheme.helps.includes('insurance')) || (form.irrigation && scheme.helps.includes('irrigation')) || (form.natural && scheme.helps.includes('natural')) || (form.fpo && scheme.helps.includes('fpo')) || scheme.helps.includes('landholder'));
  function toggle(name) { setForm((current) => ({ ...current, [name]: !current[name] })); }
  return <section className="eligibility-box"><div><p className="eyebrow">{language === 'te' ? 'ఇంటరాక్టివ్ గైడ్' : 'INTERACTIVE GUIDE'}</p><h2>{language === 'te' ? 'నాకు సరిపోయే పథకాలు కనుగొనండి' : 'Find schemes for me'}</h2><p>{language === 'te' ? 'ఇది సమాచార గైడ్ మాత్రమే; అధికారిక అర్హత నిర్ణయం కాదు.' : 'This is an informational eligibility guide, not an official eligibility determination.'}</p></div><form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><label>{language === 'te' ? 'రాష్ట్రం' : 'State'}<select value={form.state} onChange={(event) => setForm((current) => ({ ...current, state: event.target.value }))}><option>Andhra Pradesh</option><option>Telangana</option><option>Other</option></select></label><div className="checkbox-grid">{[['irrigation', language === 'te' ? 'పారుదల అవసరం' : 'Need irrigation support'], ['insurance', language === 'te' ? 'పంట బీమా కావాలి' : 'Need crop insurance'], ['natural', language === 'te' ? 'ప్రకృతి/సేంద్రియ సాగు' : 'Natural / organic farming'], ['fpo', language === 'te' ? 'FPOతో ఉన్నాను' : 'Part of an FPO']].map(([name, fieldLabel]) => <label className="check-label" key={name}><input type="checkbox" checked={form[name]} onChange={() => toggle(name)} /><span>{fieldLabel}</span></label>)}</div><button className="primary-button" type="submit">{language === 'te' ? 'సాధ్యమైన పథకాలు చూపండి' : 'Show possible schemes'} <span>→</span></button></form>{submitted && <div className="eligibility-results"><strong>{language === 'te' ? 'మీ సమాధానాల ఆధారంగా చూడవచ్చు:' : 'Based on your answers, you may review:'}</strong>{candidates.map((scheme) => <a href={`#${scheme.id}`} key={scheme.id}>{label(scheme, language)} →</a>)}<small>{language === 'te' ? 'తుది అర్హత, తేదీలు, పత్రాల కోసం అధికారిక పోర్టల్ లేదా స్థానిక శాఖను సంప్రదించండి.' : 'Check the official portal or local department for final eligibility, dates and documents.'}</small></div>}</section>;
}

function SchemesPage({ language }) {
  return <><PageMeta title={language === 'te' ? 'ప్రభుత్వ పథకాలు' : 'Government schemes'} /><main className="page shell"><div className="page-intro"><p className="eyebrow">{language === 'te' ? 'పథకాల సమాచారం' : 'SCHEME INFORMATION'}</p><h1>{language === 'te' ? 'అవకాశాన్ని తెలుసుకోండి. అధికారికంగా నిర్ధారించండి.' : 'Know the opportunity. Verify it officially.'}</h1><p>{language === 'te' ? 'పథకాల నిబంధనలు మారవచ్చు. ఈ పేజీలోని ప్రతి కార్డుకు అధికారిక వనరును తెరవండి.' : 'Scheme rules can change. Open the official source shown on every card before applying.'}</p></div><EligibilityFinder language={language} /><div className="scheme-list">{schemes.map((scheme) => <div id={scheme.id} key={scheme.id}><SchemeCard scheme={scheme} language={language} /></div>)}</div></main></>;
}

function ToolsPage({ language }) {
  const [area, setArea] = useState('1');
  const [unit, setUnit] = useState('acres');
  const [seedRate, setSeedRate] = useState('');
  const numericArea = Number(area);
  const acres = unit === 'hectares' ? numericArea * 2.47105 : unit === 'sqMeters' ? numericArea / 4046.86 : numericArea;
  const seedTotal = Number(seedRate) * acres;
  return <><PageMeta title={language === 'te' ? 'రైతు ఉపకరణాలు' : 'Farmer tools'} /><main className="page shell"><div className="page-intro"><p className="eyebrow">{language === 'te' ? 'సాధారణ లెక్కలు' : 'SIMPLE CALCULATORS'}</p><h1>{language === 'te' ? 'మీ ప్రణాళికకు చిన్న ఉపయోగకరమైన ఉపకరణాలు.' : 'Small, practical tools for your plan.'}</h1><p>{language === 'te' ? 'స్థానిక నిపుణుడి సిఫార్సును మార్చేలా ఈ లెక్కలు ఉండవు.' : 'These calculators do not replace a local expert’s recommendation.'}</p></div><div className="tools-grid"><section className="tool-card"><span className="tool-icon">▧</span><h2>{language === 'te' ? 'భూమి విస్తీర్ణ మార్పిడి' : 'Land area converter'}</h2><p>{language === 'te' ? 'మీ భూమి ఎకరాల్లో ఎంత ఉందో చూడండి.' : 'See your field size in acres.'}</p><label>{language === 'te' ? 'విస్తీర్ణం' : 'Area'}<input type="number" min="0" value={area} onChange={(event) => setArea(event.target.value)} /></label><label>{language === 'te' ? 'యూనిట్' : 'Unit'}<select value={unit} onChange={(event) => setUnit(event.target.value)}><option value="acres">Acres</option><option value="hectares">Hectares</option><option value="sqMeters">Square metres</option></select></label><output>{Number.isFinite(acres) ? acres.toFixed(3) : '0.000'} <small>{language === 'te' ? 'ఎకరాలు' : 'acres'}</small></output></section><section className="tool-card"><span className="tool-icon">🌱</span><h2>{language === 'te' ? 'విత్తన అవసర లెక్క' : 'Seed requirement estimate'}</h2><p>{language === 'te' ? 'ధృవీకరించిన విత్తన రేటు ఉంటే మాత్రమే నమోదు చేయండి.' : 'Enter a seed rate only if it is a verified local recommendation.'}</p><label>{language === 'te' ? 'విత్తన రేటు (కిలోలు / ఎకరం)' : 'Seed rate (kg / acre)'}<input type="number" min="0" value={seedRate} onChange={(event) => setSeedRate(event.target.value)} placeholder="0" /></label><output>{Number.isFinite(seedTotal) ? seedTotal.toFixed(1) : '0.0'} <small>{language === 'te' ? 'కిలోల విత్తనం' : 'kg seed'}</small></output><small className="tool-note">{language === 'te' ? 'స్థానిక రకం, నాటే పద్ధతిని బట్టి రేటు మారుతుంది. ఊహించిన రేటు వేయవద్దు.' : 'Rates vary by variety and method. Never enter a guessed rate.'}</small></section><section className="tool-card irrigation-card"><span className="tool-icon">💧</span><h2>{language === 'te' ? 'నీటి ప్రణాళిక' : 'Irrigation planner'}</h2><p>{language === 'te' ? 'నిర్దిష్ట పరిమాణం చెప్పే ముందు నేల తేమ, వాతావరణం, పంట దశను చూడాలి.' : 'Soil moisture, weather and crop stage must be checked before setting an amount.'}</p><ul><li>◌ {language === 'te' ? 'నేల తేమను పరిశీలించండి' : 'Check soil moisture'}</li><li>◌ {language === 'te' ? 'వర్ష సూచన చూడండి' : 'Review rainfall forecast'}</li><li>◌ {language === 'te' ? 'నీరు నిలవకుండా చూడండి' : 'Avoid waterlogging'}</li></ul><Link to="/crops" className="text-link">{language === 'te' ? 'పంట గైడ్‌కు వెళ్ళండి' : 'Open crop guide'} →</Link></section></div></main></>;
}

function SearchOverlay({ language, onClose }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const inventory = useMemo(() => [
    ...crops.map((crop) => ({ type: language === 'te' ? 'పంట' : 'Crop', name: label(crop, language), alt: `${crop.titleEn} ${crop.titleTe} ${crop.overviewEn} ${crop.overviewTe}`, path: `/crops/${crop.id}`, icon: crop.emoji })),
    ...pests.map((pest) => ({ type: language === 'te' ? 'పురుగు/తెగులు' : 'Pest / disease', name: label(pest, language), alt: `${pest.titleEn} ${pest.titleTe} ${pest.crop}`, path: '/pest-guide', icon: pest.emoji })),
    ...naturalMethods.map((method) => ({ type: language === 'te' ? 'పద్ధతి' : 'Practice', name: label(method, language), alt: `${method.titleEn} ${method.titleTe} ${method.whatEn} ${method.whatTe}`, path: '/natural-farming', icon: method.emoji })),
    ...schemes.map((scheme) => ({ type: language === 'te' ? 'పథకం' : 'Scheme', name: label(scheme, language), alt: `${scheme.titleEn} ${scheme.titleTe} ${scheme.purposeEn} ${scheme.purposeTe}`, path: `/schemes#${scheme.id}`, icon: scheme.icon })),
  ], [language]);
  const results = query.trim() ? inventory.filter((item) => `${item.name} ${item.alt}`.toLocaleLowerCase().includes(query.toLocaleLowerCase())).slice(0, 8) : inventory.slice(0, 6);
  function select(path) { navigate(path); onClose(); }
  return <div className="search-overlay" role="dialog" aria-modal="true" aria-label={ui[language].search}><div className="search-modal"><button className="modal-close" onClick={onClose} aria-label={ui[language].close}>×</button><p className="eyebrow">{language === 'te' ? 'వెతకండి' : 'SEARCH AGRISAHAYAK'}</p><div className="search-input-wrap"><span>⌕</span><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder={ui[language].search} /><kbd>ESC</kbd></div><p className="search-hint">{query ? (language === 'te' ? 'ఫలితాలు' : 'Results') : (language === 'te' ? 'సూచించినవి' : 'Suggested')}</p><div className="search-results">{results.length ? results.map((item) => <button key={`${item.type}-${item.name}`} onClick={() => select(item.path)}><span>{item.icon}</span><div><small>{item.type}</small><strong>{item.name}</strong></div><b>→</b></button>) : <div className="empty-search">{language === 'te' ? 'ఫలితాలు లేవు. వేరే పదంతో ప్రయత్నించండి.' : 'No results. Try a crop, symptom or scheme name.'}</div>}</div></div></div>;
}

function VideosStrip({ language }) {
  return <section className="video-strip"><SectionHeading eyebrow={language === 'te' ? 'వీడియో రిఫరెన్స్‌లు' : 'VIDEO REFERENCES'} title={language === 'te' ? 'అధికారిక తెలుగు వీడియోలు జోడించే స్థలం' : 'A place for verified Telugu videos'} copy={language === 'te' ? 'తప్పుడు వీడియోలు ఇవ్వకుండా, ఈ కార్డుల్లో ధృవీకరించిన సంస్థల వీడియోలు మాత్రమే జోడించాలి.' : 'To avoid false references, add links here only after an official institution and upload are verified.'} /><div className="video-slot-grid">{videoSlots.map((video) => <article key={video.titleEn}><div className="video-placeholder">▶<small>{video.topic}</small></div><div><small className="needs-verification">{language === 'te' ? 'ధృవీకరణ అవసరం' : video.status}</small><h3>{language === 'te' ? video.titleTe : video.titleEn}</h3><p>{language === 'te' ? video.titleEn : video.titleTe}</p></div></article>)}</div></section>;
}

function Footer({ language, setLanguage }) {
  return <footer className="site-footer"><div className="shell footer-grid"><div><Logo /><p>{language === 'te' ? 'సులభమైన, సురక్షితమైన వ్యవసాయ నిర్ణయాలకు మీ డిజిటల్ సహాయకుడు.' : 'A digital helper for simpler, safer farming decisions.'}</p><LanguageSwitcher language={language} setLanguage={setLanguage} /></div><div><strong>{language === 'te' ? 'సమాచారం' : 'INFORMATION'}</strong><Link to="/crops">{ui[language].crops}</Link><Link to="/natural-farming">{ui[language].natural}</Link><Link to="/pest-guide">{ui[language].pests}</Link></div><div><strong>{language === 'te' ? 'రైతు సహాయం' : 'FARMER HELP'}</strong><Link to="/schemes">{ui[language].schemes}</Link><Link to="/tools">{ui[language].tools}</Link><a href="https://agriwelfare.gov.in/" target="_blank" rel="noreferrer">{language === 'te' ? 'అధికారిక వనరులు' : 'Official resources'} ↗</a></div><div className="footer-disclaimer"><strong>{language === 'te' ? 'ముఖ్యమైన గమనిక' : 'IMPORTANT DISCLAIMER'}</strong><p>{sourceNotice[language]}</p></div></div><div className="shell footer-bottom"><span>© 2026 AgriSahayak</span><span>{language === 'te' ? 'విద్యా ప్రయోజనాల కోసం రూపొందించబడింది' : 'Designed for educational agriculture guidance'}</span></div></footer>;
}

function NotFound({ language }) {
  return <main className="not-found shell"><span>🌱</span><h1>{language === 'te' ? 'ఈ పేజీ కనిపించలేదు' : 'This field is not on our map yet.'}</h1><p>{language === 'te' ? 'మీరు వెతికిన సమాచారం కోసం హోమ్ పేజీకి తిరిగి వెళ్ళండి.' : 'Return home to explore the available farming guides.'}</p><Link className="primary-button" to="/">{language === 'te' ? 'హోమ్‌కు వెళ్ళండి' : 'Go home'} →</Link></main>;
}

export default function App() {
  const [language, setLanguage] = useState(() => localStorage.getItem(languageKey) || 'te');
  const [saved, setSaved] = useState(() => JSON.parse(localStorage.getItem(favoritesKey) || '[]'));
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => { localStorage.setItem(languageKey, language); document.documentElement.lang = language === 'te' ? 'te' : 'en'; }, [language]);
  useEffect(() => { localStorage.setItem(favoritesKey, JSON.stringify(saved)); }, [saved]);
  useEffect(() => { const close = (event) => event.key === 'Escape' && setSearchOpen(false); window.addEventListener('keydown', close); return () => window.removeEventListener('keydown', close); }, []);
  function toggleFavorite(id) { setSaved((current) => current.includes(id) ? current.filter((entry) => entry !== id) : [...current, id]); }

  const routeProps = { language, saved, onToggleFavorite: toggleFavorite };
  return <><ScrollToTop /><Header language={language} setLanguage={setLanguage} setSearchOpen={setSearchOpen} /><Routes><Route path="/" element={<Home {...routeProps} setSearchOpen={setSearchOpen} />} /><Route path="/crops" element={<CropsPage {...routeProps} />} /><Route path="/crops/:id" element={<CropDetail {...routeProps} />} /><Route path="/natural-farming" element={<NaturalPage language={language} />} /><Route path="/pest-guide" element={<PestPage language={language} />} /><Route path="/schemes" element={<SchemesPage language={language} />} /><Route path="/tools" element={<ToolsPage language={language} />} /><Route path="*" element={<NotFound language={language} />} /></Routes><VideosStrip language={language} /><Footer language={language} setLanguage={setLanguage} /><MobileBottomNav language={language} />{searchOpen && <SearchOverlay language={language} onClose={() => setSearchOpen(false)} />}</>;
}

import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { IconCube, IconSourceCode, IconCpu, IconFlask, IconArrowRight, IconArrowLeft, IconArrowUpRight, IconHandMove, IconChristmasTree, IconBuildingCommunity, IconX, IconCheck, IconMenu2, IconPlayerPause, IconRotateClockwise, IconBrandBilibili, IconBook2, IconLeaf, IconCopy, IconSparkles, IconDownload } from '@tabler/icons-react';

import ResourceGuides from './ResourceGuides.jsx';

const IdeaCube = lazy(() => import('./IdeaCube.jsx'));
const VIDEO = 'https://www.bilibili.com/video/BV1DPbc68EjK';
const WORKBUDDY = 'https://www.workbuddy.cn/';
const groups = [
  { id: 'digital', title: '应用与网页', eyebrow: 'BUILD SOMETHING USEFUL', icon: IconSourceCode, description: '一个小工具，也能解决一个真实问题。', detail: '从自己的生活和学习需求出发，制作电脑端应用、网页或小程序。借助AI编写和调试代码，再亲自测试它是否真的好用。', ideas: [
    { title: '让学习计划更适合自己', type: '网页应用', intro: '把学习任务、可用时间和休息安排在同一张计划表中。', first: '列出你想记录的三类任务，先做出能添加、完成和删除任务的一页工具。' },
    { title: '给校园活动一个展示页', type: '网页设计', intro: '用网页介绍一次活动，让同学们快速找到时间、地点和参与方式。', first: '选一次真实活动，整理标题、介绍和三张你有权使用的图片。' },
    { title: '把科学原理讲成一个故事', type: '创意表达', intro: '用动画、视频或互动页面，把一个难懂的知识点解释清楚。', first: '选择一个知识点，写出一分钟的讲解脚本，并核实其中的事实。' },
  ] },
  { id: 'hardware', title: '硬件与发明', eyebrow: 'BRING IDEAS TO LIFE', icon: IconCpu, description: '让代码与现实世界产生联系。', detail: '利用学校的开源硬件和各类传感器，学习采集数据、控制设备。把屏幕中的程序，变成可以感知环境、作出响应的实体作品。', ideas: [
    { title: '会提醒你的植物观察站', type: '传感器 · 植物', intro: '记录植物周围的环境，用数据帮助判断何时需要照顾它。', first: '向老师确认可用的传感器，先记录一天的环境数据，再决定提醒规则。' },
    { title: '教室环境观察站', type: '传感器 · 数据', intro: '观察教室不同时间的光照、温度等变化，寻找有趣的规律。', first: '选择一个可测量的指标，确定记录地点、时间间隔和数据保存方式。' },
    { title: '一盏懂得响应的灯', type: '开源硬件 · 控制', intro: '让灯光根据环境变化作出响应，从一个小功能开始理解自动控制。', first: '在老师指导下，先用低压开发板完成一次读数和一次灯光控制。' },
  ] },
  { id: 'science', title: '科学与研究', eyebrow: 'FOLLOW YOUR CURIOSITY', icon: IconFlask, description: '把一个“为什么”，变成可以验证的问题。', detail: '借助AI梳理背景知识、设计实验步骤、编写数据处理程序。自己检查实验是否公平、数据是否可靠、结论是否有证据支持。', ideas: [
    { title: '哪里才是教室最亮的位置？', type: '观察 · 测量', intro: '比较不同位置和时段的光照，看看直觉是否和测量结果一致。', first: '画一张测量位置图，固定测量高度，在相同时间完成一轮记录。' },
    { title: '纸飞机怎样飞得更远？', type: '对照实验', intro: '改变一个设计因素，用重复实验寻找更稳定的飞行表现。', first: '只选择一个变量，固定纸张、投掷方式和场地，设计重复测量表。' },
    { title: '用模拟实验检验一个猜想', type: '理论 · 仿真', intro: '从运动学问题出发，在老师的Motion Lab中调整条件，观察轨迹与速度的变化。', first: '先写下猜想，再打开学习资源中的Motion Lab，选择平抛运动，只改变水平初速度，比较落地时间和水平位移。' },
  ] },
];
const resources = [
  { icon: IconBrandBilibili, category: '老师推荐', title: '先认识AI智能体', desc: '带着一个问题看视频：如果有AI与你合作，你最想做出什么？', href: VIDEO, action: '前往哔哩哔哩' },
  { icon: IconCube, category: '社团创作工具', title: '腾讯 WorkBuddy', desc: '用日常语言描述目标，让智能体帮助拆解任务、编写代码和处理文件。', href: WORKBUDDY, action: '下载与体验' },
  { icon: IconBook2, category: '认识人工智能', title: 'AI发展史', desc: '从2006年的深度学习到今天的AI智能体，读懂近20年的关键转折，重点看近几年的变化。', href: '#ai-history', guide: 'history', action: '展开发展时间线' },
  { icon: IconCpu, category: '开源硬件', title: 'K10 × Mind+', desc: '认识社团的行空板K10，从屏幕、传感器和灯光入门，逐步制作视觉与语音交互作品。', href: '#k10-guide', guide: 'k10', action: '查看K10入门路线' },
  { icon: IconFlask, category: '科学探索 · 老师的作品', title: 'Motion Lab 运动实验室', desc: '走进老师制作的高中物理互动实验室，调整运动条件、观察轨迹与速度矢量，用模拟检验猜想。', href: 'https://sherlock-ccnu.github.io/motion-lab/', action: '进入老师的实验室' },
  { icon: IconBook2, category: '开始之前', title: '第一次活动准备清单', desc: '完成工具注册、了解积分，并与家长沟通活动期间的登录协助。', href: '#preparation', action: '查看我的清单' },
];
const starterPrompt = '我是一名高中生，想做一个帮助自己学习的小工具。请先问我几个问题，帮助我找到一个适合初学者完成的项目。';

function readProgress() {
  try { const saved = JSON.parse(localStorage.getItem('ai-science-preparation-v1')); return Array.isArray(saved) && saved.length === 3 ? saved.map(Boolean) : [false, false, false]; } catch { return [false, false, false]; }
}

function Lab({ onExplore, motion, onMotion }) {
  const stage = useRef(null);
  const [angle, setAngle] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const start = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [showHints, setShowHints] = useState(false);
  function move(e) {
    if (!start.current) return;
    setAngle({ x: Math.max(-7, Math.min(7, start.current.x - (e.clientY - start.current.cy) / 22)), y: Math.max(-11, Math.min(11, start.current.y + (e.clientX - start.current.cx) / 19)) });
  }
  function down(e) {
    if (e.target.closest('button')) return;
    stage.current.setPointerCapture(e.pointerId);
    start.current = { cx: e.clientX, cy: e.clientY, ...angle };
    setDragging(true);
  }
  function stop() { start.current = null; setDragging(false); }
  function key(e) {
    if (e.target !== stage.current) return;
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home'].includes(e.key)) {
      e.preventDefault();
      if (e.key === 'Home') setAngle({ x: 0, y: 0 });
      else setAngle(a => ({ x: Math.max(-7, Math.min(7, a.x + (e.key === 'ArrowUp' ? 2 : e.key === 'ArrowDown' ? -2 : 0))), y: Math.max(-11, Math.min(11, a.y + (e.key === 'ArrowRight' ? 3 : e.key === 'ArrowLeft' ? -3 : 0))) }));
    }
  }
  return <div className={`lab ${motion ? '' : 'motion-paused'}`}>
    <div className={`lab-stage ${dragging ? 'is-dragging' : ''} ${showHints ? 'show-hints' : ''}`} ref={stage} tabIndex={0} role="group" aria-label="交互式实验室：拖动或使用方向键调整景深，Home键复位。点击标记探索项目。" onPointerDown={down} onPointerMove={move} onPointerUp={stop} onPointerCancel={stop} onLostPointerCapture={stop} onKeyDown={key}>
      <div className="lab-depth" style={{ transform: `perspective(1200px) rotateX(${angle.x}deg) rotateY(${angle.y}deg)`, opacity: loaded ? 1 : 0 }}>
        <img className="lab-image" src={import.meta.env.BASE_URL + "assets/lab-hero.png"} width="1536" height="1408" alt="木质微型实验室：电脑、传感器、绿植、望远镜与实验装置" draggable="false" fetchPriority="high" onLoad={() => setLoaded(true)} />
        {[{ id: 'digital', cls: 'computer', label: '电脑：探索应用与网页' }, { id: 'hardware', cls: 'sensor', label: '传感器：探索硬件与发明' }, { id: 'science', cls: 'experiment', label: '实验装置：探索科学与研究' }].map(h => <button key={h.id} className={`hotspot ${h.cls}`} aria-label={h.label} onClick={() => onExplore(h.id)}><span className="hotspot-mark"><IconArrowUpRight size={15}/></span><span className="hotspot-label">{groups.find(g => g.id === h.id).title}</span></button>)}
      </div>
      <button className="floating-cube" aria-label="探索一个项目灵感" onClick={() => onExplore('science')}><Suspense fallback={<IconCube size={52} stroke={1}/>}><IdeaCube animate={motion} /></Suspense></button>
    </div>
    <div className="lab-controls">
      <button aria-label="实验室向左倾斜" onClick={() => setAngle(a => ({ ...a, y: Math.max(-11, a.y - 4) }))}><IconArrowLeft size={22}/></button>
      <button className="lab-hint" onClick={() => setShowHints(v => !v)} aria-pressed={showHints}><IconHandMove size={33} stroke={1.35}/><span>拖动，探索你的实验室</span></button>
      <button aria-label="实验室向右倾斜" onClick={() => setAngle(a => ({ ...a, y: Math.min(11, a.y + 4) }))}><IconArrowRight size={22}/></button>
      <button className="reset-scene" aria-label="复位实验室" onClick={() => setAngle({ x: 0, y: 0 })}><IconRotateClockwise size={18}/></button>
    </div>
  </div>;
}

function ProjectDialog({ selected, onClose, onCopy }) {
  const ref = useRef(null);
  useEffect(() => { const last = document.activeElement; ref.current?.showModal(); return () => last?.focus?.(); }, []);
  const { idea, group } = selected;
  return <dialog ref={ref} className="project-dialog" onCancel={onClose} onClick={e => { if (e.target === e.currentTarget) onClose(); }} aria-labelledby="dialog-title">
    <div className="dialog-content"><button className="dialog-close icon-button" aria-label="关闭项目灵感" onClick={onClose}><IconX size={24}/></button>
      <span className="eyebrow">一个值得开始的项目</span><p className="dialog-category">{group.title} / {idea.type}</p><h2 id="dialog-title">{idea.title}</h2><p>{idea.intro}</p>
      <div className="first-step"><span>你的第一步</span><p>{idea.first}</p></div>
      <p className="dialog-note">这是一个项目灵感。你可以根据自己的兴趣调整目标，和老师一起确认可行性。</p>
      <button className="button primary" onClick={() => onCopy(`我是一名高中生，想尝试“${idea.title}”。我的初步想法是：${idea.intro} 请先问我几个问题，帮助我缩小范围，再给出适合初学者的任务步骤。请指出需要核实的信息，不要编造实验结果。`)}><IconCopy size={19}/>复制给AI的项目需求</button>
    </div>
  </dialog>;
}

export function App() {
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState('digital');
  const [checked, setChecked] = useState(readProgress);
  const [motion, setMotion] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [toast, setToast] = useState('');
  const [dialog, setDialog] = useState(null);
  const [guide, setGuide] = useState(null);
  const [manualCopy, setManualCopy] = useState('');
  const copyDialog = useRef(null);
  const group = groups.find(g => g.id === active);
  const done = checked.filter(Boolean).length;
  useEffect(() => { document.documentElement.dataset.motion = motion ? 'on' : 'off'; }, [motion]);
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(''), 2800); return () => clearTimeout(t); }, [toast]);
  useEffect(() => { if (manualCopy) copyDialog.current?.showModal(); }, [manualCopy]);
  function toggleTask(i) {
    setChecked(current => { const next = current.map((v, j) => i === j ? !v : v); try { localStorage.setItem('ai-science-preparation-v1', JSON.stringify(next)); } catch { setToast('本次勾选已更新，浏览器未能保存进度'); } return next; });
  }
  function explore(id) { setActive(id); document.getElementById('projects')?.scrollIntoView({ behavior: motion ? 'smooth' : 'instant' }); }
  async function copy(text, message = '已复制，可以粘贴到WorkBuddy中') { try { await navigator.clipboard.writeText(text); setToast(message); } catch { setManualCopy(text); } }
  function copyChecklist() {
    const text = `武汉市吴家山中学 AI科学社｜课前准备\n\n${checked[0] ? '[已完成]' : '[待完成]'} 注册并体验腾讯 WorkBuddy：${WORKBUDDY}\n${checked[1] ? '[已完成]' : '[待完成]'} 学习签到领取积分，并查看余额和有效期。\n${checked[2] ? '[已完成]' : '[待完成]'} 邀请一位家长加入社团QQ群，约定活动期间的登录协助。验证码请家长私聊转告孩子。\n\n活动地点：启心楼4楼三号机房\n推荐视频：${VIDEO}\n\n免费权益、签到入口与积分规则以官方页面和账号实际显示为准。`;
    copy(text, '课前清单已复制，可粘贴保存或转发给家长');
  }
  return <>
    <a className="skip-link" href="#main">跳到主要内容</a>
    <header className="site-header" id="home"><a className="brand" href="#home" aria-label="AI科学社首页"><IconCube className="brand-symbol" size={46} stroke={1.8}/><strong>AI科学社</strong><span className="school">武汉市吴家山中学</span></a>
      <nav aria-label="主导航" className={menu ? 'navigation is-open' : 'navigation'}>{[['about', '社团介绍'], ['projects', '项目探索'], ['resources', '学习资源'], ['preparation', '课前准备']].map(([id, name]) => <a href={`#${id}`} key={id} onClick={() => setMenu(false)}>{name}</a>)}</nav>
      <button className="motion-toggle icon-button" aria-label={motion ? '暂停场景动画' : '开启场景动画'} title={motion ? '暂停场景动画' : '开启场景动画'} aria-pressed={!motion} onClick={() => setMotion(v => !v)}>{motion ? <IconChristmasTree size={29} stroke={1.7}/> : <IconPlayerPause size={23}/>}</button>
      <button className="menu-toggle icon-button" aria-label={menu ? '关闭导航菜单' : '打开导航菜单'} aria-expanded={menu} onClick={() => setMenu(v => !v)}>{menu ? <IconX/> : <IconMenu2/>}</button>
    </header>
    <main id="main"><section className="opening" aria-labelledby="hero-heading">
      <div className="hero"><div className="hero-copy"><p className="hero-kicker">让好奇心，拥有实现的工具</p><h1 id="hero-heading">把你的想法，<br/>变成真实作品。</h1><p className="slogan">Attention Is All You Need!</p><p className="hero-description">与AI智能体协作，制作应用、连接传感器、开展科学探索。</p><div className="hero-actions"><a className="button primary" href="#projects">开始探索</a><a className="text-link" href={VIDEO} target="_blank" rel="noopener noreferrer">观看AI智能体视频<IconArrowUpRight size={16}/></a></div></div><Lab onExplore={explore} motion={motion}/></div>
      <div className="category-links" aria-label="探索项目方向">{groups.map(g => <button key={g.id} onClick={() => explore(g.id)}><g.icon size={51} stroke={1.1}/><span>{g.title}</span><IconArrowUpRight className="category-arrow" size={20}/></button>)}</div>
      <div className="preparation-preview"><a className="preview-heading" href="#preparation">课前准备</a><a href="#task-1"><i>01</i><span>注册 WorkBuddy<small>腾讯AI智能体工作台</small></span></a><a href="#task-2"><i>02</i><span>学习签到领积分</span></a><a href="#task-3"><i>03</i><span>邀请一位家长加入社团QQ群</span></a></div>
      <div className="location-bar"><span><IconBuildingCommunity size={22} stroke={1.35}/>启心楼4楼三号机房</span><a href="#about">继续认识我们<IconArrowRight size={17}/></a></div>
    </section>
    <section className="section about-section" id="about" aria-labelledby="about-title"><div className="section-label"><span>01 / ABOUT THE CLUB</span><IconLeaf size={24} stroke={1.3}/></div><div className="about-grid"><div><h2 id="about-title">不必等到什么都会，<br/>才开始创造。</h2><p className="large-subtitle">一个问题，一点兴趣，<br/>或者一句“我想试试”。</p></div><div className="about-body"><p>一个生活中的小麻烦，一个学习时冒出的疑问，一个一直想尝试的创意，都可以成为项目的起点。</p><p>在AI科学社，我们学习与人工智能智能体协作。它能够围绕目标拆解任务、使用工具，并根据反馈继续改进，帮助你接触编程、视频编辑、3D建模等尚未熟悉的领域。</p><p>你提出问题、作出判断，AI帮助你探索方法、推进实现。我们一起把脑海中的想法，变成看得见、用得上的作品。</p><div className="about-signature">保持好奇 · 动手探索 · 认真求证</div></div></div>
      <ol className="journey">{[['发现问题', '找到你真正想解决的事'], ['拆解任务', '和AI一起整理实现步骤'], ['动手制作', '做出第一个能运行的版本'], ['测试改进', '用真实反馈检验作品'], ['分享成果', '讲清作品与探索过程']].map(([title, desc], i) => <li key={title}><span className="journey-number">0{i+1}</span><h3>{title}</h3><p>{desc}</p></li>)}</ol>
    </section>
    <section className="section projects-section" id="projects" aria-labelledby="projects-title"><div className="section-label"><span>02 / FOLLOW YOUR CURIOSITY</span><span>从兴趣出发</span></div><div className="section-heading"><h2 id="projects-title">你的想法，可以走多远？</h2><p>从一个小项目开始，留下自己的创造。</p></div><div className="project-tabs" role="tablist" aria-label="项目类别">{groups.map(g => <button id={`tab-${g.id}`} aria-controls={`panel-${g.id}`} role="tab" aria-selected={active === g.id} tabIndex={active === g.id ? 0 : -1} key={g.id} onClick={() => setActive(g.id)} onKeyDown={e => { if (['ArrowLeft','ArrowRight','Home','End'].includes(e.key)) { e.preventDefault(); const i = groups.findIndex(x => x.id === active); const next = e.key === 'Home' ? 0 : e.key === 'End' ? 2 : (i + (e.key === 'ArrowRight' ? 1 : 2)) % 3; setActive(groups[next].id); document.getElementById(`tab-${groups[next].id}`)?.focus(); } }}><g.icon size={23} stroke={1.4}/>{g.title}</button>)}</div>
      <div role="tabpanel" id={`panel-${active}`} aria-labelledby={`tab-${active}`} className="project-panel" key={active}><div className="project-intro"><span className="eyebrow">{group.eyebrow}</span><h3>{group.description}</h3><p>{group.detail}</p></div><div className="idea-list">{group.ideas.map((idea, i) => <button key={idea.title} className="idea-row" onClick={() => setDialog({ idea, group })}><span className="idea-no">0{i+1}</span><div><span className="idea-type">{idea.type}</span><h4>{idea.title}</h4><p>{idea.intro}</p></div><IconArrowUpRight size={24} stroke={1.25}/></button>)}</div></div><p className="section-footnote">这些是项目灵感，欢迎你提出自己的方向。</p>
    </section>
    <section className="section resources-section" id="resources" aria-labelledby="resources-title"><div className="section-label"><span>03 / YOUR TOOLBOX</span><span>工具与资料</span></div><div className="section-heading"><h2 id="resources-title">给好奇心，配一套工具。</h2><p>在需要的时候，找到下一步。</p></div><a className="lesson-feature" href={`${import.meta.env.BASE_URL}lessons/llm-to-agent.html`}><IconBook2 size={38} stroke={1.2}/><div><span>AI科学社 · 互动理论课 · Miss Yang</span><h3>从 LLM 到智能体，AI的发展</h3><p>30页交互课件：理解模型、Token、上下文与工具，探索智能体怎样行动、怎样改进。</p></div><strong>打开课件 <IconArrowUpRight size={20}/></strong></a><a className="lesson-feature" href={`${import.meta.env.BASE_URL}lessons/think-build-screenshot.html`}><IconSourceCode size={38} stroke={1.2}/><div><span>AI科学社 · 第二课 · 45 分钟自主开发</span><h3>像创造者一样思考，像工程师一样开发</h3><p>本课任务：每人做一个能截图的工具。用 WorkBuddy 实现选区、截图、保存 PNG，提交自己的程序与实际测试记录。</p></div><strong>开始第二课 <IconArrowUpRight size={20}/></strong></a><div className="resource-grid">{resources.map(r => <a id={r.guide ? r.href.slice(1) : undefined} href={r.href} onClick={e => { if (r.guide) { e.preventDefault(); setGuide(r.guide); } }} aria-haspopup={r.guide ? "dialog" : undefined} className="resource" key={r.title} {...(r.href.startsWith('https') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}><div className="resource-top"><r.icon size={32} stroke={1.2}/><span>{r.category}</span></div><h3>{r.title}</h3><p>{r.desc}</p><span className="resource-action">{r.action}<IconArrowUpRight size={18}/></span></a>)}</div></section>
    <section className="section preparation-section" id="preparation" aria-labelledby="preparation-title"><div className="section-label"><span>04 / BEFORE WE BEGIN</span><span>第一次活动前</span></div><div className="section-heading"><h2 id="preparation-title">准备好你的AI创作伙伴。</h2><p>完成这三件事，带上一个想法来见面。</p></div><div className="progress-line"><span aria-live="polite">{done === 3 ? '准备就绪，期待你的第一个项目。' : `课前准备已完成 ${done} / 3`}</span><progress max="3" value={done} aria-label={`课前准备已完成${done}项，共3项`}/><button className="text-link" onClick={copyChecklist}><IconCopy size={18}/>复制清单</button></div>
      <div className="tasks"><article className={`task ${checked[0] ? 'is-complete' : ''}`} id="task-1"><label className="task-check"><input type="checkbox" checked={checked[0]} onChange={() => toggleTask(0)}/><span><IconCheck size={20}/></span><span className="sr-only">标记已完成：注册并体验WorkBuddy</span></label><div className="task-content"><span className="task-number">TASK 01</span><h3>注册并体验腾讯 WorkBuddy</h3><p>WorkBuddy是腾讯推出的AI智能体工作台。你可以用日常语言描述目标，让它帮助拆解任务、编写代码、处理文件和制作内容。</p><p>我们选择它作为入门工具，因为它提供免费体验额度与模型限时免费权益；获得的积分可以用于模型调用。具体可用模型、免费范围与消耗规则，以官方页面和账号实际显示为准。</p><p>请在家长知情和协助下，完成下载安装、注册与登录。试着把下面这段话发给它：</p><div className="prompt-example"><p>{starterPrompt}</p><button className="text-link" onClick={() => copy(starterPrompt)}><IconCopy size={17}/>复制这段话</button></div><a className="text-link" href={WORKBUDDY} target="_blank" rel="noopener noreferrer">前往WorkBuddy官网<IconArrowUpRight size={18}/></a></div></article>
      <article className={`task ${checked[1] ? 'is-complete' : ''}`} id="task-2"><label className="task-check"><input type="checkbox" checked={checked[1]} onChange={() => toggleTask(1)}/><span><IconCheck size={20}/></span><span className="sr-only">标记已完成：学习签到领取积分</span></label><div className="task-content"><span className="task-number">TASK 02</span><h3>学会签到领取积分</h3><p>登录后，查找签到或积分活动入口，按页面提示尝试领取积分，并学会查看积分余额和有效期。不同模型、不同任务的积分消耗可能不同，使用前留意页面提示。</p><p>如果当前账号没有签到入口，请记录问题，课上由老师协助确认。活动入口与奖励以实际页面为准。</p></div></article>
      <article className={`task ${checked[2] ? 'is-complete' : ''}`} id="task-3"><label className="task-check"><input type="checkbox" checked={checked[2]} onChange={() => toggleTask(2)}/><span><IconCheck size={20}/></span><span className="sr-only">标记已完成：与家长沟通并加入社团QQ群</span></label><div className="task-content"><span className="task-number">TASK 03</span><h3>与父母沟通，请一位家长加入社团QQ群</h3><p>向父母介绍社团的学习内容，并请至少一位家长加入社团QQ群，方便接收活动通知、配合课前准备。</p><p>如果使用家长手机号登录WorkBuddy，请提前约定：社团活动期间可能需要家长协助接收验证码。收到后，请通过与孩子约定的私聊方式及时转告，帮助完成登录。请勿在群内公开验证码。</p></div></article></div><p className="progress-note">勾选进度只保存在当前浏览器，不会提交给老师。</p></section>
    <section className="closing section" aria-labelledby="closing-title"><IconLeaf size={40} stroke={1.15}/><h2 id="closing-title">让好奇心带我们出发，<br/>让证据帮助我们判断。</h2><p>AI可以帮助我们加快探索，也可能给出错误的解释、代码和信息。<br className="desktop-only"/>核实资料，亲自测试，如实记录实验结果，分享时说明AI提供的帮助。</p><p className="closing-small">尊重他人的作品，保护个人隐私，在老师指导下开展硬件操作与实验。</p><a className="button primary" href="#preparation">带上一个想法，加入我们<IconArrowRight size={19}/></a></section>
    </main><footer className="site-footer"><a className="brand" href="#home"><IconCube size={29} stroke={1.6}/><strong>AI科学社</strong></a><span>武汉市吴家山中学</span><span><IconBuildingCommunity size={18}/>启心楼4楼三号机房</span><a href="#home">回到顶部 ↑</a></footer>
    {guide && <ResourceGuides kind={guide} onClose={() => setGuide(null)}/>}
    {dialog && <ProjectDialog selected={dialog} onClose={() => setDialog(null)} onCopy={copy}/>}
    {manualCopy && <dialog ref={copyDialog} className="project-dialog" onCancel={() => setManualCopy('')} aria-label="手动复制项目需求"><div className="dialog-content"><button className="dialog-close icon-button" onClick={() => setManualCopy('')} aria-label="关闭复制窗口"><IconX/></button><h2>复制这段话</h2><p>浏览器未允许直接复制，请选中文字后复制。</p><textarea aria-label="待复制的内容" readOnly value={manualCopy} onFocus={e => e.target.select()}/></div></dialog>}
    <div className={`toast ${toast ? 'visible' : ''}`} role="status" aria-live="polite">{toast && <><IconCheck size={18}/>{toast}</>}</div>
  </>;
}






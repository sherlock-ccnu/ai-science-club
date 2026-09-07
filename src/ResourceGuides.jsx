import './resource-guides.css';
import { useEffect, useRef, useState } from 'react';
import { IconX, IconArrowUpRight, IconCpu, IconBook2 } from '@tabler/icons-react';

const milestones = [
  ['2006', '深度学习重新受到关注', 'Hinton等研究者提出深度信念网络的逐层训练方法，为训练多层神经网络提供了新思路。AI开始更多地从数据中学习特征。', '认识“学习”：模型的能力来自训练，并不是有人把每一个答案写进去。', '论文 · A fast learning algorithm for deep belief nets', 'https://www.cs.toronto.edu/~hinton/absps/fastnc.pdf'],
  ['2012', 'AlexNet：让计算机更会“看”', 'AlexNet结合深层卷积神经网络与GPU训练，在ImageNet图像识别竞赛中取得突破，推动深度学习在计算机视觉中的应用。', '今天的图像分类、视觉识别项目，都可以从“数据—训练—测试”这条路线理解。', '论文 · AlexNet', 'https://papers.nips.cc/paper_files/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html'],
  ['2016.03', 'AlphaGo：学习、搜索与决策', 'AlphaGo以4∶1战胜李世石。神经网络、强化学习和搜索结合，展示了AI在复杂棋局中选择行动的能力。', '一个系统可以通过反馈改进策略；但擅长围棋不等于会解决所有问题。', 'Google DeepMind · AlphaGo', 'https://deepmind.google/research/alphago/'],
  ['2017.06', 'Transformer：Attention Is All You Need', '这篇论文提出Transformer架构，以注意力机制组织序列信息，成为许多后来大语言模型的重要基础。我们的社团口号也呼应了这篇论文的标题。', '理解一句话时，哪些词之间的联系更重要？这可以成为理解注意力机制的起点。', '论文 · Attention Is All You Need', 'https://arxiv.org/abs/1706.03762'],
  ['2020.05', 'GPT-3：用文字和示例描述任务', 'GPT-3论文展示了大规模语言模型的少样本能力：在提示中给出任务说明和几个例子，就能完成多种语言任务，无需为每项任务重新训练。', '给AI一个清楚的目标，再给它一个你期望的输出示例。', '论文 · Language Models are Few-Shot Learners', 'https://arxiv.org/abs/2005.14165'],
  ['2020.11', 'AlphaFold 2：AI走进科学研究', 'AlphaFold 2在CASP14蛋白质结构预测评测中取得重大进展，展示了AI帮助研究生物学问题的潜力。结构预测不等于完成全部实验验证。', 'AI不仅能聊天，也能帮助研究；模型预测仍需要证据检验。', 'Google DeepMind · AlphaFold突破', 'https://deepmind.google/blog/alphafold-a-solution-to-a-50-year-old-grand-challenge-in-biology/'],
  ['2022.11', 'ChatGPT：对话成为大众入口', 'ChatGPT以研究预览形式推出，让更多人可以通过连续对话提问、修改需求、获得文字与代码帮助。使用AI不再只属于专业开发者。', '把第一次回答当作草稿，用追问、补充条件和测试不断改进。', 'OpenAI · Introducing ChatGPT', 'https://openai.com/index/chatgpt/'],
  ['2023.03', 'GPT-4：从文字走向多模态', 'GPT-4发布，展示了同时接受图像与文字输入、输出文字的能力。模型可以围绕图片内容回答问题，多模态交互进一步发展。', '可以把图表或界面截图作为问题的一部分，同时检查AI有没有看错。', 'OpenAI · GPT-4', 'https://openai.com/index/gpt-4-research/'],
  ['2024.09', '推理模型：回答前投入更多计算', 'OpenAI推出o1系列，利用强化学习提升推理，并在回答前投入更多计算，改善部分数学、科学和编程任务的表现。', '面对难题，要比较推理步骤与验证结果；思考得更久也不保证答案正确。', 'OpenAI · Learning to reason with LLMs', 'https://openai.com/index/learning-to-reason-with-llms/'],
  ['2024.10', 'Computer use：AI开始操作界面', 'Anthropic开放computer use公共测试，让Claude通过观察屏幕、移动鼠标、点击和输入文字来使用电脑。模型与工具连接，开始执行多步操作。', '从“告诉我怎么做”走向“帮我操作”，也需要限定权限并检查执行结果。', 'Anthropic · Computer use发布', 'https://www.anthropic.com/news/3-5-models-and-computer-use'],
  ['2025.01', 'DeepSeek-R1：开放推理模型', 'DeepSeek发布R1及相关蒸馏模型，开放模型权重，推动更多开发者研究和使用推理能力。开放权重让本地部署和二次开发有了更多选择。', '认识不同模型的使用方式：在线服务与本地运行需要的设备、成本不同。', 'DeepSeek · 官方模型仓库', 'https://github.com/deepseek-ai/DeepSeek-R1'],
  ['2025.05', '编程智能体：进入真实项目', 'OpenAI以研究预览形式推出云端Codex。它能在独立环境中读取项目、修改文件和运行测试，协助完成软件工程任务。', '不只生成一段代码：先说明需求，再让智能体实现、测试，并由自己验收。', 'OpenAI · Introducing Codex', 'https://openai.com/index/introducing-codex/'],
  ['2026.02', '更长任务：从单步回答到持续协作', 'Anthropic发布Claude Opus 4.6，强调更长时间的智能体任务、代码审查与调试能力。模型进步的一个方向，是围绕完整任务持续工作。', '项目可以拆成多个阶段，让AI保留工作记录；每一阶段都要有可检查的成果。', 'Anthropic · Claude Opus 4.6', 'https://www.anthropic.com/news/claude-opus-4-6'],
  ['2026.06', 'WorkBuddy：智能体融入日常工具', '腾讯介绍生产力智能体套件，包含WorkBuddy与腾讯文档的协作。AI与文件、文档和工作工具结合，进一步进入日常任务流程。', '在社团中，用WorkBuddy围绕自己的项目组织资料、制作内容和推进任务。', '腾讯 · 生产力智能体套件', 'https://www.tencent.com/tencent-cloud-debuts-productivity-agent-suite-creating-a-new-gateway-to-ai-for-users-and-enterprises/'],
];

const lessons = [
  ['01', '屏幕问候与颜色名片', '让K10显示你的名字和社团口号，完成第一次上传。'],
  ['02', '按键与RGB反馈', '按下按钮改变灯光，用条件判断建立交互。'],
  ['03', '环境小仪表盘', '读取温湿度或光照，将传感器数据变成屏幕信息。'],
  ['04', '姿态感知小游戏', '用加速度数据感知倾斜，设计规则与得分。'],
  ['05', '录音留言机', '用麦克风录音、扬声器播放，练习状态切换。'],
  ['06', 'AI视觉二维码识别', '用摄像头读取二维码，再显示信息或给出反馈。'],
  ['07', 'AI人脸检测门牌', '检测画面中是否有人脸，触发欢迎提示；不等同于识别身份。'],
  ['08', '语音控制灯光', '将语音命令映射为灯光动作，完成一个小装置。'],
];

function SourceLink({ href, children }) {
  return <a className="text-link" href={href} target="_blank" rel="noopener noreferrer">{children}<IconArrowUpRight size={16}/></a>;
}

export default function ResourceGuides({ kind, onClose }) {
  const dialog = useRef(null);
  const [period, setPeriod] = useState('all');
  const history = kind === 'history';
  useEffect(() => {
    const previous = document.activeElement;
    const element = dialog.current;
    element?.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { element?.close(); document.body.style.overflow = overflow; previous?.focus?.(); };
  }, []);
  const visible = milestones.filter(([date]) => period === 'all' || (period === 'recent' ? Number(date.slice(0, 4)) >= 2022 : date.startsWith('2026')));
  return <dialog ref={dialog} className="project-dialog resource-dialog" aria-labelledby="resource-guide-title" onCancel={onClose} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
    <div className="guide-top"><span>{history ? <IconBook2 size={20}/> : <IconCpu size={20}/>} AI科学社 · 学习手册</span><button className="icon-button" aria-label="关闭学习手册" onClick={onClose}><IconX size={24}/></button></div>
    <div className="guide-body">
      <p className="eyebrow">{history ? '2006—2026 / A SHORT HISTORY OF AI' : 'K10 + MIND+ / MAKE IT REAL'}</p>
      <h2 id="resource-guide-title">{history ? 'AI发展史' : '从K10，开始你的发明。'}</h2>
      {history ? <>
        <p className="guide-lead">从识别图像、理解语言，到调用工具、推进项目。用近20年的关键节点，读懂今天的AI智能体从哪里来。</p>
        <p className="guide-caption">精选节点 · 资料核对至2026年9月7日 · AI的历史远早于2006年</p>
        <div className="history-filters" role="group" aria-label="选择发展史时间范围">{[['all', '近20年全览'], ['recent', '重点看2022年以来'], ['this-year', '2026年节点']].map(([id, label]) => <button key={id} aria-pressed={period === id} onClick={() => setPeriod(id)}>{label}</button>)}</div>
        <p className="guide-caption" role="status">当前展示 {visible.length} 个节点</p>
        <ol className="history-timeline">{visible.map(([date, title, text, relevance, label, href]) => <li key={date}><time>{date}</time><div><h3>{title}</h3><p>{text}</p><p className="history-relevance"><strong>与你的项目有什么关系？</strong>{relevance}</p><SourceLink href={href}>{label}</SourceLink></div></li>)}</ol>
        <div className="guide-note"><strong>带着一个问题读历史</strong><p>模型负责理解与生成；智能体把模型与工具、计划和反馈结合起来，尝试完成任务。哪些步骤适合交给AI，哪些结果必须由你亲自验证？</p></div>
      </> : <>
        <p className="guide-lead">社团使用行空板K10，配合Mind+图形化编程。先让屏幕亮起来，再让传感器、灯光、声音和AI一起工作。</p>
        <div className="k10-capabilities">{['彩色屏幕 · 按钮 · RGB灯', '温湿度 · 光照 · 加速度', '摄像头 · 麦克风 · 扬声器', 'Wi-Fi · GPIO扩展'].map(item => <span key={item}>{item}</span>)}</div>
        <h3 className="guide-subtitle">第一次连接，完成这三步</h3>
        <ol className="k10-start"><li>安装老师指定版本的Mind+（官方入门要求V1.8.1或更高版本）。</li><li>用支持数据传输的USB线连接K10，在Mind+中选择对应设备与串口。</li><li>从显示文字开始，上传程序，确认板上出现你的问候语。</li></ol>
        <div className="k10-links"><SourceLink href="https://www.unihiker.com/wiki/K10/GettingStarted/gettingstarted_mindplus/">官方Mind+入门</SourceLink><SourceLink href="https://www.unihiker.com/wiki/K10/Examples/examples_mindplus/">官方示例</SourceLink><SourceLink href="https://www.unihiker.com/wiki/K10/HardwareReference/hardwarereference_specs/">K10硬件参数</SourceLink></div>
        <h3 className="guide-subtitle">8个入门项目，逐步点亮能力</h3>
        <p className="guide-caption">根据老师的K10课程资料整理；具体任务单与程序由课上发放。</p>
        <div className="k10-lessons">{lessons.map(([number, title, desc]) => <article key={number}><span>{number}</span><div><h4>{title}</h4><p>{desc}</p></div></article>)}</div>
        <div className="guide-note"><strong>再向前一步</strong><p>把基础功能组合成创意实用装置，发展成竞赛原型，或用传感器开展跨学科探究。外接传感器先与老师确认接口、供电和Mind+支持情况，再开始连接。</p></div>
      </>}
    </div>
  </dialog>;
}

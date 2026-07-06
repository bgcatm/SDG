import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Search, 
  Sparkles, 
  RotateCcw, 
  BookOpen, 
  CheckCircle, 
  AlertCircle,
  Volume2,
  VolumeX,
  ArrowRight,
  Clock,
  ThumbsUp,
  XCircle
} from 'lucide-react';

// 小動物代表與上傳圖片對應路徑：
// 1. 蟻勇士 (picture_06 (5).jpg) -> SDG 12
// 2. 樹苗龜 (親親樹苖龜+打卡區-07 (3).png) -> SDG 6
// 3. 反斗猴 (童幼會小動物-02.png) -> SDG 3
// 4. 紳士兔 (童幼會小動物-03 (2).png) -> SDG 11
// 5. 智多鷹 (貓頭鷹 (2).png) -> SDG 4

const SDG_CHARACTERS = [
  {
    id: 'ant',
    name: '蟻勇士',
    sdg: 'SDG 12 責任消費與生產',
    desc: '在暑期活動中帶領大家進行「資源回收與環保美勞創作」，用剪刀與膠水化腐朽為神奇，不浪費資源。',
    color: 'from-amber-400 to-amber-600',
    border: 'border-amber-400',
    imgSrc: 'picture_06 (5).jpg',
    emoji: '🐜',
    cheers: [
      '太棒了！動動手變廢為寶，你也是綠色美勞小大師！✂️',
      '哇！有做好垃圾分類回收，地球環境會更乾淨喔！加油！',
      '做得好！這就是我們蟻勇士的永續創作精神，繼續衝刺！'
    ]
  },
  {
    id: 'turtle',
    name: '樹苗龜',
    sdg: 'SDG 6 淨水與衛生',
    desc: '推廣「珍惜水資源計畫」，在炎熱夏天提醒大家省水並保持環境清潔與衛生。',
    color: 'from-emerald-400 to-emerald-600',
    border: 'border-emerald-400',
    imgSrc: '親親樹苖龜+打卡區-07 (3).png',
    emoji: '🐢',
    cheers: [
      '好棒喔！珍惜每一滴水，我們就能保護綠油油的樹苗！🌱',
      '你真細心！隨手關緊水龍頭，健康衛生一起守護！💧',
      '謝謝你幫忙找到潔淨水源！讓我們一起洗洗手，乾乾淨淨！'
    ]
  },
  {
    id: 'monkey',
    name: '反斗猴',
    sdg: 'SDG 3 健康與福祉',
    desc: '舉辦「夏日活力運動會」，帶領小朋友每天規律運動、多吃水果，保持開朗心情！',
    color: 'from-orange-400 to-orange-600',
    border: 'border-orange-400',
    imgSrc: '童幼會小動物-02.png',
    emoji: '🐒',
    cheers: [
      '嘿哈！動一動、跳一跳，身體健康精神好！跟我一起有氧運動吧！🤸',
      '吃顆新鮮蘋果補充能量！心情開朗就是最大的健康福氣！',
      '加油加油！多運動、早睡早起，我們一起當最活潑的健康小超人！'
    ]
  },
  {
    id: 'rabbit',
    name: '紳士兔',
    sdg: 'SDG 11 永續城鄉與社區',
    desc: '倡導「打造綠色低碳家園與無障礙空間」，讓我們的社區充滿關懷與便利，人人平等生活。',
    color: 'from-pink-400 to-pink-600',
    border: 'border-pink-400',
    imgSrc: '童幼會小動物-03 (2).png',
    emoji: '🐰',
    cheers: [
      '好貼心！綠化社區跟無障礙通道，能讓社區裡的所有人都好幸福喔！🏡',
      '哇！你幫大家打造了這麼美麗又環保的安全社區，紳士兔為你鼓掌！',
      '大手拉小手！只要我們一起愛護鄰里，我們的城鄉就會永遠美麗！'
    ]
  },
  {
    id: 'owl',
    name: '智多鷹',
    sdg: 'SDG 4 優質教育',
    desc: '策劃「智慧閱讀大搜查」，帶領大家探索永續發展新知識，多讀好書，智慧飛翔。',
    color: 'from-blue-400 to-blue-600',
    border: 'border-blue-400',
    imgSrc: '貓頭鷹 (2).png',
    emoji: '🦉',
    cheers: [
      '知識就是力量！你又學會了一項推動世界永續的厲害妙招囉！📚',
      '保持無盡的好奇心，世界就是你最棒的永續大課堂！',
      '真聰明！這個永續問題答得太完美了，智多鷹為你的智慧而驕傲！'
    ]
  }
];

// 尋寶地圖上的寶物
const TREASURES = [
  // SDG 12
  { id: 't1', name: '環保手工紙', type: 'ant', icon: '📄', x: 12, y: 35, found: false, desc: '用廢紙做環保美勞，少砍樹木少浪費！' },
  { id: 't2', name: '分類回收桶', type: 'ant', icon: '♻️', x: 84, y: 72, found: false, desc: '垃圾分好類，資源就能重新再利用！' },
  // SDG 6
  { id: 't3', name: '省水水龍頭', type: 'turtle', icon: '🚰', x: 45, y: 15, found: false, desc: '按壓式水龍頭能省下很多水，珍惜水資源！' },
  { id: 't4', name: '自備水壺', type: 'turtle', icon: '🥛', x: 74, y: 38, found: false, desc: '自備水壺裝水喝，少買塑膠瓶裝飲料！' },
  // SDG 3
  { id: 't5', name: '新鮮水果', type: 'monkey', icon: '🍎', x: 28, y: 68, found: false, desc: '多吃新鮮蘋果和水果，身體壯壯不生病！' },
  { id: 't6', name: '跳繩', type: 'monkey', icon: '🪀', x: 60, y: 80, found: false, desc: '每天適度運動，流汗能讓我們心情變好！' },
  // SDG 11
  { id: 't7', name: '公園綠樹', type: 'rabbit', icon: '🌳', x: 88, y: 22, found: false, desc: '多種樹木，能讓我們的社區空氣更乾淨！' },
  { id: 't8', name: '無障礙斜坡', type: 'rabbit', icon: '♿', x: 32, y: 44, found: false, desc: '有了斜坡，推車和坐輪椅的老公公老婆婆出門更方便！' },
  // SDG 4
  { id: 't9', name: '故事書', type: 'owl', icon: '📖', x: 55, y: 52, found: false, desc: '多閱讀故事書，能讓我們學到許多新本領！' },
  { id: 't10', name: '放大鏡', type: 'owl', icon: '🔍', x: 18, y: 82, found: false, desc: '保持好奇心，觀察大自然中好玩的事物！' }
];

// 地圖上的炸彈挑戰
const BOMBS = [
  { id: 'b1', icon: '💣', x: 20, y: 48, clicked: false },
  { id: 'b2', icon: '💣', x: 50, y: 25, clicked: false },
  { id: 'b3', icon: '💣', x: 70, y: 55, clicked: false }
];

// 小學程度挑戰問答題
const SDG_QUIZ = [
  {
    character: 'ant',
    question: '蟻勇士（SDG 12）想用紙箱做美勞玩具，哪一種做法最愛護地球？',
    options: [
      { text: 'A. 直接買全新的塑膠玩具，把舊紙箱隨手亂丟', isCorrect: false },
      { text: 'B. 把乾淨的舊紙箱收集起來，用剪刀膠水做成好玩的紙箱恐龍', isCorrect: true },
      { text: 'C. 叫爸爸媽媽買很多用一次就丟的塑膠裝飾品', isCorrect: false }
    ],
    explanation: '利用廢紙箱做美勞，既省錢又好玩，還能做到資源回收不浪費！'
  },
  {
    character: 'turtle',
    question: '樹苗龜（SDG 6）想在學校省水，我們在「刷牙」時應該怎麼做？',
    options: [
      { text: 'A. 拿漱口杯裝好水再刷牙，不讓水龍頭一直流', isCorrect: true },
      { text: 'B. 打開水龍頭讓水一邊刷一邊一直流，這樣最好玩', isCorrect: false },
      { text: 'C. 為了省水，我們一個星期都不要刷牙', isCorrect: false }
    ],
    explanation: '用漱口杯接水，可以省下好幾公升的水！刷牙也要天天刷才能保持牙齒健康喔！'
  },
  {
    character: 'monkey',
    question: '反斗猴（SDG 3）想要身體健康、每天精神好，哪一個是好習慣？',
    options: [
      { text: 'A. 天天吃糖果、喝汽水 and 珍奶，不吃正餐', isCorrect: false },
      { text: 'B. 每天晚上玩平板電腦到深夜不睡覺', isCorrect: false },
      { text: 'C. 多喝白開水、多吃蔬菜水果，並且每天運動跳繩', isCorrect: true }
    ],
    explanation: '多運動、早睡早起、多喝水少喝含糖飲料，我們才能當最棒的健康小超人！'
  },
  {
    character: 'rabbit',
    question: '紳士兔（SDG 11）想讓社區公園變得更美麗，我們去公園玩時該怎麼做？',
    options: [
      { text: 'A. 在溜滑梯上畫畫、把漂亮的玫瑰花全部拔回家', isCorrect: false },
      { text: 'B. 把垃圾帶回家或丟進回收桶，不破壞公園的草木', isCorrect: true },
      { text: 'C. 看到地上有香蕉皮，假裝沒看到並一腳踢開', isCorrect: false }
    ],
    explanation: '愛護公共財物、不亂丟垃圾，才能讓我們住的城鄉和社區永遠乾淨、漂亮又安全！'
  },
  {
    character: 'owl',
    question: '智多鷹（SDG 4）鼓勵大家用功讀書，上課或看書時我們該怎麼做？',
    options: [
      { text: 'A. 上課時大聲跟同學聊天，不聽老師講課', isCorrect: false },
      { text: 'B. 保持好奇心，多讀圖書館的故事書，不懂就舉手問老師', isCorrect: true },
      { text: 'C. 看完書後隨手把書撕爛或亂丟在地上', isCorrect: false }
    ],
    explanation: '多看好書、專心聽課 and 主動提問，是我們國小學生學會新知識的最佳秘訣！'
  }
];

// 【智能圖片安全載入元件】
const SafeImage = ({ src, alt, className = "", fallbackEmoji = "🐾", colorClass = "bg-slate-100" }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div className={`${className} ${colorClass} flex items-center justify-center text-3xl shadow-inner select-none`}>
        <span>{fallbackEmoji}</span>
      </div>
    );
  }

  const safeSrc = encodeURI(src).replace(/\+/g, '%2B');

  return (
    <img 
      src={safeSrc} 
      alt={alt} 
      className={`${className} object-cover`} 
      onError={() => {
        console.warn(`圖片載入失敗，已啟動優雅降級保護: ${src}`);
        setHasError(true);
      }} 
    />
  );
};

export default function App() {
  const [gameState, setGameState] = useState('welcome'); // welcome, intro, map, quiz, ending
  const [selectedChar, setSelectedChar] = useState(null);
  const [treasures, setTreasures] = useState(TREASURES);
  const [bombs, setBombs] = useState(BOMBS); // 炸彈狀態
  const [foundCount, setFoundCount] = useState(0);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctQuizCount, setCorrectQuizCount] = useState(0); // 答對題數記錄
  const [activeTab, setActiveTab] = useState('all'); // all, ant, turtle, monkey, rabbit, owl
  const [quizAnswers, setQuizAnswers] = useState({}); // {index: selectedOptionIndex}
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // 尋寶開始前 3 2 1 倒數狀態
  const [startCountdown, setStartCountdown] = useState(null); // null, 3, 2, 1, 'GO'

  // 20秒尋寶計時器狀態
  const [timeLeft, setTimeLeft] = useState(20);
  const [showTimeUpModal, setShowTimeUpModal] = useState(false);
  
  // 尋寶10個完美通關彈出框
  const [showAllFoundModal, setShowAllFoundModal] = useState(false);

  // 每題問答 30秒計時器狀態
  const [quizTimeLeft, setQuizTimeLeft] = useState(30);

  // 打氣加油泡泡狀態
  const [cheerBubble, setCheerBubble] = useState({
    charId: 'ant',
    text: '哈囉！我是蟻勇士，歡迎來到永續尋寶大冒險！準備好就點擊開始吧！',
    visible: true,
    animationClass: ''
  });

  // 音效播放
  const playSound = (type) => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'success') {
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.12); // E5
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.24); // G5
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      } else if (type === 'click') {
        osc.frequency.setValueAtTime(580, ctx.currentTime);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === 'win') {
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2);
        osc.frequency.setValueAtTime(1046.50, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
        osc.start();
        osc.stop(ctx.currentTime + 0.6);
      } else if (type === 'wrong') {
        osc.frequency.setValueAtTime(280, ctx.currentTime);
        osc.frequency.setValueAtTime(200, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } else if (type === 'countdown') {
        osc.frequency.setValueAtTime(440, ctx.currentTime); // A4
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } else if (type === 'go') {
        osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      } else if (type === 'bomb') {
        // 炸彈爆炸音效 - 使用鋸齒波 + 頻率急速下降模擬爆炸轟鳴
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(10, ctx.currentTime + 0.6);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
        osc.start();
        osc.stop(ctx.currentTime + 0.6);
      }
    } catch (e) {
      console.log('Audio error:', e);
    }
  };

  // 觸發特定小動物跳躍與說出鼓勵的話
  const triggerCheer = (charId, customText = null) => {
    const char = SDG_CHARACTERS.find(c => c.id === charId);
    if (!char) return;

    const text = customText || char.cheers[Math.floor(Math.random() * char.cheers.length)];

    setCheerBubble({
      charId,
      text,
      visible: true,
      animationClass: 'animate-bounce' // 觸發跳躍動畫
    });

    // 1.5秒後移除跳躍動畫，但保留文字
    setTimeout(() => {
      setCheerBubble(prev => ({ ...prev, animationClass: '' }));
    }, 1500);
  };

  // 【1. 尋寶前 3-2-1 倒數計時 Effect】
  useEffect(() => {
    if (gameState !== 'map' || startCountdown === null) return;

    if (startCountdown === 'GO') {
      const timeout = setTimeout(() => {
        setStartCountdown(null); // 倒數完畢，正式開始尋寶
        triggerCheer(selectedChar ? selectedChar.id : 'turtle', '🎉 尋寶開始！快點擊地圖上的閃爍徽章！20秒倒數計時中！避開黑色炸彈 💣 喔！');
      }, 1000);
      return () => clearTimeout(timeout);
    }

    const timer = setTimeout(() => {
      if (startCountdown === 1) {
        playSound('go');
        setStartCountdown('GO');
      } else {
        playSound('countdown');
        setStartCountdown(prev => prev - 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [gameState, startCountdown]);

  // 【2. 監聽地圖尋寶 20 秒計時器 (若全部找齊 10 個則暫停計時)】
  useEffect(() => {
    if (gameState !== 'map' || startCountdown !== null || foundCount === 10) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          playSound('wrong');
          setShowTimeUpModal(true);
          triggerCheer('owl', '⏰ 20秒時間到囉！尋寶時間結束了，我們快去進行永續知識問答吧！');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, startCountdown, foundCount]);

  // 【3. 監聽每題問答 30 秒計時器】
  useEffect(() => {
    if (gameState !== 'quiz') return;
    
    // 每當切換題目時重置為 30 秒
    setQuizTimeLeft(30);
  }, [currentQuizIndex, gameState]);

  useEffect(() => {
    if (gameState !== 'quiz') return;
    
    // 如果該題已經回答，則暫停倒數
    if (quizAnswers[currentQuizIndex] !== undefined) return;

    const timer = setInterval(() => {
      setQuizTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          // 逾時自動判定：選擇 -1 代表未答/逾時
          handleAnswerQuiz(-1, false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, currentQuizIndex, quizAnswers]);

  const handleStartGame = () => {
    playSound('click');
    setGameState('intro');
    triggerCheer('turtle', '歡迎來到認識主角區！快點選一位小動物，看看我們在暑期做了什麼吧！');
  };

  const handleSelectChar = (char) => {
    playSound('click');
    setSelectedChar(char);
    triggerCheer(char.id, `哈囉！我是${char.name}，我今年帶領大家實踐了「${char.sdg}」！點選下方按鈕，跟我一起出發尋寶吧！✨`);
  };

  const handleEnterMap = () => {
    playSound('click');
    setGameState('map');
    setTimeLeft(20); // 尋寶時間設定為 20 秒
    playSound('countdown');
    setStartCountdown(3); // 開始 3, 2, 1 倒數
  };

  const handleFindTreasure = (id, name, type, desc) => {
    // 倒數時不允許點擊地圖
    if (startCountdown !== null) return;

    const updated = treasures.map(t => {
      if (t.id === id && !t.found) {
        playSound('success');
        return { ...t, found: true };
      }
      return t;
    });

    setTreasures(updated);
    const count = updated.filter(t => t.found).length;
    setFoundCount(count);

    // 觸發該類型小動物跳出來熱烈打氣
    triggerCheer(type, `太神奇了！你找到了【${name}】！${desc}`);

    // 如果 10 個全部找齊，立即暫停時間並彈出「已尋獲寶物小檔案大公開」
    if (count === treasures.length) {
      playSound('win');
      setShowAllFoundModal(true); // 直接彈出大公開 Modal
      triggerCheer('owl', '哇！太神奇了！你成功找齊了 10 個寶物！快來看看我們的大公開檔案吧！🦉🏆');
    }
  };

  // 處理點擊炸彈
  const handleHitBomb = (id) => {
    if (startCountdown !== null) return;
    
    playSound('bomb');
    setBombs(prev => prev.map(b => b.id === id ? { ...b, clicked: true } : b));
    
    // 扣減時間罰則：減少 3 秒
    setTimeLeft(prev => Math.max(0, prev - 3));
    
    // 隨機抽選一位小動物出來警告與打氣
    const randomChar = SDG_CHARACTERS[Math.floor(Math.random() * SDG_CHARACTERS.length)];
    triggerCheer(randomChar.id, `🚨 哎呀！不小心按到了炸彈！倒扣時間 3 秒！大家要張大眼睛看清楚，繼續加油！💪`);
  };

  const handleGoToQuiz = () => {
    playSound('click');
    setGameState('quiz');
    setShowTimeUpModal(false);
    setShowAllFoundModal(false);
    setCurrentQuizIndex(0);
    setQuizAnswers({});
    setCorrectQuizCount(0);
    const firstQuiz = SDG_QUIZ[0];
    triggerCheer(firstQuiz.character, `答題大挑戰開始！我是第一題出題官，準備好就點選最合適的答案吧！每一題只有 30 秒作答時間喔！`);
  };

  const handleAnswerQuiz = (optionIndex, isCorrect) => {
    if (quizAnswers[currentQuizIndex] !== undefined) return; // 不能重選

    setQuizAnswers({ ...quizAnswers, [currentQuizIndex]: optionIndex });
    const quiz = SDG_QUIZ[currentQuizIndex];

    if (optionIndex === -1) {
      // 處理逾時未答
      playSound('wrong');
      triggerCheer(quiz.character, `⏰ 30秒時間到！來不及作答了，快看看下方的綠色解析學起來，等等再戰！💪`);
      return;
    }

    if (isCorrect) {
      playSound('success');
      setCorrectQuizCount(prev => prev + 1);
      triggerCheer(quiz.character, `答對了！你真的太聰明了！🎉`);
    } else {
      playSound('wrong');
      triggerCheer(quiz.character, `差一點點就對了！別灰心，看看下方的綠色解析，再接再厲！💪`);
    }
  };

  const handleNextQuiz = () => {
    playSound('click');
    if (currentQuizIndex < SDG_QUIZ.length - 1) {
      const nextIndex = currentQuizIndex + 1;
      setCurrentQuizIndex(nextIndex);
      const nextQuiz = SDG_QUIZ[nextIndex];
      triggerCheer(nextQuiz.character, `下一題換我出題囉！仔細閱讀題目，同樣有 30 秒作答時間喔！`);
    } else {
      // 計算分數
      let calculatedScore = 0;
      SDG_QUIZ.forEach((q, idx) => {
        const chosen = quizAnswers[idx];
        if (chosen !== undefined && chosen !== -1 && q.options[chosen].isCorrect) {
          calculatedScore += 20;
        }
      });
      setScore(calculatedScore);
      setGameState('ending');
      playSound('win');

      const passTreasure = foundCount >= 5;
      const passQuiz = correctQuizCount >= 3; // 答對至少 3 題 (一半以上)

      if (passTreasure && passQuiz) {
        triggerCheer('rabbit', `恭喜你挑戰成功！你收集了 ${foundCount} 個寶物、答對了 ${correctQuizCount} 題，是超級永續小達人！🐰🏆`);
      } else {
        triggerCheer('ant', `好開愛！這次沒有達到成功標準。讓我們重新挑戰，成為最厲害的永續小勇士吧！🐜💪`);
      }
    }
  };

  const handleRestart = () => {
    playSound('click');
    setTreasures(TREASURES.map(t => ({ ...t, found: false })));
    setBombs(BOMBS.map(b => ({ ...b, clicked: false }))); // 重置所有炸彈
    setFoundCount(0);
    setScore(0);
    setCorrectQuizCount(0);
    setSelectedChar(null);
    setTimeLeft(20);
    setQuizTimeLeft(30);
    setStartCountdown(null);
    setShowTimeUpModal(false);
    setShowAllFoundModal(false);
    setGameState('welcome');
    setCheerBubble({
      charId: 'ant',
      text: '哈囉！我是蟻勇士，歡迎來到永續尋寶大冒險！準備好就點擊開始吧！',
      visible: true,
      animationClass: ''
    });
  };

  // 判斷是否挑戰成功：尋獲寶物 >= 5 且 答對題數 >= 3
  const isChallengeSuccess = foundCount >= 5 && correctQuizCount >= 3;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between selection:bg-emerald-200">
      
      {/* 頂部導覽 */}
      <header className="bg-white border-b border-slate-100 shadow-sm sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-3xl">🌟</span>
            <div>
              <h1 className="font-extrabold text-xl text-slate-900 tracking-tight">暑期活動閉幕禮互動攤位</h1>
              <p className="text-xs text-slate-500 font-semibold">SDG 5大動物特工尋寶大冒險</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                playSound('click');
              }}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
              title={soundEnabled ? "關閉音效" : "開啟音效"}
            >
              {soundEnabled ? <Volume2 size={22} className="text-emerald-500" /> : <VolumeX size={22} />}
            </button>
            
            {gameState !== 'welcome' && (
              <button 
                onClick={handleRestart}
                className="flex items-center space-x-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs md:text-sm font-semibold rounded-full transition-all"
              >
                <RotateCcw size={14} />
                <span>重新開始</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 遊戲主要舞台 */}
      <main className="flex-grow max-w-6xl w-full mx-auto p-4 flex flex-col justify-center relative pb-32">
        
        {/* ================= 1. 歡迎首頁 ================= */}
        {gameState === 'welcome' && (
          <div className="text-center py-8 px-6 max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-100 animate-fade-in">
            <div className="flex justify-center space-x-[-12px] mb-4">
              {SDG_CHARACTERS.map(c => (
                <div key={c.id} className="w-16 h-16 rounded-full border-4 border-white shadow-md overflow-hidden bg-white">
                  <SafeImage src={c.imgSrc} alt={c.name} className="w-full h-full" fallbackEmoji={c.emoji} />
                </div>
              ))}
            </div>
            
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2 bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              SDG 小動物尋寶大冒險 2.0
            </h2>
            <p className="text-sm text-slate-500 font-bold mb-4">
              社區中心暑期活動閉幕巡禮（國小學生專屬攤位）
            </p>
            <p className="text-slate-600 mb-6 text-sm leading-relaxed max-w-lg mx-auto">
              今年暑假，中心 5 位核心小動物代表帶領我們一起實踐了永續目標！
              準備好接受 **【20秒限時地圖尋寶（開始前 3-2-1 倒數）】** 與 **【30秒限時問答挑戰】** 嗎？
              <br/>
              <span className="text-rose-500 font-extrabold block mt-2 text-xs">
                ⚠️ 小心：地圖中藏有黑色炸彈 💣，點到會大爆炸並倒扣 3 秒時間喔！
              </span>
              <span className="text-emerald-600 font-extrabold block mt-1 text-xs">
                🎯 過關秘訣：收集到至少 5 個寶物 ＆ 答對至少 3 題問答才算挑戰成功！
              </span>
            </p>

            <button 
              onClick={handleStartGame}
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-base md:text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center space-x-2 mx-auto"
            >
              <span>出發幫小動物尋寶！</span>
              <ArrowRight size={20} className="animate-pulse" />
            </button>
          </div>
        )}

        {/* ================= 2. 認識代表與挑選角色 ================= */}
        {gameState === 'intro' && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">第一步：挑選夥伴</span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">選擇一位小動物了解暑期任務</h2>
              <p className="text-slate-500 text-xs mt-1">點擊下方小動物卡片，可以直接預覽他們上傳的可愛頭像並查看實踐任務！</p>
            </div>

            {/* 角色卡片列表 */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {SDG_CHARACTERS.map((char) => {
                const isSelected = selectedChar?.id === char.id;
                return (
                  <div 
                    key={char.id}
                    onClick={() => handleSelectChar(char)}
                    className={`cursor-pointer rounded-2xl p-3 transition-all duration-300 border-2 text-center h-full flex flex-col justify-between ${
                      isSelected 
                        ? `bg-white ${char.border} shadow-lg scale-105 translate-y-[-4px]` 
                        : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 shadow-sm'
                    }`}
                  >
                    <div>
                      {/* 安全載入小動物圖片 */}
                      <div className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full overflow-hidden border-2 border-slate-100 shadow-inner bg-slate-50 mb-3 flex items-center justify-center">
                        <SafeImage 
                          src={char.imgSrc} 
                          alt={char.name} 
                          className="w-full h-full hover:scale-110 transition-transform duration-300" 
                          fallbackEmoji={char.emoji}
                        />
                      </div>
                      <h3 className="font-extrabold text-sm md:text-base text-slate-800">{char.name}</h3>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 bg-slate-100 rounded-full text-slate-600 inline-block my-1 whitespace-nowrap">
                        {char.sdg.split(' ')[0]}
                      </span>
                    </div>

                    <div className="mt-2 pt-2 border-t border-slate-100">
                      <span className={`text-xs font-black ${isSelected ? 'text-emerald-600' : 'text-slate-400'}`}>
                        {isSelected ? '★ 已選擇夥伴' : '點擊與牠對話'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 詳細介紹區 */}
            {selectedChar && (
              <div className={`p-5 rounded-3xl border-2 ${selectedChar.border} bg-white max-w-2xl mx-auto shadow-md animate-fade-in`}>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-slate-50 flex-shrink-0 flex items-center justify-center bg-slate-50">
                    <SafeImage src={selectedChar.imgSrc} alt={selectedChar.name} className="w-full h-full" fallbackEmoji={selectedChar.emoji} />
                  </div>
                  <div className="text-center sm:text-left flex-grow space-y-1">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
                      <h3 className="text-base font-black text-slate-800">{selectedChar.name} 的暑期實踐</h3>
                      <span className="text-xs font-extrabold text-white bg-gradient-to-r from-teal-500 to-emerald-600 px-2.5 py-0.5 rounded-full">
                        {selectedChar.sdg}
                      </span>
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      {selectedChar.desc}
                    </p>
                    <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 text-left">
                      <span className="text-[10px] font-black text-slate-400 block uppercase">尋寶任務目標</span>
                      <p className="text-xs font-bold text-slate-700">{selectedChar.mission}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 下一步 */}
            <div className="text-center pt-2">
              <button
                disabled={!selectedChar}
                onClick={handleEnterMap}
                className={`px-8 py-3 rounded-full font-bold text-sm md:text-base transition-all duration-300 flex items-center space-x-2 mx-auto shadow-md ${
                  selectedChar 
                    ? 'bg-slate-900 text-white hover:bg-slate-800 hover:scale-105 cursor-pointer' 
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>進入限時 20 秒尋寶！</span>
                <Search size={18} />
              </button>
              {!selectedChar && <p className="text-xs text-red-500 font-extrabold mt-2">請先點選 one 一位小動物以繼續！</p>}
            </div>
          </div>
        )}

        {/* ================= 3. 尋寶地圖 ================= */}
        {gameState === 'map' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start animate-fade-in relative">
            
            {/* 左側資訊與動物分類篩選 */}
            <div className="lg:col-span-1 bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              {/* ⏰ 倒數計時器看板 */}
              <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4 text-center">
                <div className="flex items-center justify-center space-x-2 text-rose-600 font-black text-sm mb-1">
                  <Clock size={18} className="animate-pulse" />
                  <span>尋寶倒數時間</span>
                </div>
                <span className={`text-4xl font-black ${timeLeft <= 5 ? 'text-rose-600 animate-ping' : 'text-slate-800'}`}>
                  {timeLeft} 秒
                </span>
                <p className="text-[10px] text-slate-400 mt-1">時間到會自動進入問答關卡！</p>
              </div>

              {/* 收集進度條 */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <div className="flex justify-between items-center mb-1 text-xs">
                  <span className="font-extrabold text-slate-500">已收集永續法寶</span>
                  <span className="font-black text-emerald-600 text-sm">{foundCount} / 10</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-emerald-400 to-teal-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${(foundCount / 10) * 100}%` }}
                  ></div>
                </div>
                <p className="text-[9px] text-emerald-600 font-bold mt-1 text-center">
                  💡 過關標準：請努力在時間內收集至少 5 個寶物！
                </p>
              </div>

              {/* 應援夥伴篩選 */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-black text-slate-400 block uppercase px-1">小動物專屬寶物篩選</span>
                <div className="grid grid-cols-2 gap-1.5">
                  <button 
                    onClick={() => { playSound('click'); setActiveTab('all'); }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold text-left transition-all ${
                      activeTab === 'all' ? 'bg-slate-950 text-white shadow-sm' : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
                    }`}
                  >
                    🌈 顯示全部
                  </button>
                  {SDG_CHARACTERS.map(char => (
                    <button 
                      key={char.id}
                      onClick={() => { playSound('click'); setActiveTab(char.id); }}
                      className={`px-2 py-1.5 rounded-xl text-xs font-extrabold text-left transition-all truncate flex items-center space-x-1 ${
                        activeTab === char.id ? 'bg-slate-800 text-white shadow-sm' : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
                      }`}
                    >
                      <div className="w-4 h-4 rounded-full overflow-hidden flex items-center justify-center bg-white flex-shrink-0">
                        <SafeImage src={char.imgSrc} alt={char.name} className="w-full h-full" fallbackEmoji={char.emoji} />
                      </div>
                      <span className="truncate">{char.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 前往問答按鈕 */}
              <button
                onClick={handleGoToQuiz}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-1.5 text-xs md:text-sm"
              >
                <span>直接跳過 進入問答大挑戰</span>
                <BookOpen size={15} />
              </button>
            </div>

            {/* 右側尋寶主地圖 */}
            <div className="lg:col-span-3 space-y-4">
              <div className="relative bg-gradient-to-b from-sky-200 via-emerald-100 to-emerald-200 border-4 border-white rounded-3xl shadow-xl overflow-hidden aspect-[4/3] md:aspect-[16/9] w-full max-h-[460px]">
                
                {/* 地圖背景背景裝飾 */}
                <div className="absolute inset-0 opacity-40 pointer-events-none">
                  <div className="absolute top-4 right-8 w-16 h-16 bg-amber-300 rounded-full blur-xs"></div>
                  <div className="absolute top-8 left-12 w-24 h-8 bg-white rounded-full"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-emerald-300 rounded-t-[40px]"></div>
                  <svg className="absolute top-1/4 w-full h-full" viewBox="0 0 1000 400">
                    <path d="M 0 150 C 150 150, 200 250, 400 200 C 600 150, 1000 250" stroke="#7DD3FC" strokeWidth="20" fill="none" />
                  </svg>
                </div>

                {/* 小動物代表現場專屬攤位標示 */}
                <div className="absolute bottom-3 left-4 pointer-events-none bg-white/95 px-2 py-1 rounded-xl shadow-sm flex items-center space-x-1.5 border border-slate-100 max-w-[120px]">
                  <div className="w-5 h-5 rounded-full overflow-hidden flex items-center justify-center bg-slate-50">
                    <SafeImage src="picture_06 (5).jpg" alt="蟻勇士" className="w-full h-full" fallbackEmoji="🐜" />
                  </div>
                  <span className="text-[10px] font-extrabold truncate">責任消費區</span>
                </div>
                <div className="absolute top-1/4 left-1/4 pointer-events-none bg-white/95 px-2 py-1 rounded-xl shadow-sm flex items-center space-x-1.5 border border-slate-100 max-w-[120px]">
                  <div className="w-5 h-5 rounded-full overflow-hidden flex items-center justify-center bg-slate-50">
                    <SafeImage src="親親樹苖龜+打卡區-07 (3).png" alt="樹苗龜" className="w-full h-full" fallbackEmoji="🐢" />
                  </div>
                  <span className="text-[10px] font-extrabold truncate">潔淨水源區</span>
                </div>
                <div className="absolute bottom-16 right-6 pointer-events-none bg-white/95 px-2 py-1 rounded-xl shadow-sm flex items-center space-x-1.5 border border-slate-100 max-w-[120px]">
                  <div className="w-5 h-5 rounded-full overflow-hidden flex items-center justify-center bg-slate-50">
                    <SafeImage src="童幼會小動物-02.png" alt="反斗猴" className="w-full h-full" fallbackEmoji="🐒" />
                  </div>
                  <span className="text-[10px] font-extrabold truncate">健康運動區</span>
                </div>
                <div className="absolute top-8 right-1/4 pointer-events-none bg-white/95 px-2 py-1 rounded-xl shadow-sm flex items-center space-x-1.5 border border-slate-100 max-w-[120px]">
                  <div className="w-5 h-5 rounded-full overflow-hidden flex items-center justify-center bg-slate-50">
                    <SafeImage src="童幼會小動物-03 (2).png" alt="紳士兔" className="w-full h-full" fallbackEmoji="🐰" />
                  </div>
                  <span className="text-[10px] font-extrabold truncate">永續城鄉角</span>
                </div>
                <div className="absolute top-1/2 right-1/3 pointer-events-none bg-white/95 px-2 py-1 rounded-xl shadow-sm flex items-center space-x-1.5 border border-slate-100 max-w-[120px]">
                  <div className="w-5 h-5 rounded-full overflow-hidden flex items-center justify-center bg-slate-50">
                    <SafeImage src="貓頭鷹 (2).png" alt="智多鷹" className="w-full h-full" fallbackEmoji="🦉" />
                  </div>
                  <span className="text-[10px] font-extrabold truncate">智慧閱讀角</span>
                </div>

                {/* 渲染尋寶地標圖章 */}
                {treasures.map((treasure) => {
                  const isVisible = activeTab === 'all' || activeTab === treasure.type;
                  
                  return (
                    <button
                      key={treasure.id}
                      onClick={() => handleFindTreasure(treasure.id, treasure.name, treasure.type, treasure.desc)}
                      disabled={treasure.found || startCountdown !== null}
                      className={`absolute group p-1.5 rounded-full transition-all duration-300 z-10 ${
                        isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0 pointer-events-none'
                      } ${
                        treasure.found 
                          ? 'bg-slate-100/80 text-slate-400 border border-slate-200 line-through cursor-not-allowed' 
                          : 'bg-white text-2xl shadow-md hover:scale-125 hover:shadow-xl cursor-pointer border-2 border-amber-300 animate-bounce'
                      }`}
                      style={{ left: `${treasure.x}%`, top: `${treasure.y}%` }}
                    >
                      <span className="block transform transition-transform group-hover:rotate-12">
                        {treasure.found ? '✔️' : treasure.icon}
                      </span>
                    </button>
                  );
                })}

                {/* 💣 渲染炸彈挑戰 */}
                {bombs.map((bomb) => (
                  <button
                    key={bomb.id}
                    onClick={() => handleHitBomb(bomb.id)}
                    disabled={bomb.clicked || startCountdown !== null}
                    className={`absolute group p-1.5 rounded-full transition-all duration-300 z-15 ${
                      bomb.clicked 
                        ? 'bg-red-100 text-red-500 scale-110 cursor-not-allowed border border-red-300 animate-pulse' 
                        : 'bg-white text-2xl shadow-md hover:scale-125 hover:shadow-xl cursor-pointer border-2 border-red-500 animate-bounce'
                    }`}
                    style={{ left: `${bomb.x}%`, top: `${bomb.y}%` }}
                  >
                    <span className="block transform transition-transform group-hover:rotate-12">
                      {bomb.clicked ? '💥' : bomb.icon}
                    </span>
                    {!bomb.clicked && (
                      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-[9px] font-bold py-0.5 px-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md mb-1">
                        ⚠️ 炸彈警告
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* 寶物詳細清單 */}
              <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
                <h4 className="font-extrabold text-slate-800 text-sm mb-2.5">🔍 已尋獲寶物小檔案大公開</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {treasures.filter(t => t.found).slice(0, 4).map(t => (
                    <div key={t.id} className="p-2 bg-slate-50 border border-slate-100 rounded-xl flex items-start space-x-2 text-xs">
                      <span className="text-lg">{t.icon}</span>
                      <div>
                        <p className="font-bold text-slate-800">{t.name}</p>
                        <p className="text-slate-500 mt-0.5 leading-relaxed">{t.desc}</p>
                      </div>
                    </div>
                  ))}
                  {foundCount > 4 && (
                    <div className="p-2 bg-emerald-50/50 border border-emerald-100 rounded-xl flex items-center justify-center text-xs font-bold text-emerald-700 col-span-2">
                      🎉 太棒了，你在有限時間內收集了 {foundCount} 樣法寶！其餘將在成就中核算！
                    </div>
                  )}
                  {foundCount === 0 && (
                    <p className="text-xs text-slate-400 italic col-span-2 text-center py-4">
                      還沒有尋獲任何寶物，地圖上有很多小圖章，快點點看吧！
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* ==========================================
                ★ 尋寶開始前 3 2 1 倒數全螢幕 Overlay 遮罩 ★
                ========================================== */}
            {startCountdown !== null && (
              <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center z-40 select-none">
                <p className="text-white font-extrabold text-lg md:text-xl tracking-widest mb-6 animate-pulse">
                  5大動物特工準備中...
                </p>
                
                <div className="w-36 h-36 rounded-full bg-white/10 flex items-center justify-center border-4 border-white/20 animate-scale-up shadow-2xl">
                  <span className={`font-black text-6xl md:text-7xl text-white ${startCountdown === 'GO' ? 'text-emerald-400 scale-110 animate-bounce' : 'animate-ping'}`}>
                    {startCountdown}
                  </span>
                </div>

                <p className="text-slate-300 text-xs md:text-sm mt-8 max-w-xs text-center font-bold leading-relaxed">
                  倒數完畢後，地圖按鈕即會開啟！<br/>
                  你有黃金 <span className="text-amber-400">20秒</span> 可以瘋狂點擊尋寶喔！<br/>
                  <span className="text-rose-400 block mt-2">🚨 注意：點到炸彈 💣 會被扣 3 秒！</span>
                </p>
              </div>
            )}

            {/* ⏰ 尋寶時間到彈出框 */}
            {showTimeUpModal && (
              <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
                <div className="bg-white p-6 rounded-3xl max-w-sm w-full text-center shadow-2xl border border-slate-100 animate-scale-up space-y-4">
                  <span className="text-5xl block animate-bounce">⏰</span>
                  <h3 className="text-xl font-black text-slate-900">20秒時間到囉！</h3>
                  <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                    你的尋寶探險告一段落了！
                    你一共收集了 <span className="font-bold text-emerald-600 text-base">{foundCount} / 10</span> 個寶物！
                    <br/>
                    接下來，讓我們進入刺激的問答挑戰，繼續累積永續分數吧！
                  </p>
                  <button
                    onClick={handleGoToQuiz}
                    className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-full shadow-md transition-all text-xs md:text-sm flex items-center justify-center space-x-1.5 animate-pulse"
                  >
                    <span>進入問答大挑戰 (每題限時30秒)</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            )}

            {/* =======================================================
                ★ 10個寶物全部集齊 —— 立刻彈出「已尋獲寶物小檔案大公開」全螢幕視窗 ★
                ======================================================= */}
            {showAllFoundModal && (
              <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white p-6 md:p-8 rounded-3xl max-w-2xl w-full text-center shadow-2xl border border-slate-100 animate-scale-up space-y-4 max-h-[90vh] overflow-y-auto">
                  <span className="text-5xl block animate-bounce">🏆🌟🎉</span>
                  <h3 className="text-2xl font-black text-emerald-600">恭喜完美集齊 10 個永續寶物！</h3>
                  <p className="text-sm text-slate-500 font-bold">
                    已尋獲寶物小檔案大公開 📚
                  </p>
                  
                  {/* 全部 10 個寶物小檔案精美網格列表 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left max-h-[45vh] overflow-y-auto p-1 bg-slate-50 rounded-2xl border border-slate-100">
                    {treasures.map(t => (
                      <div key={t.id} className="p-3 bg-white border border-slate-200 rounded-xl flex items-start space-x-3 shadow-xs">
                        <span className="text-2xl flex-shrink-0">{t.icon}</span>
                        <div>
                          <p className="font-extrabold text-sm text-slate-800">{t.name}</p>
                          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{t.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-emerald-600 font-extrabold animate-pulse">
                    💡 提示：讀完這些環保小知識，接下來的永續問題肯定難不倒你！
                  </p>

                  <button
                    onClick={handleGoToQuiz}
                    className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold rounded-full shadow-lg transition-all text-sm flex items-center justify-center space-x-2"
                  >
                    <span>帶著滿滿知識，進入問答大挑戰！</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ================= 4. 永續知識問答挑戰 ================= */}
        {gameState === 'quiz' && (
          <div className="max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-slate-100 animate-fade-in">
            {/* 進度與作答計時看板 */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-black text-amber-600 bg-amber-50 px-3 py-1 rounded-full uppercase">
                第二階段：每題限時 30 秒
              </span>
              
              {/* ⏱️ 每題 30 秒獨立計時器 */}
              <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-black border transition-all ${
                quizAnswers[currentQuizIndex] !== undefined
                  ? 'bg-slate-100 text-slate-400 border-slate-200'
                  : quizTimeLeft <= 10
                  ? 'bg-rose-50 text-rose-600 border-rose-200 animate-pulse'
                  : 'bg-amber-50 text-amber-600 border-amber-200'
              }`}>
                <Clock size={14} className={quizAnswers[currentQuizIndex] === undefined && quizTimeLeft <= 10 ? "animate-spin" : ""} />
                <span>
                  {quizAnswers[currentQuizIndex] !== undefined 
                    ? '已作答' 
                    : `剩餘 ${quizTimeLeft} 秒`
                  }
                </span>
              </div>
            </div>

            {(() => {
              const quiz = SDG_QUIZ[currentQuizIndex];
              const char = SDG_CHARACTERS.find(c => c.id === quiz.character);
              const selectedOption = quizAnswers[currentQuizIndex];
              const hasAnswered = selectedOption !== undefined;
              
              return (
                <div className="space-y-4">
                  {/* 出題小動物對話區 */}
                  <div className="flex items-center space-x-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-white shadow-sm bg-white flex items-center justify-center">
                      <SafeImage src={char?.imgSrc} alt={char?.name} className="w-full h-full" fallbackEmoji={char?.emoji} />
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-white bg-slate-800 px-2 py-0.5 rounded-md">
                        {char?.name} ({char?.sdg.split(' ')[0]})
                      </span>
                      <p className="text-xs text-slate-500 font-semibold mt-0.5">
                        「這是我在暑假活動中實踐的永續目標，答對題目就能幫我的小攤位集氣加油喔！」
                      </p>
                    </div>
                  </div>

                  {/* 題目描述 */}
                  <h3 className="text-base md:text-lg font-black text-slate-800 leading-snug">
                    {quiz.question}
                  </h3>

                  {/* 選項清單 */}
                  <div className="space-y-2">
                    {quiz.options.map((option, oIdx) => {
                      const isChosen = selectedOption === oIdx;
                      let optionStyle = "border-slate-200 hover:border-slate-300 hover:bg-slate-50";
                      
                      if (hasAnswered) {
                        if (option.isCorrect) {
                          optionStyle = "border-emerald-500 bg-emerald-50 text-emerald-900";
                        } else if (isChosen) {
                          optionStyle = "border-rose-400 bg-rose-50 text-rose-900";
                        } else {
                          optionStyle = "border-slate-100 bg-slate-50/50 text-slate-400 opacity-60";
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={hasAnswered}
                          onClick={() => handleAnswerQuiz(oIdx, option.isCorrect)}
                          className={`w-full text-left p-3.5 rounded-xl border-2 font-bold text-xs md:text-sm transition-all flex items-center justify-between ${optionStyle}`}
                        >
                          <span>{option.text}</span>
                          {hasAnswered && option.isCorrect && (
                            <CheckCircle size={16} className="text-emerald-600 flex-shrink-0 ml-2" />
                          )}
                          {hasAnswered && isChosen && !option.isCorrect && (
                            <AlertCircle size={16} className="text-rose-600 flex-shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* 逾時提示 */}
                  {selectedOption === -1 && (
                    <div className="bg-rose-50 border border-rose-100 p-3 rounded-2xl animate-fade-in text-xs md:text-sm">
                      <h4 className="font-extrabold text-rose-800 flex items-center space-x-1">
                        <AlertCircle size={15} />
                        <span>⏰ 抱歉！作答時間到囉！</span>
                      </h4>
                      <p className="text-rose-700 mt-1 leading-relaxed font-bold">
                        別著急，這題雖然不能加分，但快看看下方的解析，充實一下永續知識！
                      </p>
                    </div>
                  )}

                  {/* 解析 */}
                  {hasAnswered && (
                    <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-2xl animate-fade-in text-xs md:text-sm">
                      <h4 className="font-extrabold text-emerald-800 flex items-center space-x-1">
                        <span>💡 綠色生活課堂解析</span>
                      </h4>
                      <p className="text-emerald-700 mt-1 leading-relaxed">
                        {quiz.explanation}
                      </p>
                    </div>
                  )}

                  {/* 下一題按鈕 */}
                  <div className="pt-3 border-t border-slate-100 flex justify-end">
                    <button
                      disabled={!hasAnswered}
                      onClick={handleNextQuiz}
                      className={`px-5 py-2.5 rounded-xl font-extrabold text-xs transition-all flex items-center space-x-1 ${
                        hasAnswered 
                          ? 'bg-slate-900 text-white hover:bg-slate-800 cursor-pointer shadow-md' 
                          : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <span>
                        {currentQuizIndex === SDG_QUIZ.length - 1 ? '觀看最終成績' : '下一位小動物出題'}
                      </span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ================= 5. 結束與結算頁面 ================= */}
        {gameState === 'ending' && (
          <div className="max-w-2xl mx-auto text-center bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-slate-100 space-y-5 animate-fade-in">
            {isChallengeSuccess ? (
              <div className="space-y-2">
                <span className="text-5xl animate-bounce inline-block">🎉🏆🎉</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider block w-max mx-auto">
                  挑戰成功！
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900">恭喜你過關！成為超级永續小達人！</h2>
              </div>
            ) : (
              <div className="space-y-2">
                <span className="text-5xl inline-block">💪</span>
                <span className="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full uppercase tracking-wider block w-max mx-auto">
                  未達成功門檻
                </span>
                <h2 className="text-2xl font-black text-slate-900">挑戰失敗了！差一點點就成功囉！</h2>
                <p className="text-xs text-rose-500 font-bold bg-rose-50 p-2.5 rounded-xl border border-rose-100 max-w-md mx-auto leading-relaxed">
                  過關需要：收集到至少 5 個寶物 (你收集了 {foundCount} 個) <br/>
                  且答對至少 3 題問答 (你答對了 {correctQuizCount} 題)
                </p>
              </div>
            )}

            <p className="text-slate-500 text-xs md:text-sm">
              謝謝你熱情參與暑期閉幕巡禮！以下是你在這場冒險中完成的永續成就結算：
            </p>

            {/* 成績看板 */}
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto py-2">
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 flex flex-col justify-center items-center">
                <span className="text-[10px] font-black text-slate-400 block uppercase">尋獲永續寶物</span>
                <span className="text-xl font-black text-slate-800 mt-1">{foundCount} / 10</span>
                <span className={`text-[10px] font-extrabold mt-1.5 px-2 py-0.5 rounded-full ${foundCount >= 5 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                  {foundCount >= 5 ? '達到一半 (OK)' : '未滿一半'}
                </span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 flex flex-col justify-center items-center">
                <span className="text-[10px] font-black text-slate-400 block uppercase">答對問答題數</span>
                <span className="text-xl font-black text-slate-800 mt-1">{correctQuizCount} / 5 題</span>
                <span className={`text-[10px] font-extrabold mt-1.5 px-2 py-0.5 rounded-full ${correctQuizCount >= 3 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                  {correctQuizCount >= 3 ? '達到一半 (OK)' : '未滿一半'}
                </span>
              </div>
            </div>

            {/* 永續宣言 */}
            <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 text-left space-y-2.5 text-xs md:text-sm">
              <h3 className="font-extrabold text-emerald-800 flex items-center space-x-1">
                <span>🌟 2026 暑期活動永續誓言</span>
              </h3>
              <p className="text-slate-600 leading-relaxed">
                在今年的暑期活動中，我們和小動物們一起在中心與日常學會了以下好習慣：
              </p>
              <ul className="text-slate-700 space-y-1.5 pl-4 list-disc text-xs">
                <li>像 <strong>蟻勇士 🐜</strong> 一樣善用紙箱與垃圾，做成環保美勞手工不浪費。</li>
                <li>跟著 <strong>樹苗龜 🐢</strong> 養成用漱口杯接水的好習慣，愛惜乾淨水源。</li>
                <li>跟著 <strong>反斗猴 🐒</strong> 天天快樂運動、多吃水果，照顧身體健康。</li>
                <li>與 <strong>紳士兔 🐰</strong> 攜手關心社區公園，垃圾不亂丟、保護綠色社區。</li>
                <li>學 <strong>智多鷹 🦉</strong> 對世界保持滿滿好奇，多讀故事書、多發問！</li>
              </ul>
            </div>

            {/* 結束按鈕 */}
            <div className="flex justify-center pt-2">
              <button
                onClick={handleRestart}
                className="px-8 py-3.5 bg-slate-900 text-white font-extrabold rounded-full shadow-md hover:bg-slate-800 transition-all flex items-center justify-center space-x-1.5 text-sm"
              >
                <RotateCcw size={15} />
                <span>{isChallengeSuccess ? '再挑戰一次' : '重新挑戰'}</span>
              </button>
            </div>
          </div>
        )}

        {/* =======================================================
            ★ 左下角「小動物打氣應援團」& 動態泡泡 (遊戲進行中常駐) ★
            ======================================================= */}
        {gameState !== 'welcome' && gameState !== 'ending' && (
          <div className="absolute bottom-4 left-4 z-20 max-w-[280px] md:max-w-md pointer-events-none flex items-end space-x-2 animate-fade-in">
            {/* 動態跳躍的打氣擔當動物 (直接使用原圖載入，備有 SafeImage 安全載入機制) */}
            <div className={`w-14 h-14 md:w-18 md:h-18 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white flex-shrink-0 pointer-events-auto transition-transform flex items-center justify-center ${cheerBubble.animationClass}`}>
              <SafeImage 
                src={SDG_CHARACTERS.find(c => c.id === cheerBubble.charId)?.imgSrc || 'picture_06 (5).jpg'} 
                alt="打氣小動物" 
                className="w-full h-full"
                fallbackEmoji={SDG_CHARACTERS.find(c => c.id === cheerBubble.charId)?.emoji}
              />
            </div>
            
            {/* 打氣對話氣泡 */}
            {cheerBubble.visible && (
              <div className="bg-white/95 backdrop-blur-xs p-3 rounded-2xl shadow-lg border border-emerald-200 pointer-events-auto relative text-xs text-slate-700 animate-fade-in select-none">
                {/* 尖角 */}
                <div className="absolute bottom-4 -left-1.5 w-3 h-3 bg-white border-l border-b border-emerald-100 rotate-45"></div>
                <div className="font-extrabold text-emerald-700 mb-0.5 flex items-center space-x-1 text-[11px] md:text-xs">
                  <span>{SDG_CHARACTERS.find(c => c.id === cheerBubble.charId)?.emoji}</span>
                  <span>{SDG_CHARACTERS.find(c => c.id === cheerBubble.charId)?.name} 的應援打氣：</span>
                </div>
                <p className="leading-relaxed font-bold text-slate-600 text-[10px] md:text-xs">
                  {cheerBubble.text}
                </p>
              </div>
            )}
          </div>
        )}

      </main>

      {/* 底部 Footer */}
      <footer className="bg-white border-t border-slate-100 py-3 text-center text-[10px] md:text-xs text-slate-400">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-1.5">
          <p>© 2026 社區中心暑期活動閉幕禮. All Rights Reserved.</p>
          <div className="flex space-x-2 font-bold text-slate-500">
            <span>蟻勇士 🎨</span>
            <span>|</span>
            <span>樹苗龜 💧</span>
            <span>|</span>
            <span>反斗猴 🍎</span>
            <span>|</span>
            <span>紳士兔 🏡</span>
            <span>|</span>
            <span>智多鷹 📖</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
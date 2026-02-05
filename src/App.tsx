import { useState, useEffect, useRef } from 'react';
import { 
  Eye, 
  Lock, 
  Unlock, 
  FileText, 
  AlertTriangle, 
  RefreshCw, 
  Share2, 
  Copy,
  Skull,
  Fingerprint,
  Radio,
  ShieldAlert,
  Zap,
  Globe,
  UserX
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

// Data for generating conspiracy theories
const secretOrganizations = [
  "мировое правительство",
  "иллюминаты", 
  "рептилоиды",
  "масоны 33-го градуса",
  "Бильдербергский клуб",
  "Всемирный экономический форум",
  "тайный космический флот",
  "глубинное государство",
  "фармацевтические магнаты",
  "нефтяные бароны",
  "технологические олигархи",
  "банковские кланы"
];

const conspiracyGoals = [
  "для контроля над мировыми запасами {resource}",
  "чтобы следить за каждым шагом через {device}",
  "для создания нового мирового порядка",
  "чтобы похитить вашу личную энергию",
  "для массового чипирования населения",
  "чтобы заменить людей клонами",
  "для контроля над погодой",
  "чтобы отравить {food}",
  "для сокрытия существования {creature}",
  "чтобы отключить {technology}"
];

const resources = ["воды", "воздуха", "информации", "времени", "внимания"];
const devices = ["5G вышки", "смартфоны", "холодильники", "зубные щётки", "носки"];
const foods = ["авокадо", "киноа", "кокосовое молоко", "пробиотики", "кале"];
const creatures = ["НЛО", "йети", "бигфута", "NESSIE", "драконов", "единорогов"];
const technologies = ["интернет", "электричество", "гравитацию", "сон", "воспоминания"];

const evidence = [
  "Это подтверждается отсутствием доказательств обратного!",
  "Все документы уничтожены, что является явным признаком!",
  "Совпадение? Не думаем!",
  "Откройте глаза!",
  "Это очевидно, если подумать!",
  "Никто не отрицает — значит, это правда!",
  "Гугл это скрывает!",
  "Википедия удаляет статьи об этом!"
];

const introPhrases = [
  "СЕКРЕТНЫЕ ДОКУМЕНТЫ ПОКАЗЫВАЮТ:",
  "РАССЕКРЕЧЕННАЯ ИНФОРМАЦИЯ:",
  "СВИДЕТЕТИ УТВЕРЖДАЮТ:",
  "АНОНИМНЫЙ ИСТОЧНИК РАСКРЫЛ:",
  "УТЕЧКА ИЗ ПЯТОГО УРОВНЯ ДОПУСКА:",
  "ЗАПИСЬ С ЧЁРНОГО ЯЩИКА:"
];

const connections = [
  "тайно контролирует",
  "является главой",
  "основал в {year} году",
  "финансирует из теневого бюджета",
  "руководит через посредников",
  "входит в состав совета директоров",
  "координирует действия"
];

interface FormData {
  name: string;
  birthDate: string;
  favoriteColor: string;
  favoriteAnimal: string;
  birthCity: string;
  luckyNumber: string;
}

function generateConspiracyTheory(data: FormData): string {
  const name = data.name || "АНОНИМ";
  const color = data.favoriteColor || "красный";
  const animal = data.favoriteAnimal || "кот";
  const city = data.birthCity || "неизвестный город";
  const number = data.luckyNumber || "7";
  
  const year = data.birthDate ? new Date(data.birthDate).getFullYear() : 1990;
  
  const intro = introPhrases[Math.floor(Math.random() * introPhrases.length)];
  const org = secretOrganizations[Math.floor(Math.random() * secretOrganizations.length)];
  const connection = connections[Math.floor(Math.random() * connections.length)].replace('{year}', year.toString());
  
  let goal = conspiracyGoals[Math.floor(Math.random() * conspiracyGoals.length)];
  goal = goal.replace('{resource}', resources[Math.floor(Math.random() * resources.length)]);
  goal = goal.replace('{device}', devices[Math.floor(Math.random() * devices.length)]);
  goal = goal.replace('{food}', foods[Math.floor(Math.random() * foods.length)]);
  goal = goal.replace('{creature}', creatures[Math.floor(Math.random() * creatures.length)]);
  goal = goal.replace('{technology}', technologies[Math.floor(Math.random() * technologies.length)]);
  
  const ev = evidence[Math.floor(Math.random() * evidence.length)];
  
  const personalDetails = [
    `Ваш любимый цвет (${color}) — это кодовое название секретной операции!`,
    `Ваше тотемное животное (${animal}) — символ организации!`,
    `Город вашего рождения (${city}) — штаб-квартира!`,
    `Ваше счастливое число (${number}) — количество агентов, следящих за вами!`,
    `Дата вашего рождения совпадает с датой основания организации!`
  ];
  
  const detail = personalDetails[Math.floor(Math.random() * personalDetails.length)];
  
  return `${intro}\n\n${name.toUpperCase()} ${connection} ${org} ${goal}.\n\n${detail}\n\n${ev}`;
}

function generateTopSecretCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 12; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
    if (i === 3 || i === 7) code += '-';
  }
  return code;
}

export default function App() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    birthDate: '',
    favoriteColor: '',
    favoriteAnimal: '',
    birthCity: '',
    luckyNumber: ''
  });
  
  const [theory, setTheory] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showTheory, setShowTheory] = useState(false);
  const [secretCode, setSecretCode] = useState('');
  const [accessLevel, setAccessLevel] = useState(0);
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const theoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Random glitch effect
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.95) {
        setGlitchEffect(true);
        setTimeout(() => setGlitchEffect(false), 300);
      }
    }, 2000);

    return () => clearInterval(glitchInterval);
  }, []);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setAccessLevel(prev => Math.min(prev + 1, 5));
  };

  const handleGenerate = () => {
    if (!formData.name) {
      toast.error('ВВЕДИТЕ ИМЯ ДЛЯ ДОСТУПА К СЕКРЕТНЫМ ДАННЫМ', {
        icon: <ShieldAlert className="w-4 h-4" />
      });
      return;
    }

    setIsGenerating(true);
    setSecretCode(generateTopSecretCode());
    
    // Simulate processing
    setTimeout(() => {
      const newTheory = generateConspiracyTheory(formData);
      setTheory(newTheory);
      setIsGenerating(false);
      setShowTheory(true);
      toast.success('ТЕОРИЯ ЗАГОВОРА РАССЕКРЕЧЕНА!', {
        icon: <Unlock className="w-4 h-4" />
      });
    }, 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(theory);
    toast.success('СКОПИРОВАНО В БУФЕР ОБМЕНА', {
      icon: <Copy className="w-4 h-4" />
    });
  };

  const handleShare = () => {
    setShowShareDialog(true);
  };

  const handleReset = () => {
    setShowTheory(false);
    setTheory('');
    setSecretCode('');
    setAccessLevel(0);
    setFormData({
      name: '',
      birthDate: '',
      favoriteColor: '',
      favoriteAnimal: '',
      birthCity: '',
      luckyNumber: ''
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#e2e8f0] relative overflow-hidden">
      {/* CRT Overlay */}
      <div className="crt-overlay" />
      
      {/* Scanline */}
      <div className="scanline-overlay" />
      
      {/* Animated scanline */}
      <div 
        className="fixed left-0 w-full h-1 bg-gradient-to-b from-transparent via-red-500/20 to-transparent animate-scanline pointer-events-none z-50"
        style={{ top: '-4px' }}
      />

      {/* Header */}
      <header className="relative z-10 border-b border-red-900/30 bg-black/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Eye className="w-8 h-8 text-red-600 animate-pulse" />
                <div className="absolute inset-0 w-8 h-8 bg-red-600/20 blur-lg rounded-full" />
              </div>
              <div>
                <h1 className={`text-xl font-bold tracking-wider text-red-500 ${glitchEffect ? 'animate-glitch' : ''}`}>
                  ГЕНЕРАТОР ТЕОРИЙ ЗАГОВОРА
                </h1>
                <p className="text-xs text-red-400/60 tracking-widest">СОВЕРШЕННО СЕКРЕТНО • УРОВЕНЬ ДОПУСКА: {accessLevel}/5</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Fingerprint className="w-5 h-5 text-red-600/50" />
              <Radio className="w-5 h-5 text-red-600 animate-pulse" />
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {!showTheory ? (
          <div className="space-y-6">
            {/* Warning Banner */}
            <div className="bg-red-950/30 border border-red-600/30 rounded-lg p-4 flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-red-400 font-bold mb-1">ВНИМАНИЕ: СЕКРЕТНАЯ ИНФОРМАЦИЯ</h3>
                <p className="text-sm text-red-300/70">
                  Данная система содержит рассекреченные данные. Введите вашу личную информацию 
                  для генерации персонализированной теории заговора. Все данные немедленно 
                  передаются в неизвестное направление.
                </p>
              </div>
            </div>

            {/* Input Form */}
            <Card className="bg-[#12121a] border-red-900/30 paper-texture">
              <CardContent className="p-6">
                <div className="classified-stamp">СЕКРЕТНО</div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-red-400 flex items-center gap-2">
                      <UserX className="w-4 h-4" />
                      ПОЛНОЕ ИМЯ (ОБЯЗАТЕЛЬНО)
                    </Label>
                    <Input
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Введите ваше имя..."
                      className="bg-[#0a0a0f] border-red-900/50 text-red-100 placeholder:text-red-900/50 focus:border-red-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-red-400 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      ДАТА РОЖДЕНИЯ
                    </Label>
                    <Input
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => handleInputChange('birthDate', e.target.value)}
                      className="bg-[#0a0a0f] border-red-900/50 text-red-100 focus:border-red-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-red-400 flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      ЛЮБИМЫЙ ЦВЕТ
                    </Label>
                    <Input
                      value={formData.favoriteColor}
                      onChange={(e) => handleInputChange('favoriteColor', e.target.value)}
                      placeholder="Например: красный..."
                      className="bg-[#0a0a0f] border-red-900/50 text-red-100 placeholder:text-red-900/50 focus:border-red-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-red-400 flex items-center gap-2">
                      <Skull className="w-4 h-4" />
                      ТОТЕМНОЕ ЖИВОТНОЕ
                    </Label>
                    <Input
                      value={formData.favoriteAnimal}
                      onChange={(e) => handleInputChange('favoriteAnimal', e.target.value)}
                      placeholder="Например: ворон..."
                      className="bg-[#0a0a0f] border-red-900/50 text-red-100 placeholder:text-red-900/50 focus:border-red-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-red-400 flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      ГОРОД РОЖДЕНИЯ
                    </Label>
                    <Input
                      value={formData.birthCity}
                      onChange={(e) => handleInputChange('birthCity', e.target.value)}
                      placeholder="Например: Москва..."
                      className="bg-[#0a0a0f] border-red-900/50 text-red-100 placeholder:text-red-900/50 focus:border-red-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-red-400 flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      СЧАСТЛИВОЕ ЧИСЛО
                    </Label>
                    <Input
                      value={formData.luckyNumber}
                      onChange={(e) => handleInputChange('luckyNumber', e.target.value)}
                      placeholder="Например: 13..."
                      className="bg-[#0a0a0f] border-red-900/50 text-red-100 placeholder:text-red-900/50 focus:border-red-500"
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-center">
                  <Button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="bg-red-700 hover:bg-red-600 text-white px-8 py-6 text-lg font-bold tracking-wider animate-pulse-red"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                        РАСШИФРОВКА...
                      </>
                    ) : (
                      <>
                        <Unlock className="w-5 h-5 mr-2" />
                        РАССЕКРЕТИТЬ ТЕОРИЮ
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Progress Indicator */}
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    level <= accessLevel 
                      ? 'bg-red-500 shadow-lg shadow-red-500/50' 
                      : 'bg-red-900/30'
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Secret Document */}
            <div 
              ref={theoryRef}
              className="relative bg-[#f5f0e1] text-[#2d1810] p-8 rounded shadow-2xl paper-texture animate-paper-shake"
            >
              {/* Document Header */}
              <div className="border-b-2 border-red-800/30 pb-4 mb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold tracking-widest text-red-800">СОВЕРШЕННО СЕКРЕТНО</p>
                    <p className="text-xs text-red-800/70">УРОВЕНЬ ДОПУСКА: ТОЛЬКО ДЛЯ ИЗБРАННЫХ</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-mono text-red-800">КОД: {secretCode}</p>
                    <p className="text-xs text-red-800/70">{new Date().toLocaleDateString('ru-RU')}</p>
                  </div>
                </div>
              </div>

              {/* Classified Stamp */}
              <div className="absolute top-20 right-8 border-4 border-red-700 text-red-700 px-4 py-2 font-bold text-xl transform rotate-[-12deg] opacity-60">
                РАССЕКРЕЧЕНО
              </div>

              {/* Theory Content */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-red-900 border-b border-red-900/20 pb-2">
                  ПЕРСОНАЛЬНАЯ ТЕОРИЯ ЗАГОВОРА
                </h2>
                
                <div className="font-mono text-lg leading-relaxed whitespace-pre-line">
                  {theory}
                </div>

                {/* Signature Area */}
                <div className="mt-8 pt-4 border-t border-red-900/20">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs text-red-800/70 mb-1">ПОДПИСЬ АГЕНТА:</p>
                      <div className="w-48 h-12 border-b border-red-900/40" />
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-red-800/70 mb-1">ПЕЧАТЬ:</p>
                      <div className="w-16 h-16 border-2 border-red-800/40 rounded-full flex items-center justify-center">
                        <Eye className="w-8 h-8 text-red-800/40" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                <Eye className="w-96 h-96 text-red-900" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={handleCopy}
                variant="outline"
                className="border-red-600/50 text-red-400 hover:bg-red-950/30"
              >
                <Copy className="w-4 h-4 mr-2" />
                КОПИРОВАТЬ
              </Button>
              
              <Button
                onClick={handleShare}
                variant="outline"
                className="border-red-600/50 text-red-400 hover:bg-red-950/30"
              >
                <Share2 className="w-4 h-4 mr-2" />
                ПОДЕЛИТЬСЯ
              </Button>
              
              <Button
                onClick={handleGenerate}
                className="bg-red-700 hover:bg-red-600 text-white"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                НОВАЯ ТЕОРИЯ
              </Button>
              
              <Button
                onClick={handleReset}
                variant="outline"
                className="border-red-900/50 text-red-500/70 hover:bg-red-950/30"
              >
                <Lock className="w-4 h-4 mr-2" />
                ЗАКРЫТЬ ДОСТУП
              </Button>
            </div>
          </div>
        )}

        {/* Footer Warning */}
        <div className="mt-12 text-center">
          <p className="text-xs text-red-600/40 tracking-widest">
            ⚠ ВСЕ ДЕЙСТВИЯ ЗАПИСЫВАЮТСЯ • ВАШ IP ОТСЛЕЖИВАЕТСЯ • СОДЕРЖАНИЕ МОЖЕТ БЫТЬ УДАЛЕНО ⚠
          </p>
          <p className="text-[10px] text-red-800/30 mt-2">
            Генератор создан в развлекательных целях. Никакие данные не сохраняются и не передаются.
          </p>
        </div>
      </main>

      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="bg-[#12121a] border-red-900/50 text-red-100">
          <DialogHeader>
            <DialogTitle className="text-red-400 flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              ПОДЕЛИТЬСЯ ТЕОРИЕЙ
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-red-300/70">
              Скопируйте текст теории и поделитесь им с друзьями. Пусть они тоже узнают правду!
            </p>
            <div className="bg-[#0a0a0f] p-4 rounded border border-red-900/30">
              <p className="text-xs text-red-400/50 mb-2">Ваша теория:</p>
              <p className="text-sm text-red-100 line-clamp-4">{theory}</p>
            </div>
            <Button 
              onClick={() => {
                handleCopy();
                setShowShareDialog(false);
              }}
              className="w-full bg-red-700 hover:bg-red-600"
            >
              <Copy className="w-4 h-4 mr-2" />
              КОПИРОВАТЬ И ЗАКРЫТЬ
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

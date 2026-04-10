import React, { useState, useEffect } from 'react';
import { Activity, Brain, Heart, Wind, AlertTriangle, TrendingUp, Settings } from 'lucide-react';

const SmartWatchHypoxia = () => {
  const [currentScreen, setCurrentScreen] = useState('main');
  const [spo2, setSpo2] = useState(98);
  const [heartRate, setHeartRate] = useState(75);
  const [respirationRate, setRespirationRate] = useState(16);
  const [riskLevel, setRiskLevel] = useState(12);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
      setSpo2(prev => Math.max(90, Math.min(100, prev + (Math.random() - 0.5) * 2)));
      setHeartRate(prev => Math.max(50, Math.min(180, prev + (Math.random() - 0.5) * 10)));
      setRespirationRate(prev => Math.max(8, Math.min(30, prev + (Math.random() - 0.5) * 2)));
      const newRisk = Math.max(5, Math.min(25, (100 - spo2) * 2 + Math.abs(heartRate - 70) * 0.1));
      setRiskLevel(Math.round(newRisk));
    }, 3000);
    return () => clearInterval(interval);
  }, [spo2, heartRate]);

  const getRiskColor = () => riskLevel < 10 ? 'text-emerald-600' : riskLevel < 15 ? 'text-amber-600' : 'text-rose-600';
  const getRiskStroke = () => riskLevel < 10 ? 'stroke-emerald-500' : riskLevel < 15 ? 'stroke-amber-500' : 'stroke-rose-500';
  const getRiskBg = () => riskLevel < 10 ? 'bg-emerald-500' : riskLevel < 15 ? 'bg-amber-500' : 'bg-rose-500';

  const CircularProgress = ({ value, maxValue, color, size = 120, strokeWidth = 8 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (value / maxValue) * circumference;
    return (
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size/2} cy={size/2} r={radius} stroke="currentColor" strokeWidth={strokeWidth} fill="none" className="text-gray-200" />
        <circle cx={size/2} cy={size/2} r={radius} stroke="currentColor" strokeWidth={strokeWidth} fill="none" strokeDasharray={circumference} strokeDashoffset={offset} className={color} strokeLinecap="round" />
      </svg>
    );
  };

  const MainScreen = () => (
    <div className="relative w-full h-full">
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-gray-700 text-base font-semibold">
        {time.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
      </div>
      
      {/* Main Risk Circle */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <CircularProgress value={riskLevel} maxValue={30} color={getRiskStroke()} size={150} strokeWidth={12} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={`text-4xl font-bold ${getRiskColor()}`}>{riskLevel}%</div>
            <div className="text-gray-500 text-sm mt-1 font-medium">RİSK</div>
          </div>
        </div>
      </div>

      {/* Circular Vital Signs around the center */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {/* Heart Rate - 45° (üst sağ) */}
        <div className="absolute" style={{ 
          left: '50%', 
          top: '50%',
          transform: 'translate(53px, -53px) translate(-50%, -50%)'
        }}>
          <div className="flex flex-col items-center justify-center bg-white shadow-lg rounded-full p-2 border border-gray-200 w-14 h-14">
            <Heart className="text-rose-500" size={12} />
            <div className="text-gray-800 font-bold text-xs mt-0.5">{Math.round(heartRate)}</div>
          </div>
        </div>
        
        {/* SpO2 - 135° (alt sağ) */}
        <div className="absolute" style={{ 
          left: '50%', 
          top: '50%',
          transform: 'translate(53px, 53px) translate(-50%, -50%)'
        }}>
          <div className="flex flex-col items-center justify-center bg-white shadow-lg rounded-full p-2 border border-gray-200 w-14 h-14">
            <Activity className="text-blue-500" size={12} />
            <div className="text-gray-800 font-bold text-xs mt-0.5">{Math.round(spo2)}%</div>
          </div>
        </div>
        
        {/* Respiration - 225° (alt sol) */}
        <div className="absolute" style={{ 
          left: '50%', 
          top: '50%',
          transform: 'translate(-53px, 53px) translate(-50%, -50%)'
        }}>
          <div className="flex flex-col items-center justify-center bg-white shadow-lg rounded-full p-2 border border-gray-200 w-14 h-14">
            <Wind className="text-cyan-500" size={12} />
            <div className="text-gray-800 font-bold text-xs mt-0.5">{Math.round(respirationRate)}</div>
          </div>
        </div>
        
        {/* Altitude - 315° (üst sol) */}
        <div className="absolute" style={{ 
          left: '50%', 
          top: '50%',
          transform: 'translate(-53px, -53px) translate(-50%, -50%)'
        }}>
          <div className="flex flex-col items-center justify-center bg-white shadow-lg rounded-full p-2 border border-gray-200 w-14 h-14">
            <TrendingUp className="text-purple-500" size={12} />
            <div className="text-gray-800 font-bold text-xs mt-0.5">8K</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center">
        <div className="text-gray-500 text-xs mb-2 font-medium">TAHMİN</div>
        <div className={`px-4 py-2 rounded-full text-sm font-bold text-white ${getRiskBg()}`}>
          {riskLevel < 10 ? 'NORMAL' : riskLevel < 15 ? '5dk SONRA' : '10dk SONRA'}
        </div>
      </div>
      
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-1.5">
        {['main', 'vitals', 'trends', 'settings'].map((s) => (
          <button key={s} onClick={() => setCurrentScreen(s)} className={`h-2 rounded-full transition-all ${currentScreen === s ? 'bg-blue-500 w-6' : 'bg-gray-300 w-2'}`} />
        ))}
      </div>
    </div>
  );

  const VitalsScreen = () => (
    <div className="relative w-full h-full">
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-gray-700 text-base font-semibold">
        Vital Signs
      </div>
      
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="absolute" style={{ transform: 'translate(-35px, -65px)' }}>
          <div className="text-center">
            <div className="relative mb-2">
              <CircularProgress value={spo2} maxValue={100} color="stroke-blue-500" size={70} strokeWidth={6} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-blue-600 text-lg font-bold">{Math.round(spo2)}</div>
                <div className="text-gray-500 text-xs">%</div>
              </div>
            </div>
            <div className="text-gray-600 text-xs font-medium">SpO2</div>
          </div>
        </div>

        <div className="absolute" style={{ transform: 'translate(35px, -65px)' }}>
          <div className="text-center">
            <div className="relative mb-2">
              <CircularProgress value={heartRate} maxValue={180} color="stroke-rose-500" size={70} strokeWidth={6} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-rose-600 text-lg font-bold">{Math.round(heartRate)}</div>
                <div className="text-gray-500 text-xs">BPM</div>
              </div>
            </div>
            <div className="text-gray-600 text-xs font-medium">Kalp</div>
          </div>
        </div>

        <div className="absolute" style={{ transform: 'translate(-35px, 25px)' }}>
          <div className="text-center">
            <div className="relative mb-2">
              <CircularProgress value={respirationRate} maxValue={30} color="stroke-cyan-500" size={70} strokeWidth={6} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-cyan-600 text-lg font-bold">{Math.round(respirationRate)}</div>
                <div className="text-gray-500 text-xs">/dk</div>
              </div>
            </div>
            <div className="text-gray-600 text-xs font-medium">Solunum</div>
          </div>
        </div>

        <div className="absolute" style={{ transform: 'translate(35px, 25px)' }}>
          <div className="text-center">
            <div className="relative mb-2">
              <CircularProgress value={8000} maxValue={20000} color="stroke-purple-500" size={70} strokeWidth={6} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-purple-600 text-lg font-bold">8K</div>
                <div className="text-gray-500 text-xs">ft</div>
              </div>
            </div>
            <div className="text-gray-600 text-xs font-medium">İrtifa</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-1.5">
        {['main', 'vitals', 'trends', 'settings'].map((s) => (
          <button key={s} onClick={() => setCurrentScreen(s)} className={`h-2 rounded-full transition-all ${currentScreen === s ? 'bg-blue-500 w-6' : 'bg-gray-300 w-2'}`} />
        ))}
      </div>
    </div>
  );

  const TrendsScreen = () => (
    <div className="relative w-full h-full">
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-gray-700 text-base font-semibold">
        AI Model
      </div>
      
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="text-center mb-6">
          <Brain className="text-purple-500 mx-auto mb-3" size={32} />
          <div className="text-gray-800 text-2xl font-bold">94.2%</div>
          <div className="text-gray-500 text-sm font-medium">LSTM Doğruluk</div>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="absolute" style={{ transform: 'translate(0px, -55px)' }}>
          <div className="text-center bg-white shadow-md rounded-xl px-4 py-2 border border-gray-200">
            <div className="text-blue-600 text-base font-bold">92%</div>
            <div className="text-gray-500 text-xs">Fusion</div>
          </div>
        </div>

        <div className="absolute" style={{ transform: 'translate(50px, 0px)' }}>
          <div className="text-center bg-white shadow-md rounded-xl px-4 py-2 border border-gray-200">
            <div className="text-emerald-600 text-base font-bold">88%</div>
            <div className="text-gray-500 text-xs">Güven</div>
          </div>
        </div>

        <div className="absolute" style={{ transform: 'translate(0px, 55px)' }}>
          <div className="text-center bg-white shadow-md rounded-xl px-4 py-2 border border-gray-200">
            <div className="text-amber-600 text-base font-bold">127ms</div>
            <div className="text-gray-500 text-xs">Süre</div>
          </div>
        </div>

        <div className="absolute" style={{ transform: 'translate(-50px, 0px)' }}>
          <div className="text-center bg-white shadow-md rounded-xl px-4 py-2 border border-gray-200">
            <div className="text-cyan-600 text-base font-bold">94%</div>
            <div className="text-gray-500 text-xs">Başarı</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-white shadow-md rounded-xl p-3 border border-gray-200">
        <div className="text-gray-700 text-xs font-semibold mb-2 text-center">Risk Zaman Çizelgesi</div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-3">
            <span className="text-gray-600 text-xs w-12">Şimdi</span>
            <div className="flex items-center gap-2">
              <div className="w-8 h-1.5 bg-emerald-400 rounded-full"></div>
              <span className="text-emerald-600 text-xs font-medium w-8">5%</span>
            </div>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-gray-600 text-xs w-12">5dk</span>
            <div className="flex items-center gap-2">
              <div className="w-6 h-1.5 bg-amber-400 rounded-full"></div>
              <span className="text-amber-600 text-xs font-medium w-8">8%</span>
            </div>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-gray-600 text-xs w-12">10dk</span>
            <div className="flex items-center gap-2">
              <div className="w-10 h-1.5 bg-rose-400 rounded-full"></div>
              <span className="text-rose-600 text-xs font-medium w-8">15%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-1.5">
        {['main', 'vitals', 'trends', 'settings'].map((s) => (
          <button key={s} onClick={() => setCurrentScreen(s)} className={`h-2 rounded-full transition-all ${currentScreen === s ? 'bg-blue-500 w-6' : 'bg-gray-300 w-2'}`} />
        ))}
      </div>
    </div>
  );

  const SettingsScreen = () => (
    <div className="relative w-full h-full">
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-gray-700 text-base font-semibold">
        Ayarlar
      </div>
      
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="bg-gray-100 rounded-full p-3">
          <Settings className="text-gray-600" size={24} />
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <button className="absolute" style={{ transform: 'translate(-22px, -50px)' }}>
          <div className="flex flex-col items-center bg-white shadow-md border border-blue-200 rounded-2xl p-3">
            <Brain size={14} className="text-blue-500 mb-1" />
            <div className="text-blue-600 text-xs font-medium">Model</div>
          </div>
        </button>

        <button className="absolute" style={{ transform: 'translate(28px, -50px)' }}>
          <div className="flex flex-col items-center bg-white shadow-md border border-emerald-200 rounded-2xl p-3">
            <Activity size={14} className="text-emerald-500 mb-1" />
            <div className="text-emerald-600 text-xs font-medium">Test</div>
          </div>
        </button>

        <button className="absolute" style={{ transform: 'translate(28px, 30px)' }}>
          <div className="flex flex-col items-center bg-white shadow-md border border-purple-200 rounded-2xl p-3">
            <TrendingUp size={14} className="text-purple-500 mb-1" />
            <div className="text-purple-600 text-xs font-medium">Analiz</div>
          </div>
        </button>

        <button className="absolute" style={{ transform: 'translate(-22px, 30px)' }}>
          <div className="flex flex-col items-center bg-white shadow-md border border-rose-200 rounded-2xl p-3">
            <AlertTriangle size={14} className="text-rose-500 mb-1" />
            <div className="text-rose-600 text-xs font-medium">Acil</div>
          </div>
        </button>
      </div>

      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center">
        <div className="text-gray-500 text-xs space-y-0.5">
          <div className="font-semibold">Hipoksi AI v2.1</div>
          <div>LSTM Neural Network</div>
          <div>Multi-Sensor Fusion</div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-1.5">
        {['main', 'vitals', 'trends', 'settings'].map((s) => (
          <button key={s} onClick={() => setCurrentScreen(s)} className={`h-2 rounded-full transition-all ${currentScreen === s ? 'bg-blue-500 w-6' : 'bg-gray-300 w-2'}`} />
        ))}
      </div>
    </div>
  );

  const renderScreen = () => {
    switch (currentScreen) {
      case 'vitals': return <VitalsScreen />;
      case 'trends': return <TrendsScreen />;
      case 'settings': return <SettingsScreen />;
      default: return <MainScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="relative">
        <div className="w-80 h-80 rounded-full bg-gradient-to-br from-gray-300 via-gray-200 to-gray-300 p-4 shadow-2xl">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-white to-gray-50 overflow-hidden relative border-4 border-gray-100">
            <div className="w-full h-full relative">{renderScreen()}</div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none"></div>
          </div>
        </div>
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-8 bg-gray-400 rounded-r-lg shadow-lg"></div>
        <div className="absolute right-2 top-1/3 w-3 h-6 bg-gray-500 rounded-r-md shadow-md"></div>
      </div>
    </div>
  );
};

export default SmartWatchHypoxia;
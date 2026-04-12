# PilotO2 Watch Application

> **CDSA Projesi — Aşama 0 · Bireysel İzleme Katmanı**
> SmartWatch tabanlı hipoksi risk tahmin simülatörü

🔗 **Canlı Demo:** [orfeomete.github.io/hipoksi-app-](https://orfeomete.github.io/hipoksi-app-)

---

## Hakkında

PilotO2, akıllı pilot saatlerinin gerçek zamanlı biyometrik izleme kapasitesini simüle eden etkileşimli bir web uygulamasıdır. **LSTM (Long Short-Term Memory)** tabanlı bir yapay zekâ modelini temel alarak pilotun fizyolojik verilerini sürekli analiz eder ve sinsi hipoksi gibi bilişsel açıdan tehlikeli durumları önceden tespit etmeyi simüle eder.

Bu uygulama, **Tamamlayıcı Tanısal Emniyet Yaklaşımı (CDSA)** çerçevesinde yürütülen araştırmanın kavramsal gösterimidir.

---

## Özellikler

- 🌐 **TR/EN dil desteği** — sağ üstteki butonla tam arayüz değişimi
- 🔄 **Canlı simülasyon** — 3 saniyede bir gerçekçi veri güncellemesi
- 📱 **Responsive** — masaüstü ve iframe görünümüne uyumlu

**Ekranlar:** Ana Ekran · Vital Göstergeler · AI Model · Ayarlar

---

## Simüle Edilen Sensörler

- **SpO₂** — Oksijen doygunluğu (%)
- **Optik KA** — Kalp atış hızı (BPM)
- **Solunum hızı** — Nefes/dakika
- **Barometrik irtifa** — Feet (ft)

---

## CDSA Ekosistemi

```
PilotO2          →  Hipoksi ve risk tahmini (bu repo)
PilotGuard       →  Uçuş öncesi hazırlık ve stres izleme
PilotReflect EFB →  Uçuş sonrası kişisel değerlendirme
PilotSense AUTH  →  Kriptografik çoklu imza (Aşama 1)
PilotSense OPS   →  Anonim filo izleme (Aşama 2)
```

---

## Teknik Altyapı

- **React 18** · **Tailwind CSS** · **Babel Standalone** · **GitHub Pages**
- Harici bağımlılık yok, tek dosya (`index.html`)

---

## Kaynak

- Cantekin, M. (2025). *Mekanikten Yapay Zekaya Evrilen Pilot Saatlerinin Uçuş Emniyetindeki Yeni Rolü*. ATAConf'25, Yayın No: 10232620.
- Cantekin, M. (2025). *Tamamlayıcı Tanısal Emniyet Yaklaşımı (CDSA) Kapsamında Giyilebilir Teknolojiler ve Uçuş Emniyeti Optimizasyonu*.

---

> ⚠️ **Sadece eğitim ve araştırma amaçlıdır.** Tüm veriler sentetiktir.

*CDSA Projesi · ICAO Ek-13 · GDPR Madde 9*

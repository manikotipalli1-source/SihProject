import { Language } from '../constants/config';

export type TranslationKey =
  | 'appName'
  | 'onlineMode'
  | 'offlineMode'
  | 'scanCrop'
  | 'diseaseRisk'
  | 'cropHealth'
  | 'scanHistory'
  | 'home'
  | 'scan'
  | 'history'
  | 'profile'
  | 'selectCrop'
  | 'selectCropPrompt'
  | 'guidedCamera'
  | 'leafDetected'
  | 'lightingQuality'
  | 'cameraStability'
  | 'capture'
  | 'retake'
  | 'analyzing'
  | 'analyzingMessage'
  | 'result'
  | 'cropName'
  | 'diseaseName'
  | 'confidence'
  | 'severity'
  | 'symptoms'
  | 'advisory'
  | 'cause'
  | 'spreadConditions'
  | 'damageImpact'
  | 'chemicalControl'
  | 'organicControl'
  | 'culturalControl'
  | 'consultExtension'
  | 'listen'
  | 'stop'
  | 'low'
  | 'medium'
  | 'high'
  | 'healthy'
  | 'noScansYet'
  | 'noScansYetPrompt'
  | 'weather'
  | 'map'
  | 'temperature'
  | 'humidity'
  | 'rainfall'
  | 'windSpeed'
  | 'riskLevel'
  | 'weatherRisk'
  | 'diseaseMap'
  | 'language'
  | 'voiceGuidance'
  | 'about'
  | 'aboutApp'
  | 'syncStatus'
  | 'synced'
  | 'pending'
  | 'failed'
  | 'syncing'
  | 'settings'
  | 'retry'
  | 'deleteScan'
  | 'viewDetails'
  | 'back'
  | 'close'
  | 'scanAgain'
  | 'saveResult'
  | 'saved'
  | 'savedMessage'
  | 'pinchZoom'
  | 'outbreakAlerts'
  | 'nearbyScans'
  | 'noAlerts'
  | 'goodLighting'
  | 'poorLighting'
  | 'stable'
  | 'unstable'
  | 'leafFound'
  | 'leafNotFound'
  | 'cameraPermission'
  | 'grantPermission'
  | 'flipCamera'
  | 'holdSteady'
  | 'pointAtLeaf'
  | 'pickFromGallery'
  | 'recentScans'
  | 'viewAll'
  | 'quickActions'
  | 'appDescription'
  | 'version'
  | 'developer'
  | 'offlineDataStored'
  | 'totalScans'
  | 'healthyScans'
  | 'diseasedScans'
  | 'clearHistory'
  | 'confirmClear'
  | 'cancel'
  | 'confirm'
  | 'clear';

type Translations = Record<TranslationKey, string>;

const mr: Translations = {
  appName: 'कृषिरक्षक AI',
  onlineMode: 'ऑनलाइन मोड',
  offlineMode: 'ऑफलाइन मोड',
  scanCrop: 'पीक स्कॅन करा',
  diseaseRisk: 'रोग जोखीम',
  cropHealth: 'पीक आरोग्य',
  scanHistory: 'स्कॅन इतिहास',
  home: 'मुख्यपृष्ठ',
  scan: 'स्कॅन',
  history: 'इतिहास',
  profile: 'प्रोफाइल',
  selectCrop: 'पीक निवडा',
  selectCropPrompt: 'स्कॅन करण्यासाठी पीक निवडा',
  guidedCamera: 'मार्गदर्शित कॅमेरा',
  leafDetected: 'पान शोधले',
  lightingQuality: 'प्रकाश गुणवत्ता',
  cameraStability: 'कॅमेरा स्थिरता',
  capture: 'कॅप्चर करा',
  retake: 'पुन्हा घ्या',
  analyzing: 'विश्लेषण करत आहे...',
  analyzingMessage: 'तुमच्या पिकाचे विश्लेषण केले जात आहे',
  result: 'निकाल',
  cropName: 'पीक नाव',
  diseaseName: 'रोग नाव',
  confidence: 'विश्वास',
  severity: 'तीव्रता',
  symptoms: 'लक्षणे',
  advisory: 'सल्ला',
  cause: 'कारण',
  spreadConditions: 'प्रसार व अनुकूल परिस्थिती',
  damageImpact: 'नुकसान व परिणाम',
  chemicalControl: 'रासायनिक उपाय',
  organicControl: 'सेंद्रिय/जैविक उपाय',
  culturalControl: 'शेती पद्धती व प्रतिबंध',
  consultExtension: 'फवारणीपूर्वी योग्य मात्रेसाठी स्थानिक कृषी विस्तार अधिकाऱ्याचा सल्ला घ्या.',
  listen: 'ऐका',
  stop: 'थांबा',
  low: 'कमी',
  medium: 'मध्यम',
  high: 'जास्त',
  healthy: 'निरोगी',
  noScansYet: 'अद्याप कोणतेही स्कॅन नाहीत',
  noScansYetPrompt: 'पीक स्कॅन करून सुरुवात करा',
  weather: 'हवामान',
  map: 'नकाशा',
  temperature: 'तापमान',
  humidity: 'आर्द्रता',
  rainfall: 'पाऊस',
  windSpeed: 'वाऱ्याचा वेग',
  riskLevel: 'जोखीम पातळी',
  weatherRisk: 'हवामान जोखीम',
  diseaseMap: 'रोग नकाशा',
  language: 'भाषा',
  voiceGuidance: 'आवाज मार्गदर्शन',
  about: 'अॅप विषयी',
  aboutApp: 'कृषिरक्षक AI — किसानांसाठी AI आधारित पीक रोग निदान अॅप',
  syncStatus: 'सिंक स्थिती',
  synced: 'सिंक झाले',
  pending: 'प्रलंबित',
  failed: 'अयशस्वी',
  syncing: 'सिंक होत आहे',
  settings: 'सेटिंग्ज',
  retry: 'पुन्हा प्रयत्न करा',
  deleteScan: 'स्कॅन हटवा',
  viewDetails: 'तपशील पहा',
  back: 'मागे',
  close: 'बंद करा',
  scanAgain: 'पुन्हा स्कॅन करा',
  saveResult: 'निकाल जतन करा',
  saved: 'जतन झाले',
  savedMessage: 'स्कॅन यशस्वीरित्या जतन केले',
  pinchZoom: 'झूम करण्यासाठी दोन बोटे वापरा',
  outbreakAlerts: 'उबड जागृती',
  nearbyScans: 'जवळील स्कॅन',
  noAlerts: 'सध्या कोणतीही जागृती नाही',
  goodLighting: 'चांगला प्रकाश',
  poorLighting: 'अपुरा प्रकाश',
  stable: 'स्थिर',
  unstable: 'अस्थिर',
  leafFound: 'पान आढळले',
  leafNotFound: 'पान आढळले नाही',
  cameraPermission: 'कॅमेरा परवानगी आवश्यक',
  grantPermission: 'परवानगी द्या',
  flipCamera: 'कॅमेरा उलटा करा',
  holdSteady: 'कॅमेरा स्थिर धरा',
  pointAtLeaf: 'पानावर कॅमेरा दिशा करा',
  pickFromGallery: 'गॅलरीतून निवडा',
  recentScans: 'अलीकडील स्कॅन',
  viewAll: 'सर्व पहा',
  quickActions: 'त्वरित क्रिया',
  appDescription: 'AI आधारित पीक रोग निदान आणि सल्ला',
  version: 'आवृत्ती',
  developer: 'विकसक',
  offlineDataStored: 'ऑफलाइन डेटा जतन',
  totalScans: 'एकूण स्कॅन',
  healthyScans: 'निरोगी पिके',
  diseasedScans: 'रोगग्रस्त पिके',
  clearHistory: 'इतिहास साफ करा',
  confirmClear: 'सर्व स्कॅन हटवायच्या?',
  cancel: 'रद्द करा',
  confirm: 'पुष्टी करा',
  clear: 'साफ करा',
};

const en: Partial<Translations> = {
  appName: 'KrishiRakshak AI',
  onlineMode: 'ONLINE MODE',
  offlineMode: 'OFFLINE MODE',
  scanCrop: 'Scan Crop',
  diseaseRisk: 'Disease Risk',
  cropHealth: 'Crop Health',
  scanHistory: 'Scan History',
  home: 'Home',
  scan: 'Scan',
  history: 'History',
  profile: 'Profile',
  selectCrop: 'Select Crop',
  selectCropPrompt: 'Select a crop to scan',
  guidedCamera: 'Guided Camera',
  leafDetected: 'Leaf Detected',
  lightingQuality: 'Lighting Quality',
  cameraStability: 'Camera Stability',
  capture: 'Capture',
  retake: 'Retake',
  analyzing: 'Analyzing...',
  analyzingMessage: 'Analyzing your crop',
  result: 'Result',
  cropName: 'Crop Name',
  diseaseName: 'Disease Name',
  confidence: 'Confidence',
  severity: 'Severity',
  symptoms: 'Symptoms',
  advisory: 'Advisory',
  cause: 'Cause',
  spreadConditions: 'Spread & Favorable Conditions',
  damageImpact: 'Damage & Impact',
  chemicalControl: 'Chemical Control',
  organicControl: 'Organic / Biological Control',
  culturalControl: 'Cultural Practices & Prevention',
  consultExtension: 'Confirm the right product and dosage with your local agricultural extension officer before spraying.',
  listen: 'Listen',
  stop: 'Stop',
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  healthy: 'Healthy',
  noScansYet: 'No scans yet',
  noScansYetPrompt: 'Start by scanning a crop',
  weather: 'Weather',
  map: 'Map',
  temperature: 'Temperature',
  humidity: 'Humidity',
  rainfall: 'Rainfall',
  windSpeed: 'Wind Speed',
  riskLevel: 'Risk Level',
  weatherRisk: 'Weather Risk',
  diseaseMap: 'Disease Map',
  language: 'Language',
  voiceGuidance: 'Voice Guidance',
  about: 'About',
  aboutApp: 'KrishiRakshak AI — AI-powered crop disease diagnosis app for farmers',
  syncStatus: 'Sync Status',
  synced: 'Synced',
  pending: 'Pending',
  failed: 'Failed',
  syncing: 'Syncing',
  settings: 'Settings',
  retry: 'Retry',
  deleteScan: 'Delete Scan',
  viewDetails: 'View Details',
  back: 'Back',
  close: 'Close',
  scanAgain: 'Scan Again',
  saveResult: 'Save Result',
  saved: 'Saved',
  savedMessage: 'Scan saved successfully',
  pinchZoom: 'Pinch to zoom',
  outbreakAlerts: 'Outbreak Alerts',
  nearbyScans: 'Nearby Scans',
  noAlerts: 'No alerts at this time',
  goodLighting: 'Good lighting',
  poorLighting: 'Poor lighting',
  stable: 'Stable',
  unstable: 'Unstable',
  leafFound: 'Leaf found',
  leafNotFound: 'Leaf not found',
  cameraPermission: 'Camera permission required',
  grantPermission: 'Grant Permission',
  flipCamera: 'Flip Camera',
  holdSteady: 'Hold camera steady',
  pointAtLeaf: 'Point camera at leaf',
  pickFromGallery: 'Pick from gallery',
  recentScans: 'Recent Scans',
  viewAll: 'View All',
  quickActions: 'Quick Actions',
  appDescription: 'AI-powered crop disease diagnosis & advisory',
  version: 'Version',
  developer: 'Developer',
  offlineDataStored: 'Offline data stored',
  totalScans: 'Total Scans',
  healthyScans: 'Healthy Crops',
  diseasedScans: 'Diseased Crops',
  clearHistory: 'Clear History',
  confirmClear: 'Delete all scans?',
  cancel: 'Cancel',
  confirm: 'Confirm',
  clear: 'Clear',
};

const hi: Partial<Translations> = {
  appName: 'कृषिरक्षक AI',
  onlineMode: 'ऑनलाइन मोड',
  offlineMode: 'ऑफलाइन मोड',
  scanCrop: 'फसल स्कैन करें',
  diseaseRisk: 'रोग जोखिम',
  cropHealth: 'फसल स्वास्थ्य',
  scanHistory: 'स्कैन इतिहास',
  home: 'होम',
  scan: 'स्कैन',
  history: 'इतिहास',
  profile: 'प्रोफ़ाइल',
  selectCrop: 'फसल चुनें',
  selectCropPrompt: 'स्कैन के लिए फसल चुनें',
  guidedCamera: 'निर्देशित कैमरा',
  leafDetected: 'पत्ता मिला',
  lightingQuality: 'प्रकाश गुणवत्ता',
  cameraStability: 'कैमरा स्थिरता',
  capture: 'कैप्चर करें',
  retake: 'फिर से लें',
  analyzing: 'विश्लेषण हो रहा है...',
  analyzingMessage: 'आपकी फसल का विश्लेषण किया जा रहा है',
  result: 'परिणाम',
  cropName: 'फसल नाम',
  diseaseName: 'रोग नाम',
  confidence: 'विश्वास',
  severity: 'गंभीरता',
  symptoms: 'लक्षण',
  advisory: 'सलाह',
  cause: 'कारण',
  spreadConditions: 'प्रसार व अनुकूल परिस्थितियाँ',
  damageImpact: 'नुकसान व प्रभाव',
  chemicalControl: 'रासायनिक उपाय',
  organicControl: 'जैविक/प्राकृतिक उपाय',
  culturalControl: 'कृषि पद्धतियाँ व रोकथाम',
  consultExtension: 'छिड़काव से पहले सही मात्रा के लिए स्थानीय कृषि विस्तार अधिकारी से सलाह लें।',
  listen: 'सुनें',
  stop: 'रुकें',
  low: 'कम',
  medium: 'मध्यम',
  high: 'उच्च',
  healthy: 'स्वस्थ',
  noScansYet: 'अभी तक कोई स्कैन नहीं',
  noScansYetPrompt: 'फसल स्कैन करके शुरू करें',
  weather: 'मौसम',
  map: 'नक्शा',
  temperature: 'तापमान',
  humidity: 'नमी',
  rainfall: 'वर्षा',
  windSpeed: 'हवा की गति',
  riskLevel: 'जोखिम स्तर',
  weatherRisk: 'मौसम जोखिम',
  diseaseMap: 'रोग नक्शा',
  language: 'भाषा',
  voiceGuidance: 'आवाज मार्गदर्शन',
  about: 'ऐप के बारे में',
  aboutApp: 'कृषिरक्षक AI — किसानों के लिए AI आधारित फसल रोग निदान ऐप',
  syncStatus: 'सिंक स्थिति',
  synced: 'सिंक हो गया',
  pending: 'लंबित',
  failed: 'विफल',
  syncing: 'सिंक हो रहा है',
  settings: 'सेटिंग्स',
  retry: 'पुनः प्रयास करें',
  deleteScan: 'स्कैन हटाएं',
  viewDetails: 'विवरण देखें',
  back: 'वापस',
  close: 'बंद करें',
  scanAgain: 'फिर से स्कैन करें',
  saveResult: 'परिणाम सहेजें',
  saved: 'सहेजा गया',
  savedMessage: 'स्कैन सफलतापूर्वक सहेजा गया',
  pinchZoom: 'ज़ूम के लिए दो उंगलियां इस्तेमाल करें',
  outbreakAlerts: 'प्रकोप अलर्ट',
  nearbyScans: 'निकटवर्ती स्कैन',
  noAlerts: 'अभी कोई अलर्ट नहीं',
  goodLighting: 'अच्छा प्रकाश',
  poorLighting: 'अपर्याप्त प्रकाश',
  stable: 'स्थिर',
  unstable: 'अस्थिर',
  leafFound: 'पत्ता मिला',
  leafNotFound: 'पत्ता नहीं मिला',
  cameraPermission: 'कैमरा अनुमति आवश्यक',
  grantPermission: 'अनुमति दें',
  flipCamera: 'कैमरा पलटें',
  holdSteady: 'कैमरा स्थिर पकड़ें',
  pointAtLeaf: 'पत्ते पर कैमरा लक्षित करें',
  pickFromGallery: 'गैलरी से चुनें',
  recentScans: 'हाल के स्कैन',
  viewAll: 'सभी देखें',
  quickActions: 'त्वरित क्रिया',
  appDescription: 'AI आधारित फसल रोग निदान और सलाह',
  version: 'संस्करण',
  developer: 'डेवलपर',
  offlineDataStored: 'ऑफलाइन डेटा सहेजा गया',
  totalScans: 'कुल स्कैन',
  healthyScans: 'स्वस्थ फसलें',
  diseasedScans: 'रोगग्रस्त फसलें',
  clearHistory: 'इतिहास साफ करें',
  confirmClear: 'सभी स्कैन हटाएं?',
  cancel: 'रद्द करें',
  confirm: 'पुष्टि करें',
  clear: 'साफ करें',
};

const translations: Record<Language, Partial<Translations>> = { mr, hi, en };

export function translate(key: TranslationKey, lang: Language = 'mr'): string {
  return translations[lang]?.[key] ?? translations.mr[key] ?? key;
}

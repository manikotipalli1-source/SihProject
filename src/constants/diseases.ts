import { Disease } from '../types';

export const DISEASES: Disease[] = [
  {
    id: 'pink_bollworm',
    name: 'Pink Bollworm',
    nameMarathi: 'गुलाबी बोअरवर्म',
    cropId: 'cotton',
    symptoms:
      'Pinkish larvae inside bolls, rosette flowers, damaged lint with frass.',
    symptomsMarathi:
      'कोशांमध्ये गुलाबी अळ्या, फुलांची झडप उघडलेली दिसते, फेकासह पोकळ कापूस.',
    advisory:
      'Install pheromone traps, pick infested bolls, spray neem oil 5ml/L, avoid repeated insecticide use.',
    advisoryMarathi:
      'फेरोमोन सापळे लावा, प्रभावित कोश काढा, ५ मिली निम तेल प्रति लिटर पाण्यात फवारा करा, वारंवार कीटकनाशक टाळा.',
    severity: 'high',
  },
  {
    id: 'leaf_spot',
    name: 'Leaf Spot',
    nameMarathi: 'पानांचे ठिपके',
    cropId: 'cotton',
    symptoms:
      'Small brown to black circular spots on leaves with yellow halos, premature defoliation.',
    symptomsMarathi:
      'पानांवर तपशील असलेले तपकिरी-काळे गोल ठिपके, पाने वेळेआधी गळतात.',
    advisory:
      'Improve drainage, remove infected debris, apply copper oxychloride 3g/L at 10-day intervals.',
    advisoryMarathi:
      'पाणी निचरा सुधारा, संक्रमित कचरा काढा, कॉपर ऑक्सीक्लोराईड ३ ग्रॅम/लिटर १० दिवसांच्या अंतराने फवारा करा.',
    severity: 'medium',
  },
  {
    id: 'bacterial_blight',
    name: 'Bacterial Blight',
    nameMarathi: 'जीवाणूजन्य झुळकी',
    cropId: 'cotton',
    scientificName: 'Xanthomonas citri pv. malvacearum',
    diseaseType: 'bacterial',
    symptoms:
      'Small water-soaked spots appear on both leaf surfaces, turning angular (bounded by leaf veins) with a reddish-brown border, sometimes ringed by a yellow halo. Lesions blacken with age and leaves take on a tattered look before falling early. On stems and petioles, black cankers can girdle and kill the tissue ("black arm"). Infected bolls show round, dark, water-soaked lesions that lead to boll rot and stained, poor-quality lint.',
    symptomsMarathi:
      'पानांच्या दोन्ही बाजूंवर पाणी भरलेले लहान डाग दिसतात, जे शिरांमुळे कोन आकाराचे बनतात व लालसर-तपकिरी कडा असतात, कधी पिवळ्या वलयासह. डाग जुने झाल्यावर काळे पडतात व पाने चुरगळलेली दिसून वेळेआधी गळतात. देठ व देठकाठीवर काळे व्रण तयार होऊन ते भाग मरतात ("ब्लॅक आर्म"). संक्रमित कोशांवर गोल, गडद, पाणी भरलेले डाग दिसतात ज्यामुळे कोश कुजतो व कापसाचा दर्जा घसरतो.',
    cause:
      'Caused by the bacterium Xanthomonas citri pv. malvacearum (Xcm). It survives on infected seed and in crop residue left in the field between seasons.',
    causeMarathi:
      'Xanthomonas citri pv. malvacearum (Xcm) या जीवाणूमुळे हा रोग होतो. हा जीवाणू संक्रमित बियाण्यावर व शेतातील पिकाच्या उरलेल्या कचऱ्यावर हंगामांदरम्यान टिकून राहतो.',
    spreadAndConditions:
      'Spreads via wind-driven rain, irrigation water, insects, and contaminated tools or equipment moving between fields. The bacteria enter through leaf stomata, wounds, or natural openings on the boll. Warm, humid weather strongly favors the disease — daytime temperatures of 30-38°C with nighttime temperatures of 17-20°C, and relative humidity above 85%, allow rapid spread once the canopy closes.',
    spreadAndConditionsMarathi:
      'वाऱ्यासह पाऊस, सिंचनाचे पाणी, किडे आणि एका शेतातून दुसऱ्या शेतात नेलेली अस्वच्छ अवजारे यामुळे रोग पसरतो. जीवाणू पानांच्या रंध्रातून, जखमांमधून किंवा कोशावरील नैसर्गिक छिद्रांमधून आत शिरतात. उष्ण व दमट हवामान (दिवसा ३०-३८°से, रात्री १७-२०°से, आर्द्रता ८५% पेक्षा जास्त) या रोगाच्या जलद प्रसारास अनुकूल असते, विशेषतः पीक दाट झाल्यावर.',
    damageImpact:
      'Where resistant varieties and clean seed are used, annual losses are typically minor. But in susceptible fields under favorable weather, losses of 20-30% have been recorded, and historically — before resistant varieties and seed treatment became common — losses exceeding 50% occurred in severe outbreaks. Boll infection also directly stains and downgrades lint quality.',
    damageImpactMarathi:
      'प्रतिरोधक जाती व स्वच्छ बियाणे वापरल्यास वार्षिक नुकसान सहसा कमी असते. मात्र संवेदनशील शेतात अनुकूल हवामानात २०-३०% नुकसान नोंदवले गेले आहे, आणि पूर्वी प्रतिरोधक जाती व बीजप्रक्रिया सामान्य नसताना गंभीर उद्रेकांत ५०% पेक्षा जास्त नुकसान झाले आहे. कोश संक्रमणामुळे कापसाचा दर्जाही थेट घसरतो.',
    chemicalControl: [
      'Treat seed with an approved bactericide/acid-delinting process before sowing to eliminate seed-borne inoculum.',
      'At first symptom appearance, spray a copper-based bactericide (e.g. copper oxychloride) mixed with streptomycin sulfate, repeating every 7-10 days as needed.',
      'Once established in a field, no spray can fully stop disease progress for that season — focus on limiting spread to neighboring plants and fields.',
    ],
    chemicalControlMarathi: [
      'बियाण्यावरील जीवाणू नष्ट करण्यासाठी पेरणीपूर्वी मान्यताप्राप्त जीवाणूनाशक/आम्ल-प्रक्रिया करा.',
      'लक्षणे दिसताच कॉपर ऑक्सीक्लोराईडसारखे कॉपर-आधारित जीवाणूनाशक स्ट्रेप्टोमायसिन सल्फेटसोबत मिसळून फवारा, गरजेनुसार दर ७-१० दिवसांनी पुन्हा करा.',
      'शेतात रोग स्थापित झाल्यावर त्या हंगामात कोणतीही फवारणी रोग पूर्णपणे थांबवू शकत नाही — शेजारील रोपे व शेतांमध्ये प्रसार मर्यादित ठेवण्यावर भर द्या.',
    ],
    organicControl: [
      'Neem-based sprays can supplement chemical control, though they are not a substitute once the disease is established.',
      'Destroy or compost infected crop residue away from the field rather than leaving it to overwinter.',
    ],
    organicControlMarathi: [
      'रासायनिक उपायांना पूरक म्हणून निम-आधारित फवारणी वापरता येते, परंतु रोग स्थापित झाल्यावर ती पर्याय ठरत नाही.',
      'संक्रमित पिकाचा कचरा शेतात हिवाळाभर ठेवण्याऐवजी नष्ट करा किंवा शेतापासून दूर कंपोस्ट करा.',
    ],
    culturalControl: [
      'Plant resistant or tolerant cotton varieties — this is the single most effective and economical control measure.',
      'Use certified, acid-delinted, disease-free seed every season.',
      'Practice deep ploughing after harvest to bury and break down infected residue.',
      'Rotate with a non-host crop for 2-3 years in fields with a history of blight.',
      'Avoid working in or irrigating fields when foliage is wet, since this spreads bacteria between plants.',
      'Sanitize tools and equipment between fields.',
    ],
    culturalControlMarathi: [
      'प्रतिरोधक किंवा सहनशील कापूस जाती लावा — हा सर्वात प्रभावी व किफायतशीर उपाय आहे.',
      'दरवर्षी प्रमाणित, आम्ल-प्रक्रिया केलेले, रोगमुक्त बियाणे वापरा.',
      'काढणीनंतर खोल नांगरणी करून संक्रमित कचरा जमिनीत गाडा.',
      'झुळकीचा इतिहास असलेल्या शेतात २-३ वर्षे यजमान नसलेल्या पिकासह फेरपालट करा.',
      'पाने ओली असताना शेतात काम करणे किंवा सिंचन करणे टाळा, यामुळे जीवाणू पसरतात.',
      'शेतांदरम्यान अवजारे स्वच्छ करा.',
    ],
    advisory:
      'Use disease-free seed, deep ploughing, avoid overhead irrigation, spray streptomycin sulfate.',
    advisoryMarathi:
      'रोगमुक्त बी वापरा, खोल नांगरणी करा, वरून पाणी देणे टाळा, स्ट्रेप्टोमायसिन सल्फेट फवारा करा.',
    severity: 'high',
  },
  {
    id: 'curl_virus',
    name: 'Leaf Curl Virus',
    nameMarathi: 'पान कुरळे विषाणू',
    cropId: 'cotton',
    scientificName: 'Cotton Leaf Curl Virus (Begomovirus complex)',
    diseaseType: 'viral',
    symptoms:
      'Leaves curl upward or downward and veins thicken and darken (vein swelling). Leaf-like outgrowths called enations often form on the underside of leaves. Petioles, branches, and the main stem may twist. Severely infected plants become stunted and bushy, with poor boll formation and reduced fiber quality.',
    symptomsMarathi:
      'पाने वरच्या किंवा खालच्या दिशेने कुरळी होतात व शिरा जाड आणि गडद होतात. पानांच्या खालच्या बाजूला पानसदृश वाढ (enations) तयार होते. देठकाठी, फांद्या व मुख्य खोड मुरडू शकते. गंभीर संक्रमणात झाड बुटके व झुडूपासारखे होते, कोश तयार होण्याचे प्रमाण घटते आणि धाग्याचा दर्जा खालावतो.',
    cause:
      'Caused by a Begomovirus complex (Cotton Leaf Curl Virus and related strains), transmitted exclusively by the whitefly Bemisia tabaci. It is not seed-transmitted.',
    causeMarathi:
      'Begomovirus समूहामुळे (कॉटन लीफ कर्ल व्हायरस व संबंधित प्रकार) हा रोग होतो, जो केवळ पांढरी माशी (Bemisia tabaci) द्वारे पसरतो. हा रोग बियाण्याद्वारे पसरत नाही.',
    spreadAndConditions:
      'Spreads entirely through whitefly feeding — the insect must feed on an infected plant for a period before it can transmit the virus to a healthy one, and whitefly populations build up quickly in warm, dry weather. No cotton variety is fully immune, though some show moderate tolerance. Weeds and other host plants around the field can carry whiteflies and virus between cotton seasons.',
    spreadAndConditionsMarathi:
      'हा रोग केवळ पांढऱ्या माशीच्या खाण्याद्वारे पसरतो — किडा निरोगी झाडावर विषाणू पसरवण्याआधी संक्रमित झाडावर काही काळ खावे लागते, आणि उष्ण, कोरड्या हवामानात पांढऱ्या माशीची संख्या झपाट्याने वाढते. कोणतीही कापूस जात पूर्णपणे प्रतिरोधक नाही, जरी काही जाती मध्यम सहनशीलता दाखवतात. शेताभोवतीचे तण व इतर यजमान वनस्पती हंगामांदरम्यान पांढरी माशी व विषाणू टिकवून ठेवू शकतात.',
    damageImpact:
      'Impact ranges from mild stunting and reduced boll set in light infections to major regional yield losses during whitefly epidemic years — cotton-growing regions of India and Pakistan have experienced severe historical outbreaks tied to this disease.',
    damageImpactMarathi:
      'सौम्य संक्रमणात झाडाची वाढ खुंटणे व कोश कमी होणे इतकेच परिणाम होतो, तर पांढरी माशीच्या उद्रेकाच्या वर्षांत मोठ्या प्रादेशिक उत्पन्न घटीचा धोका असतो — भारत व पाकिस्तानच्या कापूस पट्ट्यात या रोगामुळे मोठे ऐतिहासिक उद्रेक झाले आहेत.',
    chemicalControl: [
      'Apply a systemic insecticide such as imidacloprid, either as a seed treatment or an early foliar spray, to suppress the whitefly vector population.',
      'Rotate between different insecticide classes across the season to slow the buildup of whitefly resistance.',
    ],
    chemicalControlMarathi: [
      'पांढऱ्या माशीची संख्या कमी करण्यासाठी इमिडाक्लोप्रिडसारखे सिस्टेमिक कीटकनाशक बीजप्रक्रिया म्हणून किंवा सुरुवातीच्या फवारणीत वापरा.',
      'पांढऱ्या माशीत प्रतिकारशक्ती वाढू नये म्हणून हंगामात वेगवेगळ्या प्रकारच्या कीटकनाशकांचा वापर आलटून-पालटून करा.',
    ],
    organicControl: [
      'Set up yellow sticky traps to monitor and reduce whitefly numbers.',
      'Spray neem-oil based formulations, which disrupt whitefly feeding and breeding.',
      'Encourage natural predators of whitefly such as ladybird beetles and lacewings by avoiding broad-spectrum insecticide overuse.',
      'Reflective or silver-colored mulch can help repel whiteflies from the crop canopy.',
    ],
    organicControlMarathi: [
      'पांढऱ्या माशीचे निरीक्षण व नियंत्रणासाठी पिवळे चिकट सापळे लावा.',
      'निम तेल आधारित फवारणी करा, जी पांढऱ्या माशीच्या खाण्या-प्रजननात अडथळा आणते.',
      'व्यापक-श्रेणी कीटकनाशकांचा अतिवापर टाळून लेडीबर्ड बीटल व लेसविंगसारख्या नैसर्गिक शत्रू किड्यांना प्रोत्साहन द्या.',
      'परावर्तक किंवा चंदेरी रंगाचे आच्छादन (मल्च) पांढऱ्या माशीला पिकापासून दूर ठेवण्यास मदत करते.',
    ],
    culturalControl: [
      'Choose moderately tolerant varieties where available, since fully resistant varieties are not yet common.',
      'Rogue out (remove and destroy) infected plants as soon as symptoms appear to reduce the source of virus in the field.',
      'Control weeds around field borders that can host whitefly between seasons.',
      'Avoid planting new cotton next to older, already-infected cotton or vegetable crops that host whitefly.',
      'Sow at the recommended time for your region to avoid the season\'s peak whitefly activity.',
    ],
    culturalControlMarathi: [
      'पूर्णपणे प्रतिरोधक जाती अजून सामान्य नसल्याने उपलब्ध असल्यास मध्यम सहनशील जाती निवडा.',
      'लक्षणे दिसताच संक्रमित रोपे उपटून नष्ट करा, जेणेकरून शेतातील विषाणूचा स्रोत कमी होईल.',
      'शेताच्या कडेला असलेले तण नियंत्रित करा, जे हंगामांदरम्यान पांढरी माशी टिकवून ठेवतात.',
      'नवीन कापूस जुन्या संक्रमित कापूस किंवा पांढरी माशी यजमान असलेल्या भाजीपाला पिकांशेजारी लावणे टाळा.',
      'हंगामातील पांढऱ्या माशीच्या सर्वाधिक प्रादुर्भावाचा काळ टाळण्यासाठी आपल्या भागासाठी शिफारस केलेल्या वेळी पेरणी करा.',
    ],
    advisory:
      'Control whitefly vectors with yellow sticky traps and neem-based sprays, remove infected plants, use virus-resistant seed varieties.',
    advisoryMarathi:
      'पिवळे चिकट सापळे व निम आधारित फवारणीने पांढरी माशी नियंत्रित करा, संक्रमित रोपे काढा, विषाणू-प्रतिरोधक बी वापरा.',
    severity: 'high',
  },
  {
    id: 'fussarium_wilt',
    name: 'Fusarium Wilt',
    nameMarathi: 'फ्युजेरियम मर रोग',
    cropId: 'cotton',
    scientificName: 'Fusarium oxysporum f. sp. vasinfectum',
    diseaseType: 'fungal',
    symptoms:
      'General wilting that is most visible on warm days, along with yellowing and necrosis starting at the margins of lower leaves. Cutting into the stem or taproot shows continuous brown discoloration of the vascular tissue (unlike the speckled pattern seen with Verticillium wilt). Young seedlings can collapse entirely, resembling damping-off, while surviving older plants show stunting and reduced vigor.',
    symptomsMarathi:
      'उष्ण दिवशी स्पष्ट दिसणारे सर्वसाधारण मुरडणे, खालच्या पानांच्या कडांपासून सुरू होणारा पिवळेपणा व सुकणे. देठ किंवा सोटमुळाचा छेद घेतल्यास आतील भागात सलग तपकिरी रंगबदल दिसतो (व्हर्टिसिलियम मर रोगातील ठिपकेदार पॅटर्नपेक्षा वेगळा). लहान रोपे पूर्णपणे कोसळू शकतात (डँपिंग-ऑफसारखी दिसतात), तर तग धरलेली मोठी झाडे खुंटलेली व कमजोर दिसतात.',
    cause:
      'Caused by the soil-borne fungus Fusarium oxysporum f. sp. vasinfectum. Several races of this fungus exist worldwide, and it often acts together with root-knot nematodes, which wound roots and make infection easier and more severe.',
    causeMarathi:
      'जमिनीत राहणाऱ्या Fusarium oxysporum f. sp. vasinfectum या बुरशीमुळे हा रोग होतो. जगभरात या बुरशीचे अनेक प्रकार (races) आढळतात, आणि ती अनेकदा मूळगाठ सूत्रकृमींसोबत (root-knot nematodes) एकत्र काम करते, जे मुळांना जखमा करून संसर्ग सोपा व अधिक तीव्र बनवतात.',
    spreadAndConditions:
      'The fungus survives in soil for years as long-lived resting spores (chlamydospores), making it very persistent once established in a field. It spreads through infected seed, contaminated soil, farm equipment, and irrigation water. Disease severity is strongly worsened where root-knot nematodes are also present in the soil.',
    spreadAndConditionsMarathi:
      'ही बुरशी दीर्घायुषी विश्रांती बीजाणूंच्या (chlamydospores) स्वरूपात जमिनीत अनेक वर्षे टिकून राहते, त्यामुळे एकदा शेतात स्थापित झाल्यावर ती काढणे कठीण होते. संक्रमित बियाणे, दूषित माती, शेती अवजारे व सिंचनाच्या पाण्याद्वारे ती पसरते. जमिनीत मूळगाठ सूत्रकृमी असल्यास रोगाची तीव्रता मोठ्या प्रमाणात वाढते.',
    damageImpact:
      'In heavily infested fields with an aggressive fungal race, plant mortality of 45-65% has been recorded. Even the milder races reduce plant vigor and yield noticeably, especially when nematodes are also present. Once established, the fungus cannot realistically be eliminated from a field.',
    damageImpactMarathi:
      'तीव्र बुरशी प्रकार असलेल्या जास्त प्रादुर्भावाच्या शेतात ४५-६५% झाडांचा मृत्यू नोंदवला गेला आहे. सौम्य प्रकारही झाडाची जोम व उत्पन्न लक्षणीयरीत्या कमी करतात, विशेषतः सूत्रकृमी सोबत असल्यास. एकदा स्थापित झाल्यावर ही बुरशी शेतातून पूर्णपणे नष्ट करणे व्यवहार्य नसते.',
    chemicalControl: [
      'Fungicide seed treatment can reduce infection at the seed and seedling stage, though it has little effect once the fungus is established in field soil.',
      'Where root-knot nematodes are compounding the problem, a nematicide may help — confirm the right product and rate with your local agricultural extension office.',
    ],
    chemicalControlMarathi: [
      'बुरशीनाशक बीजप्रक्रिया बी व रोपावस्थेतील संसर्ग कमी करू शकते, परंतु बुरशी शेतातील मातीत स्थापित झाल्यावर त्याचा फारसा उपयोग होत नाही.',
      'मूळगाठ सूत्रकृमींमुळे समस्या वाढत असल्यास नेमॅटिसाइड उपयोगी ठरू शकते — योग्य उत्पादन व मात्रेसाठी स्थानिक कृषी विस्तार कार्यालयाशी संपर्क साधा.',
    ],
    organicControl: [
      'Treat seed or soil with Trichoderma-based bio-fungicides, which compete with and suppress the Fusarium fungus.',
      'Add organic matter or well-rotted compost to build up beneficial soil microbes that compete with the pathogen.',
      'Soil solarization (covering moist soil with clear plastic in hot weather) can reduce fungal load where practical.',
    ],
    organicControlMarathi: [
      'ट्रायकोडर्मा-आधारित जैव-बुरशीनाशकाने बी किंवा माती प्रक्रिया करा, जी फ्युजेरियम बुरशीशी स्पर्धा करून तिला दाबते.',
      'रोगकारकाशी स्पर्धा करणारे लाभदायक मातीतील सूक्ष्मजीव वाढवण्यासाठी सेंद्रिय पदार्थ किंवा चांगले कुजलेले कंपोस्ट टाका.',
      'शक्य असल्यास उष्ण हवामानात ओल्या मातीवर पारदर्शक प्लास्टिक टाकून सौरऊर्जा-निर्जंतुकीकरण (सोलरायझेशन) करा, यामुळे बुरशीचे प्रमाण कमी होते.',
    ],
    culturalControl: [
      'Plant resistant or tolerant varieties — this remains the most cost-effective long-term control.',
      'Rotate with a non-host crop such as cereals for several years in fields with a history of wilt.',
      'Avoid moving contaminated soil, equipment, or gin trash from infested fields to clean ones.',
      'Do not spread manure from livestock fed infested cottonseed or gin trash onto clean fields.',
      'Remove and destroy crop residue after harvest rather than leaving it in the field.',
      'Avoid waterlogging, which stresses roots and makes infection more likely.',
    ],
    culturalControlMarathi: [
      'प्रतिरोधक किंवा सहनशील जाती लावा — हा दीर्घकालीन सर्वात किफायतशीर उपाय आहे.',
      'मर रोगाचा इतिहास असलेल्या शेतात अनेक वर्षे तृणधान्यासारख्या यजमान नसलेल्या पिकासह फेरपालट करा.',
      'प्रादुर्भावग्रस्त शेतातील दूषित माती, अवजारे किंवा जिन कचरा स्वच्छ शेतात नेणे टाळा.',
      'प्रादुर्भावग्रस्त सरकी किंवा जिन कचरा खाल्लेल्या जनावरांचे खत स्वच्छ शेतात टाकू नका.',
      'काढणीनंतर पिकाचा कचरा शेतात न ठेवता काढून नष्ट करा.',
      'पाणी साचणे टाळा, कारण त्यामुळे मुळांवर ताण येऊन संसर्गाची शक्यता वाढते.',
    ],
    advisory:
      'Use resistant varieties, practice crop rotation with non-host crops, treat seed with Trichoderma, avoid waterlogging.',
    advisoryMarathi:
      'प्रतिरोधक जाती वापरा, यजमान नसलेल्या पिकांसह फेरपालट करा, बी ट्रायकोडर्माने प्रक्रिया करा, पाणी साचणे टाळा.',
    severity: 'high',
  },
  {
    id: 'frogeye_leaf_spot',
    name: 'Frogeye Leaf Spot',
    nameMarathi: 'फ्रॉगआय पर्णडाग',
    cropId: 'soybean',
    scientificName: 'Cercospora sojina',
    diseaseType: 'fungal',
    symptoms:
      'Small dark, water-soaked spots appear on leaves, enlarging into circular to angular lesions with gray to light-brown centers and a reddish-brown to purple border, giving a "frog eye" look. Centers may later fall out, leaving a shot-hole appearance. Lesions can also affect stems, pods, and seeds.',
    symptomsMarathi:
      'पानांवर गडद, पाणी भरलेले लहान डाग दिसतात, जे मोठे होऊन करड्या ते फिकट तपकिरी केंद्र व लालसर-तपकिरी ते जांभळ्या कडा असलेले गोल-कोनीय डाग बनतात, "बेडकाच्या डोळ्या"सारखे दिसतात. जुने झाल्यावर केंद्र गळून छिद्र पडते. देठ, शेंगा व बियांवरही डाग येऊ शकतात.',
    cause:
      'Caused by the fungus Cercospora sojina. It survives in infected seed and crop residue between seasons.',
    causeMarathi:
      'Cercospora sojina या बुरशीमुळे हा रोग होतो. ही बुरशी संक्रमित बी व पिकाच्या उरलेल्या कचऱ्यावर हंगामांदरम्यान टिकून राहते.',
    spreadAndConditions:
      'Spread by wind and splashing rain from field to field. Warm temperatures (around 25-30°C) combined with humid, wet weather strongly favor infection, which most often shows up after flowering.',
    spreadAndConditionsMarathi:
      'वारा व पावसाच्या शिंतोड्यांमुळे एका शेतातून दुसऱ्या शेतात पसरतो. उष्ण तापमान (साधारण २५-३०°से) व दमट, ओले हवामान संसर्गास अनुकूल असते, जे फुलोरा आल्यानंतर सर्वाधिक दिसते.',
    damageImpact:
      'Can cause more than 30% yield loss in susceptible varieties under favorable conditions, mainly through reduced leaf area for photosynthesis and premature defoliation.',
    damageImpactMarathi:
      'संवेदनशील जातींमध्ये अनुकूल परिस्थितीत ३०% पेक्षा जास्त उत्पन्न घट होऊ शकते, प्रामुख्याने पानांचे प्रकाशसंश्लेषण क्षेत्र कमी होणे व वेळेआधी पानगळ यामुळे.',
    chemicalControl: [
      'Foliar fungicide sprays (e.g. QoI/strobilurin-based) can help when susceptible varieties are grown under disease pressure — note that fungicide resistance has been reported in some regions, so rotate fungicide classes.',
      'Fungicide seed treatment can reduce early seed-borne infection.',
    ],
    chemicalControlMarathi: [
      'संवेदनशील जाती व रोगाचा दाब असल्यास पानांवरील बुरशीनाशक फवारणी (उदा. QoI/स्ट्रोबिल्युरिन आधारित) उपयोगी ठरते — काही भागांत बुरशीनाशक प्रतिकारशक्ती आढळल्याने बुरशीनाशकांचे प्रकार आलटून-पालटून वापरा.',
      'बीजप्रक्रिया बुरशीनाशकाने बीजजन्य प्रारंभिक संसर्ग कमी होतो.',
    ],
    organicControl: [
      'Bury or destroy infected residue after harvest to reduce carryover inoculum.',
    ],
    organicControlMarathi: [
      'पुढील हंगामातील संसर्ग स्रोत कमी करण्यासाठी काढणीनंतर संक्रमित कचरा गाडा किंवा नष्ट करा.',
    ],
    culturalControl: [
      'Plant resistant varieties where available — this is the most effective long-term control.',
      'Use pathogen-free certified seed.',
      'Rotate with a non-host crop such as corn or small grains for at least one season.',
    ],
    culturalControlMarathi: [
      'उपलब्ध असल्यास प्रतिरोधक जाती लावा — हा सर्वात प्रभावी दीर्घकालीन उपाय आहे.',
      'रोगमुक्त प्रमाणित बी वापरा.',
      'किमान एक हंगाम मका किंवा तृणधान्यासारख्या यजमान नसलेल्या पिकासह फेरपालट करा.',
    ],
    advisory:
      'Plant resistant varieties, use disease-free seed, rotate crops, apply fungicide under high disease pressure.',
    advisoryMarathi:
      'प्रतिरोधक जाती लावा, रोगमुक्त बी वापरा, फेरपालट करा, रोगाचा दाब जास्त असल्यास बुरशीनाशक फवारा.',
    severity: 'medium',
  },
  {
    id: 'soybean_mosaic',
    name: 'Soybean Mosaic Virus',
    nameMarathi: 'सोयाबीन मोझेक व्हायरस',
    cropId: 'soybean',
    scientificName: 'Soybean mosaic virus (SMV)',
    diseaseType: 'viral',
    symptoms:
      'Leaves show mottled light and dark green patterns (mosaic), mottling, crinkling, and puckering, with leaves sometimes appearing stunted or curled downward. Pods can be reduced in number, and infected seed may show mottled seed coats.',
    symptomsMarathi:
      'पानांवर गडद व फिक्ट हिरव्या रंगाचे मिश्रित नमुने (मोझेक), ठिपकेदार डाग, चुरगळणे व सुरकुत्या दिसतात, कधी पाने खुंटलेली किंवा खालच्या दिशेने वळलेली दिसतात. शेंगांची संख्या घटू शकते व संक्रमित बियांच्या सालीवर ठिपके दिसतात.',
    cause:
      'Caused by Soybean mosaic virus (SMV), transmitted by aphids and through infected seed.',
    causeMarathi:
      'Soybean mosaic virus (SMV) मुळे हा रोग होतो, जो मावा कीटक व संक्रमित बियाण्याद्वारे पसरतो.',
    spreadAndConditions:
      'Aphids pick up the virus from infected plants and spread it while feeding on healthy ones; infected seed also carries the virus into new plantings. Spread is faster where aphid populations are high.',
    spreadAndConditionsMarathi:
      'मावा कीटक संक्रमित झाडांपासून विषाणू घेऊन निरोगी झाडांवर खाताना पसरवतात; संक्रमित बियाणेही नवीन पेरणीत विषाणू आणते. मावा कीटकांची संख्या जास्त असल्यास प्रसार वेगवान होतो.',
    damageImpact:
      'Reduces yield through fewer, smaller seeds and can lower seed quality; impact is generally greater when plants are infected early in the season.',
    damageImpactMarathi:
      'कमी व लहान बियांमुळे उत्पन्न घटते व बियाण्याचा दर्जाही खालावतो; हंगामाच्या सुरुवातीलाच संसर्ग झाल्यास परिणाम अधिक तीव्र असतो.',
    chemicalControl: [
      'Insecticide sprays targeting aphids can reduce further spread, though they will not cure already-infected plants.',
    ],
    chemicalControlMarathi: [
      'मावा कीटकांवर कीटकनाशक फवारणी पुढील प्रसार कमी करू शकते, परंतु आधीच संक्रमित झाडे बरी होत नाहीत.',
    ],
    organicControl: [
      'Encourage natural aphid predators such as ladybird beetles by avoiding unnecessary broad-spectrum spraying.',
    ],
    organicControlMarathi: [
      'अनावश्यक व्यापक-श्रेणी फवारणी टाळून लेडीबर्ड बीटलसारख्या नैसर्गिक मावा-भक्षकांना प्रोत्साहन द्या.',
    ],
    culturalControl: [
      'Use certified virus-free seed every season.',
      'Remove and destroy infected plants found early in the season to reduce the source of spread.',
      'Plant resistant varieties where available.',
    ],
    culturalControlMarathi: [
      'दरहंगामी प्रमाणित विषाणूमुक्त बी वापरा.',
      'हंगामाच्या सुरुवातीला आढळलेली संक्रमित रोपे काढून नष्ट करा, ज्यामुळे प्रसाराचा स्रोत कमी होईल.',
      'उपलब्ध असल्यास प्रतिरोधक जाती लावा.',
    ],
    advisory:
      'Control aphid vectors, remove infected plants, use virus-free seed.',
    advisoryMarathi:
      'मावा कीटक नियंत्रित करा, संक्रमित रोप काढा, व्हायरसमुक्त बी वापरा.',
    severity: 'medium',
  },
  {
    id: 'septoria_brown_spot',
    name: 'Septoria Brown Spot',
    nameMarathi: 'सेप्टोरिया तपकिरी डाग',
    cropId: 'soybean',
    scientificName: 'Septoria glycines',
    diseaseType: 'fungal',
    symptoms:
      'Small, irregular, dark brown spots appear on both surfaces of the lower leaves first. Spots merge into larger blotches, especially along leaf edges and veins, and affected leaves often turn yellow and drop early.',
    symptomsMarathi:
      'खालच्या पानांवर दोन्ही बाजूंनी लहान, अनियमित, गडद तपकिरी डाग प्रथम दिसतात. डाग एकत्र येऊन मोठे ठिपके बनतात, विशेषतः पानांच्या कडा व शिरांजवळ, आणि संक्रमित पाने अनेकदा पिवळी पडून लवकर गळतात.',
    cause:
      'Caused by the fungus Septoria glycines, which survives on infected crop residue.',
    causeMarathi:
      'Septoria glycines या बुरशीमुळे हा रोग होतो, जी संक्रमित पिकाच्या कचऱ्यावर टिकून राहते.',
    spreadAndConditions:
      'Spreads via rain splash from residue to lower leaves, then progressively up the plant. Warm, wet, humid conditions favor its development, and it often becomes more visible later in the season.',
    spreadAndConditionsMarathi:
      'पावसाच्या शिंतोड्यांद्वारे कचऱ्यापासून खालच्या पानांवर व नंतर हळूहळू वरच्या दिशेने पसरतो. उष्ण, ओले, दमट हवामान त्याच्या वाढीस अनुकूल असते, आणि हंगामाच्या उत्तरार्धात अधिक स्पष्ट दिसतो.',
    damageImpact:
      'Usually a minor to moderate yield concern on its own, but premature defoliation from severe infection reduces the photosynthetic leaf area available during pod fill.',
    damageImpactMarathi:
      'साधारणतः स्वतंत्रपणे सौम्य ते मध्यम उत्पन्न परिणाम असतो, परंतु तीव्र संसर्गामुळे होणारी वेळेआधी पानगळ शेंगा भरण्याच्या काळात उपलब्ध प्रकाशसंश्लेषण क्षेत्र कमी करते.',
    chemicalControl: [
      'Foliar fungicide application can help when the disease is severe and conditions remain favorable, though it is often not economically necessary for mild cases.',
    ],
    chemicalControlMarathi: [
      'रोग तीव्र असल्यास व अनुकूल हवामान कायम राहिल्यास पानांवरील बुरशीनाशक फवारणी उपयोगी ठरते, जरी सौम्य प्रकरणांत ती आर्थिकदृष्ट्या आवश्यक नसते.',
    ],
    organicControl: [
      'Bury or remove infected crop residue after harvest to reduce the following season\'s inoculum.',
    ],
    organicControlMarathi: [
      'पुढील हंगामातील संसर्गाचे प्रमाण कमी करण्यासाठी काढणीनंतर संक्रमित कचरा गाडा किंवा काढून टाका.',
    ],
    culturalControl: [
      'Rotate with a non-host crop to reduce residue-borne inoculum.',
      'Improve field air circulation and avoid excessively dense planting.',
    ],
    culturalControlMarathi: [
      'कचऱ्यातील संसर्ग स्रोत कमी करण्यासाठी यजमान नसलेल्या पिकासह फेरपालट करा.',
      'शेतातील हवा खेळती राहील याची खात्री करा व अति दाट पेरणी टाळा.',
    ],
    advisory:
      'Improve drainage, remove infected debris, apply copper oxychloride 3g/L at 10-day intervals.',
    advisoryMarathi:
      'पाणी निचरा सुधारा, संक्रमित कचरा काढा, कॉपर ऑक्सीक्लोराईड ३ ग्रॅम/लिटर १० दिवसांच्या अंतराने फवारा करा.',
    severity: 'medium',
  },
  {
    id: 'red_rot',
    name: 'Red Rot',
    nameMarathi: 'लाल गाठीदार रोग',
    cropId: 'sugarcane',
    scientificName: 'Colletotrichum falcatum',
    diseaseType: 'fungal',
    symptoms:
      'Internal reddening of the stalk tissue with white patches (cross-cut cane shows red tissue interrupted by white bands), a sour odor from the rotting cane, and wilting or drying of leaves.',
    symptomsMarathi:
      'देठाच्या आतील भागाला लाल रंग व पांढरे ठिपके येतात (देठ आडवा कापल्यास लाल ऊतीत पांढऱ्या पट्ट्या दिसतात), कुजणाऱ्या उसातून आंबट वास येतो, व पाने मुरडून सुकतात.',
    cause:
      'Caused by the fungus Colletotrichum falcatum. As sugarcane is vegetatively propagated, the fungus is readily carried over and spread through infected seed cane (stalk cuttings used for planting).',
    causeMarathi:
      'Colletotrichum falcatum या बुरशीमुळे हा रोग होतो. ऊस वनस्पतीजन्य पद्धतीने लावला जात असल्याने ही बुरशी संक्रमित बेणे (लागवडीसाठी वापरलेले देठाचे तुकडे) द्वारे सहज पुढे नेली जाते व पसरते.',
    spreadAndConditions:
      'Spreads mainly through planting infected seed cane, and can also enter through wounds from insects, harvesting cuts, or waterlogged soil. Warm, humid conditions with poor drainage favor disease development.',
    spreadAndConditionsMarathi:
      'प्रामुख्याने संक्रमित बेणे लावल्याने पसरतो, तसेच किडींच्या जखमा, काढणीच्या कापांमधून किंवा पाणी साचलेल्या जमिनीतूनही प्रवेश करू शकतो. उष्ण, दमट हवामान व खराब निचरा रोगवाढीस अनुकूल असतो.',
    damageImpact:
      'One of the most destructive sugarcane diseases — it directly reduces cane weight and sugar (sucrose) content, and heavily infected stools may die entirely, significantly cutting ratoon yields.',
    damageImpactMarathi:
      'ऊसातील सर्वात विनाशकारी रोगांपैकी एक — यामुळे उसाचे वजन व साखर (सुक्रोज) प्रमाण थेट घटते, आणि तीव्र संसर्गग्रस्त बेटे पूर्णपणे मरू शकतात, ज्यामुळे खोडवा उत्पन्न लक्षणीयरीत्या घटते.',
    chemicalControl: [
      'Treat seed cane by hot-water or fungicide dip before planting to reduce carryover infection.',
    ],
    chemicalControlMarathi: [
      'लागवडीपूर्वी बेणे गरम पाण्यात किंवा बुरशीनाशक द्रावणात बुडवून प्रक्रिया करा, ज्यामुळे पुढे जाणारा संसर्ग कमी होईल.',
    ],
    organicControl: [
      'Select healthy, disease-free seed cane from a certified or visually inspected source.',
    ],
    organicControlMarathi: [
      'प्रमाणित किंवा दृश्य तपासणी केलेल्या स्रोतातून निरोगी, रोगमुक्त बेणे निवडा.',
    ],
    culturalControl: [
      'Plant resistant varieties — this is the most effective control.',
      'Improve field drainage to avoid waterlogging.',
      'Rogue out and destroy infected stools promptly.',
      'Avoid ratooning (regrowing from old stubble) in fields with a history of red rot; replant fresh instead.',
    ],
    culturalControlMarathi: [
      'प्रतिरोधी जाती लावा — हा सर्वात प्रभावी उपाय आहे.',
      'पाणी साचणे टाळण्यासाठी शेतातील निचरा सुधारा.',
      'संक्रमित बेटे लवकर काढून नष्ट करा.',
      'लाल गाठीदार रोगाचा इतिहास असलेल्या शेतात खोडवा घेणे टाळा; त्याऐवजी नवीन लागवड करा.',
    ],
    advisory:
      'Plant resistant varieties, improve drainage, rogue infected stools, avoid ratooning.',
    advisoryMarathi:
      'प्रतिरोधी जाती लावा, निचरा सुधारा, संक्रमित देठ काढा, रॅटूनिंग टाळा.',
    severity: 'high',
  },
  {
    id: 'borer',
    name: 'Stem Borer',
    nameMarathi: 'देठ बोरर',
    cropId: 'sugarcane',
    symptoms:
      'Dead-heart symptom in young shoots, bore holes in stems, frass at entry points.',
    symptomsMarathi:
      'तरुण शेंडांची मुळे मरणे, देठात बोगदे, छिद्रावर फेक.',
    advisory:
      'Release Trichogramma egg parasitoids, remove dead-hearts, apply carbofuran in soil.',
    advisoryMarathi:
      'ट्रायकोग्रामा सोडा, मृत शेंडे काढा, जमिनीत कार्बोफ्युरान द्या.',
    severity: 'medium',
  },
  {
    id: 'sugarcane_mosaic',
    name: 'Sugarcane Mosaic',
    nameMarathi: 'ऊस मोझेक',
    cropId: 'sugarcane',
    scientificName: 'Sugarcane mosaic virus (SCMV)',
    diseaseType: 'viral',
    symptoms:
      'Irregular patches of light green to yellow mixed with normal green on the leaf blade (mosaic pattern), most visible on younger leaves near the base. Narrow chlorotic streaks may run parallel to the veins, and in severe cases stalks show reddening and plants become stunted with poor tillering.',
    symptomsMarathi:
      'पानाच्या पात्यावर फिकट हिरव्या ते पिवळ्या व सामान्य हिरव्या रंगाचे अनियमित मिश्रण (मोझेक नमुना) दिसते, जे तळाजवळील तरुण पानांवर सर्वाधिक स्पष्ट असते. शिरांना समांतर बारीक फिकट पट्टे दिसू शकतात, आणि तीव्र संसर्गात देठ लालसर होऊन झाडांची वाढ खुंटते व फुटवे कमी येतात.',
    cause:
      'Caused by Sugarcane mosaic virus (SCMV), part of a group of related mosaic viruses that also includes Sorghum mosaic virus — spread by aphids and through infected seed cane. It also infects sorghum.',
    causeMarathi:
      'Sugarcane mosaic virus (SCMV) मुळे हा रोग होतो, जो संबंधित मोझेक विषाणूंच्या समूहाचा भाग आहे (यात Sorghum mosaic virus देखील समाविष्ट आहे) — मावा कीटक व संक्रमित बेण्याद्वारे पसरतो. हा सोरगम (ज्वारी) पिकालाही संक्रमित करतो.',
    spreadAndConditions:
      'Spread mainly by aphids feeding on infected plants and moving to healthy ones, and carried forward whenever infected stalks are used as seed cane for new planting.',
    spreadAndConditionsMarathi:
      'मुख्यतः मावा कीटक संक्रमित झाडांवर खाऊन निरोगी झाडांकडे जाताना पसरवतात, आणि संक्रमित देठ नवीन लागवडीसाठी बेणे म्हणून वापरल्यास पुढे नेला जातो.',
    damageImpact:
      'Historically a major disease in some regions before resistant varieties became widely available; reduces photosynthesis and cane vigor, lowering yield in susceptible varieties.',
    damageImpactMarathi:
      'प्रतिरोधक जाती व्यापकपणे उपलब्ध होण्यापूर्वी काही भागांत हा एक मोठा रोग होता; प्रकाशसंश्लेषण व उसाची जोम कमी करतो, संवेदनशील जातींमध्ये उत्पन्न घटवतो.',
    chemicalControl: [
      'Insecticide control of aphid vectors can reduce spread, though it will not cure already-infected plants.',
    ],
    chemicalControlMarathi: [
      'मावा कीटकांवर कीटकनाशक नियंत्रण प्रसार कमी करू शकते, परंतु आधीच संक्रमित झाडे बरी होत नाहीत.',
    ],
    organicControl: [
      'Source seed cane through tissue culture or from certified disease-free nurseries where possible, which keeps incidence low even in otherwise susceptible varieties.',
    ],
    organicControlMarathi: [
      'शक्य असल्यास ऊती संवर्धन (टिश्यू कल्चर) किंवा प्रमाणित रोगमुक्त रोपवाटिकेतून बेणे मिळवा, ज्यामुळे संवेदनशील जातींतही प्रादुर्भाव कमी राहतो.',
    ],
    culturalControl: [
      'Plant resistant varieties — this is the primary and most effective control method.',
      'Use only healthy, disease-free seed cane for planting.',
    ],
    culturalControlMarathi: [
      'प्रतिरोधक जाती लावा — हा प्राथमिक व सर्वात प्रभावी उपाय आहे.',
      'लागवडीसाठी फक्त निरोगी, रोगमुक्त बेणे वापरा.',
    ],
    advisory:
      'Plant resistant varieties, use certified disease-free seed cane, control aphid vectors.',
    advisoryMarathi:
      'प्रतिरोधक जाती लावा, प्रमाणित रोगमुक्त बेणे वापरा, मावा कीटक नियंत्रित करा.',
    severity: 'medium',
  },
  {
    id: 'sugarcane_rust',
    name: 'Sugarcane Rust',
    nameMarathi: 'ऊस तांबेरा',
    cropId: 'sugarcane',
    scientificName: 'Puccinia melanocephala (brown rust) / Puccinia kuehnii (orange rust)',
    diseaseType: 'fungal',
    symptoms:
      'Small chlorotic flecks appear first, elongating and turning reddish-brown to orange. Pustules develop on the lower leaf surface and rupture, releasing a reddish-brown or orange spore mass. Heavily infected leaves on susceptible varieties dry out and die prematurely.',
    symptomsMarathi:
      'प्रथम लहान फिकट ठिपके दिसतात, जे लांबट होऊन लालसर-तपकिरी ते नारिंगी रंगाचे बनतात. पानाच्या खालच्या बाजूला फोड तयार होऊन फुटतात, लालसर-तपकिरी किंवा नारिंगी बीजाणूंचा गुच्छ बाहेर पडतो. संवेदनशील जातींवर तीव्र संसर्गग्रस्त पाने सुकून वेळेआधी मरतात.',
    cause:
      'Caused by rust fungi — Puccinia melanocephala (common/brown rust) or Puccinia kuehnii (orange rust). The fungus survives on living green leaf tissue between seasons.',
    causeMarathi:
      'तांबेरा बुरशीमुळे (Puccinia melanocephala - सामान्य/तपकिरी तांबेरा, किंवा Puccinia kuehnii - नारिंगी तांबेरा) हा रोग होतो. ही बुरशी हंगामांदरम्यान जिवंत हिरव्या पानांच्या ऊतीवर टिकून राहते.',
    spreadAndConditions:
      'Spores spread by wind to nearby fields. Orange rust favors wetter conditions and can persist further into summer, while brown rust tends to favor drier climates.',
    spreadAndConditionsMarathi:
      'बीजाणू वाऱ्याद्वारे जवळच्या शेतांमध्ये पसरतात. नारिंगी तांबेरा ओल्या हवामानास अनुकूल असून उन्हाळ्यातही टिकतो, तर तपकिरी तांबेरा साधारणतः कोरड्या हवामानास अनुकूल असतो.',
    damageImpact:
      'Orange rust outbreaks have caused yield losses of up to 38% in susceptible varieties; brown rust losses of up to 22% have been recorded.',
    damageImpactMarathi:
      'संवेदनशील जातींमध्ये नारिंगी तांबेऱ्याच्या उद्रेकांमुळे ३८% पर्यंत उत्पन्न घट नोंदवली गेली आहे; तपकिरी तांबेऱ्यामुळे २२% पर्यंत घट नोंदवली गेली आहे.',
    chemicalControl: [
      'Foliar fungicide application (e.g. triazole-based) can help protect highly susceptible varieties during a severe outbreak, though this is rarely economical for sugarcane at scale.',
    ],
    chemicalControlMarathi: [
      'तीव्र उद्रेकात अत्यंत संवेदनशील जातींचे संरक्षण करण्यासाठी पानांवरील बुरशीनाशक फवारणी (उदा. ट्रायझोल आधारित) उपयोगी ठरू शकते, जरी मोठ्या प्रमाणावर ऊसासाठी हे सहसा आर्थिकदृष्ट्या फायदेशीर नसते.',
    ],
    organicControl: [],
    organicControlMarathi: [],
    culturalControl: [
      'Plant resistant or tolerant varieties, which is the primary practical control for rust in sugarcane.',
    ],
    culturalControlMarathi: [
      'प्रतिरोधक किंवा सहनशील जाती लावा — ऊसातील तांबेऱ्यासाठी हाच मुख्य व्यावहारिक उपाय आहे.',
    ],
    advisory:
      'Plant resistant varieties, monitor during humid weather, use fungicide only for severe outbreaks on susceptible varieties.',
    advisoryMarathi:
      'प्रतिरोधक जाती लावा, दमट हवामानात लक्ष ठेवा, संवेदनशील जातींवर तीव्र उद्रेक असल्यासच बुरशीनाशक वापरा.',
    severity: 'medium',
  },
  {
    id: 'sugarcane_yellow_leaf',
    name: 'Yellow Leaf Disease',
    nameMarathi: 'पिवळी पान रोग',
    cropId: 'sugarcane',
    scientificName: 'Sugarcane yellow leaf virus (ScYLV)',
    diseaseType: 'viral',
    symptoms:
      'Yellowing starts at the midrib on the underside of older leaves and spreads outward into the leaf blade. Affected leaves eventually dry out and die starting from the tip. Some varieties also show reddish coloration of the midrib and shortened top internodes.',
    symptomsMarathi:
      'जुन्या पानांच्या खालच्या बाजूला मध्यशिरेपासून पिवळेपणा सुरू होऊन पानाच्या पात्यात पसरतो. संक्रमित पाने अखेरीस टोकापासून सुकून मरतात. काही जातींमध्ये मध्यशिरेचा लालसर रंग व वरच्या कांड्या आखूड होणेही दिसते.',
    cause:
      'Caused by Sugarcane yellow leaf virus (ScYLV), transmitted mainly by the aphid Melanaphis sacchari and through infected seed cane.',
    causeMarathi:
      'Sugarcane yellow leaf virus (ScYLV) मुळे हा रोग होतो, जो प्रामुख्याने Melanaphis sacchari या मावा कीटकाद्वारे व संक्रमित बेण्याद्वारे पसरतो.',
    spreadAndConditions:
      'Spreads through aphid feeding and via planting infected seed cane; symptom expression can be inconsistent and is often more visible under stress conditions such as drought or nutrient deficiency.',
    spreadAndConditionsMarathi:
      'मावा कीटकांच्या खाण्याद्वारे व संक्रमित बेणे लावल्याने पसरतो; लक्षणे नेहमी सारखी दिसत नाहीत आणि दुष्काळ किंवा पोषकतत्त्वांच्या कमतरतेसारख्या ताणाच्या परिस्थितीत अधिक स्पष्ट दिसतात.',
    damageImpact:
      'Can reduce cane yield and sucrose content, with impact varying by variety and how much environmental stress the crop is under.',
    damageImpactMarathi:
      'उसाचे उत्पन्न व साखर प्रमाण कमी करू शकतो, परिणाम जातीनुसार व पिकावरील पर्यावरणीय ताणानुसार बदलतो.',
    chemicalControl: [
      'Insecticide control of the aphid vector can help limit spread within a field.',
    ],
    chemicalControlMarathi: [
      'शेतातील प्रसार मर्यादित ठेवण्यासाठी मावा कीटकावर कीटकनाशक नियंत्रण उपयोगी ठरते.',
    ],
    organicControl: [
      'Use tissue-culture propagated or certified disease-free seed cane where available.',
    ],
    organicControlMarathi: [
      'शक्य असल्यास ऊती संवर्धित किंवा प्रमाणित रोगमुक्त बेणे वापरा.',
    ],
    culturalControl: [
      'Plant varieties with intermediate or better resistance where available.',
      'Avoid propagating new seed cane from visibly affected fields.',
    ],
    culturalControlMarathi: [
      'उपलब्ध असल्यास मध्यम किंवा त्यापेक्षा चांगली प्रतिरोधकता असलेल्या जाती लावा.',
      'दृश्यमान प्रादुर्भावग्रस्त शेतातून नवीन बेणे तयार करणे टाळा.',
    ],
    advisory:
      'Use certified disease-free seed cane, control aphid vectors, plant tolerant varieties.',
    advisoryMarathi:
      'प्रमाणित रोगमुक्त बेणे वापरा, मावा कीटक नियंत्रित करा, सहनशील जाती लावा.',
    severity: 'medium',
  },
  {
    id: 'sorghum_anthracnose',
    name: 'Anthracnose and Red Rot',
    nameMarathi: 'ॲन्थ्रॅक्नोज व लाल कूज',
    cropId: 'jowar',
    scientificName: 'Colletotrichum sublineola',
    diseaseType: 'fungal',
    symptoms:
      'On leaves: small red to tan, oval to elongated spots with a white to straw-colored center and a reddish, purple, or tan border, which can merge into larger blighted areas. On stalks: a sunken brown lesion at the peduncle, with brick-red discoloration visible when the stem is cut open (red rot). Severe infection can also affect the grain panicle.',
    symptomsMarathi:
      'पानांवर: लहान लाल ते तपकिरी, अंडाकृती ते लांबट डाग, ज्यांचे केंद्र पांढरे ते गवती रंगाचे व कडा लालसर, जांभळ्या किंवा तपकिरी असतात, जे मोठ्या करपलेल्या भागांत एकत्र येऊ शकतात. देठावर: कणसाच्या देठाजवळ खोलगट तपकिरी व्रण, देठ कापल्यास आतून विटकरी-लाल रंगबदल दिसतो (लाल कूज). तीव्र संसर्गात कणसावरही परिणाम होऊ शकतो.',
    cause:
      'Caused by the fungus Colletotrichum sublineola. It survives in infected crop residue and can also be seed-transmitted.',
    causeMarathi:
      'Colletotrichum sublineola या बुरशीमुळे हा रोग होतो. ही बुरशी संक्रमित पिकाच्या कचऱ्यावर टिकून राहते व बियाण्याद्वारेही पसरू शकते.',
    spreadAndConditions:
      'Favored by warm, wet conditions. Spreads via wind and rain splash from infected residue and lower leaves upward, and panicle infection often occurs when spores from leaf lesions are splashed onto the developing head by rain or irrigation.',
    spreadAndConditionsMarathi:
      'उष्ण, ओले हवामान या रोगास अनुकूल असते. संक्रमित कचरा व खालच्या पानांपासून वारा व पावसाच्या शिंतोड्यांद्वारे वरच्या दिशेने पसरतो, आणि पाऊस किंवा सिंचनाच्या पाण्याने पानांवरील बीजाणू विकसनशील कणसावर उडाल्याने कणीस संसर्ग अनेकदा होतो.',
    damageImpact:
      'One of the most destructive sorghum diseases worldwide — yield losses of up to 80-100% have been reported in highly susceptible varieties under severe disease pressure, mainly through peduncle infection blocking grain fill and direct panicle/grain damage.',
    damageImpactMarathi:
      'जगभरातील ज्वारीच्या सर्वात विनाशकारी रोगांपैकी एक — अत्यंत संवेदनशील जातींमध्ये तीव्र रोगदाबाखाली ८०-१००% पर्यंत उत्पन्न घट नोंदवली गेली आहे, प्रामुख्याने देठाच्या संसर्गामुळे दाणे भरण्यात अडथळा व कणीस/दाण्यांचे थेट नुकसान यामुळे.',
    chemicalControl: [
      'Fungicide seed treatment can reduce early seedling infection.',
      'Foliar fungicide may be considered in high-value seed production fields under severe pressure, though it is not commonly economical for grain sorghum at large scale.',
    ],
    chemicalControlMarathi: [
      'बीजप्रक्रिया बुरशीनाशकाने रोपावस्थेतील प्रारंभिक संसर्ग कमी होतो.',
      'तीव्र रोगदाब असल्यास उच्च-मूल्य बियाणे उत्पादन शेतात पानांवरील बुरशीनाशक विचारात घेता येते, जरी मोठ्या प्रमाणावर धान्य ज्वारीसाठी हे सहसा आर्थिकदृष्ट्या फायदेशीर नसते.',
    ],
    organicControl: [
      'Destroy or bury infected crop residue after harvest to reduce carryover inoculum.',
    ],
    organicControlMarathi: [
      'पुढील हंगामातील संसर्ग स्रोत कमी करण्यासाठी काढणीनंतर संक्रमित कचरा नष्ट करा किंवा गाडा.',
    ],
    culturalControl: [
      'Plant resistant hybrids/varieties — susceptibility varies significantly, so variety choice matters a great deal.',
      'Practice good residue management and crop rotation to reduce inoculum carryover.',
    ],
    culturalControlMarathi: [
      'प्रतिरोधक संकरित/जाती लावा — संवेदनशीलता जातीनुसार मोठ्या प्रमाणात बदलते, त्यामुळे जातीची निवड खूप महत्त्वाची आहे.',
      'संसर्ग स्रोत कमी करण्यासाठी चांगले कचरा व्यवस्थापन व फेरपालट करा.',
    ],
    advisory:
      'Plant resistant hybrids, manage crop residue, rotate crops, use seed treatment.',
    advisoryMarathi:
      'प्रतिरोधक संकरित लावा, पिकाचा कचरा व्यवस्थापित करा, फेरपालट करा, बीजप्रक्रिया वापरा.',
    severity: 'high',
  },
  {
    id: 'grain_mold',
    name: 'Grain Mold',
    nameMarathi: 'दाणे बुरशी',
    cropId: 'jowar',
    scientificName: 'Fungal complex (Curvularia lunata, Fusarium spp., Phoma sorghina, and others)',
    diseaseType: 'fungal',
    symptoms:
      'Discoloration and moldy growth on developing grain within the panicle, ranging from gray to black or pink depending on which fungi are involved. Moldy grain is often shriveled, lightweight, and of poor quality.',
    symptomsMarathi:
      'कणसातील विकसनशील दाण्यांवर रंगबदल व बुरशीची वाढ दिसते, कोणती बुरशी सामील आहे यानुसार करडी ते काळी किंवा गुलाबी असू शकते. बुरशीग्रस्त दाणे अनेकदा आकसलेले, हलके व निकृष्ट दर्जाचे असतात.',
    cause:
      'Caused by a complex of fungi (including Curvularia lunata, Fusarium species, and Phoma sorghina) rather than a single pathogen, all opportunistically infecting the grain as it develops.',
    causeMarathi:
      'एकाच रोगकारकाऐवजी बुरशींच्या समूहामुळे (Curvularia lunata, Fusarium प्रजाती, व Phoma sorghina यांसह) हा रोग होतो, ज्या दाणे विकसित होताना संधीसाधूपणे संक्रमित करतात.',
    spreadAndConditions:
      'Favored by warm, humid, or rainy weather during flowering and grain fill — wet conditions at this stage are the single biggest risk factor.',
    spreadAndConditionsMarathi:
      'फुलोरा व दाणे भरण्याच्या काळात उष्ण, दमट किंवा पावसाळी हवामान यास अनुकूल असते — या टप्प्यावरील ओले हवामान हा सर्वात मोठा धोकादायक घटक आहे.',
    damageImpact:
      'Reduces grain weight, quality, germination rate, and market value; can also produce mycotoxins in some cases, which is a food/feed safety concern.',
    damageImpactMarathi:
      'दाण्यांचे वजन, दर्जा, उगवण क्षमता व बाजारभाव कमी करतो; काही प्रकरणांत मायकोटॉक्सिनही तयार होऊ शकतात, जो अन्न/चारा सुरक्षेचा प्रश्न आहे.',
    chemicalControl: [
      'Foliar fungicide application timed around flowering can reduce grain mold in high-risk, humid seasons for susceptible varieties.',
    ],
    chemicalControlMarathi: [
      'संवेदनशील जातींसाठी दमट, जास्त-धोक्याच्या हंगामात फुलोऱ्याच्या वेळी केलेली पानांवरील बुरशीनाशक फवारणी दाणे बुरशी कमी करू शकते.',
    ],
    organicControl: [],
    organicControlMarathi: [],
    culturalControl: [
      'Plant resistant or tolerant varieties/hybrids where available.',
      'Time planting so that flowering and grain fill avoid the wettest part of the season where possible.',
      'Harvest and dry grain promptly to avoid prolonged wet conditions after maturity.',
    ],
    culturalControlMarathi: [
      'उपलब्ध असल्यास प्रतिरोधक किंवा सहनशील जाती/संकरित लावा.',
      'शक्य असल्यास फुलोरा व दाणे भरण्याचा काळ हंगामातील सर्वात ओल्या कालावधीपासून दूर राहील असे पेरणीचे नियोजन करा.',
      'परिपक्वतेनंतर दीर्घकाळ ओलावा टाळण्यासाठी दाणे वेळेवर काढून वाळवा.',
    ],
    advisory:
      'Plant resistant varieties, time planting to avoid wet flowering periods, harvest and dry grain promptly.',
    advisoryMarathi:
      'प्रतिरोधक जाती लावा, ओल्या फुलोऱ्याचा काळ टाळण्यासाठी पेरणीचे नियोजन करा, दाणे वेळेवर काढून वाळवा.',
    severity: 'medium',
  },
  {
    id: 'covered_kernel_smut',
    name: 'Covered Kernel Smut',
    nameMarathi: 'आच्छादित कर्नल स्मट',
    cropId: 'jowar',
    scientificName: 'Sporisorium sorghi',
    diseaseType: 'fungal',
    symptoms:
      'Individual grains in the head are replaced by cone-shaped galls covered by a grayish membrane. The disease can destroy all or part of the kernels in an affected panicle.',
    symptomsMarathi:
      'कणसातील वैयक्तिक दाणे करड्या पडद्याने झाकलेल्या शंकूच्या आकाराच्या गाठींनी बदलले जातात. हा रोग संक्रमित कणसातील सर्व किंवा काही दाणे नष्ट करू शकतो.',
    cause:
      'Caused by the fungus Sporisorium sorghi. Spores contaminate the surface of healthy seed at harvest when galls break open, carrying the fungus into the next planting.',
    causeMarathi:
      'Sporisorium sorghi या बुरशीमुळे हा रोग होतो. काढणीच्या वेळी गाठी फुटल्यावर बीजाणू निरोगी बियांच्या पृष्ठभागावर दूषित होतात, आणि पुढील पेरणीत बुरशी घेऊन जातात.',
    spreadAndConditions:
      'Primarily a seed-borne disease — infection begins when contaminated seed is planted, with the fungus infecting the seedling and later replacing developing grain with smut galls.',
    spreadAndConditionsMarathi:
      'प्रामुख्याने बियाण्याद्वारे पसरणारा रोग — दूषित बी पेरल्यावर संसर्ग सुरू होतो, बुरशी रोपाला संक्रमित करून नंतर विकसनशील दाण्यांच्या जागी स्मट गाठी तयार करते.',
    damageImpact:
      'Was once quite destructive, but is now rarely seen where seed is routinely treated with fungicide — untreated susceptible seed can still result in significant grain loss.',
    damageImpactMarathi:
      'पूर्वी बराच विनाशकारी होता, परंतु आता बियाण्यावर नियमितपणे बुरशीनाशक प्रक्रिया केली जाते तेथे क्वचितच दिसतो — प्रक्रिया न केलेल्या संवेदनशील बियाण्यामुळे अजूनही लक्षणीय दाणे नुकसान होऊ शकते.',
    chemicalControl: [
      'Fungicide seed treatment before planting is highly effective and is the primary control method for this disease.',
    ],
    chemicalControlMarathi: [
      'पेरणीपूर्वी बुरशीनाशक बीजप्रक्रिया अत्यंत प्रभावी आहे व या रोगासाठीचा मुख्य उपाय आहे.',
    ],
    organicControl: [],
    organicControlMarathi: [],
    culturalControl: [
      'Use clean, certified seed from a source free of this disease.',
      'Plant resistant hybrids where available.',
    ],
    culturalControlMarathi: [
      'या रोगापासून मुक्त स्रोतातून स्वच्छ, प्रमाणित बी वापरा.',
      'उपलब्ध असल्यास प्रतिरोधक संकरित लावा.',
    ],
    advisory:
      'Treat seed with fungicide before planting, use clean certified seed, plant resistant hybrids.',
    advisoryMarathi:
      'पेरणीपूर्वी बुरशीनाशक बीजप्रक्रिया करा, स्वच्छ प्रमाणित बी वापरा, प्रतिरोधक संकरित लावा.',
    severity: 'low',
  },
  {
    id: 'head_smut',
    name: 'Head Smut',
    nameMarathi: 'कणीस स्मट',
    cropId: 'jowar',
    scientificName: 'Sporisorium reilianum',
    diseaseType: 'fungal',
    symptoms:
      'A large, dark-brown smut gall replaces the entire panicle in place of grain, initially covered by a whitish membrane that soon ruptures and releases spores to the wind. Some infected plants also become dwarfed and tiller excessively, with all tillers producing smutted heads.',
    symptomsMarathi:
      'दाण्यांच्या जागी संपूर्ण कणीस मोठ्या, गडद-तपकिरी स्मट गाठीने बदलले जाते, जी सुरुवातीला पांढरट पडद्याने झाकलेली असते व लवकरच फुटून बीजाणू वाऱ्यात सोडते. काही संक्रमित झाडे बुटकी होऊन अतिरिक्त फुटवे देतात, ज्यातील प्रत्येक फुटवा स्मटग्रस्त कणीस देतो.',
    cause:
      'Caused by the soil-borne fungus Sporisorium reilianum. Plants are infected as seedlings, but the disease is only visible at heading time.',
    causeMarathi:
      'जमिनीत राहणाऱ्या Sporisorium reilianum या बुरशीमुळे हा रोग होतो. झाडे रोपावस्थेतच संक्रमित होतात, परंतु रोग फक्त कणीस येण्याच्या वेळी दिसून येतो.',
    spreadAndConditions:
      'Spores are soil-borne and can remain viable in the soil for years. They germinate in spring and infect seedlings at a very young stage (1.5-2 cm), then develop unnoticed until heading.',
    spreadAndConditionsMarathi:
      'बीजाणू जमिनीत राहतात व वर्षानुवर्षे जिवंत राहू शकतात. ते वसंत ऋतूत उगवून अगदी लहान रोपावस्थेत (१.५-२ सेमी) संक्रमण करतात, नंतर कणीस येईपर्यंत लक्षात न येता वाढतात.',
    damageImpact:
      'Can reduce yield by up to 80% in severely infected fields, since each affected tiller produces no usable grain at all.',
    damageImpactMarathi:
      'तीव्र प्रादुर्भावग्रस्त शेतात उत्पन्न ८०% पर्यंत घटू शकते, कारण प्रत्येक संक्रमित फुटवा कोणतेही उपयुक्त दाणे देत नाही.',
    chemicalControl: [
      'Fungicide seed treatment before planting is the main effective chemical control, since foliar sprays cannot reach this soil-borne, systemic infection once established.',
    ],
    chemicalControlMarathi: [
      'पेरणीपूर्वी बुरशीनाशक बीजप्रक्रिया हाच मुख्य प्रभावी रासायनिक उपाय आहे, कारण एकदा हा जमिनीतील, संपूर्ण झाडभर पसरणारा संसर्ग स्थापित झाल्यावर पानांवरील फवारणी त्यापर्यंत पोहोचू शकत नाही.',
    ],
    organicControl: [],
    organicControlMarathi: [],
    culturalControl: [
      'Plant resistant hybrids — resistance can vary by fungal race present in a given area, so local performance matters.',
      'Avoid repeatedly planting susceptible varieties in fields with a known history of head smut, since soil spore levels build up over time.',
    ],
    culturalControlMarathi: [
      'प्रतिरोधक संकरित लावा — प्रतिरोधकता त्या भागातील बुरशी प्रकारानुसार बदलू शकते, त्यामुळे स्थानिक कामगिरी महत्त्वाची आहे.',
      'कणीस स्मटचा ज्ञात इतिहास असलेल्या शेतात संवेदनशील जाती वारंवार लावणे टाळा, कारण जमिनीतील बीजाणूंचे प्रमाण काळानुसार वाढते.',
    ],
    advisory:
      'Treat seed with fungicide before planting, plant resistant hybrids, avoid repeated susceptible planting in infested fields.',
    advisoryMarathi:
      'पेरणीपूर्वी बुरशीनाशक बीजप्रक्रिया करा, प्रतिरोधक संकरित लावा, प्रादुर्भावग्रस्त शेतात संवेदनशील जाती वारंवार लावणे टाळा.',
    severity: 'high',
  },
  {
    id: 'sorghum_rust',
    name: 'Sorghum Rust',
    nameMarathi: 'ज्वारी तांबेरा',
    cropId: 'jowar',
    scientificName: 'Puccinia purpurea',
    diseaseType: 'fungal',
    symptoms:
      'Small raised pustules or blisters appear on both leaf surfaces, rupturing to release many reddish-brown spores. Usually appears as plants approach maturity, mainly on the older, mature leaves.',
    symptomsMarathi:
      'पानाच्या दोन्ही बाजूंवर लहान उंचावलेले फोड दिसतात, जे फुटून अनेक लालसर-तपकिरी बीजाणू सोडतात. सहसा झाडे परिपक्वतेजवळ येतात तेव्हा, प्रामुख्याने जुन्या, प्रौढ पानांवर दिसतो.',
    cause:
      'Caused by the fungus Puccinia purpurea, which also overwinters on Johnsongrass in some regions, providing a source of infection for the next season.',
    causeMarathi:
      'Puccinia purpurea या बुरशीमुळे हा रोग होतो, जी काही भागांत जॉन्सनग्रासवरही हिवाळाभर टिकून राहते, पुढील हंगामासाठी संसर्गाचा स्रोत बनते.',
    spreadAndConditions:
      'Spreads via windborne spores. Occurrence is generally sporadic rather than a yearly guaranteed problem.',
    spreadAndConditionsMarathi:
      'वाऱ्यासोबत उडणाऱ्या बीजाणूंद्वारे पसरतो. याचा प्रादुर्भाव सामान्यतः दरवर्षी हमखास नसून प्रासंगिक असतो.',
    damageImpact:
      'Grain yield losses are usually not serious; forage sorghum yields may be affected more than grain yield since rust reduces the green leaf area used for fodder.',
    damageImpactMarathi:
      'दाण्याच्या उत्पन्नावर सहसा गंभीर परिणाम होत नाही; चारा ज्वारीच्या उत्पन्नावर अधिक परिणाम होऊ शकतो, कारण तांबेरा चाऱ्यासाठी वापरले जाणारे हिरवे पानांचे क्षेत्र कमी करतो.',
    chemicalControl: [],
    chemicalControlMarathi: [],
    organicControl: [],
    organicControlMarathi: [],
    culturalControl: [
      'Plant tolerant hybrids/varieties where rust pressure is a recurring concern.',
      'Control Johnsongrass around fields, since it can carry the fungus between seasons.',
    ],
    culturalControlMarathi: [
      'तांबेऱ्याचा वारंवार त्रास असलेल्या भागात सहनशील संकरित/जाती लावा.',
      'शेताभोवतीचे जॉन्सनग्रास नियंत्रित करा, कारण ते हंगामांदरम्यान बुरशी टिकवून ठेवू शकते.',
    ],
    advisory:
      'Usually not economically damaging for grain; plant tolerant varieties and control Johnsongrass if forage yield is a concern.',
    advisoryMarathi:
      'सहसा दाण्यासाठी आर्थिकदृष्ट्या हानिकारक नाही; चारा उत्पन्नाची चिंता असल्यास सहनशील जाती लावा व जॉन्सनग्रास नियंत्रित करा.',
    severity: 'low',
  },
  {
    id: 'loose_kernel_smut',
    name: 'Loose Kernel Smut',
    nameMarathi: 'सैल कर्नल स्मट',
    cropId: 'jowar',
    scientificName: 'Sporisorium cruentum',
    diseaseType: 'fungal',
    symptoms:
      'Long, pointed galls form in place of individual grains, covered by a thin membrane that usually breaks soon after the galls reach full size, releasing spores more readily than covered kernel smut.',
    symptomsMarathi:
      'वैयक्तिक दाण्यांच्या जागी लांब, टोकदार गाठी तयार होतात, ज्या पातळ पडद्याने झाकलेल्या असतात व गाठी पूर्ण आकारात आल्यावर लवकरच फुटतात, आच्छादित कर्नल स्मटपेक्षा अधिक सहज बीजाणू सोडतात.',
    cause:
      'Caused by the fungus Sporisorium cruentum, spread primarily through contaminated seed, similar to covered kernel smut.',
    causeMarathi:
      'Sporisorium cruentum या बुरशीमुळे हा रोग होतो, जो आच्छादित कर्नल स्मटप्रमाणेच प्रामुख्याने दूषित बियाण्याद्वारे पसरतो.',
    spreadAndConditions:
      'Seed-borne, following the same infection cycle as covered kernel smut — contaminated seed introduces the fungus, which later replaces developing grain with galls.',
    spreadAndConditionsMarathi:
      'आच्छादित कर्नल स्मटप्रमाणेच बियाण्याद्वारे पसरतो — दूषित बी बुरशीचा परिचय करून देते, जी नंतर विकसनशील दाण्यांच्या जागी गाठी तयार करते.',
    damageImpact:
      'Presents little practical problem today, since the same seed treatment practices that control covered kernel smut have virtually eliminated its occurrence.',
    damageImpactMarathi:
      'आज याचा फारसा व्यावहारिक त्रास होत नाही, कारण आच्छादित कर्नल स्मट नियंत्रित करणाऱ्या त्याच बीजप्रक्रिया पद्धतींनी याचे प्रमाण जवळपास नष्ट केले आहे.',
    chemicalControl: [
      'Fungicide seed treatment before planting effectively controls this disease, same as for covered kernel smut.',
    ],
    chemicalControlMarathi: [
      'आच्छादित कर्नल स्मटप्रमाणेच पेरणीपूर्वी बुरशीनाशक बीजप्रक्रिया या रोगावर प्रभावीपणे नियंत्रण ठेवते.',
    ],
    organicControl: [],
    organicControlMarathi: [],
    culturalControl: [
      'Use clean, certified seed as the primary preventive measure.',
    ],
    culturalControlMarathi: [
      'स्वच्छ, प्रमाणित बी वापरणे हाच मुख्य प्रतिबंधात्मक उपाय आहे.',
    ],
    advisory:
      'Treat seed with fungicide before planting, use clean certified seed.',
    advisoryMarathi:
      'पेरणीपूर्वी बुरशीनाशक बीजप्रक्रिया करा, स्वच्छ प्रमाणित बी वापरा.',
    severity: 'low',
  },
  {
    id: 'healthy',
    name: 'Healthy Crop',
    nameMarathi: 'निरोगी पीक',
    cropId: 'all',
    symptoms: 'No visible disease symptoms detected.',
    symptomsMarathi: 'कोणतेही रोगाचे लक्षण आढळले नाहीत.',
    culturalControl: [
      'Scout the field regularly, especially after rain or during warm humid spells when diseases spread fastest.',
      'Maintain balanced fertilization — both nutrient deficiency and excess nitrogen can make plants more vulnerable.',
      'Follow a proper irrigation schedule and avoid waterlogging.',
      'Remove and destroy any diseased plant debris promptly rather than leaving it in the field.',
    ],
    culturalControlMarathi: [
      'शेताचे नियमित निरीक्षण करा, विशेषतः पावसानंतर किंवा उष्ण दमट काळात जेव्हा रोग सर्वात वेगाने पसरतात.',
      'संतुलित खत व्यवस्थापन ठेवा — पोषकद्रव्यांची कमतरता व नत्राचा अतिरेक दोन्हीमुळे झाडे रोगास बळी पडू शकतात.',
      'योग्य सिंचन वेळापत्रक पाळा व पाणी साचणे टाळा.',
      'रोगग्रस्त पिकाचा कचरा शेतात न ठेवता लवकर काढून नष्ट करा.',
    ],
    advisory: 'Continue regular monitoring and good agricultural practices.',
    advisoryMarathi: 'नियमित निरीक्षण आणि चांगली शेती पद्धत चालू ठेवा.',
    severity: 'low',
  },
];

export const getDiseaseById = (id: string): Disease | undefined =>
  DISEASES.find((d) => d.id === id);

export const getDiseasesForCrop = (cropId: string): Disease[] =>
  DISEASES.filter((d) => d.cropId === cropId || d.cropId === 'all');

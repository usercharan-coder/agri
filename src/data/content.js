export const ui = {
  en: {
    home: 'Home', crops: 'Crops', natural: 'Natural farming', pests: 'Pest guide', schemes: 'Schemes', tools: 'Tools',
    search: 'Search crops, diseases, methods, schemes…', searchHint: 'Try “rice”, “వరి”, “PM-KISAN” or “mulching”',
    listen: 'Listen', stop: 'Stop', explore: 'Explore crops', seeAll: 'View all', verified: 'Last reviewed', source: 'Source',
    safety: 'Safety first', details: 'Open guide', close: 'Close', favorite: 'Save guide', saved: 'Saved', simple: 'Explain simply',
  },
  te: {
    home: 'హోమ్', crops: 'పంటలు', natural: 'ప్రకృతి వ్యవసాయం', pests: 'పురుగు మార్గదర్శిని', schemes: 'పథకాలు', tools: 'ఉపకరణాలు',
    search: 'పంటలు, తెగుళ్లు, పద్ధతులు, పథకాలు వెతకండి…', searchHint: '“వరి”, “రైతు భరోసా”, “మల్చింగ్” అని ప్రయత్నించండి',
    listen: 'వినండి', stop: 'ఆపండి', explore: 'పంటలు చూడండి', seeAll: 'అన్నీ చూడండి', verified: 'చివరిసారి పరిశీలించిన తేదీ', source: 'మూలం',
    safety: 'ముందు భద్రత', details: 'మార్గదర్శిని తెరవండి', close: 'మూసివేయండి', favorite: 'గైడ్ సేవ్ చేయండి', saved: 'సేవ్ అయింది', simple: 'సులభంగా చెప్పండి',
  },
};

export const crops = [
  {
    id: 'rice', emoji: '🌾', group: 'Cereal', titleEn: 'Rice', titleTe: 'వరి', durationEn: 'About 110–150 days; varies by variety', durationTe: 'రకాన్ని బట్టి సుమారు 110–150 రోజులు',
    waterEn: 'Needs reliable water management; avoid wasteful standing water.', waterTe: 'నీటి నిర్వహణ ముఖ్యం; అవసరం లేని నిల్వ నీటిని నివారించండి.',
    soilEn: 'Level fields with good water control are useful. Check local soil-test advice.', soilTe: 'నీటిని నియంత్రించగల సమతల పొలం మంచిది. స్థానిక నేల పరీక్ష సలహా తీసుకోండి.',
    overviewEn: 'Rice is a staple crop. Plan the season with a local extension worker, seed source and water availability in mind.', overviewTe: 'వరి ప్రధాన ఆహార పంట. విత్తనం, నీటి లభ్యత, స్థానిక వ్యవసాయ సలహాను బట్టి సాగు ప్రణాళిక చేసుకోండి.',
    sowingEn: 'Season and method vary by district and variety.', sowingTe: 'జిల్లా, రకం, సాగు పద్ధతిని బట్టి కాలం మారుతుంది.',
    pests: ['rice-stem-borer', 'brown-planthopper'],
    steps: [
      ['Prepare land', 'Level the field and arrange drainage and water control before sowing.', 'పొలాన్ని చదును చేసి, విత్తే ముందు నీటి పారుదల మరియు నియంత్రణ ఏర్పాటు చేసుకోండి.'],
      ['Choose seed', 'Use locally suitable, labelled seed from a reliable source. Ask for current variety advice.', 'స్థానికంగా అనుకూలమైన, లేబుల్ ఉన్న నమ్మకమైన విత్తనాన్ని ఎంచుకోండి. తాజా రకం సలహా అడగండి.'],
      ['Treat seed safely', 'Follow the exact current label or local recommendation. Do not guess a dose.', 'ప్రస్తుత లేబుల్ లేదా స్థానిక సిఫార్సును మాత్రమే అనుసరించండి. మోతాదును ఊహించవద్దు.'],
      ['Establish crop', 'Choose direct seeding or transplanting according to water, labour and local guidance.', 'నీరు, కూలీలు, స్థానిక సలహా ప్రకారం నేరుగా విత్తడం లేదా నాటడం ఎంచుకోండి.'],
      ['Monitor weekly', 'Walk the field, check leaves and tillers, and record unusual symptoms early.', 'ప్రతి వారం పొలంలో తిరిగి ఆకులు, పిలకలను చూడండి; అసాధారణ లక్షణాలను ముందే నమోదు చేయండి.'],
      ['Harvest carefully', 'Harvest at suitable maturity and dry grain safely before storage.', 'తగిన పక్వదశలో కోసి, నిల్వకు ముందు ధాన్యాన్ని సురక్షితంగా ఆరబెట్టండి.'],
    ],
  },
  {
    id: 'chilli', emoji: '🌶️', group: 'Commercial', titleEn: 'Chilli', titleTe: 'మిరప', durationEn: 'Varies by variety and picking cycle', durationTe: 'రకం, కోతల కాలాన్ని బట్టి మారుతుంది',
    waterEn: 'Avoid both water stress and waterlogging.', waterTe: 'నీటి కొరత, నీరు నిలవడం రెండింటినీ నివారించండి.',
    soilEn: 'Well-drained soil and a soil test help plan nutrition.', soilTe: 'నీరు నిలవని నేల, నేల పరీక్ష పోషక ప్రణాళికకు ఉపయోగపడతాయి.',
    overviewEn: 'Chilli needs close monitoring for sap-sucking pests and virus-like symptoms. Start with healthy planting material.', overviewTe: 'మిరపలో రసం పీల్చే పురుగులు, వైరస్ లాంటి లక్షణాలను జాగ్రత్తగా గమనించాలి. ఆరోగ్యకరమైన నాటే పదార్థంతో ప్రారంభించండి.',
    sowingEn: 'Planting window varies by location and market plan.', sowingTe: 'నాటే సమయం ప్రాంతం, మార్కెట్ ప్రణాళికను బట్టి మారుతుంది.', pests: ['chilli-thrips'],
    steps: [
      ['Plan the bed', 'Prepare raised, well-drained beds where appropriate and avoid fields with repeated disease issues.', 'అవసరమైతే ఎత్తైన, నీరు నిలవని బెడ్లను సిద్ధం చేయండి. తరచూ తెగుళ్లు వచ్చిన పొలాలను నివారించండి.'],
      ['Use healthy seedlings', 'Choose vigorous, symptom-free seedlings and inspect them before transplanting.', 'బలమైన, లక్షణాలు లేని మొక్కలను ఎంచుకుని నాటే ముందు పరిశీలించండి.'],
      ['Mulch and irrigate', 'Use suitable mulch and schedule water by soil moisture and weather.', 'తగిన మల్చింగ్ ఉపయోగించి నేల తేమ, వాతావరణం ప్రకారం నీరు ఇవ్వండి.'],
      ['Scout pests', 'Check new leaves and flowers twice a week. Act on local extension advice.', 'కొత్త ఆకులు, పువ్వులను వారానికి రెండుసార్లు పరిశీలించండి. స్థానిక సలహా ప్రకారం చర్య తీసుకోండి.'],
      ['Pick safely', 'Harvest regularly, handle fruits gently and sort damaged produce.', 'క్రమం తప్పకుండా కోత కోయండి; కాయలను జాగ్రత్తగా నిర్వహించి దెబ్బతిన్నవి వేరు చేయండి.'],
    ],
  },
  {
    id: 'cotton', emoji: '☁️', group: 'Commercial', titleEn: 'Cotton', titleTe: 'పత్తి', durationEn: 'Varies by hybrid, season and local conditions', durationTe: 'హైబ్రిడ్, సీజన్, స్థానిక పరిస్థితులను బట్టి మారుతుంది',
    waterEn: 'Schedule irrigation according to soil, weather and crop stage.', waterTe: 'నేల, వాతావరణం, పంట దశను బట్టి నీరు ఇవ్వండి.',
    soilEn: 'A soil test helps plan nutrient management.', soilTe: 'పోషక నిర్వహణకు నేల పరీక్ష ఉపయోగపడుతుంది.',
    overviewEn: 'Cotton rewards regular field scouting. Use integrated pest management and locally approved guidance.', overviewTe: 'పత్తిలో క్రమం తప్పకుండా పొలం పరిశీలించడం ప్రయోజనకరం. సమగ్ర పురుగు నిర్వహణ, స్థానికంగా ఆమోదించిన సలహా తీసుకోండి.',
    sowingEn: 'Choose locally recommended hybrids and planting windows.', sowingTe: 'స్థానికంగా సిఫార్సు చేసిన హైబ్రిడ్లు, నాటే సమయం ఎంచుకోండి.', pests: ['pink-bollworm'],
    steps: [
      ['Start with a soil test', 'Use the test result and local advice to plan field preparation.', 'నేల పరీక్ష ఫలితం, స్థానిక సలహా ప్రకారం పొలం సిద్ధం చేసుకోండి.'],
      ['Choose suitable seed', 'Buy labelled seed through authorised channels and retain the receipt.', 'అధికారిక విక్రయ కేంద్రం నుంచి లేబుల్ ఉన్న విత్తనం కొనండి; రసీదు ఉంచుకోండి.'],
      ['Maintain crop hygiene', 'Remove crop residues as locally advised and keep field edges manageable.', 'స్థానిక సలహా ప్రకారం పంట అవశేషాలను తొలగించి, పొలం అంచులను శుభ్రంగా ఉంచండి.'],
      ['Use traps and scouting', 'Monitor with locally recommended traps and inspect flowers and bolls.', 'స్థానికంగా సిఫార్సు చేసిన ట్రాప్స్ ఉపయోగించి పువ్వులు, కాయలను పరిశీలించండి.'],
      ['Harvest in clean picks', 'Keep picked kapas dry and separate stained or damaged material.', 'కోసిన పత్తిని పొడిగా ఉంచి, మచ్చలు లేదా నష్టం ఉన్నది వేరుగా ఉంచండి.'],
    ],
  },
  {
    id: 'tomato', emoji: '🍅', group: 'Vegetable', titleEn: 'Tomato', titleTe: 'టమాటా', durationEn: 'Varies by variety and crop system', durationTe: 'రకం, సాగు విధానాన్ని బట్టి మారుతుంది',
    waterEn: 'Keep moisture even; avoid frequent wetting of foliage where possible.', waterTe: 'తేమను సమంగా ఉంచండి; వీలైనంత వరకు ఆకులు తరచుగా తడవకుండా చూడండి.',
    soilEn: 'Use well-drained soil and manage crop rotation.', soilTe: 'నీరు నిలవని నేల ఉపయోగించి, పంట మార్పిడి పాటించండి.',
    overviewEn: 'Tomato benefits from healthy seedlings, good airflow and early disease observation.', overviewTe: 'ఆరోగ్యకరమైన మొక్కలు, గాలి ప్రసరణ, తెగుళ్లను ముందే గుర్తించడం టమాటాకు ఉపయోగకరం.',
    sowingEn: 'Timing and protected or open-field method vary by district.', sowingTe: 'కాలం, బహిరంగ లేదా రక్షిత సాగు పద్ధతి జిల్లాను బట్టి మారుతుంది.', pests: ['tomato-early-blight'],
    steps: [
      ['Raise clean seedlings', 'Use a clean nursery setup and discard weak or symptomatic seedlings.', 'శుభ్రమైన నర్సరీలో మొక్కలు పెంచి, బలహీనమైన లేదా లక్షణాలు ఉన్న మొక్కలను తొలగించండి.'],
      ['Prepare spacing', 'Use locally advised spacing to support airflow and field access.', 'గాలి ప్రసరణ, పొలంలో తిరగడానికి స్థానిక సిఫార్సు చేసిన దూరం పాటించండి.'],
      ['Water at the root zone', 'Irrigate based on moisture and weather; avoid overwatering.', 'నేల తేమ, వాతావరణం ప్రకారం వేర్ల దగ్గర నీరు ఇవ్వండి; అధిక నీరు వద్దు.'],
      ['Check leaves and fruit', 'Inspect for spots, curling, insects and fruit damage at least twice weekly.', 'మచ్చలు, ముడుచుకోవడం, పురుగులు, కాయ నష్టాన్ని వారానికి కనీసం రెండుసార్లు చూడండి.'],
      ['Harvest by maturity', 'Pick at the maturity required for the destination market.', 'మార్కెట్ అవసరానికి తగిన పక్వదశలో కోత కోయండి.'],
    ],
  },
  {
    id: 'groundnut', emoji: '🥜', group: 'Pulse', titleEn: 'Groundnut', titleTe: 'వేరుశనగ', durationEn: 'Varies by variety and season', durationTe: 'రకం, సీజన్‌ను బట్టి మారుతుంది',
    waterEn: 'Avoid prolonged moisture stress during sensitive stages.', waterTe: 'సున్నిత దశల్లో ఎక్కువకాలం తేమ కొరత రాకుండా చూడండి.',
    soilEn: 'Well-drained soil supports crop health and pod development.', soilTe: 'నీరు నిలవని నేల పంట ఆరోగ్యం, కాయల అభివృద్ధికి తోడ్పడుతుంది.',
    overviewEn: 'Groundnut planning should consider seed quality, field drainage and crop rotation.', overviewTe: 'వేరుశనగలో విత్తన నాణ్యత, పొలం నీటి పారుదల, పంట మార్పిడిని దృష్టిలో ఉంచాలి.',
    sowingEn: 'Use district-specific seasonal advice.', sowingTe: 'జిల్లాకు సంబంధించిన సీజన్ సలహా తీసుకోండి.', pests: [],
    steps: [
      ['Prepare a fine tilth', 'Prepare the soil according to local guidance and keep it free of major clods.', 'స్థానిక సలహా ప్రకారం నేల సిద్ధం చేసి, పెద్ద ముద్దలు లేకుండా చూడండి.'],
      ['Use sound seed', 'Use clean, sound seed from a reliable source and follow current treatment guidance.', 'నమ్మకమైన వనరులోని ఆరోగ్యకరమైన విత్తనం ఎంచుకుని, ప్రస్తుత శుద్ధి సలహా పాటించండి.'],
      ['Observe crop stage', 'Watch crop growth, leaf condition and soil moisture regularly.', 'పంట ఎదుగుదల, ఆకుల స్థితి, నేల తేమను క్రమం తప్పకుండా గమనించండి.'],
      ['Harvest and dry', 'Lift at suitable maturity, dry properly and store only after moisture is safe.', 'తగిన పక్వదశలో తవ్వి, బాగా ఆరబెట్టి, తేమ సురక్షిత స్థాయిలో ఉన్నప్పుడే నిల్వ చేయండి.'],
    ],
  },
];

export const pests = [
  { id: 'rice-stem-borer', crop: 'Rice', emoji: '🐛', titleEn: 'Rice stem borer', titleTe: 'వరి కాండం తొలిచే పురుగు', symptomsEn: 'Dead-hearts or white heads may be noticed. Confirm the cause before treatment.', symptomsTe: 'ఎండిన మధ్య ఆకులు లేదా తెల్లని కంకులు కనిపించవచ్చు. చికిత్సకు ముందు కారణాన్ని నిర్ధారించండి.', preventionEn: 'Use local monitoring advice, field sanitation and balanced nutrient management.', preventionTe: 'స్థానిక పర్యవేక్షణ సలహా, పొలం పరిశుభ్రత, సమతుల్య పోషక నిర్వహణ పాటించండి.', naturalEn: 'Use only locally recommended biological or cultural measures.', naturalTe: 'స్థానికంగా సిఫార్సు చేసిన జీవ లేదా సాగు పద్ధతులనే ఉపయోగించండి.' },
  { id: 'brown-planthopper', crop: 'Rice', emoji: '🪲', titleEn: 'Brown planthopper', titleTe: 'వరి గోధుమ రంగు దోమ', symptomsEn: 'Hopper burn-like patches and insects near the plant base can occur.', symptomsTe: 'పంటలో కాలినట్లుగా మచ్చలు, మొక్క అడుగున పురుగులు కనిపించవచ్చు.', preventionEn: 'Avoid unmanaged excess nitrogen and inspect the lower canopy.', preventionTe: 'నియంత్రణ లేని అధిక నత్రజని వాడకాన్ని నివారించి, మొక్క అడుగు భాగాన్ని చూడండి.', naturalEn: 'Conserve beneficial insects and seek local IPM guidance.', naturalTe: 'ఉపయోగకరమైన కీటకాలను కాపాడి, స్థానిక సమగ్ర పురుగు నిర్వహణ సలహా తీసుకోండి.' },
  { id: 'chilli-thrips', crop: 'Chilli', emoji: '🦗', titleEn: 'Chilli thrips', titleTe: 'మిరప తామర పురుగు', symptomsEn: 'New leaves may curl or show scarring; similar symptoms can have other causes.', symptomsTe: 'కొత్త ఆకులు ముడుచుకోవడం లేదా గీతలు కనిపించవచ్చు; ఇలాంటి లక్షణాలకు ఇతర కారణాలు కూడా ఉండొచ్చు.', preventionEn: 'Inspect seedlings and new growth regularly, and manage weeds as locally advised.', preventionTe: 'మొక్కలు, కొత్త ఎదుగుదలను క్రమం తప్పకుండా పరిశీలించి, స్థానిక సలహా ప్రకారం కలుపు నియంత్రించండి.', naturalEn: 'Use locally advised traps or biological options where suitable.', naturalTe: 'అనుకూలమైతే స్థానికంగా సిఫార్సు చేసిన ట్రాప్స్ లేదా జీవ పద్ధతులు ఉపయోగించండి.' },
  { id: 'pink-bollworm', crop: 'Cotton', emoji: '🐛', titleEn: 'Pink bollworm', titleTe: 'పత్తి గులాబీ రంగు కాయ తొలిచే పురుగు', symptomsEn: 'Damaged flowers or bolls require careful inspection and local confirmation.', symptomsTe: 'దెబ్బతిన్న పువ్వులు లేదా కాయలను జాగ్రత్తగా పరిశీలించి, స్థానికంగా నిర్ధారించాలి.', preventionEn: 'Follow area-wide, season-specific advisory measures and authorised seed guidance.', preventionTe: 'ప్రాంతీయ, సీజన్‌కు తగిన సలహాలు మరియు అధికారిక విత్తన మార్గదర్శకాలు పాటించండి.', naturalEn: 'Use integrated monitoring and locally recommended non-chemical measures.', naturalTe: 'సమగ్ర పర్యవేక్షణ, స్థానికంగా సిఫార్సు చేసిన రసాయనేతర పద్ధతులు పాటించండి.' },
  { id: 'tomato-early-blight', crop: 'Tomato', emoji: '🍂', titleEn: 'Tomato early blight', titleTe: 'టమాటా ముందస్తు మాడ తెగులు', symptomsEn: 'Leaf spots can resemble other problems; confirm from a qualified local source.', symptomsTe: 'ఆకుల మచ్చలు ఇతర సమస్యలతో పోలి ఉండవచ్చు; అర్హత కలిగిన స్థానిక వనరుతో నిర్ధారించండి.', preventionEn: 'Use clean seedlings, rotation, field hygiene and suitable airflow.', preventionTe: 'ఆరోగ్యకరమైన మొక్కలు, పంట మార్పిడి, పొలం పరిశుభ్రత, గాలి ప్రసరణ పాటించండి.', naturalEn: 'Use only locally validated cultural or biological practices.', naturalTe: 'స్థానికంగా ధృవీకరించిన సాగు లేదా జీవ పద్ధతులనే ఉపయోగించండి.' },
];

export const naturalMethods = [
  { id: 'mulching', emoji: '🍂', titleEn: 'Mulching', titleTe: 'మల్చింగ్', whatEn: 'Covering soil with suitable organic material or other appropriate mulch.', whatTe: 'నేలపై తగిన సేంద్రియ పదార్థం లేదా అనుకూల మల్చ్ పరచడం.', whyEn: 'It can help protect soil moisture and reduce splash and weeds when managed well.', whyTe: 'సరైన నిర్వహణతో నేల తేమను కాపాడడంలో, కలుపు మరియు మట్టి చిమ్ముడును తగ్గించడంలో తోడ్పడవచ్చు.', materialsEn: 'Clean crop residues or locally suitable mulch material.', materialsTe: 'శుభ్రమైన పంట అవశేషాలు లేదా స్థానికంగా అనుకూలమైన మల్చ్ పదార్థం.', stepsEn: ['Keep mulch away from the stem base.', 'Spread an even layer after checking moisture.', 'Inspect regularly for pests, rodents or disease issues.'], stepsTe: ['మొక్క కాండం అడుగు భాగానికి మల్చ్ అంటకుండా చూడండి.', 'నేల తేమ చూసి సమంగా పరచండి.', 'పురుగులు, ఎలుకలు లేదా తెగుళ్ల కోసం తరచూ పరిశీలించండి.'] },
  { id: 'jeevamrutam', emoji: '🫙', titleEn: 'Jeevamrutam', titleTe: 'జీవామృతం', whatEn: 'A traditional farm-made input used in some natural-farming systems.', whatTe: 'కొన్ని ప్రకృతి వ్యవసాయ విధానాల్లో వాడే సంప్రదాయంగా తయారుచేసే ద్రావణం.', whyEn: 'Farmers use it as part of a broader soil-management practice. Results vary by soil, crop and management.', whyTe: 'రైతులు దీనిని విస్తృత నేల నిర్వహణలో భాగంగా ఉపయోగిస్తారు. నేల, పంట, నిర్వహణను బట్టి ఫలితాలు మారవచ్చు.', materialsEn: 'Use only a locally validated recipe and clean water.', materialsTe: 'స్థానికంగా ధృవీకరించిన తయారీ విధానం, శుభ్రమైన నీరు మాత్రమే వాడండి.', stepsEn: ['Follow an agriculture-department or trained local practitioner recipe.', 'Prepare in a clean container away from children and animals.', 'Apply only after confirming the method for the crop and field.'], stepsTe: ['వ్యవసాయ శాఖ లేదా శిక్షణ పొందిన స్థానిక నిపుణుడి విధానాన్ని పాటించండి.', 'పిల్లలు, జంతువులకు దూరంగా శుభ్రమైన పాత్రలో తయారు చేయండి.', 'పంట, పొలానికి పద్ధతి సరిపోతుందని నిర్ధారించిన తర్వాతే ఉపయోగించండి.'] },
  { id: 'beejamrutam', emoji: '🌱', titleEn: 'Beejamrutam', titleTe: 'బీజామృతం', whatEn: 'A traditional seed-treatment practice used in natural-farming approaches.', whatTe: 'ప్రకృతి వ్యవసాయ పద్ధతుల్లో ఉపయోగించే సంప్రదాయ విత్తన శుద్ధి విధానం.', whyEn: 'It is used by practitioners as part of seed preparation; it does not replace local disease-risk advice.', whyTe: 'విత్తన తయారీలో భాగంగా కొందరు ఉపయోగిస్తారు; స్థానిక వ్యాధి నివారణ సలహాకు ఇది ప్రత్యామ్నాయం కాదు.', materialsEn: 'Use a locally validated recipe and clean tools.', materialsTe: 'స్థానికంగా ధృవీకరించిన విధానం, శుభ్రమైన పరికరాలు ఉపయోగించండి.', stepsEn: ['Confirm that the method is suitable for the chosen crop.', 'Treat seed evenly and dry in shade as locally advised.', 'Do not use damaged, mouldy or unlabelled seed.'], stepsTe: ['ఎంచుకున్న పంటకు పద్ధతి అనుకూలమో నిర్ధారించండి.', 'విత్తనానికి సమంగా పూసి, స్థానిక సలహా ప్రకారం నీడలో ఆరబెట్టండి.', 'పాడైన, బూజు పట్టిన లేదా లేబుల్ లేని విత్తనాన్ని వాడవద్దు.'] },
  { id: 'composting', emoji: '♻️', titleEn: 'Composting', titleTe: 'కంపోస్టు తయారీ', whatEn: 'Controlled breakdown of organic materials into a stable soil amendment.', whatTe: 'సేంద్రియ పదార్థాలను నియంత్రిత విధానంలో నేలకు ఉపయోగపడే పదార్థంగా మార్చడం.', whyEn: 'Good compost can support soil organic matter when made and used safely.', whyTe: 'సురక్షితంగా తయారు చేసి వాడిన మంచి కంపోస్టు నేల సేంద్రియ పదార్థానికి తోడ్పడవచ్చు.', materialsEn: 'Plant residues, suitable animal manure and water, handled hygienically.', materialsTe: 'మొక్కల అవశేషాలు, అనుకూల పశువుల ఎరువు, నీరు — పరిశుభ్రంగా నిర్వహించాలి.', stepsEn: ['Layer suitable materials and maintain airflow.', 'Keep moisture moderate, not waterlogged.', 'Use only when material is mature and locally assessed as safe.'], stepsTe: ['అనుకూల పదార్థాలను పొరలుగా వేసి గాలి ప్రసరణ ఉండేలా చూడండి.', 'తేమ మితంగా ఉండాలి; నీరు నిలవకూడదు.', 'పదార్థం పూర్తిగా పక్వం చెందాక, స్థానికంగా సురక్షితమని నిర్ధారించిన తర్వాతే వాడండి.'] },
  { id: 'botanical-extracts', emoji: '🌿', titleEn: 'Botanical extracts', titleTe: 'వృక్ష ఆధారిత ద్రావణాలు', whatEn: 'Plant-based preparations sometimes used within integrated pest management.', whatTe: 'సమగ్ర పురుగు నిర్వహణలో కొన్నిసార్లు ఉపయోగించే మొక్కల ఆధారిత ద్రావణాలు.', whyEn: 'They may be considered only when locally appropriate and prepared safely.', whyTe: 'స్థానికంగా అనుకూలమై, సురక్షితంగా తయారైతేనే పరిగణించాలి.', materialsEn: 'Use only locally recommended plant materials and a validated process.', materialsTe: 'స్థానికంగా సిఫార్సు చేసిన మొక్కల పదార్థాలు, ధృవీకరించిన విధానం మాత్రమే వాడండి.', stepsEn: ['Wear gloves and avoid eye contact.', 'Test only with local expert guidance before broad use.', 'Keep preparations labelled and away from children.'], stepsTe: ['గ్లౌవ్స్ ధరించి, కళ్లకు తగలకుండా చూడండి.', 'విస్తృతంగా వాడే ముందు స్థానిక నిపుణుడి సలహాతో మాత్రమే పరీక్షించండి.', 'ద్రావణాలకు లేబుల్ వేసి, పిల్లలకు దూరంగా ఉంచండి.'] },
];

export const schemes = [
  { id: 'pm-kisan', icon: '₹', titleEn: 'PM-KISAN', titleTe: 'పీఎం-కిసాన్', purposeEn: 'Income support for eligible landholding farmer families under the scheme guidelines.', purposeTe: 'పథక మార్గదర్శకాల ప్రకారం అర్హత ఉన్న భూస్వామ్య రైతు కుటుంబాలకు ఆదాయ సహాయం.', helps: ['landholder'], documentsEn: 'Check the official portal for the current registration and verification requirements.', documentsTe: 'ప్రస్తుత నమోదు, ధృవీకరణ అవసరాల కోసం అధికారిక పోర్టల్ చూడండి.', url: 'https://www.pmkisan.gov.in/', sourceName: 'Department of Agriculture & Farmers Welfare', lastVerified: '15/08/2026' },
  { id: 'pmfby', icon: '🛡', titleEn: 'Pradhan Mantri Fasal Bima Yojana', titleTe: 'ప్రధాన మంత్రి ఫసల్ బీమా యోజన', purposeEn: 'Crop insurance information and enrolment services for notified crops and areas.', purposeTe: 'నోటిఫై చేసిన పంటలు, ప్రాంతాలకు పంట బీమా సమాచారం మరియు నమోదు సేవలు.', helps: ['insurance'], documentsEn: 'Use the official portal to check notified crops, dates, premium and current documents.', documentsTe: 'నోటిఫై చేసిన పంటలు, తేదీలు, ప్రీమియం, ప్రస్తుత పత్రాల కోసం అధికారిక పోర్టల్ చూడండి.', url: 'https://www.pmfby.gov.in/', sourceName: 'Ministry of Agriculture & Farmers Welfare', lastVerified: '15/08/2026' },
  { id: 'pmksy', icon: '💧', titleEn: 'Pradhan Mantri Krishi Sinchayee Yojana', titleTe: 'ప్రధాన మంత్రి కృషి సించాయి యోజన', purposeEn: 'A water-use and irrigation-focused programme; availability is implementation-dependent.', purposeTe: 'నీటి వినియోగం, పారుదలపై దృష్టి ఉన్న పథకం; అమలు ప్రాంతాన్ని బట్టి లభ్యత మారుతుంది.', helps: ['irrigation'], documentsEn: 'Ask the local agriculture or horticulture office for current component availability.', documentsTe: 'ప్రస్తుత భాగాల లభ్యత కోసం స్థానిక వ్యవసాయ లేదా ఉద్యాన శాఖ కార్యాలయాన్ని అడగండి.', url: 'https://pmksy.gov.in/', sourceName: 'PMKSY official portal', lastVerified: '15/08/2026' },
  { id: 'pkvy', icon: '🌿', titleEn: 'Paramparagat Krishi Vikas Yojana', titleTe: 'పరంపరాగత కృషి వికాస్ యోజన', purposeEn: 'Information on support for organic and traditional farming approaches, subject to current guidelines.', purposeTe: 'ప్రస్తుత మార్గదర్శకాల ప్రకారం సేంద్రియ, సంప్రదాయ సాగు విధానాలకు సహాయం గురించి సమాచారం.', helps: ['natural'], documentsEn: 'Confirm current cluster, state and application details with the implementing department.', documentsTe: 'ప్రస్తుత క్లస్టర్, రాష్ట్ర, దరఖాస్తు వివరాలను అమలు చేసే శాఖతో నిర్ధారించండి.', url: 'https://agriwelfare.gov.in/', sourceName: 'Department of Agriculture & Farmers Welfare', lastVerified: '15/08/2026' },
  { id: 'agri-infra', icon: '🏗', titleEn: 'Agriculture Infrastructure Fund', titleTe: 'వ్యవసాయ మౌలిక సదుపాయాల నిధి', purposeEn: 'Financing-facility information for eligible agriculture infrastructure projects.', purposeTe: 'అర్హత ఉన్న వ్యవసాయ మౌలిక సదుపాయాల ప్రాజెక్టులకు ఆర్థిక సౌకర్యం గురించి సమాచారం.', helps: ['fpo'], documentsEn: 'Review the official portal and consult an authorised lender or local department.', documentsTe: 'అధికారిక పోర్టల్ చూసి, ఆమోదిత రుణదాత లేదా స్థానిక శాఖను సంప్రదించండి.', url: 'https://agriinfra.dac.gov.in/', sourceName: 'Agriculture Infrastructure Fund', lastVerified: '15/08/2026' },
];

export const videoSlots = [
  ['Rice cultivation', 'వరి సాగు', 'Rice cultivation'], ['Natural farming basics', 'ప్రకృతి వ్యవసాయం ప్రాథమికాలు', 'Natural farming'], ['Jeevamrutam process', 'జీవామృతం తయారీ', 'Jeevamrutam'], ['Drip irrigation', 'బిందు సేద్యం', 'Irrigation'], ['Chilli pest monitoring', 'మిరప పురుగుల పర్యవేక్షణ', 'Pest management'],
].map(([titleEn, titleTe, topic]) => ({ titleEn, titleTe, topic, status: 'Needs official-video verification' }));

export const sourceNotice = {
  en: 'This guide is educational. Verify current crop-protection labels, local recommendations and scheme eligibility before acting.',
  te: 'ఈ గైడ్ విద్యా సమాచారం కోసం మాత్రమే. చర్యకు ముందు ప్రస్తుత పురుగుమందు లేబుల్, స్థానిక సిఫార్సులు, పథక అర్హతను తప్పనిసరిగా నిర్ధారించండి.',
};

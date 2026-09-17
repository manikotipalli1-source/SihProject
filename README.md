# KrishiRakshak (कृषिरक्षक)

An offline-first, bilingual (English/Marathi) crop disease advisory app for
smallholder farmers — merged from two team repos:

- **Member 1 (Mobile / UI)** — `manikotipalli1-source/CropDoctor` → the Expo/React Native app in the project root
- **Member 2 (AI)** — `Chandrasekhar-0525/CropDoc-AI` → training + inference code, now in `backend/`

This build wires the two together: the app now runs a **real, on-device
TFLite model for cotton**, converted from Member 2's trained
`cotton_disease_model.keras`. It's no longer a mock diagnosis for that crop.

## What's real vs. still pending

| Module | Status |
|---|---|
| Navigation, Scan flow, History, Marathi TTS, Weather (Open-Meteo + GPS) | ✅ Done (unchanged from Member 1's build) |
| Cotton disease diagnosis | ✅ **Real TFLite model**, verified on-device on a physical phone. Plantix-style result depth: cause/pathogen, spread & favorable conditions, damage impact, and layered chemical/organic/cultural control — researched from agricultural extension sources (Cotton Incorporated, Bayer Crop Science, UC IPM, NC State Extension, ICAR) for all 3 diseases the model detects. |
| Soybean diagnosis | ✅ **Real TFLite model**, same Plantix-style depth for all 3 diseases (frogeye leaf spot, soybean mosaic, Septoria brown spot) — researched from Iowa State, UMN, and Crop Protection Network sources. Not yet tested on a physical device. |
| Sugarcane diagnosis | ✅ **Real TFLite model**, same depth for all 4 diseases (red rot, mosaic, rust, yellow leaf) — researched from LSU AgCenter, Texas Plant Disease Handbook, and CABI sources. Not yet tested on a physical device. |
| Jowar (sorghum) diagnosis | ✅ **Real TFLite model**, same depth for all 6 diseases (anthracnose/red rot, grain mold, covered kernel smut, head smut, rust, loose kernel smut) — researched from Texas A&M, Bayer Crop Science, and Pioneer Seeds sources. Not yet tested on a physical device. |
| Cloud sync | ⏳ Still mocked, pending backend integration |
| Flask backend (`backend/app.py`) | Fixed to not crash on the missing soybean/sugarcane/sorghum models; usable as an optional cloud fallback / testing server |

**Important taxonomy fix:** the original mobile app's mock data listed cotton
diseases as `pink_bollworm`, `leaf_spot`, `bacterial_blight` — but the
*actually trained* cotton model's classes (from `backend/class_names.json`)
are `bacterial_blight`, `curl_virus`, `fussarium_wilt`, `healthy`. The two
repos had drifted apart. This build adds `curl_virus` and `fussarium_wilt` as
real disease entries (`src/constants/diseases.ts`) with bilingual advisory
text, and updates `src/constants/crops.ts` so the app's UI matches what the
model can actually detect.

**Class-order caveat for soybean/sugarcane/sorghum:** these three models'
`.keras` files were uploaded without an accompanying `class_names.json`, so
there was no way to read the correct class order directly from the models
themselves. The class name lists used in `src/constants/modelClasses.ts`
come from `class_names.json` files already present in the upstream
`Chandrasekhar-0525/CropDoc-AI` repo, and the class **counts** match each
model's real output shape exactly (soybean: 4, sugarcane: 5, sorghum: 6) —
a strong signal, but not a guarantee, since `image_dataset_from_directory`
assigns indices alphabetically by dataset subfolder name at training time.
If real-world predictions for these three crops look scrambled (e.g. a
visibly diseased leaf confidently reads "healthy"), re-verify the class
order in `modelClasses.ts` against the actual `dataset/<crop>/` folder names
used when these specific models were trained.

## Project layout

```
KrishiRakshak/
├── app/                          # Expo Router screens (unchanged)
├── src/
│   ├── services/
│   │   ├── live/
│   │   │   ├── TFLiteDiagnosisService.native.ts  # NEW — real on-device inference (Android/iOS)
│   │   │   ├── TFLiteDiagnosisService.web.ts      # NEW — web stub (falls back to mock; no native TFLite on web)
│   │   │   └── OpenMeteoWeatherService.ts
│   │   ├── mock/                 # fallbacks (sync, unseen crops)
│   │   └── registry.ts           # now wires TFLiteDiagnosisService in
│   └── constants/
│       ├── modelClasses.ts       # NEW — per-crop model + class-index map
│       ├── crops.ts              # updated cotton disease list
│       └── diseases.ts           # added curl_virus, fussarium_wilt
├── assets/models/
│   └── cotton_disease_model.tflite   # NEW — real converted model (2.4 MB, quantized)
├── metro.config.js                # NEW — registers .tflite as a bundleable asset
└── backend/                       # Member 2's training/serving code
    ├── app.py                     # Flask inference server (now fault-tolerant)
    ├── cotton_disease_model.keras # original trained model
    ├── convert_to_tflite.py       # NEW — reusable keras -> tflite converter
    ├── tflite_models/             # both exported cotton .tflite variants
    ├── train.py, train_soybean.py, train_sugarcane.py, train_sorghum.py
    └── class_names.json, *_class_names.json
```

## Running the app (UI only, Expo Go)

```bash
npm install
npm run dev
```

Scan the QR with Expo Go. Everything works except the cotton model won't
actually run natively inside Expo Go (see below) — it'll fall back to the mock.

## Running the real TFLite model (requires a dev client)

`react-native-fast-tflite` and `expo-image-manipulator` use native code, so
plain Expo Go can't load them. You need a custom dev client:

```bash
npm install
npx expo prebuild
npx expo run:android    # or: npx expo run:ios (macOS only)
```

Once running on a device/emulator via the dev client, selecting **Cotton** in
the scan flow will run the bundled `cotton_disease_model.tflite` on the photo
fully offline and return a real prediction (bacterial blight / curl virus /
fusarium wilt / healthy) with its confidence score. Other crops still use the
mock until their models are trained.

**Honesty note:** the `.tflite` model itself was converted and verified to
run correctly (see `backend/tflite_models/`). `TFLiteDiagnosisService.native.ts`
was written against `react-native-fast-tflite@1.6.1`'s documented API and
fixed after review to remove several real bugs found through actual device
testing:
- a `Buffer` global that doesn't exist in React Native
- a deprecated `expo-image-manipulator` call
- **a preprocessing scale mismatch**: `train.py` bakes
  `mobilenet_v2.preprocess_input()` into the saved model graph itself, which
  expects raw 0-255 pixel input and does its own internal rescale — the
  original code here divided by 255 first, double-normalizing the input and
  producing meaningless predictions despite the app not crashing. Fixed to
  feed raw 0-255 float values; verified with the actual `.tflite` file that
  a plain green test image now predicts confidently "healthy" rather than
  near-random class probabilities.

If you add a differently-trained crop model later (soybean/sugarcane/sorghum),
check that model's own training script for whether it expects raw or
pre-normalized pixel input before reusing `imageToTensor()` as-is — this is
a per-model detail, not something safe to assume is the same across models.

## Training and adding the remaining crops

1. Collect a labeled image dataset per crop (folder per class), e.g. `backend/dataset/soybean/<class_name>/*.jpg`
2. Run `python backend/train_soybean.py` (same pattern for sugarcane/sorghum) — this fine-tunes a MobileNetV2 head and saves `*_disease_model.keras`
3. Convert it: `python backend/convert_to_tflite.py soybean_disease_model.keras soybean_disease_model.tflite --quantize`
4. Copy the `.tflite` into `assets/models/`
5. Add the crop to `src/constants/modelClasses.ts` (class names + disease-id mapping), uncomment the example block already there
6. Rebuild the dev client (`npx expo run:android`)

## Optional: cloud/backend inference

`backend/app.py` is a Flask server that can run the same `.keras` models
server-side (useful for testing without a native build, or as a fallback for
crops without an on-device model yet):

**Note:** to keep this zip a reasonable download size, only
`cotton_disease_model.keras` (9.7 MB) ships in `backend/`. The
`soybean_disease_model.keras`, `sugarcane_disease_model.keras`, and
`sorghum_disease_model.keras` files (~134 MB each) were excluded — copy them
into `backend/` yourself from wherever you trained them if you want to run
this Flask server for all four crops. The mobile app itself doesn't need
them; it only uses the much smaller `.tflite` files already in
`assets/models/`.

```bash
cd backend
pip install -r requirements.txt
python app.py
# POST an image + crop name (form-data) to http://127.0.0.1:5000/predict
```

`SyncService` in the app is still mocked — wiring it to this (or a real
hosted backend / Supabase, already a dependency) is the remaining
integration step for offline result syncing.
